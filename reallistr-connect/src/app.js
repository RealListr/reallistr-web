import { KPITile } from './components/KPITile.js';
import { Table } from './components/Table.js';
import { store, initStore } from './store.js';
import { PropertyCard, bindPropertyCardFlyouts } from './components/PropertyCard.js';
import './ai-stubs.js';

/* ---------- helpers ---------- */
const byId = (id)=>document.getElementById(id);
const toDataURL = (file)=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});
const ensureProp = (p)=>Object.assign({
  address:'', status:'draft', domain:'domestic',
  beds:0, baths:0, cars:0, level:null,
  pool:false, ev_charger:false, solar:false, solar_watts:null,
  grass_type:'Artificial',
  land_m2:null, build_m2:null,
  type:'House',
  listing_label:'', listing_close_date:'',
  desc:'',
  media:{ images:[], videos:[], realcuts:[] },
  lat:null, lng:null
}, p||{});

const GRASS = ["Kikuyu","Buffalo","Couch","Fescue","Native","Artificial","Other"];
const TYPES_D = ["House","Apartment","Unit","Townhouse","Granny Flat","Home + Granny Flat"];
const TYPES_C = ["Office","Mixed use Commercial","Warehouse","Industrial Land","City Commercial Opportunity","Retail Shop","Car Park"];
const LABELS = [
  "Auction","For Sale","For Lease","Leasing","Pending Auction","Contact Agent",
  "Seeking Offers","Expression of Interest","Agency in Control","Lead Agency",
  "Private Sale","Private Treaty","Off Market"
];

const fmtDMY = (val)=>{
  if(!val) return '';
  const d = new Date(val);
  if (Number.isNaN(+d)) return val;
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
};

/* ---------- pages ---------- */
const TPL = {
  '#/dashboard': `
    <h1 class="h1">Dashboard</h1>
    <div id="kpis" class="grid-3"></div>
    <div class="card" style="margin-top:16px"><div class="h2">My Properties</div><div id="myProps"></div></div>
  `,
  '#/subscriptions': `
    <h1 class="h1">Agent Subscription Tiers</h1>
    <div class="grid-3">
      <div class="card tier--starter"><div class="h2">Starter</div><ul><li>Up to <b>10 properties</b></li><li>Basic AI assist</li><li>10 GB media</li></ul><div class="cta"><button class="btn">Get Started</button></div></div>
      <div class="card tier--pro"><div class="h2">Pro</div><ul><li><b>Unlimited properties</b></li><li>100 GB media</li><li>Up to 5 agents</li></ul><div class="cta"><button class="btn primary">Upgrade to Pro</button></div></div>
      <div class="card tier--enterprise"><div class="h2">Enterprise</div><ul><li><b>Unlimited agents & offices</b></li><li>Priority AI</li></ul><div class="cta"><button class="btn">Contact Sales</button></div></div>
    </div>
  `,
  '#/ads': `
    <h1 class="h1">Advertising Models</h1>
    <div class="grid-3">
      <div class="card ad--lite"><div class="h2">Lite</div><ul><li>1 campaign</li><li>Meta reach</li></ul><div class="cta"><button class="btn">Activate Lite</button></div></div>
      <div class="card ad--active"><div class="h2">Active</div><ul><li>Up to 5 campaigns</li><li>Meta + Google</li></ul><div class="cta"><button class="btn primary">Go Active</button></div></div>
      <div class="card ad--advanced"><div class="h2">Advanced</div><ul><li>Unlimited campaigns</li><li>Retargeting</li></ul><div class="cta"><button class="btn">Launch Advanced</button></div></div>
    </div>
  `,
  '#/properties': `
    <h1 class="h1">Properties</h1>
    <div class="card" style="margin-bottom:16px">
      <button class="btn" id="btnNewProp">+ New Property</button>
      <button class="btn" id="btnAIAdd">AI Quick Add (stub)</button>
    </div>
    <div id="propTable"></div>
  `,
  '#/leads': `<h1 class="h1">Leads</h1><div id="leadsTable"></div>`,
  '#/settings': `
    <h1 class="h1">Settings</h1>
    <div class="grid-2">
      <section class="card"><div class="h2">Subscription</div><div id="plan"></div></section>
      <section class="card"><div class="h2">Integrations</div><p>Status: <span class="badge" id="adStatus">Not Connected</span></p><button class="btn" id="btnConnect">Connect Ad Account (mock)</button></section>
    </div>
  `,
  '#/property-editor': `
    <h1 class="h1">Property Editor</h1>
    <div class="editor-grid smart-compact">
      <section>
        <div class="card compact-editor">

          <!-- Header -->
          <div class="row head-row">
            <div class="flex-1">
              <label>Address</label>
              <input id="p_address" class="btn" placeholder="123 Main St" style="width:100%"/>
            </div>
            <div class="sm">
              <label>Status</label>
              <select id="p_status" class="btn" style="width:100%">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div class="sm">
              <label>Domain</label>
              <div class="row domain-toggle">
                <button class="btn" id="domD">D</button>
                <button class="btn" id="domC">C</button>
              </div>
            </div>
          </div>

          <!-- Row A -->
          <div class="row specs-row">
            <div class="xs"><label>Beds</label><input id="p_beds" class="btn" type="number" min="0"/></div>
            <div class="xs"><label>Baths</label><input id="p_baths" class="btn" type="number" min="0"/></div>
            <div class="xs"><label>Car</label><input id="p_cars" class="btn" type="number" min="0"/></div>
            <div class="xs"><label>Level</label><input id="p_level" class="btn" type="number" min="0"/></div>
            <div class="xs"><label>Pool</label><input type="checkbox" id="p_pool"/></div>
            <div class="xs"><label>EV</label><input type="checkbox" id="p_ev"/></div>
            <div class="xs">
              <label>Solar (W)</label>
              <div class="row tight"><input type="checkbox" id="p_solar"/><input id="p_solar_w" class="btn xs" type="number" min="0" placeholder="W"/></div>
            </div>
            <div class="sm">
              <label>Grass</label>
              <select id="p_grass" class="btn" style="width:100%">${GRASS.map(g=>`<option value="${g}">${g}</option>`).join('')}</select>
            </div>
          </div>

          <!-- Row B -->
          <div class="row metrics-row">
            <div class="sm"><label>Land m²</label><input id="p_land" class="btn" type="number" min="0" step="0.1"/></div>
            <div class="sm"><label>Build m²</label><input id="p_build" class="btn" type="number" min="0" step="0.1"/></div>
            <div class="sm"><label>Property Type</label><select id="p_type" class="btn" style="width:100%"></select></div>
            <div class="sm"><label>Listing Label</label>
              <select id="p_label" class="btn" style="width:100%">
                <option value="">Select a label</option>
                ${LABELS.map(l=>`<option value="${l}">${l}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Description -->
          <div class="row desc-row">
            <div class="flex-1">
              <label>Description</label>
              <textarea id="p_desc" class="btn" style="width:100%;min-height:90px" placeholder="Short description..."></textarea>
            </div>
          </div>

          <!-- Media -->
          <div class="row media-row">
            <div class="flex-1">
              <label>Media</label>
              <div class="upload-grid">
                <div><b>Images</b> <input id="p_imgs" type="file" accept="image/*" multiple/></div>
                <div><b>Videos</b> <input id="p_vids" type="file" accept="video/*" multiple/></div>
                <div><b>RealCuts</b> <input id="p_cuts" type="file" accept="video/*" multiple/></div>
              </div>
              <div id="p_media_strip" class="hscroll media-strip"></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="row actions">
            <button class="btn primary" id="p_save">Save</button>
            <button class="btn" id="p_cancel">Cancel</button>
          </div>
        </div>
      </section>

      <!-- Sticky Preview -->
      <aside>
        <div id="p_preview" class="preview-card sticky"></div>
      </aside>
    </div>
    `,              // ✅ add this comma here!

};
/* ---------- router ---------- */
const routes = Object.keys(TPL);
const mount = async () => {
  const path = routes.includes(window.location.hash) ? window.location.hash : '#/dashboard';
  document.getElementById('app').innerHTML = TPL[path];
  attachControllers(path);
};

/* ---------- preview ---------- */
const renderPreview = (p)=> PropertyCard(p,{mode:'draft'});

/* ---------- controllers ---------- */
function attachControllers(path){
  if(path === '#/dashboard'){
    const k = byId('kpis');
    k.innerHTML = [
      KPITile('Total Properties', store.properties.length),
      KPITile('Active Campaigns', store.campaigns.filter(c=>c.status==='active').length),
      KPITile('Leads', store.leads.length)
    ].join('');
    const rows = store.properties.slice(0,6).map(p=>[p.address||'-', p.status||'-', p.beds||0, p.baths||0]);
    byId('myProps').innerHTML = Table(['Address','Status','Beds','Baths'], rows);
  }

  if(path === '#/properties'){
    const draw = ()=>{
      const rows = store.properties.map((p,i)=>[
        p.address||'-', p.status||'-', p.beds||0, p.baths||0,
        `<button class="btn" data-prev="${i}">Preview</button>`,
        `<button class="btn" data-edit="${i}">Edit</button>`
      ]);
      byId('propTable').innerHTML = Table(['Address','Status','Beds','Baths','Preview',''], rows);
      byId('propTable').querySelectorAll('[data-edit]').forEach(btn=>{
        btn.onclick = ()=>{ localStorage.setItem('editIndex', btn.getAttribute('data-edit')); location.hash = '#/property-editor'; };
      });
      byId('propTable').querySelectorAll('[data-prev]').forEach(btn=>{
        btn.onclick = ()=>{ localStorage.setItem('editIndex', btn.getAttribute('data-prev')); location.hash = '#/property-editor'; };
      });
    };
    draw();
    byId('btnNewProp').onclick = ()=>{
      store.properties.push(ensureProp({ status:'draft' })); store.persist();
      localStorage.setItem('editIndex', String(store.properties.length-1)); location.hash = '#/property-editor';
    };
    byId('btnAIAdd').onclick = ()=>{
      const ai = ensureProp(window.aiQuickAdd());
      store.properties.push(ai); store.persist();
      localStorage.setItem('editIndex', String(store.properties.length-1)); location.hash = '#/property-editor';
    };
  }

  if(path === '#/leads'){
    const rows = store.leads.map(l=>[l.name, l.property_id, l.stage, new Date(l.last_activity_at||Date.now()).toLocaleString()]);
    byId('leadsTable').innerHTML = Table(['Name','Property','Stage','Last Activity'], rows);
  }

  if(path === '#/settings'){
    const s = store.subscription || { plan:'starter', usage_props:0, usage_media_gb:0, ai_credits:0 };
    const elPlan = document.createElement('div'); elPlan.innerHTML =
      `Plan: <b>${s.plan}</b><br>Properties: ${s.usage_props} · Media: ${s.usage_media_gb} GB · AI credits: ${s.ai_credits}`;
    byId('plan').replaceChildren(elPlan);
    byId('btnConnect').onclick = ()=>{ const el = byId('adStatus'); el.textContent = 'Connected'; el.classList.add('badge--ok'); };
  }

  if(path === '#/property-editor'){
    const idx = parseInt(localStorage.getItem('editIndex')||'-1',10);
    const p = store.properties[idx] = ensureProp(store.properties[idx]);

    const setDomain = (d)=>{
      p.domain = d; store.persist();
      const list = d==='commercial' ? TYPES_C : TYPES_D;
      const sel = byId('p_type'); sel.innerHTML = list.map(t=>`<option value="${t}">${t}</option>`).join('');
      if(!list.includes(p.type)) { p.type = list[0]; }
      sel.value = p.type;
      syncPreview();
    };

    /* populate */
    byId('p_address').value = p.address;
    byId('p_status').value  = p.status;
    ['p_beds','p_baths','p_cars'].forEach(id=>byId(id).value = p[id.slice(2)] ?? 0);
    byId('p_level').value = p.level ?? '';
    byId('p_pool').checked = !!p.pool;
    byId('p_ev').checked = !!p.ev_charger;
    byId('p_solar').checked = !!p.solar; byId('p_solar_w').value = p.solar_watts ?? '';
    byId('p_grass').value = p.grass_type;
    byId('p_land').value = p.land_m2 ?? '';
    byId('p_build').value = p.build_m2 ?? '';
    setDomain(p.domain||'domestic');
    byId('p_label').value = p.listing_label || '';
const closeEl = byId('p_close'); if (closeEl) closeEl.value = fmtDMY(p.listing_close_date);
    byId('p_close').value = fmtDMY(p.listing_close_date);
    byId('p_desc').value = p.desc || '';

    /* close date visibility */
    const toggleClose = ()=>{
      const v = byId('p_label').value;
      const need = (v==='Auction' || v==='Expression of Interest');
      byId('closeWrap').style.display = need ? '' : 'none';
      if(!need){ byId('p_close').value=''; p.listing_close_date=''; store.persist(); syncPreview(); }
    };
    toggleClose();

    /* media strip */
    const strip = byId('p_media_strip');
    const drawStrip = ()=>{
      strip.innerHTML='';
      (p.media.images||[]).forEach(src=>{ const img=document.createElement('img'); img.src=src; img.className='thumb'; strip.appendChild(img); });
      (p.media.videos||[]).forEach(()=>{ const ph=document.createElement('div'); ph.className='thumb'; ph.textContent='Video'; strip.appendChild(ph); });
      (p.media.realcuts||[]).forEach(()=>{ const ph=document.createElement('div'); ph.className='thumb'; ph.textContent='Cut'; strip.appendChild(ph); });
      syncPreview();
    };
    const pushFiles = async (input, arr)=>{ const files=Array.from(input.files||[]); for(const f of files){ const d=await toDataURL(f); p.media[arr].push(d);} store.persist(); drawStrip(); };
    byId('p_imgs').onchange = (e)=>pushFiles(e.target,'images');
    byId('p_vids').onchange = (e)=>pushFiles(e.target,'videos');
    byId('p_cuts').onchange = (e)=>pushFiles(e.target,'realcuts');
    drawStrip();

    /* preview */
    const syncPreview = ()=>{
      byId('p_preview').innerHTML = renderPreview(p);
      bindPropertyCardFlyouts(byId('p_preview'));
    };
    syncPreview();

    /* bindings */
    const bind = (id, fn, evt='input')=>byId(id)?.addEventListener(evt, fn);
    bind('p_address', e=>{ p.address=e.target.value; store.persist(); syncPreview(); });
    bind('p_status',  e=>{ p.status =e.target.value; store.persist(); syncPreview(); });

    ['p_beds','p_baths','p_cars'].forEach(id=>bind(id, e=>{ p[id.slice(2)] = parseInt(e.target.value||0,10); store.persist(); syncPreview(); }));
    bind('p_level', e=>{ p.level = e.target.value?parseInt(e.target.value,10):null; store.persist(); syncPreview(); });
    bind('p_pool',  e=>{ p.pool = e.target.checked; store.persist(); syncPreview(); }, 'change');
    bind('p_ev',    e=>{ p.ev_charger = e.target.checked; store.persist(); syncPreview(); }, 'change');

    const solarToggle = byId('p_solar'), solarW = byId('p_solar_w');
    const syncSolar = ()=>{ solarW.disabled = !solarToggle.checked; if(!solarToggle.checked) solarW.value=""; };
    syncSolar();
    bind('p_solar', e=>{ p.solar = e.target.checked; syncSolar(); store.persist(); syncPreview(); }, 'change');
    bind('p_solar_w', e=>{ p.solar_watts = e.target.value?parseInt(e.target.value,10):null; store.persist(); syncPreview(); });

    bind('p_grass', e=>{ p.grass_type = e.target.value; store.persist(); syncPreview(); });
    bind('p_land',  e=>{ p.land_m2 = e.target.value?parseFloat(e.target.value):null; store.persist(); syncPreview(); });
    bind('p_build', e=>{ p.build_m2= e.target.value?parseFloat(e.target.value):null; store.persist(); syncPreview(); });

    const drawTypes = ()=> setDomain(p.domain||'domestic');
    bind('p_type',  e=>{ p.type = e.target.value; store.persist(); syncPreview(); });

    byId('domD').onclick = ()=>{ setDomain('domestic'); };
    byId('domC').onclick = ()=>{ setDomain('commercial'); };
    drawTypes();

    bind('p_label', e=>{ p.listing_label = e.target.value; store.persist(); toggleClose(); syncPreview(); });
    bind('p_close', e=>{ p.listing_close_date = e.target.value; store.persist(); syncPreview(); });
    bind('p_desc',  e=>{ p.desc = e.target.value; store.persist(); syncPreview(); });

    byId('p_save').onclick = ()=>{ store.properties[idx]=p; store.persist(); alert('Saved'); location.hash = '#/properties'; };
    byId('p_cancel').onclick = ()=>{ location.hash = '#/properties'; };
  }
}

/* ---------- boot ---------- */
window.addEventListener('hashchange', mount);
window.addEventListener('load', async()=>{ await initStore(); mount(); });

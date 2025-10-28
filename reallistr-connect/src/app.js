import { KPITile } from './components/KPITile.js';
import { Table } from './components/Table.js';
import { store, initStore } from './store.js';
import './ai-stubs.js';

// Inline page templates so we don't need fetch()
const TPL = {
  '#/dashboard': `
    <h1 class="h1">Dashboard</h1>
    <div id="kpis" class="grid-3"></div>
    <div class="card" style="margin-top:16px">
      <div class="h2">My Properties</div>
      <div id="myProps"></div>
    </div>
  `,
  '#/subscriptions': `
    <h1 class="h1">Agent Subscription Tiers</h1>
    <div class="grid-3">
      <div class="card tier--starter">
        <div class="h2">Starter</div>
        <ul>
          <li>Up to <b>10 properties</b></li>
          <li>Basic AI assist</li>
          <li>10 GB media storage</li>
          <li>1 ad account</li>
          <li>Leads (New → Sold)</li>
          <li>English + 1 language</li>
          <li>Simple dashboard</li>
        </ul>
        <div class="cta"><button class="btn">Get Started</button></div>
      </div>
      <div class="card tier--pro">
        <div class="h2">Pro</div>
        <ul>
          <li><b>Unlimited properties</b></li>
          <li>100 GB media storage</li>
          <li>Up to 5 agents</li>
          <li>AI translations + copy</li>
          <li>Meta + Google snapshot</li>
          <li>Lead assignment</li>
          <li>Budget tracking</li>
        </ul>
        <div class="cta"><button class="btn primary">Upgrade to Pro</button></div>
      </div>
      <div class="card tier--enterprise">
        <div class="h2">Enterprise</div>
        <ul>
          <li><b>Unlimited agents & offices</b></li>
          <li>Priority AI generation</li>
          <li>Auto-publish (multi-language)</li>
          <li>Campaign manager + approvals</li>
          <li>Principal control panel</li>
          <li>White-label</li>
          <li>Dedicated support</li>
        </ul>
        <div class="cta"><button class="btn">Contact Sales</button></div>
      </div>
    </div>
  `,
  '#/ads': `
    <h1 class="h1">Advertising Models</h1>
    <div class="grid-3">
      <div class="card ad--lite">
        <div class="h2">Lite</div>
        <ul>
          <li>1 active campaign</li>
          <li>Meta reach boost</li>
          <li>Single creative</li>
          <li>Suburb radius</li>
          <li>Click → Inquiry tracking</li>
        </ul>
        <div class="cta"><button class="btn">Activate Lite</button></div>
      </div>
      <div class="card ad--active">
        <div class="h2">Active</div>
        <ul>
          <li>Up to 5 campaigns</li>
          <li>Meta + Google</li>
          <li>3–5 creatives</li>
          <li>City-wide targeting</li>
          <li>Lead form + chat</li>
        </ul>
        <div class="cta"><button class="btn primary">Go Active</button></div>
      </div>
      <div class="card ad--advanced">
        <div class="h2">Advanced</div>
        <ul>
          <li>Unlimited campaigns</li>
          <li>Meta, Google, TikTok, YouTube</li>
          <li>Dynamic AI copy</li>
          <li>Retargeting</li>
          <li>Spend & ROI dashboard</li>
        </ul>
        <div class="cta"><button class="btn">Launch Advanced</button></div>
      </div>
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
  '#/leads': `
    <h1 class="h1">Leads</h1>
    <div id="leadsTable"></div>
  `,
  '#/settings': `
    <h1 class="h1">Settings</h1>
    <div class="grid-2">
      <section class="card">
        <div class="h2">Subscription</div>
        <div id="plan"></div>
      </section>
      <section class="card">
        <div class="h2">Integrations</div>
        <p>Status: <span class="badge" id="adStatus">Not Connected</span></p>
        <button class="btn" id="btnConnect">Connect Ad Account (mock)</button>
      </section>
    </div>
  `
};

const routes = Object.keys(TPL);

const mount = async () => {
  const path = routes.includes(window.location.hash) ? window.location.hash : '#/dashboard';
  document.getElementById('app').innerHTML = TPL[path];
  attachControllers(path);
};

function attachControllers(path){
  if(path === '#/dashboard'){
    const k = document.getElementById('kpis');
    k.innerHTML = [
      KPITile('Total Properties', store.properties.length),
      KPITile('Active Campaigns', store.campaigns.filter(c=>c.status==='active').length),
      KPITile('Leads', store.leads.length)
    ].join('');
    const rows = store.properties.slice(0,6).map(p=>[p.address, p.status, p.beds, p.baths]);
    document.getElementById('myProps').innerHTML = Table(['Address','Status','Beds','Baths'], rows);
  }
  if(path === '#/properties'){
    const table = () => {
      const rows = store.properties.map(p=>[p.address, p.status, p.beds, p.baths]);
      document.getElementById('propTable').innerHTML = Table(['Address','Status','Beds','Baths'], rows);
    };
    table();
    const newBtn = document.getElementById('btnNewProp');
    if(newBtn){
      newBtn.onclick = ()=>{
        const draft = {address:'New Address', status:'draft', beds:3, baths:2};
        store.properties.push(draft); store.persist(); table();
      };
    }
    const aiBtn = document.getElementById('btnAIAdd');
    if(aiBtn){
      aiBtn.onclick = ()=>{
        const ai = window.aiQuickAdd(); store.properties.push(ai); store.persist(); table();
      };
    }
  }
  if(path === '#/leads'){
    const rows = store.leads.map(l=>[l.name, l.property_id, l.stage, new Date(l.last_activity_at||Date.now()).toLocaleString()]);
    document.getElementById('leadsTable').innerHTML = Table(['Name','Property','Stage','Last Activity'], rows);
  }
  if(path === '#/settings'){
    const s = store.subscription || { plan:'starter', usage_props:0, usage_media_gb:0, ai_credits:0 };
    document.getElementById('plan').innerHTML = `Plan: <b>${s.plan}</b><br>Properties: ${s.usage_props} · Media: ${s.usage_media_gb} GB · AI credits: ${s.ai_credits}`;
    const btn = document.getElementById('btnConnect');
    if(btn){
      btn.onclick = ()=>{
        const el = document.getElementById('adStatus');
        el.textContent = 'Connected'; el.classList.add('badge--ok');
      };
    }
  }
}

window.addEventListener('hashchange', mount);
window.addEventListener('load', async()=>{ await initStore(); mount(); });

const sel = document.getElementById('roleSelect');
if(sel){
  sel.value = localStorage.getItem('role') || 'principal';
  sel.onchange = ()=>{ localStorage.setItem('role', sel.value); };
}

// Reset demo button
window.addEventListener('load', ()=>{
  const resetBtn = document.getElementById('btnReset');
  if(resetBtn){
    resetBtn.onclick = ()=>{
      localStorage.removeItem('connectStore');
      alert('Demo data has been reset. Refreshing...');
      location.reload();
    };
  }
});

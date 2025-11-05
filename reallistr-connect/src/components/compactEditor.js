/**
 * Compact the Property Editor into two bars and hide the big Map card.
 * Row A: Beds | Baths | Car | Level | Pool | EV | Solar(W) | Grass
 * Row B: Land m² | Build m² | Property Type | Listing Label
 */
export function compactEditorLayout() {
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // Find the main editor card (left column, first .card)
  const mainCard = ($('.editor-grid > section') || $('section'))?.querySelector('.card');
  if (!mainCard) return;

  // Hide any legacy big Map card by title
  $$('.card').forEach(card=>{
    const h = card.querySelector('.h2, h2');
    if (h && h.textContent.trim().toLowerCase() === 'map') card.style.display = 'none';
  });

  // Address/Status row is the first .row in the card
  const addrRow = mainCard.querySelector('.row');
  if (!addrRow) return;

  // Create or fetch Row A and Row B shells
  let rowA = mainCard.querySelector('[data-row="A"]');
  if (!rowA) { rowA = document.createElement('div'); rowA.className='row'; rowA.dataset.row='A'; rowA.style.marginTop='10px'; addrRow.after(rowA); }
  let rowB = mainCard.querySelector('[data-row="B"]');
  if (!rowB) { rowB = document.createElement('div'); rowB.className='row'; rowB.dataset.row='B'; rowB.style.marginTop='8px'; rowA.after(rowB); }

  // Helpers to wrap known inputs by ID
  const wrapInput = (id, label, cls='xs')=>{
    const box = document.createElement('div'); box.className = cls;
    box.innerHTML = `<label>${label}</label><br/>`;
    const el = document.getElementById(id);
    if (el){ el.classList.add('btn'); el.style.width='100%'; box.appendChild(el); }
    return box;
  };
  const wrapCheck = (id,label)=>{
    const box = document.createElement('div'); box.className='xs';
    box.innerHTML = `<label>${label}</label><br/>`;
    const el = document.getElementById(id);
    if (el) box.appendChild(el);
    return box;
  };
  const wrapSolar = ()=>{
    const box = document.createElement('div'); box.className='xs';
    box.innerHTML = `<label>Solar</label><br/>`;
    const cb = document.getElementById('p_solar');
    const w  = document.getElementById('p_solar_w');
    if (cb) box.appendChild(cb);
    if (w){ w.classList.add('btn','xs'); w.placeholder='W'; box.appendChild(w); }
    return box;
  };
  const wrapGrass = ()=>{
    const box = document.createElement('div'); box.className='sm'; box.style.minWidth='160px';
    box.innerHTML = `<label>Grass</label><br/>`;
    const el = document.getElementById('p_grass');
    if (el){ el.classList.add('btn'); el.style.width='100%'; box.appendChild(el); }
    return box;
  };

  // Build Row A
  rowA.innerHTML='';
  [
    wrapInput('p_beds','Beds'),
    wrapInput('p_baths','Baths'),
    wrapInput('p_cars','Car'),
    wrapInput('p_level','Level'),
    wrapCheck('p_pool','Pool'),
    wrapCheck('p_ev','EV'),
    wrapSolar(),
    wrapGrass()
  ].forEach(n=>rowA.appendChild(n));

  // Build Row B
  rowB.innerHTML='';
  const land  = wrapInput('p_land','Land m²','sm');  land.style.flex='1';
  const build = wrapInput('p_build','Build m²','sm'); build.style.flex='1';

  const ptype = document.createElement('div'); ptype.className='sm';
  ptype.innerHTML = `<label>Property Type</label><br/>`;
  const typeEl = document.getElementById('p_type');
  if (typeEl){ typeEl.classList.add('btn'); typeEl.style.width='100%'; ptype.appendChild(typeEl); }

  const label = document.createElement('div'); label.className='sm'; label.style.flex='1';
  label.innerHTML = `<label>Listing Label</label><br/>`;
  const lblEl = document.getElementById('p_label');
  if (lblEl){ lblEl.classList.add('btn'); lblEl.style.width='100%'; label.appendChild(lblEl); }

  [land, build, ptype, label].forEach(n=>rowB.appendChild(n));
}

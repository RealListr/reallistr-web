function compactNow() {
  const inEditor = location.hash === '#/property-editor';
  if (!inEditor) return;

  // Try to find the main card; bail if form isn't painted yet
  const mainCard = document.querySelector('.editor-grid > section .card') || document.querySelector('section .card');
  if (!mainCard) return;

  // Hide any legacy "Map" card (big square) by title text
  document.querySelectorAll('.card').forEach(card=>{
    const h = card.querySelector('.h2, h2');
    if (h && String(h.textContent).trim().toLowerCase() === 'map') card.style.display = 'none';
  });

  // First row in the card is Address/Status — insert our two rows after it
  const addrRow = mainCard.querySelector('.row');
  if (!addrRow) return;

  let rowA = mainCard.querySelector('[data-row="A"]');
  if (!rowA) { rowA = document.createElement('div'); rowA.className='row'; rowA.dataset.row='A'; rowA.style.marginTop='10px'; addrRow.after(rowA); }
  let rowB = mainCard.querySelector('[data-row="B"]');
  if (!rowB) { rowB = document.createElement('div'); rowB.className='row'; rowB.dataset.row='B'; rowB.style.marginTop='8px'; rowA.after(rowB); }

  // Helpers
  const wrap = (label, el, cls='xs')=>{
    const box=document.createElement('div'); box.className=cls;
    box.innerHTML=`<label>${label}</label><br/>`;
    if (el){ el.classList.add('btn'); if (!/checkbox|radio/i.test(el.type||'')) el.style.width='100%'; box.appendChild(el); }
    return box;
  };
  const by = (id)=>document.getElementById(id);

  // Move inputs into Row A (Beds | Baths | Car | Level | Pool | EV | Solar(W) | Grass)
  rowA.innerHTML='';
  rowA.append(
    wrap('Beds',  by('p_beds')),
    wrap('Baths', by('p_baths')),
    wrap('Car',   by('p_cars')),
    wrap('Level', by('p_level')),
    wrap('Pool',  by('p_pool')),
    wrap('EV',    by('p_ev')),
    (()=>{ const box=wrap('Solar', by('p_solar')); const w=by('p_solar_w'); if (w){ w.classList.add('btn','xs'); w.placeholder='W'; box.appendChild(w);} return box; })(),
    (()=>{ const g=by('p_grass'); return wrap('Grass', g, 'sm'); })()
  );

  // Row B (Land m² | Build m² | Property Type | Listing Label)
  rowB.innerHTML='';
  const land  = wrap('Land m²', by('p_land'), 'sm');  land.style.flex='1';
  const build = wrap('Build m²',by('p_build'),'sm'); build.style.flex='1';
  const ptype = wrap('Property Type', by('p_type'), 'sm');
  const label = wrap('Listing Label', by('p_label'), 'sm'); label.style.flex='1';
  rowB.append(land, build, ptype, label);
}

// Run on load & whenever the route changes; also retry briefly for late paint
function kick() {
  let tries = 0;
  const t = setInterval(()=>{
    compactNow();
    if (++tries > 20) clearInterval(t);
  }, 50);
}
window.addEventListener('load', kick);
window.addEventListener('hashchange', kick);

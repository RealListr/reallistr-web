/**
 * PropertyCard — the exact card used in feed + editor preview.
 * Only depends on the ghost sprite at ./public/icons/reallistr-ghost.svg
 */
const U = (s)=>s==null ? '' : String(s);
const chip = (id, text='') => `
  <span class="gi-chip">
    <svg class="gi" aria-hidden="true"><use href="./public/icons/reallistr-ghost.svg#${id}"></use></svg>
    ${text ? `<span>${text}</span>` : ''}
  </span>
`;

const formatW = (w)=> w ? `${w}W` : '';
const formatM2 = (n)=> n ? `${n}m²` : '';

export function PropertyCard(p, {mode='published'} = {}) {
  const title = U(p.type || (p.domain==='commercial' ? 'Commercial' : 'House'));
  const address = U(p.address || 'Address TBD');
  const status = U(p.status || 'draft');

  // chips (keep order identical to your signature card)
  const chips = [
    chip('gi-bed',   U(p.beds||0)),
    chip('gi-bath',  U(p.baths||0)),
    chip('gi-car',   U(p.cars||0)),
    chip('gi-level', p.level!=null && p.level!=='' ? U(p.level) : ''),
    p.pool ? chip('gi-pool') : '',
    p.ev_charger ? chip('gi-ev') : '',
    p.solar ? chip('gi-solar', formatW(p.solar_watts)) : '',
    chip('gi-land',  formatM2(p.land_m2)),
    chip('gi-build', formatM2(p.build_m2)),
    p.grass_type ? chip('gi-grass', U(p.grass_type)) : ''
  ].filter(Boolean).join('');

  const label = p.listing_label ? `<div class="meta">${chip('gi-lbl', p.listing_label)}</div>` : '';
  const close  = (p.listing_label==='Auction' || p.listing_label==='Expression of Interest') && p.listing_close_date
      ? `<div class="sub" style="margin-top:4px">Closes: ${U(p.listing_close_date)}</div>` : '';

  const img = (p.media && p.media.images && p.media.images[0]) || '';

  return `
  <article class="pc-card">
    <div class="pc-media">
      ${
        img
          ? `<img src="${img}" alt="">`
          : `<div class="pc-media--empty">No media</div>`
      }
    </div>
    <div class="pc-body">
      <div class="pc-row">
        <div class="h2" style="margin:0">${title}</div>
        <span class="badge-status">${status}</span>
      </div>
      <div class="pc-address">${address}</div>
      <div class="hline"></div>
      <div class="pc-specs">${chips}</div>
      ${label}
      ${close}
      ${p.desc ? `<div class="desc-snippet">${p.desc.length>140?p.desc.slice(0,140)+'…':p.desc}</div>` : ''}
    </div>
  </article>`;
}

/** Hook up the little “info” flyout (i chip) if you’re using it */
export function bindPropertyCardFlyouts(root=document){
  // placeholder: your feed flyouts will reuse their own JS.
  // Kept so the API is compatible.
  return;
}

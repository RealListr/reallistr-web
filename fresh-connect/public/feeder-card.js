// Minimal card that fetches one property and renders a small preview.
export async function mountFeederCard(el, id){
  el.innerHTML = 'Loading…';
  try{
    const r = await fetch('/api/agents/' + encodeURIComponent(id));
    const p = await r.json();
    if (!p || !p.id){ el.textContent = 'Not found'; return; }
    const price = p.price != null ? ('$' + (p.price.toLocaleString?.() ?? p.price)) : '';
    el.innerHTML = `
      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:12px">
        <div style="font-weight:700">${p.address||''}</div>
        <div style="color:#6b7280;margin-top:4px">${p.suburb||''}, ${p.state||''} ${price?('— '+price):''}</div>
      </div>`;
  }catch(e){ el.textContent='Load failed'; console.error(e); }
}

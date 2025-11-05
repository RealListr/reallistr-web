/* feeder-card.js v3 — global (no modules) */
(function () {
  function $(id){ return document.getElementById(id); }

  function priceStr(p){
    if (!p) return "";
    const digits = String(p).replace(/[^\d]/g, "");
    if (!digits) return "";
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
        .format(Number(digits));
    } catch {
      return p;
    }
  }

  function el(tag, attrs={}, ...children){
    const n = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs||{})){
      if (k === 'class') n.className = v;
      else if (k === 'style') n.setAttribute('style', v);
      else n.setAttribute(k, v);
    }
    for (const c of children){
      if (c == null) continue;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return n;
  }

  window.renderFeederCards = async function renderFeederCards(targetId){
    const host = $(targetId);
    if (!host) return;
    host.innerHTML = '';

    let items = [];
    try {
      const r = await fetch('/api/agents', { cache: 'no-store' });
      items = await r.json();
    } catch (e) {
      console.error('feeder-card fetch error:', e);
    }

    if (!items || !items.length){
      host.innerHTML = '<div class="muted">No listings yet.</div>';
      return;
    }

    const frag = document.createDocumentFragment();

    items.forEach(it => {
      const card = el('div', { class: 'feed-card' });

      // image
      const img = el('img', { src: it.media || 'https://placehold.co/800x500?text=No+Image', alt: '' });
      card.appendChild(img);

      // body content
      const body = el('div', { class: 'body' });
      body.appendChild(el('h3', null, it.title || 'Untitled'));

      const addrLine = [it.address || ''].filter(Boolean).join(' • ');
      if (addrLine) body.appendChild(el('p', null, addrLine));

      const priceLine = priceStr(it.price) || it.price || '';
      if (priceLine) body.appendChild(el('p', null, priceLine));

      // sale method badge
      if (it.saleMethod){
        body.appendChild(el('div', { class: 'chip' }, it.saleMethod));
      }

      // highlights (up to 6)
      if (Array.isArray(it.highlights) && it.highlights.length){
        const chips = el('div', { class: 'chips' });
        it.highlights.slice(0,6).forEach(h => chips.appendChild(el('span', { class: 'chip' }, h)));
        body.appendChild(chips);
      }

      // pinned indicator
      if (it.pinned){
        body.appendChild(el('div', { class: 'chip' }, '📍 Pinned'));
      }

      card.appendChild(body);
      frag.appendChild(card);
    });

    host.appendChild(frag);
  };

  console.log('feeder-card.js v3 loaded');
})();

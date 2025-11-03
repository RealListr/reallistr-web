/* feeder-card.js v3 — global renderer (no modules) */
(function () {
  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    });
    children.forEach(c => el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return el;
  }

  function fmtPrice(p) {
    if (!p) return '';
    const digits = String(p).replace(/[^\d]/g, '');
    if (!digits) return '';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(Number(digits));
    } catch { return '$' + digits; }
  }

  function card(item) {
    const img = h('div', { class: 'feed-card__img' }, [
      h('div', { class: 'feed-card__img-ph', text: 'No Image' })
    ]);
    if (item.media) {
      const imgtag = new Image();
      imgtag.src = item.media;
      imgtag.alt = item.title || 'Listing image';
      imgtag.onload = () => { img.innerHTML = ''; img.appendChild(imgtag); };
      imgtag.onerror = () => { /* keep placeholder */ };
    }

    const title = h('div', { class: 'feed-card__title', text: item.title || 'Untitled' });
    const addr  = h('div', { class: 'feed-card__addr',  text: item.address || '' });
    const price = h('div', { class: 'feed-card__price', text: fmtPrice(item.price) });

    const body = h('div', { class: 'feed-card__body' }, [title, addr, price]);
    const card = h('div', { class: 'feed-card' }, [img, body]);
    return card;
  }

  async function getItems() {
    try {
      const r = await fetch('/api/agents', { cache: 'no-store' });
      if (!r.ok) throw new Error('bad response');
      const data = await r.json();
      return Array.isArray(data) ? data : [];
    } catch {
      // fallback placeholders
      return [
        { title: 'Untitled', address: '123 Demo St', price: '750000' },
        { title: 'Untitled', address: '45 Market St', price: '1250000' },
        { title: 'Untitled', address: '77 Sample Rd', price: '990000' },
      ];
    }
  }

  async function renderFeederCards(containerId) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.classList.add('feed-grid');
    wrap.innerHTML = '';
    const items = await getItems();
    items.slice(0, 12).forEach(it => wrap.appendChild(card(it)));
  }

  // expose globally
  window.renderFeederCards = renderFeederCards;
  console.log('feeder-card.js v3 loaded');
})();

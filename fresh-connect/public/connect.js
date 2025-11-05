/* fresh-connect/public/connect.js */

(function () {
  const api = {
    get: async (url) => {
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
      return r.json();
    },
    post: (url, data) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    del: (url) => fetch(url, { method: 'DELETE' }),
  };

  const utils = {
    qs: (s, r = document) => r.querySelector(s),
    qsa: (s, r = document) => Array.from(r.querySelectorAll(s)),
    debounce(fn, ms = 200) {
      let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    },
    formatPrice(v) {
      if (v == null || v === '') return '';
      const n = String(v).replace(/[^\d.]/g, '');
      const num = Number(n);
      if (Number.isNaN(num)) return '';
      return num.toLocaleString();
    },
    toDataUrl(file, maxW = 1600, maxH = 1600) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const url = reader.result;
          // Images: shrink on a canvas to keep payloads small
          if (String(file.type).startsWith('image/')) {
            const img = new Image();
            img.onload = () => {
              const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
              const w = Math.round(img.width * ratio);
              const h = Math.round(img.height * ratio);
              const can = document.createElement('canvas');
              can.width = w; can.height = h;
              const cx = can.getContext('2d');
              cx.drawImage(img, 0, 0, w, h);
              resolve(can.toDataURL('image/jpeg', 0.85));
            };
            img.src = url;
          } else {
            resolve(url); // for videos, we just return data URL (or you can keep as blob URL)
          }
        };
        reader.readAsDataURL(file);
      });
    },
    pingChange() { window.dispatchEvent(new Event('connect:changed')); }
  };

  const refreshFeed = () => {
    if (typeof renderFeederCards === 'function') {
      const c = document.getElementById('feed');
      if (c) renderFeederCards('feed');
    }
  };

  window.addEventListener('connect:changed', utils.debounce(refreshFeed, 250));
  document.addEventListener('DOMContentLoaded', refreshFeed);

  window.Connect = { api, utils };
})();

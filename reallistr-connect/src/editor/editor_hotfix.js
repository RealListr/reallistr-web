(function(){
  const log = (...a)=>console.log('[hotfix]', ...a);

  // -------- helpers --------
  const setToken = (t) => {
    try {
      localStorage.setItem('rl_token', t);
      localStorage.setItem('token', t);
      sessionStorage.setItem('token', t);
      document.documentElement.setAttribute('data-auth','ok');
    } catch {}
  };
  const getCode = () => {
    const qs = (s)=>document.querySelector(s);
    return (
      qs('input[name=code]')?.value?.trim() ||
      qs('input[name=token]')?.value?.trim() ||
      qs('input[type=password]')?.value?.trim() ||
      qs('input[placeholder*="code" i]')?.value?.trim() ||
      ''
    );
  };
  async function getJSON(u){
    try { const r = await fetch(u); if(!r.ok) throw r; return await r.json(); }
    catch(e){ log('fetch fail', u, e.status||e); return null; }
  }
  function hideLoginCard(){
    const el =
      document.querySelector('[class*="card"] [class*="Login"], [class*="card"] button:has(.-login-)') ||
      document.querySelector('[data-login-card], .login-card, .auth-card') ||
      document.querySelector('main section:nth-of-type(1)');
    if (el && el.parentElement) {
      (el.closest('section')||el).style.display = 'none';
    }
  }

  // -------- render Agents (same as before) --------
  function ensurePortalContainer(){
    let c = document.getElementById('portal-content');
    if(!c){
      c = document.createElement('section');
      c.id = 'portal-content';
      c.style.position = 'relative';
      c.style.zIndex = '1';
      c.style.marginTop = '24px';
      c.style.minHeight = '200px';
      c.style.padding = '16px';
      c.style.border = '1px solid rgba(0,0,0,0.08)';
      c.style.borderRadius = '12px';
      (document.querySelector('main, #root, body') || document.body).appendChild(c);
    }
    return c;
  }
  async function loadAgents(){
    let data = await getJSON('/api/agents');
    if(!Array.isArray(data)){
      data = await getJSON('/api/properties');
      if(Array.isArray(data)){
        data = data.filter(x =>
          String(x.portal||'').toLowerCase()==='agents' ||
          String(x.sector||'').toLowerCase()==='agents'
        );
      }
    }
    const c = ensurePortalContainer();
    c.innerHTML = '<h2 style="margin:0 0 12px">Agents — Properties</h2>';
    if(!Array.isArray(data) || data.length===0){
      c.insertAdjacentHTML('beforeend','<p>No agent listings yet.</p>');
      return;
    }
    const items = data.slice(0,50).map(x=>{
      const price = x.price!=null ? ` — $${(x.price.toLocaleString?.() ?? x.price)}` : '';
      return `<li style="padding:10px 12px;border:1px solid rgba(0,0,0,.06);border-radius:10px;margin-bottom:10px">
        ${x.address||'Address'}${x.suburb?`, ${x.suburb}`:''}${x.state?`, ${x.state}`:''}${price}
      </li>`;
    }).join('');
    c.insertAdjacentHTML('beforeend', `<ul style="list-style:none;margin:0;padding:0">${items}</ul>`);
  }

  // -------- stop the bounce & handle login ourselves --------
  // 1) intercept ALL submits (capturing) and clicks on a Login button
  document.addEventListener('submit', async (e)=>{
    const f = e.target;
    if (!(f instanceof HTMLFormElement)) return;
    const hasCode = f.querySelector('input[type=password], input[name=code], input[placeholder*="code" i]');
    if (!hasCode) return;           // not the login form
    e.preventDefault(); e.stopPropagation();

    const raw = getCode();
    if(!raw){ alert('Enter access code'); return; }

    const res = await getJSON(`/api/tokens/${encodeURIComponent(raw)}`);
    if(!res || res.ok===false){ alert('Invalid code'); return; }

    setToken(raw);
    hideLoginCard();
    await loadAgents();
  }, true);

  document.addEventListener('click', async (e)=>{
    const el = e.target && (e.target.closest('button') || e.target.closest('a'));
    if(!el) return;
    if (!/login/i.test(el.textContent||'')) return;
    // treat as login click
    e.preventDefault(); e.stopPropagation();
    const raw = getCode();
    if(!raw){ alert('Enter access code'); return; }

    const res = await getJSON(`/api/tokens/${encodeURIComponent(raw)}`);
    if(!res || res.ok===false){ alert('Invalid code'); return; }

    setToken(raw);
    hideLoginCard();
    await loadAgents();
  }, true);

  // 2) if token already present, skip login UI and load
  const existing = (localStorage.getItem('rl_token') || localStorage.getItem('token') || '').trim();
  if (existing) {
    setToken(existing);
    hideLoginCard();
    // Defer so DOM is painted
    setTimeout(loadAgents, 50);
  }
})();

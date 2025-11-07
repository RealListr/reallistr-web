(function(){
  if (!window.RL_Translation) { console.warn("RL_Translation missing"); return; }
  const $ = (id)=>document.getElementById(id);

  // Endpoint: local vs Codespaces
  let endpoint = "http://127.0.0.1:8787/translate";
  const h = location.hostname;
  if (h.endsWith(".app.github.dev")) {
    endpoint = "https://" + h.replace(/-\d+\.app\.github\.dev$/, "-8787.app.github.dev") + "/translate";
  }

  // Dropdown -> target codes
  const MAP = {
    "en": [],
    "en+zh": ["zh"],
    "en+zh-HANT": ["zh-HANT"],
    "en+vi": ["vi"],
    "en+ar": ["ar"],
    "en+hi": ["hi"],
    "en+pa": ["pa"]      // Punjabi -> proxy will fallback if needed
  };

  // Apply base policy once
  const pol = window.RL_Translation.getPolicy();
  pol.api = { endpoint, source_lang: "EN" };
  pol.currencyContext = "AU";
  window.RL_Translation.setPolicy(pol);

  // Helpers
  const label = (code)=>({
    "zh":"中文","zh-HANT":"中文（繁體）","vi":"Tiếng Việt",
    "ar":"العربية","hi":"हिंदी","pa":"ਪੰਜਾਬੀ"
  }[code] || code.toUpperCase());

  function currentItem(){
    const txt = id => ( $(id)?.value || "" ).trim();
    const hi  = Array.from(document.querySelectorAll(".hi"))
                  .map(i=> (i.value||"").trim())
                  .filter(Boolean).slice(0,6);
    return {
      title:   txt("a-title"),
      price:   txt("a-price"),
      address: txt("a-address"),
      info:    txt("a-info"),
      highlights: hi
    };
  }

  function ensureSlot(){
    const body = document.querySelector("#feed .listing-body");
    if (!body) return null;
    let slot = body.querySelector("#mirror-slot");
    if (!slot){ slot = document.createElement("div"); slot.id = "mirror-slot"; body.appendChild(slot); }
    return slot;
  }

  // Core: render mirrors under the English card
  async function renderMirrors(){
    const slot = ensureSlot(); if (!slot) return;
    const p = window.RL_Translation.getPolicy();
    const tgts = p.targets || [];
    if (!tgts.length){ slot.innerHTML = ""; return; }

    try {
      const mirrors = await window.RL_Translation.makeMirrors(currentItem());
      let html = "";
      for (const lang of tgts){
        const m = mirrors[lang] || {};
        html += `<div class="tr" style="margin-top:10px"><b>${label(lang)}</b></div>`;
        if (m.title)    html += `<div class="tr" style="margin-top:4px">${m.title}</div>`;
        if (m.price || m.address)
          html += `<div class="tr"><b>${m.price||""}</b>${(m.price&&m.address)?" — ":""}${m.address||""}</div>`;
        if (m.highlights?.length)
          html += `<div class="chips" style="margin-top:6px">${m.highlights.map(h=>`<span class="chip">${h}</span>`).join("")}</div>`;
        if (m.description)
          html += `<p class="tr" style="margin-top:6px">${m.description}</p>`;
      }
      slot.innerHTML = html;
    } catch (e) {
      console.warn("mirror render failed", e);
    }
  }
  window.__renderMirrors = renderMirrors; // for console debugging

  // Keep mirrors in sync with the dropdown
  const dd = $("lang-mode");
  function applyLang(){
    const p = window.RL_Translation.getPolicy();
    p.targets = MAP[dd?.value || "en"] || [];
    window.RL_Translation.setPolicy(p);
    renderMirrors();
  }
  if (dd) dd.addEventListener("change", applyLang);

  // Re-render mirrors whenever the feed DOM changes (after English card re-renders)
  const feed = document.getElementById("feed");
  if (feed){
    const mo = new MutationObserver(()=> { renderMirrors(); });
    mo.observe(feed, { childList: true, subtree: true });
  }

  // Also re-render mirrors when typing
  const ids = ["a-title","a-price","a-address","a-info"];
  ids.forEach(id=>{
    const el = $(id); if (!el) return;
    ["input","change","blur"].forEach(ev=> el.addEventListener(ev, renderMirrors));
  });
  document.querySelectorAll(".hi").forEach(inp=>{
    ["input","change","blur"].forEach(ev=> inp.addEventListener(ev, renderMirrors));
  });

  // Initial
  applyLang();
  // Render once on load (in case the feed is already present)
  renderMirrors();

  console.log("[RL] config ready", window.RL_Translation.getPolicy());
})();

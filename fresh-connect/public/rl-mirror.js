(function(){
  if (!window.RL_Translation) { console.warn("translate-layer missing"); return; }
  const $ = (id)=>document.getElementById(id);

  // Endpoint: local vs Codespaces
  let endpoint = "http://127.0.0.1:8787/translate";
  const h = location.hostname;
  if (h.endsWith(".app.github.dev")) {
    endpoint = "https://" + h.replace(/-\d+\.app\.github\.dev$/, "-8787.app.github.dev") + "/translate";
  }
  const pol = window.RL_Translation.getPolicy();
  pol.api = { endpoint, source_lang:"EN" };
  pol.currencyContext = "AU";
  window.RL_Translation.setPolicy(pol);

  // Dropdown -> translation targets
  const MAP = {
    "en": [],
    "en+zh": ["zh"],
    "en+zh-HANT": ["zh-HANT"],
    "en+vi": ["vi"],
    "en+ar": ["ar"],
    "en+hi": ["hi"],
    "en+pa": ["pa"]
  };
  const label = (code)=>({ "zh":"中文", "zh-HANT":"中文（繁體）", "vi":"Tiếng Việt", "ar":"العربية", "hi":"हिंदी", "pa":"ਪੰਜਾਬੀ" }[code] || code);

  function readDraft(){
    const hi = Array.from(document.querySelectorAll(".hi")).map(i=>i.value.trim()).filter(Boolean).slice(0,6);
    return {
      title: $("a-title")?.value.trim() || "",
      price: $("a-price")?.value.trim() || "",
      address: $("a-address")?.value.trim() || "",
      info: $("a-info")?.value.trim() || "",
      highlights: hi
    };
  }

  async function renderMirrors(){
    const feed = $("feed"); if (!feed) return;
    const body = feed.querySelector(".listing-body"); if (!body) return;
    let slot = body.querySelector("#mirror-slot");
    if (!slot) { slot = document.createElement("div"); slot.id = "mirror-slot"; body.appendChild(slot); }

    const p = window.RL_Translation.getPolicy();
    p.targets = MAP[$("lang-mode")?.value || "en"] || [];
    window.RL_Translation.setPolicy(p);

    if (!p.targets.length) { slot.innerHTML = ""; return; }

    try {
      const mirrors = await window.RL_Translation.makeMirrors(readDraft());
      let html = "";
      for (const tgt of p.targets) {
        const m = mirrors[tgt]; if (!m) continue;
        html += `<div class="tr" style="margin-top:10px"><b>${label(tgt)}</b></div>`;
        if (m.title)   html += `<div class="tr" style="margin-top:4px">${m.title}</div>`;
        if (m.price || m.address)
          html += `<div class="tr"><b>${m.price||""}</b>${(m.price&&m.address)?" — ":""}${m.address||""}</div>`;
        if (Array.isArray(m.highlights) && m.highlights.length)
          html += `<div class="chips" style="margin-top:6px">${m.highlights.map(h=>`<span class="chip">${h}</span>`).join("")}</div>`;
        if (m.description) html += `<p class="tr" style="margin-top:6px">${m.description}</p>`;
      }
      slot.innerHTML = html;
    } catch(e){ console.warn("mirror render failed", e); }
  }

  // Re-render on dropdown + typing + feed DOM changes
  $("lang-mode")?.addEventListener("change", renderMirrors);
  ["a-title","a-price","a-address","a-info"].forEach(id => $(id)?.addEventListener("input", renderMirrors));
  document.querySelectorAll(".hi").forEach(i => i.addEventListener("input", renderMirrors));
  const mo = new MutationObserver(()=>renderMirrors());
  $("feed") && mo.observe($("feed"), { childList:true, subtree:true });
  window.addEventListener("load", renderMirrors);
})();

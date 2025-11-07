// Minimal translation client exposed as window.RL_Translation
(function(){
  const _policy = {
    api: { endpoint: "", source_lang: "EN" },
    targets: [],                       // e.g. ["zh"], ["zh-HANT"], ["vi"], ["ar"], ["hi"], ["pa"]
    currencyContext: "AU",
    fields: { title:true, description:true, highlights:true, price:true, address:false }
  };
  const cache = new Map();             // key -> translation
  const k = (t,tgt,src)=>`${tgt}|${src}|${t}`;

  function getPolicy(){ return JSON.parse(JSON.stringify(_policy)); }
  function setPolicy(p){ Object.assign(_policy, p||{}); }

  async function _translateMany(texts, target, source){
    const ep = _policy.api?.endpoint;
    if (!ep) throw new Error("translate_endpoint_missing");
    // split: cache hits vs misses
    const out = new Array(texts.length);
    const miss = [], idx = [];
    texts.forEach((t,i)=>{
      const key = k(t,target,source);
      if (cache.has(key)) out[i] = cache.get(key);
      else { miss.push(t); idx.push(i); }
    });
    if (miss.length){
      const r = await fetch(ep, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ texts: miss, target_lang: target, source_lang: source })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || `translate_${r.status}`);
      (data.translations||[]).forEach((txt,j)=>{
        const i = idx[j]; const key = k(miss[j], target, source);
        cache.set(key, txt); out[i] = txt;
      });
    }
    return out;
  }

  async function makeMirrors(item){
    const src = (_policy.api?.source_lang || "EN").toUpperCase();
    const result = {};
    const piecesTemplate = (it)=> {
      const p = []; const map = [];
      if (_policy.fields.title)       { map.push("title");       p.push(String(it.title||"")); }
      if (_policy.fields.description) { map.push("description"); p.push(String(it.info||"")); }
      if (_policy.fields.highlights)  { map.push("highlights");  p.push((it.highlights||[]).filter(Boolean).join(" • ")); }
      if (_policy.fields.price)       { map.push("price");       p.push(String(it.price||"")); }
      if (_policy.fields.address)     { map.push("address");     p.push(String(it.address||"")); }
      return { map, p };
    };

    for (const tgtRaw of (_policy.targets||[])) {
      const tgt = tgtRaw.toUpperCase();            // ex: ZH, ZH-HANT, VI, AR, HI, PA
      const { map, p } = piecesTemplate(item);
      if (!p.length) { result[tgtRaw] = {}; continue; }
      const vals = await _translateMany(p, tgt, src);
      const m = {};
      map.forEach((field,i)=>{
        let v = vals[i] || "";
        if (field==="highlights") m.highlights = v ? v.split(/[•・·]\s*/).map(s=>s.trim()).filter(Boolean) : [];
        else if (field==="price")  m.price = (_policy.currencyContext==="AU" && v) ? `${v}（澳元）` : v;
        else m[field] = v;
      });
      result[tgtRaw] = m;
    }
    return result;
  }

  function shouldTranslate(lang){ return (_policy.targets||[]).includes(lang); }

  window.RL_Translation = { getPolicy, setPolicy, makeMirrors, shouldTranslate };
})();

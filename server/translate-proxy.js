// server/translate-proxy.js
// DeepL first; fallback to LibreTranslate for a few extra languages.
// Zero-deps (Node 18+ for global fetch).

const http = require("http");

const PORT = process.env.PORT || 8787;
const API_KEY = process.env.DEEPL_API_KEY || "";
const DEEPL_URL = API_KEY.endsWith(":fx")
  ? "https://api-free.deepl.com/v2/translate"
  : "https://api.deepl.com/v2/translate";

// Fallback service for extra languages (best-effort for dev/testing)
const LT_URL = "https://libretranslate.de/translate";

// Languages we’re willing to send to fallback when DeepL doesn’t support them well
const FALLBACK = new Set(["pa"]); // Punjabi; keep others on DeepL

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function send(res, status, data) {
  cors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function bodyJson(req) {
  return new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", c => (buf += c));
    req.on("end", () => {
      try { resolve(buf ? JSON.parse(buf) : {}); }
      catch (e) { reject(e); }
    });
  });
}

async function deeplTranslate(texts, source, target) {
  const params = new URLSearchParams();
  params.append("auth_key", API_KEY);
  params.append("source_lang", source.toUpperCase());
  params.append("target_lang", target.toUpperCase());
  texts.forEach(t => params.append("text", String(t ?? "")));

  const r = await fetch(DEEPL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw Object.assign(new Error(data?.message || `deepl_${r.status}`), { status: r.status });
  }

  const out = (data.translations || []).map(o => o.text || "");
  return { translations: out, via: "deepl" };
}

async function ltTranslate(texts, source, target) {
  // LibreTranslate accepts one string per request; do them in parallel.
  const req = t => fetch(LT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: String(t ?? ""),
      source: source.toLowerCase(),
      target: target.toLowerCase(),
      format: "text"
    })
  }).then(r => r.json()).then(d => d.translatedText || "");

  const translations = await Promise.all(texts.map(req));
  return { translations, via: "fallback" };
}

http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    cors(res);
    res.writeHead(204);
    return res.end();
  }

  // Health
  if (req.url.startsWith("/health")) {
    return send(res, 200, {
      ok: true,
      message: "DeepL proxy running",
      endpoint: API_KEY ? (DEEPL_URL.includes("free") ? "deepl_free" : "deepl_pro") : "no_key",
      endpoints: { health: "/health (GET)", translate: "/translate (POST)" }
    });
  }

  // Translate
  if (req.url.startsWith("/translate") && req.method === "POST") {
    try {
      if (!API_KEY) return send(res, 500, { error: "missing_api_key" });

      const { texts = [], target_lang = "ZH", source_lang = "EN" } = await bodyJson(req);
      if (!Array.isArray(texts) || texts.length === 0) {
        return send(res, 400, { error: "texts required" });
      }

      const target = String(target_lang).toUpperCase();
      const source = String(source_lang).toUpperCase();

      // Punjabi (pa) via fallback; others go to DeepL
      const useFallback = FALLBACK.has(target.toLowerCase());

      const result = useFallback
        ? await ltTranslate(texts, source, target)
        : await deeplTranslate(texts, source, target);

      return send(res, 200, result);
    } catch (e) {
      const status = e?.status || 502;
      return send(res, status, { error: e?.message || "translate_failed" });
    }
  }

  // Not found
  return send(res, 404, { error: "not_found" });
}).listen(PORT, () => {
  console.log(`Translate proxy on :${PORT} (${DEEPL_URL})  | Punjabi fallback -> ${LT_URL}`);
});

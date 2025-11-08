// lib/translate.ts
export type TranslatePayload = {
  texts: string[];
  target_lang: string;
  source_lang?: string;
  formality?: string | null;
};

const BASE = process.env.NEXT_PUBLIC_CONN_API!; // e.g. https://<codespace>-5175.app.github.dev

export async function translateOne(text: string, target: string, source?: string) {
  const r = await fetch(`${BASE}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts: [text], target_lang: target, source_lang: source }),
    cache: "no-store",
  });
  if (!r.ok) {
    const detail = await r.text();
    throw new Error(`API ${r.status}: ${detail}`);
  }
  const j = await r.json();
  return (j.texts?.[0] ?? "") as string;
}

// lib/language.ts
export type AnalyzeKind = 'sentiment' | 'keyphrases' | 'pii' | 'summarize';

export async function analyzeText(kind: AnalyzeKind, text: string) {
  const res = await fetch(`/api/language/analyze?kind=${kind}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || err?.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// convenience extractors
export function pickSentimentScore(json: any) {
  const doc = json?.results?.documents?.[0];
  return doc?.confidenceScores ?? null; // { positive, neutral, negative }
}
export function pickKeyPhrases(json: any) {
  return json?.results?.documents?.[0]?.keyPhrases ?? [];
}
export function pickPiiRedacted(json: any) {
  return json?.results?.documents?.[0]?.redactedText ?? '';
}
export function pickAbstractiveSummary(json: any) {
  return json?.tasks?.items?.[0]?.results?.documents?.[0]?.summaries?.[0]?.text ?? '';
}

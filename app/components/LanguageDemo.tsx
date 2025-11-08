'use client';
import { useState } from 'react';
import { analyzeText, pickSentimentScore, pickKeyPhrases, pickPiiRedacted, pickAbstractiveSummary } from '@/lib/language';

export default function LanguageDemo() {
  const [text, setText] = useState('Reallistr is launching like a rocket—fantastic momentum!');
  const [mode, setMode] = useState<'sentiment'|'keyphrases'|'pii'|'summarize'>('sentiment');
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOut(null);
    try {
      const json = await analyzeText(mode, text);
      setOut(json);
    } catch (e: any) {
      setOut({ error: e.message });
    } finally {
      setLoading(false);
    }
  }

  function renderResult() {
    if (!out) return null;
    if (out.error) return <pre className="text-red-600">{out.error}</pre>;
    if (mode === 'sentiment')  return <pre>{JSON.stringify(pickSentimentScore(out), null, 2)}</pre>;
    if (mode === 'keyphrases') return <pre>{JSON.stringify(pickKeyPhrases(out), null, 2)}</pre>;
    if (mode === 'pii')        return <pre>{pickPiiRedacted(out)}</pre>;
    if (mode === 'summarize')  return <pre>{pickAbstractiveSummary(out)}</pre>;
    return <pre>{JSON.stringify(out, null, 2)}</pre>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-3">
      <h1 className="text-xl font-semibold">RealListr · Azure Language</h1>
      <textarea
        className="w-full border rounded p-2"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2 items-center">
        <select value={mode} onChange={e => setMode(e.target.value as any)} className="border rounded p-2">
          <option value="sentiment">Sentiment</option>
          <option value="keyphrases">Key Phrases</option>
          <option value="pii">PII Redaction</option>
          <option value="summarize">Summarize (async)</option>
        </select>
        <button onClick={run} disabled={loading} className="px-4 py-2 rounded bg-black text-white">
          {loading ? 'Running…' : 'Run'}
        </button>
      </div>
      <div>{renderResult()}</div>
    </div>
  );
}

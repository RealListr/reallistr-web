"use client";
import { useState } from "react";
import { translateOne } from "@/lib/translate";

export default function MainFeederCard({ defaultTarget="EN", defaultSource="EN" }) {
  const [input, setInput] = useState("Type your post here…");
  const [source, setSource] = useState(defaultSource);
  const [target, setTarget] = useState(defaultTarget);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handlePreview() {
    setBusy(true); setErr(null); setPreview(null);
    try {
      const out = await translateOne(input, target, source);
      setPreview(out);
    } catch (e:any) {
      setErr(e.message || "Failed to translate");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border rounded-2xl p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Main Feeder</h2>
        <div className="flex gap-2">
          <select value={source} onChange={e=>setSource(e.target.value)} className="border rounded p-1">
            {["EN","ZH","ES","FR","DE","JA"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span>→</span>
          <select value={target} onChange={e=>setTarget(e.target.value)} className="border rounded p-1">
            {["EN","ZH","ES","FR","DE","JA"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <textarea
        className="w-full border rounded p-2"
        rows={4}
        value={input}
        onChange={e=>setInput(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <button
          onClick={handlePreview}
          disabled={busy}
          className="rounded px-4 py-2 bg-black text-white disabled:opacity-60"
        >
          {busy ? "Translating…" : "Preview"}
        </button>
      </div>

      {preview && (
        <div className="border rounded p-3 bg-gray-50">
          <div className="text-sm text-gray-600">Translated Preview ({target})</div>
          <div className="mt-1">{preview}</div>
        </div>
      )}

      {err && <div className="text-red-600">{err}</div>}
    </div>
  );
}

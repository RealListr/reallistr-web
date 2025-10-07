"use client";
import { useEffect, useState } from "react";

function toBool(v: unknown): boolean {
  const s = String(v ?? "").toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

export default function useQuotesFlag() {
  // seed from build-time NEXT_PUBLIC var if present
  const buildTime = toBool(process.env.NEXT_PUBLIC_RL_ENABLE_QUOTES);

  const [enabled, setEnabled] = useState<boolean>(buildTime);

  useEffect(() => {
    let alive = true;
    // runtime check from /api/flags (works in preview/prod)
    fetch("/api/flags")
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (!alive || !json) return;
        // prefer RL_ENABLE_QUOTES if present; fallback keeps current
        if (json.RL_ENABLE_QUOTES != null) {
          setEnabled(toBool(json.RL_ENABLE_QUOTES));
        }
      })
      .catch(() => { /* ignore */ });
    return () => { alive = false; };
  }, []);

  return { enabled };
}

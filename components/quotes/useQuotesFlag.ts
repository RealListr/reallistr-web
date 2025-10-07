"use client";
import { useEffect, useState } from "react";

export function useQuotesFlag() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/flags")
      .then(r => r.json())
      .then(j => { if (alive) setEnabled(String(j.RL_ENABLE_QUOTES).toLowerCase() === "true"); })
      .catch(() => { if (alive) setEnabled(false); });
    return () => { alive = false; };
  }, []);
  return enabled; // null=loading
}

"use client";

export default function useQuotesFlag() {
  const raw =
    (process.env.NEXT_PUBLIC_RL_ENABLE_QUOTES ??
     process.env.RL_ENABLE_QUOTES ??
     "") as string;

  const enabled = typeof raw === "string" && raw.toLowerCase() === "true";
  return { enabled };
}

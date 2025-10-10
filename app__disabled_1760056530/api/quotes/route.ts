import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  const flag = (process.env.RL_ENABLE_QUOTES ?? "").toLowerCase() === "true";
  if (!flag) return NextResponse.json({ message: "Quotes feature disabled" }, { status: 503 });

  const body = await req.json().catch(()=>({}));
  const env = process.env.VERCEL_ENV || "unknown";
  // Persist only in preview to keep prod spotless
  if (env === "preview") {
    try {
      const path = "/tmp/quotes.json";
      let current: any[] = [];
      try { current = JSON.parse(await fs.readFile(path, "utf8")); } catch {}
      current.push({ ts: Date.now(), env, body });
      await fs.writeFile(path, JSON.stringify(current, null, 2));
    } catch { /* ignore file errors in preview */ }
  }
  return NextResponse.json({ ok: true, leadId: "demo" });
}

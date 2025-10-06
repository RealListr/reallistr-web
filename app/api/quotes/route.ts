import { NextResponse } from "next/server";
export async function POST(req: Request) {
  if (!process.env.RL_ENABLE_QUOTES || process.env.RL_ENABLE_QUOTES.toLowerCase() !== "true") {
    return NextResponse.json({ message: "Quotes feature disabled" }, { status: 503 });
  }
  const body = await req.json().catch(()=>({}));
  return NextResponse.json({ ok: true, leadId: "demo", echo: body });
}

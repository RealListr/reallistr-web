import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const flag = (process.env.RL_ENABLE_QUOTES ?? "").toLowerCase();
  if (flag !== "true") {
    return NextResponse.json({ ok:false, message:"Quotes feature disabled" }, { status: 503 });
  }
  const payload = await req.json().catch(() => ({}));
  return NextResponse.json({ ok:true, leadId:"demo", received: payload });
}

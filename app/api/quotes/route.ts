import { NextResponse } from "next/server";
const enabled = (process.env.RL_ENABLE_QUOTES ?? "false") === "true";
export async function POST(req: Request) {
  if (!enabled) return NextResponse.json({ ok:false, message:"Quotes feature disabled" }, { status: 503 });
  const payload = await req.json().catch(()=> ({}));
  return NextResponse.json({ ok:true, leadId:"demo", received: payload });
}

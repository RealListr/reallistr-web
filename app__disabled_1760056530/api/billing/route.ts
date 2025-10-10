import { NextResponse } from "next/server";
const enabled = (process.env.RL_ENABLE_SUBS ?? "false") === "true";
export async function POST() {
  if (!enabled) return NextResponse.json({ ok:false, message:"Subscriptions disabled" }, { status: 503 });
  return NextResponse.json({ ok:true, checkoutUrl:"#todo" });
}

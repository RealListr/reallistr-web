// app/api/cron/bill/route.ts
import { NextResponse } from "next/server";
import { runBillingCycle } from "@/lib/billing";

export async function POST(req: Request) {
  // Simple auth: require secret header so only your cron can call this
  const secret = req.headers.get("x-cron-secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await runBillingCycle();
  return NextResponse.json({ ok: true });
}

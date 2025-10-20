// app/api/webhooks/bpoint/route.ts
import { NextResponse } from "next/server";

// You may need Basic auth or signatures, depending on configuration.
// Confirm with your CommBank/BPOINT setup and verify here before trusting payloads.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: verify authenticity (headers / IP allow-list / secret)
    // TODO: Upsert invoice/payment record in your DB
    console.log("BPOINT webhook", JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

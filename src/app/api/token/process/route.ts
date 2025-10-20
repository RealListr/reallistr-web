// app/api/token/process/route.ts
import { NextResponse } from "next/server";
import { bpointAuthHeader, bpointUrl } from "@/lib/bpoint";

export async function POST(request: Request) {
  try {
    const { authkey } = await request.json();
    if (!authkey) return NextResponse.json({ error: "missing_authkey" }, { status: 400 });

    // Process token (creates/updates token based on authkey context)
    const resp = await fetch(
      bpointUrl(`/token/authkey/${encodeURIComponent(authkey)}/process`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
        body: JSON.stringify({})
      }
    );
    if (!resp.ok) {
      const text = await resp.text();
      console.error("process token failed", text);
      return NextResponse.json({ error: "process_token_failed" }, { status: 500 });
    }
    const data = await resp.json();
    // Normalise likely fields; exact field names can vary per config
    return NextResponse.json({
      tokenNumber: data?.token?.tokenNumber || data?.dvtoken || null,
      maskedPan: data?.token?.maskedPan || data?.maskedPan || null,
      raw: data
    });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

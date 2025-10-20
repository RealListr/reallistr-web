// app/api/pay/process/route.ts
import { NextResponse } from "next/server";
import { bpointAuthHeader, bpointUrl } from "@/lib/bpoint";

export async function POST(request: Request) {
  try {
    const { authkey } = await request.json();
    if (!authkey) return NextResponse.json({ error: "missing_authkey" }, { status: 400 });

    const resp = await fetch(
      bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/process`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
        body: JSON.stringify({}) // often empty for iframe-based processing
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      console.error("BPOINT process failed", text);
      return NextResponse.json({ error: "process_failed" }, { status: 500 });
    }

    const data = await resp.json();
    // Normalise what your UI needs
    return NextResponse.json({
      responseCode: data?.txn?.responseCode,
      receiptNumber: data?.txn?.receiptNumber,
      raw: data
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

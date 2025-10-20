// app/api/token/charge/route.ts
import { NextResponse } from "next/server";
import { bpointAuthHeader, bpointUrl } from "@/lib/bpoint";

// Require internal secret so the cron (or admin UI) can call it safely.
function isAuthorised(req: Request) {
  const s = req.headers.get("x-internal") || req.headers.get("x-cron-secret");
  return s && s === process.env.CRON_SECRET;
}

export async function POST(req: Request) {
  try {
    if (!isAuthorised(req)) return NextResponse.json({ ok: false }, { status: 401 });

    const { tokenRef, amountCents, currency = "AUD", ref = "" } = await req.json();
    if (!tokenRef || !amountCents) {
      return NextResponse.json({ error: "missing_params" }, { status: 400 });
    }

    // 1) Create TXN authkey
    const createResp = await fetch(bpointUrl("/txn/authkey"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
      body: JSON.stringify({})
    });
    if (!createResp.ok) return NextResponse.json({ error: "authkey_failed" }, { status: 500 });
    const { authkey } = await createResp.json();

    // 2) Attach txn details
    const details = {
      action: "payment",
      type: "internet",
      subType: "single",
      amount: amountCents,
      currency,
      crn1: ref || `SUB-${Date.now()}`
    };
    const attachTxn = await fetch(bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/txndetails`), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
      body: JSON.stringify(details)
    });
    if (!attachTxn.ok) return NextResponse.json({ error: "attach_txn_failed" }, { status: 500 });

    // 3) Attach payment method by Token Number (server-side)
    const attachPM = await fetch(
      bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/payment-method/token`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
        body: JSON.stringify({ tokenNumber: tokenRef })
      }
    );
    if (!attachPM.ok) {
      return NextResponse.json({ error: "attach_token_failed" }, { status: 500 });
    }

    // 4) Process transaction
    const processResp = await fetch(bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/process`), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
      body: JSON.stringify({})
    });
    if (!processResp.ok) return NextResponse.json({ error: "process_failed" }, { status: 500 });

    const data = await processResp.json();
    return NextResponse.json({
      responseCode: data?.txn?.responseCode,
      receiptNumber: data?.txn?.receiptNumber,
      raw: data
    });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

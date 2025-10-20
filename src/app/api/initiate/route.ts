// app/api/pay/initiate/route.ts
import { NextResponse } from "next/server";
import { bpointAuthHeader, bpointUrl } from "@/lib/bpoint";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Amount should come from your cart total (in cents); here we allow query override for testing
    const amountCents = Number(searchParams.get("amount") || "1000"); // $10.00 default
    const currency = "AUD";
    const crn1 = searchParams.get("ref") || "RL-ORDER-TEST-001";

    // 1) Create AuthKey
    const createResp = await fetch(bpointUrl("//txn/authkey".replace("//", "/")), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
      body: JSON.stringify({}) // typically empty
    });

    if (!createResp.ok) {
      console.error("BPOINT create authkey failed", await createResp.text());
      return NextResponse.json({ error: "authkey_failed" }, { status: 500 });
    }

    const createJson = await createResp.json() as { authkey?: string };
    const authkey = createJson?.authkey;
    if (!authkey) return NextResponse.json({ error: "no_authkey" }, { status: 500 });

    // 2) Attach Txn Details
    const details = {
      action: "payment",
      type: "internet",
      subType: "single",
      amount: amountCents,     // cents
      currency,
      crn1                     // your order reference
    };

    const attachResp = await fetch(
      bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/txndetails`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
        body: JSON.stringify(details)
      }
    );

    if (!attachResp.ok) {
      console.error("BPOINT attach details failed", await attachResp.text());
      return NextResponse.json({ error: "attach_failed" }, { status: 500 });
    }

    return NextResponse.json({ authkey });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

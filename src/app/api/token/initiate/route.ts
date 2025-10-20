// app/api/token/initiate/route.ts
import { NextResponse } from "next/server";
import { bpointAuthHeader, bpointUrl } from "@/lib/bpoint";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crn1 = searchParams.get("crn1") || "RL-CUST-TEST-001";
    // 1) Create token authkey
    const createResp = await fetch(bpointUrl("/token/authkey"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
      body: JSON.stringify({})
    });
    if (!createResp.ok) {
      return NextResponse.json({ error: "token_authkey_failed" }, { status: 500 });
    }
    const { authkey } = await createResp.json();

    // 2) Attach token details (e.g., your customer reference)
    const attachTokenResp = await fetch(
      bpointUrl(`/token/authkey/${encodeURIComponent(authkey)}/tokendetails`),
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...bpointAuthHeader() },
        body: JSON.stringify({ crn1 })
      }
    );
    if (!attachTokenResp.ok) {
      return NextResponse.json({ error: "attach_token_details_failed" }, { status: 500 });
    }
    return NextResponse.json({ authkey });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

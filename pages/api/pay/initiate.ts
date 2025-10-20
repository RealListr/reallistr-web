import type { NextApiRequest, NextApiResponse } from "next";

function authHeader() {
  const u = `${process.env.BPOINT_USER}|${process.env.BPOINT_MERCHANT}`;
  const p = process.env.BPOINT_PASS || "";
  const basic = Buffer.from(`${u}:${p}`).toString("base64");
  return { Authorization: `Basic ${basic}` };
}
function bpointUrl(path: string) {
  const base = (process.env.BPOINT_BASE_URL || "https://www.bpoint.com.au/rest").replace(/\/$/,"");
  return `${base}${path}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const amountCents = Number(req.query.amount || "1000");
    const crn1 = String(req.query.ref || "RL-ORDER-DEMO");
    const currency = "AUD";

    // DEBUG mode to prove env/route works
    if (req.query.debug === "1") {
      return res.status(200).json({
        base: bpointUrl(""),
        hasUser: !!process.env.BPOINT_USER,
        hasMerchant: !!process.env.BPOINT_MERCHANT,
        hasPass: !!process.env.BPOINT_PASS
      });
    }

    // 1) Create AuthKey
    const c = await fetch(bpointUrl("/txn/authkey"), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({})
    });
    if (!c.ok) return res.status(500).json({ stage:"create_authkey", status:c.status, text: await c.text() });
    const { authkey } = await c.json();
    if (!authkey) return res.status(500).json({ stage:"create_authkey", error:"no_authkey" });

    // 2) Attach Txn Details
    const d = await fetch(bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/txndetails`), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({
        action: "payment",
        type: "internet",
        subType: "single",
        amount: amountCents,
        currency,
        crn1
      })
    });
    if (!d.ok) return res.status(500).json({ stage:"attach_txn", status:d.status, text: await d.text() });

    res.status(200).json({ authkey });
  } catch (e: any) {
    res.status(500).json({ stage: "init_handler", error: e?.message || String(e) });
  }
}

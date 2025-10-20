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
    const { authkey } = req.body || {};
    if (!authkey) return res.status(400).json({ error: "missing_authkey" });

    const p = await fetch(bpointUrl(`/txn/authkey/${encodeURIComponent(authkey)}/process`), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({})
    });
    if (!p.ok) return res.status(500).json({ stage:"process", status:p.status, text: await p.text() });

    const data = await p.json();
    res.status(200).json({
      responseCode: data?.txn?.responseCode,
      receiptNumber: data?.txn?.receiptNumber,
      raw: data
    });
  } catch (e: any) {
    res.status(500).json({ stage: "process_handler", error: e?.message || String(e) });
  }
}

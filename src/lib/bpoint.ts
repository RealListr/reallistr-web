// lib/bpoint.ts
export function bpointAuthHeader() {
  const user = `${process.env.BPOINT_USER}|${process.env.BPOINT_MERCHANT}`;
  const pass = process.env.BPOINT_PASS || "";
  const basic = Buffer.from(`${user}:${pass}`).toString("base64");
  return { Authorization: `Basic ${basic}` };
}

export function bpointUrl(path: string) {
  const base = process.env.BPOINT_BASE_URL?.replace(/\/$/, "") || "https://www.bpoint.com.au/rest";
  return `${base}${path}`;
}

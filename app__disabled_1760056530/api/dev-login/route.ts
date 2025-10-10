import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") || "/dashboard";

  // (Optional) drop a cookie so we can gate features later if needed
  const res = NextResponse.redirect(new URL(to, url.origin));
  res.cookies.set("rl_dev", "1", { path: "/", httpOnly: false });
  return res;
}

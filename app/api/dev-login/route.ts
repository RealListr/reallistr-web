import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") || "/dashboard";
  const res = NextResponse.redirect(new URL(to, req.url));
  // 1-hour dev cookie
  res.cookies.set("rl_dev", "1", { httpOnly: true, sameSite: "lax", maxAge: 60 * 60, path: "/" });
  return res;
}

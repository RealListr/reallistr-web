import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") || "/";
  const res = NextResponse.redirect(new URL(to, url.origin));
  res.cookies.set(process.env.RL_DEV_COOKIE || "rl_auth", "ok", { httpOnly: true, maxAge: 3600, path: "/" });
  return res;
}

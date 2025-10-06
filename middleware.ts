import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  const protectedPaths = p.startsWith("/dashboard") || p.startsWith("/partners");
  if (!protectedPaths) return NextResponse.next();
  const cookieName = process.env.RL_DEV_COOKIE || "rl_auth";
  const isAuthed = req.cookies.get(cookieName)?.value === "ok";
  if (isAuthed) return NextResponse.next();
  return NextResponse.redirect(new URL("/signin", req.url));
}
export const config = { matcher: ["/dashboard/:path*", "/partners/:path*"] };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Auto-continue on preview only
  if (process.env.VERCEL_ENV === "preview" && req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

// Only run on /signin
export const config = { matcher: ["/signin"] };

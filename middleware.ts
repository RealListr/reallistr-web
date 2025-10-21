import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname === '/map' || url.pathname.startsWith('/map/')) {
    url.pathname = '/home-v2/dev';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/map', '/map/:path*'] };

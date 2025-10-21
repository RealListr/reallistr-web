import { NextResponse } from 'next/server';
import { mockPage } from '@/lib/feed/mock';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page') ?? '0');
  const kind = (url.searchParams.get('kind') ?? 'for-you') as any;
  const data = mockPage(isNaN(page) ? 0 : page, kind);
  return NextResponse.json(data);
}

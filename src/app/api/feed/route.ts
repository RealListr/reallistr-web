import { NextResponse } from 'next/server';
import { getMockPage } from '@/lib/feed/mock';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kind = (searchParams.get('kind') || 'for-you') as 'for-you'|'nearby'|'following';
  const page = Number(searchParams.get('page') || '0');
  const size = Number(searchParams.get('size') || '20');

  const data = getMockPage(kind, page, size);
  return NextResponse.json({ ok: true, page, ...data });
}

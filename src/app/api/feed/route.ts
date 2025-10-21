import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const kind = searchParams.get('kind') ?? 'for-you';

  const start = cursor ? parseInt(cursor, 10) : 0;
  const pageSize = 10;

  const items = Array.from({ length: pageSize }).map((_, i) => ({
    id: `mock-${start + i}`,
    title: `${kind} item #${start + i + 1}`,
    description: 'placeholder',
  }));

  const nextCursor = start + pageSize >= 50 ? null : String(start + pageSize);

  return NextResponse.json({ items, nextCursor });
}

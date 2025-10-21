import { NextResponse } from 'next/server';
import { getFeedPage } from '@/lib/feed/source';
import type { FeedKind } from '@/lib/feed/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(0, Number(url.searchParams.get('page') || 0));
    const kind = (url.searchParams.get('kind') || 'for-you') as FeedKind;

    const data = await getFeedPage({ page, kind });
    return NextResponse.json(data, {
      headers: { 'x-feed-page': String(data.page), 'x-feed-hasMore': String(data.hasMore) },
    });
  } catch (err) {
    return NextResponse.json({ error: 'feed_failed' }, { status: 500 });
  }
}

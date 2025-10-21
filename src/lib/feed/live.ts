import type { FeedPage, FeedKind } from './types';

/** Replace this with your real fetch/DB (Drizzle, Supabase, etc.) */
export async function getLiveFeed(page: number, kind: FeedKind): Promise<FeedPage> {
  // Example: const res = await fetch(`${process.env.FEED_URL}/feed?page=${page}&kind=${kind}`, { cache: 'no-store' });
  // return await res.json();
  return { items: [], page, hasMore: false, kind }; // safe stub
}

import type { FeedPage, FeedKind, FeedItem } from './types';

function mk(n: number, kind: FeedKind): FeedItem {
  return {
    id: `mock-${n}`,
    title: `Listing #${n}`,
    price: `$${(500_000 + n * 1_000).toLocaleString()}`,
    address: `${100 + n} Market St`,
    description: `Spacious 2–4 br · updated kitchen · great light`,
    badges: [kind.replace('-', ' ')],
    media: [{ thumbUrl: `https://picsum.photos/seed/${kind}-${n}/640/480` }],
  };
}

export async function getMockFeed(page: number, kind: FeedKind): Promise<FeedPage> {
  const start = page * 20;
  const end = start + 20;
  const items = Array.from({ length: 20 }, (_, i) => mk(start + i + 1, kind));
  // simulate latency
  await new Promise(r => setTimeout(r, 200));
  return { items, page, hasMore: end < 200, kind };
}

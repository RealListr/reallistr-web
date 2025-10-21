import { getMockFeed } from './mock';
import { getLiveFeed } from './live';
import type { FeedPage, FeedKind } from './types';

const SOURCE = (process.env.FEED_SOURCE || 'mock').toLowerCase(); // 'mock' | 'live'

export async function getFeedPage({ page, kind }: { page: number; kind: FeedKind }): Promise<FeedPage> {
  if (SOURCE === 'live') return getLiveFeed(page, kind);
  return getMockFeed(page, kind);
}

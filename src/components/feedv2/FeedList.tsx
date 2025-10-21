'use client';
import type { FeedKind } from '@/lib/feed/types';
import { useInfiniteFeed } from '@/hooks/useInfiniteFeed';
import FeedCard from './FeedCard';

export default function FeedList({ kind }: { kind: FeedKind }) {
  const { items, loading, done, refresh, sentinelRef } = useInfiniteFeed(kind);

  return (
    <div>
      {/* Pull to refresh (simple button in preview) */}
      <div className="text-xs text-gray-500 mb-3">
        <button onClick={() => void refresh()} className="underline">Pull to refresh</button>
        <span className="mx-2">•</span> Infinite scroll <span className="mx-1">•</span> <span className="italic">{kind}</span>
      </div>

      {items.map((it) => (<FeedCard key={it.id} item={it} />))}

      {/* Sentinel */}
      <div ref={sentinelRef} />

      {/* Footer states */}
      {loading && <div className="py-6 text-center text-sm text-gray-500">Loading…</div>}
      {done && <div className="py-6 text-center text-sm text-gray-400">You’re all caught up</div>}
    </div>
  );
}

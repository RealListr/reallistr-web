'use client';
import { useEffect, useRef } from 'react';
import FeedCard from './FeedCard';
import { useInfiniteFeed } from '@/hooks/useInfiniteFeed';
import { useSearchParams } from 'next/navigation';
import type { FeedKind } from '@/lib/feed/types';

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="mb-3 h-4 w-28 animate-pulse rounded bg-neutral-200" />
      <div className="mb-4 h-44 w-full animate-pulse rounded-xl bg-neutral-200" />
      <div className="mb-2 h-4 w-40 animate-pulse rounded bg-neutral-200" />
      <div className="mb-3 h-3 w-64 animate-pulse rounded bg-neutral-200" />
      <div className="flex gap-2">
        <div className="h-5 w-14 animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  );
}

export default function FeedList() {
  const sp = useSearchParams();
  const kind = (sp.get('tab') as FeedKind) || 'for-you';
  const { pages, isLoading, loadMore, hasMore } = useInfiniteFeed({ kind });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) loadMore();
      },
      { rootMargin: '1200px 0px 800px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, isLoading, loadMore]);

  const safePages = Array.isArray(pages) ? pages : [];
  const items = safePages.flatMap((p) => p.items ?? []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => <FeedCard key={item.id} item={item} />)}
      {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
      <div ref={sentinelRef} />
      {!hasMore && !isLoading && (
        <div className="col-span-full py-8 text-center text-sm text-neutral-500">You’re all caught up 🎉</div>
      )}
    </div>
  );
}

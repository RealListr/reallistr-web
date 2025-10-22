'use client';
import { useEffect, useRef } from 'react';
import FeedCard from './FeedCard';
import { useInfiniteFeed } from '@/hooks/useInfiniteFeed';

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

export default function FeedList({ kind }: { kind: 'for-you' | 'nearby' | 'following' }) {
  const { pages, isLoading, loadMore, hasMore } = useInfiniteFeed({ kind });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && hasMore && !isLoading) loadMore();
      },
      { rootMargin: '1200px 0px 800px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, isLoading, loadMore]);

  const safePages = Array.isArray(pages) ? pages : [];
  const items = safePages.flatMap((p: any) => p?.items ?? []);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item: any) => (
        <FeedCard key={item.id} item={item} />
      ))}

      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}

      <div ref={sentinelRef} className="col-span-full h-1" />
      {!hasMore && !isLoading && (
        <div className="col-span-full py-8 text-center text-sm text-neutral-500">
          You’re all caught up 🎉
        </div>
      )}
    </div>
  );
}

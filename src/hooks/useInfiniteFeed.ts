'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type Page<T> = { items: T[]; page: number; hasMore: boolean };

export function useInfiniteFeed<T>({ kind }: { kind: 'for-you'|'nearby'|'following' }) {
  const [pages, setPages] = useState<Page<T>[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const inflight = useRef<Promise<any> | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const p = page;
      const res = await fetch(`/api/feed?page=${p}&kind=${kind}`, { cache: 'no-store' });
      const data = await res.json();
      setPages(prev => [...prev, data]);
      setPage(p + 1);
      setHasMore(Boolean(data?.hasMore));
    } catch (e) {
      console.error('[useInfiniteFeed] load error', e);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, kind]);

  useEffect(() => {
    // reset when kind changes
    setPages([]);
    setPage(0);
    setHasMore(true);
  }, [kind]);

  // initial page
  useEffect(() => {
    if (!inflight.current) {
      inflight.current = (async () => { await loadMore(); inflight.current = null; })();
    }
  }, [loadMore]);

  return { pages, isLoading, hasMore, loadMore };
}

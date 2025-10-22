'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Kind = 'for-you'|'nearby'|'following';
type Page = { items: any[]; hasMore: boolean };

export function useInfiniteFeed({ kind }: { kind: Kind }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const inFlight = useRef(false);

  const load = useCallback(async (p: number) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/feed?kind=${kind}&page=${p}`, { cache: 'no-store' });
      const json = await res.json();
      const next: Page = { items: json.items ?? [], hasMore: !!json.hasMore };
      setPages(prev => (p === 0 ? [next] : [...prev, next]));
      setHasMore(!!json.hasMore);
    } catch (e) {
      // keep UI alive even if fetch fails
      setHasMore(false);
      console.error('feed load error', e);
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  }, [kind]);

  // first page
  useEffect(() => {
    setPages([]); setPage(0); setHasMore(true);
    load(0);
  }, [kind, load]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    const next = page + 1;
    setPage(next);
    load(next);
  }, [hasMore, isLoading, page, load]);

  return useMemo(() => ({ pages, isLoading, loadMore, hasMore }), [pages, isLoading, loadMore, hasMore]);
}

'use client';
import { useCallback, useEffect, useState } from 'react';

type FeedPage = { items: any[] };
type Args = { kind: 'for-you' | 'nearby' | 'following' };

export function useInfiniteFeed({ kind }: Args) {
  const [pages, setPages] = useState<FeedPage[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPages([]);
    setCursor(null);
    setHasMore(true);
  }, [kind]);

  const fetchPage = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (cursor) params.set('cursor', cursor);
      params.set('kind', kind);

      const res = await fetch(`/api/feed?${params.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('feed request failed');

      const data = await res.json(); // { items: any[]; nextCursor?: string | null }
      const items = Array.isArray(data?.items) ? data.items : [];
      setPages((prev) => [...prev, { items }]);
      setCursor(data?.nextCursor ?? null);
      setHasMore(Boolean(data?.nextCursor));
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, kind]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pages.length === 0 && !isLoading) void fetchPage();
  }, [fetchPage, pages.length, isLoading]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) void fetchPage();
  }, [fetchPage, hasMore, isLoading]);

  return { pages, isLoading, loadMore, hasMore };
}

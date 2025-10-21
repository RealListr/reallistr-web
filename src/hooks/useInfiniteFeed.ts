'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FeedKind, Listing } from '@/lib/feed/types';
import { loadMockPage } from '@/lib/feed/mock';

export function useInfiniteFeed(kind: FeedKind) {
  const [items, setItems] = useState<Listing[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const load = useCallback(async () => {
    if (loading || done) return;
    setLoading(true);
    const page = await loadMockPage(kind, cursor);
    setItems(prev => [...prev, ...page.items]);
    setCursor(page.nextCursor);
    setDone(page.nextCursor === null);
    setLoading(false);
  }, [kind, cursor, loading, done]);

  const refresh = useCallback(async () => {
    setItems([]);
    setCursor(null);
    setDone(false);
  }, []);

  // Auto-load first page
  useEffect(() => { setItems([]); setCursor(null); setDone(false); }, [kind]);
  useEffect(() => { if (items.length === 0 && !loading && !done) { void load(); } }, [items.length, loading, done, load]);

  // Sentinel observer for infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e.isIntersecting) void load();
    }, { rootMargin: '900px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [load, sentinelRef.current]);

  return useMemo(() => ({
    items, loading, done, load, refresh, sentinelRef
  }), [items, loading, done, load, refresh]);
}

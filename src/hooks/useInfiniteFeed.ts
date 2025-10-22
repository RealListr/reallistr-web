import { useCallback, useEffect, useRef, useState } from 'react';
type Item = { id: string };

export function useInfiniteFeed({ kind }: { kind: 'for-you'|'nearby'|'following' }) {
  const pageRef = useRef(1);
  const [pages, setPages] = useState<{ items: Item[] }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const seen = useRef<Set<string>>(new Set());

  const load = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await fetch(`/api/feed?tab=${kind}&page=${pageRef.current}`);
    const json = await res.json();

    // dedupe across pages
    const fresh = (json.items || []).filter((it: Item) => {
      if (seen.current.has(it.id)) return false;
      seen.current.add(it.id);
      return true;
    });

    setPages((p) => [...p, { items: fresh }]);
    setHasMore(Boolean(json.nextPage));
    if (json.nextPage) pageRef.current = json.nextPage;
    setLoading(false);
  }, [kind, loading, hasMore]);

  useEffect(() => { // reset when tab changes
    pageRef.current = 1; setPages([]); setHasMore(true); seen.current.clear();
    load();
  }, [kind]);

  return { pages, isLoading: loading, hasMore, loadMore: load };
}

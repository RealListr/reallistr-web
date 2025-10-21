'use client';
import { useEffect, useRef, useState } from 'react';
import FeedCardSkeleton from './FeedCardSkeleton';

type TabKey = 'trending' | 'fresh' | 'underground';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'trending', label: 'Trending' },
  { key: 'fresh', label: 'Fresh' },
  { key: 'underground', label: 'Underground' },
];

export default function FeedShell() {
  const [tab, setTab] = useState<TabKey>(() => {
    if (typeof window === 'undefined') return 'trending';
    return (sessionStorage.getItem('feed.tab') as TabKey) || 'trending';
  });

  // preserve scroll for each tab
  const scrollPos = useRef<Record<TabKey, number>>({ trending: 0, fresh: 0, underground: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = sessionStorage.getItem('feed.scroll');
    if (saved) scrollPos.current = JSON.parse(saved);
    window.scrollTo(0, scrollPos.current[tab] || 0);
  }, [tab]);

  useEffect(() => {
    const onScroll = () => {
      scrollPos.current[tab] = window.scrollY;
      sessionStorage.setItem('feed.scroll', JSON.stringify(scrollPos.current));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tab]);

  // fake pager for UX (we’ll wire real API in Pass 2)
  const [page, setPage] = useState(1);
  useEffect(() => {
    const onBottom = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 600;
      if (nearBottom) setPage((p) => Math.min(p + 1, 10));
    };
    window.addEventListener('scroll', onBottom, { passive: true });
    return () => window.removeEventListener('scroll', onBottom);
  }, []);

  // persist selected tab
  useEffect(() => {
    if (typeof window !== 'undefined') sessionStorage.setItem('feed.tab', tab);
  }, [tab]);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold mb-2">RealListr</h1>

      <div className="sticky top-0 z-10 -mx-4 mb-4 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-3xl px-4 py-3 flex gap-2">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                tab === t.key
                  ? 'bg-black text-white'
                  : 'bg-black/5 hover:bg-black/10 text-black/80'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* placeholder cards */}
      {Array.from({ length: page * 6 }).map((_, i) => (
        <FeedCardSkeleton key={`${tab}-${i}`} />
      ))}

      <div className="py-8 text-center text-sm text-black/50">
        Pull to refresh • Infinite scroll stub • {tab}
      </div>
    </main>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';

type Tab = 'for-you' | 'nearby' | 'following';

export default function FeedV2() {
  const [tab, setTab] = useState<Tab>('for-you');
  const scroll = useRef<Record<Tab, number>>({ 'for-you':0, nearby:0, following:0 });

  useEffect(() => {
    const saved = sessionStorage.getItem('feedv2.scroll');
    if (saved) scroll.current = JSON.parse(saved);
    window.scrollTo(0, scroll.current[tab] || 0);
  }, [tab]);

  useEffect(() => {
    const onScroll = () => {
      scroll.current[tab] = window.scrollY;
      sessionStorage.setItem('feedv2.scroll', JSON.stringify(scroll.current));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tab]);

  const [pages, setPages] = useState(1);
  useEffect(() => {
    const onBottom = () => {
      const near = window.innerHeight + window.scrollY > document.body.offsetHeight - 600;
      if (near) setPages(p => Math.min(p + 1, 10));
    };
    window.addEventListener('scroll', onBottom, { passive: true });
    return () => window.removeEventListener('scroll', onBottom);
  }, []);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <header className="mb-3">
        <h1 className="text-3xl font-semibold">RealListr</h1>
        <p className="text-sm opacity-60">Feed V2 (preview-only)</p>
      </header>

      <div className="sticky top-0 z-10 -mx-4 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3 flex gap-2">
          {(['for-you','nearby','following'] as Tab[]).map(k => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={k===tab ? 'px-3 py-1.5 rounded-full bg-black text-white'
                                 : 'px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10'}
            >
              {k === 'for-you' ? 'For You' : k[0].toUpperCase()+k.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skeleton cards only (we’ll replace with real cards/data next) */}
      {Array.from({ length: pages * 6 }).map((_, i) => (
        <div key={`${tab}-${i}`} className="rounded-2xl border border-black/5 bg-white shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-full bg-black/10 animate-pulse" />
            <div className="flex-1">
              <div className="h-3 w-28 bg-black/10 rounded animate-pulse mb-1" />
              <div className="h-2 w-40 bg-black/10 rounded animate-pulse" />
            </div>
            <div className="h-6 w-20 bg-black/10 rounded-full animate-pulse" />
          </div>
          <div className="h-48 w-full rounded-xl bg-black/10 animate-pulse mb-3" />
          <div className="flex gap-3">
            <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
            <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
            <div className="h-6 w-12 bg-black/10 rounded animate-pulse" />
          </div>
        </div>
      ))}

      <div className="py-8 text-center text-sm text-black/50">Preview build • {tab}</div>
    </main>
  );
}

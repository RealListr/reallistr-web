'use client';
import { useState } from 'react';
import FeedList from './FeedList';

type Tab = 'for-you' | 'nearby' | 'following';
const TABS: { id: Tab; label: string }[] = [
  { id: 'for-you', label: 'For You' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'following', label: 'Following' },
];

export default function FeedV2() {
  const [tab, setTab] = useState<Tab>('for-you');

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24">
      <header className="sticky top-0 z-10 -mx-4 border-b bg-white/80 px-4 py-3 backdrop-blur">
        <h1 className="text-2xl font-bold">RealListr</h1>
        <p className="mt-1 text-xs text-neutral-500">Feed V2 (preview-only)</p>

        <nav className="mt-3 flex gap-2">
          {TABS.map(({ id, label }) => {
            const active = id === tab;
            return (
              <button
                key={id}
                className={[
                  'rounded-full border px-3 py-1 text-sm',
                  active ? 'bg-black text-white border-black' : 'hover:bg-neutral-50',
                ].join(' ')}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-2 text-[11px] text-neutral-500">Pull to refresh • Infinite scroll • {tab}</div>
      </header>

      <section className="mt-4">
        <FeedList kind={tab} />
      </section>
    </main>
  );
}

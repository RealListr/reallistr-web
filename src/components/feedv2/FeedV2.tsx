'use client';
import { useState } from 'react';
import type { FeedKind } from '@/lib/feed/types';
import { FeedTabs } from './FeedTabs';
import FeedList from './FeedList';

export default function FeedV2() {
  const [tab, setTab] = useState<FeedKind>('for-you');

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-3xl font-extrabold tracking-tight">RealListr</h1>
      <div className="mt-1 text-sm text-gray-500">Feed V2 (preview-only)</div>

      <FeedTabs value={tab} onChange={setTab} />

      <section className="mt-4">
        <FeedList kind={tab} />
      </section>
    </main>
  );
}

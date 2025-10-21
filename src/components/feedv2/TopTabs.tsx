'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FeedKind } from '@/lib/feed/types';

const tabs: { key: FeedKind; label: string }[] = [
  { key: 'for-you', label: 'For You' },
  { key: 'nearby', label: 'Nearby' },
  { key: 'following', label: 'Following' },
];

export default function TopTabs() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = (sp.get('tab') as FeedKind) || 'for-you';

  function setTab(next: FeedKind) {
    const u = new URL(window.location.href);
    u.searchParams.set('tab', next);
    u.searchParams.delete('page'); // reset pagination on tab change
    router.replace(`${pathname}?${u.searchParams.toString()}`);
  }

  return (
    <div className="mb-3 flex gap-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => setTab(t.key)}
          className={`rounded-full px-3 py-1 text-sm ${t.key === active ? 'bg-black text-white' : 'bg-neutral-100'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

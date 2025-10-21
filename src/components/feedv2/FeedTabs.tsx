'use client';
import type { FeedKind } from '@/lib/feed/types';

const tabs: { key: FeedKind; label: string }[] = [
  { key: 'for-you', label: 'For You' },
  { key: 'nearby', label: 'Nearby' },
  { key: 'following', label: 'Following' },
];

export function FeedTabs({ value, onChange }: { value: FeedKind; onChange: (v: FeedKind)=>void }) {
  return (
    <div className="flex gap-2 mt-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-full border px-3 py-1 text-sm ${value === t.key ? 'bg-black text-white' : 'bg-white'}`}
          aria-pressed={value === t.key}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

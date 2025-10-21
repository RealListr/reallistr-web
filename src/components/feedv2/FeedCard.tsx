'use client';
import type { FeedItem } from '@/lib/feed/mock';

export default function FeedCard({ item }: { item: Partial<FeedItem> }) {
  const title = item?.title ?? 'Untitled listing';
  const desc  = item?.description ?? '';
  const price = item?.price ?? '';
  const addr  = item?.address ?? '';
  const tags  = item?.tags ?? [];

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-4 hover:shadow-sm transition">
      <div className="mb-1 text-base font-semibold line-clamp-1">{title}</div>
      {price && <div className="text-sm font-medium">{price}</div>}
      {addr && <div className="text-xs text-neutral-500">{addr}</div>}
      {desc && <div className="mt-2 text-sm text-neutral-700 line-clamp-2">{desc}</div>}
      {!!tags.length && (
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map((t, i) => (
            <span key={i} className="rounded-full border px-2 py-0.5 text-xs text-neutral-600">
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

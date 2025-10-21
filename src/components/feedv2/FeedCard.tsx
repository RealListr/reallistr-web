'use client';
import Image from 'next/image';
import type { FeedItem } from '@/lib/feed/types';

export default function FeedCard({ item }: { item: FeedItem }) {
  const img = item.media?.[0]?.thumbUrl;
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">{item.title}</h3>
        {item.price && <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs text-white">{item.price}</span>}
      </div>

      <div className="mb-3 overflow-hidden rounded-xl">
        {img ? (
          <Image
            src={img}
            alt={item.title}
            width={640}
            height={480}
            className="aspect-[4/3] w-full object-cover"
            priority={false}
          />
        ) : (
          <div className="aspect-[4/3] w-full rounded-xl bg-neutral-100" />
        )}
      </div>

      {item.address && <div className="mb-1 text-sm text-neutral-700">{item.address}</div>}
      {item.description && <div className="mb-2 text-sm text-neutral-500">{item.description}</div>}

      {item.badges?.length ? (
        <div className="flex flex-wrap gap-2">
          {item.badges.map((b, i) => (
            <span key={i} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700">
              {b}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

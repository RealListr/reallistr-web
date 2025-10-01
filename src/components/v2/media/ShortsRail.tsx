'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Short } from '@/types/media';

type Props = {
  items: Short[];
  className?: string;
};

export default function ShortsRail({ items, className }: Props) {
  const base = "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4";
  return (
    <section className={className ? `${base} ${className}` : base} aria-label="ListrShorts">
      {items.map((s, i) => (
        <Link
          key={s.id ?? i}
          href={s.href ?? '#'}
          className="group relative overflow-hidden rounded-xl border"
        >
          <Image
            src={s.thumb ?? '/placeholders/short.jpg'}
            alt={s.title ?? 'Short'}
            width={480}
            height={800}
            className="h-48 w-full object-cover"
            priority={false}
          />
          <div className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-xs text-white">
            {s.duration ?? '0:30'}
          </div>
          <div className="truncate p-2 text-sm font-medium">{s.title ?? 'Short'}</div>
        </Link>
      ))}
    </section>
  );
}

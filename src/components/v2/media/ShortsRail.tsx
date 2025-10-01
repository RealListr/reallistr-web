'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Short } from '@/types/media';

export default function ShortsRail({ items }: { items: Short[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((s, i) => (
        <Link
          key={String(s.id ?? i)}
          href={s.href ?? '#'}
          className="group relative overflow-hidden rounded-xl border"
        >
          <div className="relative aspect-[9/16] bg-muted">
            <Image
              src={s.thumb ?? '/placeholders/apt-1.jpg'}
              alt={s.title ?? 'Short'}
              fill
              className="object-cover transition group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, 220px"
            />
            <span className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {s.duration ? `${Math.round(s.duration)}s` : 'Short'}
            </span>
          </div>
          <div className="truncate px-2 py-2 text-sm">{s.title ?? 'Untitled'}</div>
        </Link>
      ))}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Mic } from 'lucide-react';
import type { Pod } from '@/types/media';

type Props = {
  items: Pod[];
  className?: string;
};

export default function PodsRail({ items, className }: Props) {
  const base = "grid gap-3 sm:grid-cols-2";
  return (
    <section className={className ? `${base} ${className}` : base} aria-label="ListrPods">
      {items.map(p => (
        <Link
          key={p.id ?? i}
          href={p.href ?? '#'}
          className="group flex items-center gap-3 rounded-xl border p-3 hover:bg-accent"
        >
          <div className="flex size-10 items-center justify-center rounded-full border">
            <Mic className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {p.title ?? 'Podcast'}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {p.length ?? '2:00'} • {p.host ?? 'Agent'}
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

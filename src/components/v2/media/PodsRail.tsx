'use client';

import Link from 'next/link';
import type { Pod } from '@/types/media';

type Props = {
  items: Pod[];
  className?: string;
};

export default function PodsRail({ items, className }: Props) {
  const base = 'space-y-3';
  return (
    <section className={className ? `${base} ${className}` : base} aria-label="ListrPods">
      {items.map((p, i) => (
        <Link
          key={String(p.id ?? i)}
          href={p.href ?? '#'}
          className="group flex items-center gap-3 rounded-xl border p-3 hover:bg-accent"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-muted/70 ring-1 ring-border grid place-items-center">
            <span className="text-[10px] font-semibold uppercase tracking-wide">Pod</span>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{p.title ?? 'Untitled Pod'}</div>
            {typeof p.duration === 'number' && (
              <div className="text-xs text-muted-foreground">
                {Math.max(1, Math.round(p.duration / 60))} min
              </div>
            )}
          </div>
        </Link>
      ))}
    </section>
  );
}

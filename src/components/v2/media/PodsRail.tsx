'use client';
import Link from 'next/link';
import { Mic } from 'lucide-react';
import type { Pod } from '@/types/media';

export default function PodsRail({ items }: { items: Pod[] }) {
  return (
    <ul className="divide-y rounded-xl border">
      {items.map((p, i) => (
        <li key={String(p.id ?? i)}>
          <Link href={p.href ?? '#'} className="flex items-center gap-3 px-4 py-3 hover:bg-accent">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
              <Mic className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{p.title ?? 'Podcast episode'}</div>
              <div className="text-xs text-muted-foreground">
                {p.duration ? `~${Math.round(p.duration)}s` : 'Audio'}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

'use client';

import React from 'react';
import { useMediaStore } from '@/lib/media-store';

export type MediaItem = { kind: 'image' | 'video'; src: string; alt?: string };

type Props = {
  items: MediaItem[];
  plan?: 'lite' | 'active' | 'pro';
  /** "inline" renders the old horizontal strip, "overlay" renders a tiny pill+thumb */
  variant?: 'inline' | 'overlay';
  /** hides the UI when there’s just one asset (default true) */
  hideIfSingle?: boolean;
  className?: string;
};

const PLAN_LIMITS: Record<NonNullable<Props['plan']>, { thumbs: number }> = {
  lite:   { thumbs: 0  },
  active: { thumbs: 6  },
  pro:    { thumbs: 10 },
};

export default function MediaStrip({
  items,
  plan = 'active',
  variant = 'overlay',
  hideIfSingle = true,
  className = '',
}: Props) {
  const openAt = useMediaStore((s) => s.openAt);
  const count = items?.length ?? 0;

  if (!count) return null;
  if (hideIfSingle && count <= 1) return null;

  if (variant === 'overlay') {
    const first = items[0];
    return (
      <button
        onClick={() => openAt?.(0, items)}
        className={`group flex items-center gap-2 rounded-full bg-black/65 text-white
                    border border-white/15 backdrop-blur px-2.5 py-1.5
                    hover:bg-black/75 transition ${className}`}
        aria-label={`Open gallery (${count} media)`}
      >
        <div className="relative w-8 h-8 rounded-md overflow-hidden ring-1 ring-white/20">
          <img
            src={first.src}
            alt={first.alt ?? 'media'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {first.kind === 'video' && (
            <span className="absolute inset-0 grid place-items-center text-[10px] bg-black/35">▶︎</span>
          )}
        </div>
        <span className="text-xs font-medium tabular-nums">{count} media</span>
      </button>
    );
  }

  // Fallback: original inline strip (rarely used now)
  const limit = PLAN_LIMITS[plan].thumbs;
  const thumbs = items.slice(0, limit);
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {thumbs.map((m, i) => (
        <button
          key={`${m.src}-${i}`}
          onClick={() => openAt?.(i, items)}
          className="w-16 h-14 rounded-lg overflow-hidden bg-neutral-200 ring-1 ring-black/5"
          aria-label={`Open media ${i + 1} of ${count}`}
        >
          <img src={m.src} alt={m.alt ?? 'media'} className="w-full h-full object-cover" loading="lazy" />
        </button>
      ))}
      {count > thumbs.length && (
        <button
          onClick={() => openAt?.(thumbs.length, items)}
          className="text-xs px-2 py-1 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50"
          aria-label="Open gallery"
        >
          +{count - thumbs.length}
        </button>
      )}
    </div>
  );
}

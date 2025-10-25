'use client';

import React from 'react';

export type MediaItem = { kind: 'image' | 'video'; src: string; alt?: string };
export type Plan = 'lite' | 'active' | 'pro';

const PLAN_LIMITS: Record<Plan, { thumbs: number; interactive: boolean }> = {
  lite:   { thumbs: 1,  interactive: false },
  active: { thumbs: 5,  interactive: true  },
  pro:    { thumbs: 12, interactive: true  },
};

type Props = {
  items: MediaItem[];
  plan?: Plan;
  className?: string;
};

/**
 * Compact media strip (counter + small thumbs).
 * Click behavior is no-op if a lightbox store isn't wired yet.
 */
export default function MediaStrip({ items, plan = 'active', className = '' }: Props) {
  const limits = PLAN_LIMITS[plan];
  const total = items.length;
  const shown = items.slice(0, limits.thumbs);

  // Lazy-read optional lightbox store if present to avoid hard dependency
  let openAt: ((i: number, list: MediaItem[]) => void) | undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const store = require('../../lib/media-store');
    if (store?.useMediaStore) {
      const useMediaStore = store.useMediaStore as any;
      openAt = useMediaStore.getState?.().openAt || useMediaStore().openAt;
    }
  } catch {
    // no store mounted — keep it graceful
  }

  const handleOpen = (i: number) => {
    if (openAt) openAt(i, items);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Counter pill */}
      <div
        className="px-2.5 py-1 text-xs rounded-full border border-neutral-200 bg-white text-neutral-700"
        aria-label={`${total} media item${total === 1 ? '' : 's'}`}
        title={`${total} media`}
      >
        {total} media
      </div>

      {/* Thumbs */}
      <div className="flex items-center gap-1.5">
        {shown.map((m, i) => (
          <button
            key={`${m.kind}-${i}-${m.src}`}
            type="button"
            onClick={() => handleOpen(i)}
            className="w-12 h-12 rounded-md overflow-hidden border border-neutral-200 bg-neutral-100"
            aria-label={m.alt || (m.kind === 'video' ? 'Video' : 'Photo')}
            title={m.alt || (m.kind === 'video' ? 'Video' : 'Photo')}
          >
            {m.kind === 'image' ? (
              <img src={m.src} alt={m.alt || ''} className="w-full h-full object-cover" />
            ) : (
              <video
                src={m.src}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
            )}
          </button>
        ))}
        {total > shown.length && (
          <div className="w-12 h-12 grid place-items-center text-[11px] rounded-md border border-neutral-200 bg-white text-neutral-600">
            +{total - shown.length}
          </div>
        )}
      </div>
    </div>
  );
}

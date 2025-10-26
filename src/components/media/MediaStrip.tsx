'use client';
import React from 'react';
import { useMediaStore, type MediaItem } from '../../lib/media-store';
import LightboxMount from './LightboxMount';
import InlineVideo from './InlineVideo';

const PLAN_LIMITS = { lite: 1, active: 12, pro: 48 } as const;
type Plan = keyof typeof PLAN_LIMITS;

export default function MediaStrip({
  items,
  plan = 'active',
  className = '',
}: {
  items: MediaItem[];
  plan?: Plan;
  className?: string;
}) {
  const limits = PLAN_LIMITS[plan];
  const openAt = useMediaStore((s) => s.openAt);

  const visible = items.slice(0, limits);
  const extra = items.length - visible.length;

  return (
    <>
      {/* Lightbox singleton (safe to render multiple times) */}
      <LightboxMount />

      <div className={`flex items-center gap-2 ${className}`}>
        {/* count pill */}
        <span className="text-xs px-2 py-1 rounded-full border border-neutral-200 bg-white text-neutral-700">
          {items.length} media
        </span>

        {/* thumbs row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {visible.map((it, i) => (
            <button
              key={i}
              onClick={() => openAt(i, visible)}
              className="w-14 h-14 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0 hover:opacity-90"
              title={it.alt ?? it.src}
            >
              {it.kind === 'image' ? (
                <img src={it.src} alt={it.alt ?? ''} className="w-full h-full object-cover" />
              ) : (
                <InlineVideo src={it.src} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
          {extra > 0 && (
            <div className="text-[11px] text-neutral-600 px-1 select-none">+{extra} more</div>
          )}
        </div>
      </div>
    </>
  );
}

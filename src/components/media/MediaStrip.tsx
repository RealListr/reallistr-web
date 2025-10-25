'use client';
import React, { useMemo } from 'react';
import type { MediaItem, PlanTier } from '@/types/media';
import { PLAN_LIMITS } from '@/lib/plans';
import InlineVideo from './InlineVideo';
import { useMediaStore } from '@/lib/media-store';

export default function MediaStrip({ items }: { items: {kind:'image'|'video', src:string, alt?:string}[] }) {
  const openLightbox = useMediaStore(s => s.openLightbox);

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((m, i) => (
        <button
          key={i}
          onClick={() => openLightbox(items, i)}
          className="group relative rounded-lg overflow-hidden"
          aria-label={m.alt || 'Open media'}
        >
          {m.kind === 'image' ? (
            <img src={m.src} alt={m.alt || ''} className="w-full h-24 object-cover" />
          ) : (
            <video src={m.src} className="w-full h-24 object-cover" muted playsInline loop />
          )}
        </button>
      ))}
    </div>
  );
}

type Props = {
  items: MediaItem[];               // full list on the listing
  plan: PlanTier;                   // 'lite' | 'active' | 'pro'
  className?: string;
};

export default function MediaStrip({ items, plan, className = '' }: Props) {
  const limits = PLAN_LIMITS[plan];
  const openAt = useMediaStore(s => s.openAt);

  // Enforce plan caps (front-end only — back-end should also enforce on upload)
  const gated = useMemo(() => {
    let i = 0, v = 0, c = 0;
    const out: MediaItem[] = [];
    for (const m of items) {
      if (m.kind === 'image' && i < limits.images) { out.push(m); i++; continue; }
      if (m.kind === 'video' && v < limits.videos) { out.push(m); v++; continue; }
      if (m.kind === 'cut'   && c < limits.cuts)   { out.push(m); c++; continue; }
    }
    return out;
  }, [items, limits]);

  // Inline strip — same element used on Lite/Active/Pro; click opens lightbox when allowed
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <div className="flex gap-2 snap-x overflow-x-auto p-1">
        {gated.map((m, idx) => {
          const common = "snap-start shrink-0 rounded-xl bg-neutral-100 overflow-hidden cursor-pointer";
          const onClick = limits.lightbox ? () => openAt(gated, idx) : undefined;

          if (m.kind === 'image') {
            return (
              <img
                key={m.id}
                src={m.thumb ?? m.src}
                alt={m.alt ?? ''}
                className={`${common} w-[82vw] sm:w-[520px] h-[52vw] sm:h-[320px] object-cover`}
                onClick={onClick}
              />
            );
          }

          // videos + cuts use the same visual (cuts are just short portrait clips)
          const portrait = m.kind === 'cut';
          return (
            <div key={m.id} className={common} onClick={onClick}>
              <InlineVideo
                src={m.src}
                poster={m.thumb}
                className={portrait
                  ? "w-[42vw] sm:w-[240px] h-[72vw] sm:h-[420px]"
                  : "w-[82vw] sm:w-[520px] h-[52vw] sm:h-[320px]"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

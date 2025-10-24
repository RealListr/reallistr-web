'use client';
import React, { useMemo, useState } from 'react';
import type { MediaAsset, Plan } from './types';
import { planCaps } from './types';
import Lightbox from './Lightbox';

export default function MediaStrip({
  assets,
  plan = 'active',
}: {
  assets: MediaAsset[];
  plan?: Plan;
}) {
  const caps = planCaps[plan];
  const limited = useMemo(() => {
    // Respect caps but keep order
    let images = 0, videos = 0;
    const out: MediaAsset[] = [];
    for (const a of assets) {
      if (a.kind === 'image') {
        if (images < caps.images) { out.push(a); images++; }
      } else if (a.kind === 'video') {
        if (videos < caps.videos) { out.push(a); videos++; }
      }
    }
    return out;
  }, [assets, caps]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!limited || limited.length === 0) return null;

  // Tiny counter badge. If plan allows lightbox, clicking on image area should open it.
  return (
    <>
      {/* counter badge (top-left by default) */}
      <div
        className="absolute left-2 top-2 z-10 select-none text-[11px] px-2 py-[2px] rounded-full bg-white/85 border border-white/70 shadow-sm"
        title={`${limited.length} media item${limited.length > 1 ? 's' : ''}`}
      >
        1 / {limited.length}
      </div>

      {/* invisible overlay to open lightbox on image tap (Active/Pro only) */}
      {caps.lightbox && (
        <button
          aria-label="Open gallery"
          className="absolute inset-0 z-10"
          onClick={(e) => {
            // Only open if first asset is an image; videos remain inline for now
            if (limited[0]?.kind === 'image') {
              setIndex(0);
              setOpen(true);
            }
            e.stopPropagation();
          }}
        />
      )}

      {/* floating gallery */}
      <Lightbox
        open={open}
        onClose={() => setOpen(false)}
        assets={limited.filter(a => a.kind === 'image')}
        index={index}
        setIndex={setIndex}
      />
    </>
  );
}

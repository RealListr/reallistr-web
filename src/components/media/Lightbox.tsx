'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMediaStore } from '@/lib/media-store';
import InlineVideo from './InlineVideo';
'use client';
import Lightbox from './Lightbox';
export default function LightboxMount(){ return <Lightbox/>; }

export default function Lightbox() {
  const { open, items, at, close, next, prev } = useMediaStore();

  // body scroll lock
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  if (!open) return null;
  const m = items[at];

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <button
        className="absolute right-4 top-4 text-white/80 hover:text-white text-xl"
        onClick={close}
        aria-label="Close"
      >✕</button>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl" onClick={prev} aria-label="Previous">‹</button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-2xl" onClick={next} aria-label="Next">›</button>

      <div className="w-[92vw] max-w-5xl">
        {m.kind === 'image' ? (
          <img src={m.src} alt={m.alt ?? ''} className="w-full h-auto rounded-xl" />
        ) : (
          <InlineVideo src={m.src} poster={m.thumb} className="w-full h-[68vh]" autoPlay muted />
        )}
        {m.alt ? <div className="text-white/80 mt-3 text-center text-sm">{m.alt}</div> : null}
      </div>
    </div>,
    document.body
  );
}

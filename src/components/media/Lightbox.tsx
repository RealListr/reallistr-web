'use client';
import React, { useEffect } from 'react';
import { useMediaStore } from '@/lib/media-store';

export default function Lightbox() {
  const { open, items, index, close, next, prev } = useMediaStore();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close, next, prev]);

  if (!open || !items.length) return null;
  const it = items[index];

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/70" onClick={close} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="relative max-w-5xl w-full">
          <button
            onClick={close}
            className="absolute -top-10 right-0 text-white/90 hover:text-white px-3 py-1.5 rounded-lg bg-white/10"
            aria-label="Close"
          >
            Close
          </button>

          <div className="relative rounded-xl overflow-hidden bg-black">
            {it.kind === 'image' ? (
              <img src={it.src} alt={it.alt || ''} className="w-full h-auto max-h-[75vh] object-contain" />
            ) : (
              <video
                src={it.src}
                className="w-full h-auto max-h-[75vh] object-contain"
                controls
                autoPlay
                playsInline
              />
            )}
          </div>

          {items.length > 1 && (
            <div className="absolute inset-y-0 -left-12 hidden md:flex items-center">
              <button onClick={prev} className="text-white/90 hover:text-white">‹</button>
            </div>
          )}
          {items.length > 1 && (
            <div className="absolute inset-y-0 -right-12 hidden md:flex items-center">
              <button onClick={next} className="text-white/90 hover:text-white">›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

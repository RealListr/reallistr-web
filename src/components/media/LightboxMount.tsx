'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMediaStore } from '../../lib/media-store';
import InlineVideo from './InlineVideo';

export default function LightboxMount() {
  const { items, index, next, prev, close } = useMediaStore();

  // escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!index && index !== 0) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, next, prev, close]);

  if (index === null) return null;
  const item = items[index];

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/80" onClick={close} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-5xl w-full">
          {item.kind === 'image' ? (
            <img src={item.src} alt={item.alt ?? ''} className="w-full max-h-[80vh] object-contain rounded-lg" />
          ) : (
            <InlineVideo src={item.src} className="w-full max-h-[80vh] rounded-lg" />
          )}

          {/* Controls */}
          <button
            onClick={close}
            className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm px-3 py-1 rounded"
          >
            Close ✕
          </button>
          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-2xl px-3"
                aria-label="Previous"
              >‹</button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-2xl px-3"
                aria-label="Next"
              >›</button>
              <div className="absolute bottom-[-38px] left-1/2 -translate-x-1/2 text-white/70 text-xs">
                {index + 1} / {items.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

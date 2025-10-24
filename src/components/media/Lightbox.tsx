'use client';
import React, { useEffect } from 'react';
import type { MediaAsset } from './types';

export default function Lightbox({
  open,
  onClose,
  assets,
  index,
  setIndex,
}: {
  open: boolean;
  onClose: () => void;
  assets: MediaAsset[];
  index: number;
  setIndex: (i: number) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((index + 1) % assets.length);
      if (e.key === 'ArrowLeft') setIndex((index - 1 + assets.length) % assets.length);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, assets.length, onClose, setIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* dim */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* stage */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-5xl w-full">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-white text-neutral-800 shadow grid place-items-center"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="w-full bg-black grid place-items-center" style={{ aspectRatio: '16/9' }}>
              {assets[index]?.kind === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={assets[index].src}
                  alt={(assets[index] as any).alt ?? ''}
                  className="max-h-[80vh] object-contain"
                />
              ) : (
                <div className="text-white text-sm opacity-80 p-4">
                  Video will play inline in-card (Phase 2 will add full video modal).
                </div>
              )}
            </div>

            {/* simple footer */}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-neutral-600">
              <button
                className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50"
                onClick={() => setIndex((index - 1 + assets.length) % assets.length)}
              >
                ‹ Prev
              </button>
              <div>{index + 1} / {assets.length}</div>
              <button
                className="px-3 py-1 rounded-lg border border-neutral-200 hover:bg-neutral-50"
                onClick={() => setIndex((index + 1) % assets.length)}
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

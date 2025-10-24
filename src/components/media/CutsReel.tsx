'use client';
import React from 'react';

export default function CutsReel({
  items = [],
  onOpen,
}: {
  items: { id: string; cover: string; title?: string; durSec?: number }[];
  onOpen?: (id: string) => void;
}) {
  if (!items.length) return null;
  return (
    <section className="my-4">
      <div className="flex gap-3 overflow-x-auto no-scrollbar pr-1">
        {items.map((s) => (
          <button
            key={s.id}
            onClick={() => onOpen?.(s.id)}
            className="relative w-[150px] min-w-[150px] h-[260px] rounded-xl overflow-hidden bg-neutral-200 shadow-sm"
            title={s.title ?? 'ListrCut'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.cover} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-1 text-[11px] px-1.5 py-0.5 rounded bg-black/70 text-white">
              {s.durSec ? `${s.durSec}s` : ''}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

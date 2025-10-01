'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Short } from '@/types/media';

export default function ShortsRail({ items }: { items: Short[] }) {
  const [open, setOpen] = useState<Short|null>(null);
  if (!items?.length) return null;
  return (
    <section className="mx-auto mt-8 max-w-6xl">
      <h3 className="mb-3 text-sm font-medium">ListrShorts</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map(s => (
          <button key={s.id} className="relative aspect-[9/16] w-44 shrink-0 overflow-hidden rounded-2xl shadow-sm hover:shadow-md"
                  onClick={()=>setOpen(s)}>
            <Image src={s.thumb ?? '/placeholder.svg'} alt={s.title ?? 'Short'} fill className="object-cover" sizes="176px" />
            <div className="absolute bottom-0 w-full bg-black/40 p-2 text-left text-xs text-white line-clamp-2">{s.title ?? 'Short'}</div>
          </button>
        ))}
      </div>

      {/* modal viewer */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={()=>setOpen(null)}>
          <div className="relative aspect-[9/16] w-[min(90vw,430px)] overflow-hidden rounded-2xl bg-black" onClick={(e)=>e.stopPropagation()}>
            <iframe
              className="h-full w-full"
              src={open.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={open.title ?? 'Short'}
            />
          </div>
          <button className="mt-3 rounded bg-white px-3 py-1 text-sm" onClick={()=>setOpen(null)}>Close</button>
        </div>
      )}
    </section>
  );
}

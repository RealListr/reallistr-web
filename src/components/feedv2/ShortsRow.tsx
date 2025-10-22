'use client';
import { useState } from 'react';
import ShortsModal from './ShortsModal';
export type Short = { id:string; title:string; creator:string; avatarUrl?:string; videoUrl:string; coverImageUrl:string; durationSec:number; };
export default function ShortsRow({ items }:{ items: Short[] }) {
  const [openId,setOpenId]=useState<string|null>(null);
  const current = items.find(s=>s.id===openId);
  return (
    <>
      <section className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Shorts</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1">
          {items.map(s=>(
            <button key={s.id} className="shrink-0 snap-start w-40 focus:outline-none"
                    onClick={()=>setOpenId(s.id)} aria-label={`Play ${s.title}`}>
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-200">
                <img src={s.coverImageUrl} alt={s.title} className="w-full h-full object-cover"/>
                <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white rounded px-1.5 py-0.5">
                  {Math.floor(s.durationSec/60)}:{String(s.durationSec%60).padStart(2,'0')}
                </span>
              </div>
              <div className="mt-1 text-xs line-clamp-1">{s.title}</div>
            </button>
          ))}
        </div>
      </section>
      <ShortsModal open={!!openId} onClose={()=>setOpenId(null)} videoUrl={current?.videoUrl||''} title={current?.title}/>
    </>
  );
}

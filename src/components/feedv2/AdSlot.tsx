'use client';
export type Ad = { id:string; imageUrl:string; clickUrl:string; label:string; advertiser:string; };
export default function AdSlot({ ad }:{ ad:Ad }){
  return (
    <a href={ad.clickUrl} target="_blank" rel="noreferrer"
       className="block rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-3">
        <span className="text-xs bg-neutral-100 text-neutral-700 rounded-full px-2 py-0.5">{ad.label}</span>
        <span className="text-xs text-neutral-500">{ad.advertiser}</span>
      </div>
      <div className="aspect-[3/2] bg-neutral-100">
        <img src={ad.imageUrl} alt={ad.advertiser} className="w-full h-full object-cover"/>
      </div>
    </a>
  );
}

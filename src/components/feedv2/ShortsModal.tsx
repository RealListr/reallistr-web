'use client';
import { useEffect } from 'react';
export default function ShortsModal({
  open, onClose, videoUrl, title
}:{ open:boolean; onClose:()=>void; videoUrl:string; title?:string; }) {
  useEffect(()=>{
    if(!open) return;
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown', onKey); document.body.style.overflow=''; };
  },[open,onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="aspect-[9/16] bg-black">
          <video src={videoUrl} autoPlay muted controls playsInline className="w-full h-full object-cover"/>
        </div>
        {title ? <div className="p-3 text-sm">{title}</div> : null}
        <button onClick={onClose} className="absolute top-3 right-3 bg-black/70 text-white rounded-full px-3 py-1 text-sm">Close</button>
      </div>
    </div>
  );
}

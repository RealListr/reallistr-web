'use client';
import React, {useEffect, useRef, useState} from 'react';

export default function ConnectMenu({
  compact=false, className='', onPick,
}: { compact?: boolean; className?: string; onPick?:(s:'Agents'|'Finance'|'Insurance'|'Energy')=>void }) {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const f=(e:MouseEvent)=>{ if(ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown',f); return()=>document.removeEventListener('mousedown',f); },[]);
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button aria-label="Connect" onClick={()=>setOpen(v=>!v)}
        className={compact?'p-2 rounded-md bg-black/60 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
                          :'w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50'}>
        <svg viewBox="0 0 24 24" className={compact?'w-[22px] h-[22px]':'w-5 h-5'} fill="currentColor">
          <circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
          <circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-50" role="menu">
          <div className="px-2 py-1 text-[12px] text-neutral-500">Connect</div>
          {(['Agents','Finance','Insurance','Energy'] as const).map(l=>(
            <button key={l} onClick={()=>{onPick?.(l); setOpen(false);}}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 text-sm">
              <span className="inline-flex w-4 h-4 items-center justify-center">
                {l==='Agents'&&(<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.33 0-7 1.17-7 3v2h7v-2c0-.71.24-1.37.65-1.94A8.2 8.2 0 0 1 8 14Z"/></svg>)}
                {l==='Finance'&&(<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2Zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"/></svg>)}
                {l==='Insurance'&&(<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V5Z"/></svg>)}
                {l==='Energy'&&(<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M11 21 19 10h-5l3-8-8 11h5Z"/></svg>)}
              </span>
              {l}
            </button>))}
        </div>
      )}
    </div>
  );
}

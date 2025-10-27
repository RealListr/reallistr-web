'use client';
import React, {useEffect, useRef, useState} from 'react';

type PickType = 'Agents' | 'Finance' | 'Insurance' | 'Energy';

export default function ConnectMenu({
  compact = false,
  className = '',
  onPick,
}: {
  compact?: boolean;
  className?: string;
  onPick?: (s: PickType) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const Item = ({label, icon, val}:{label:PickType; icon:React.ReactNode; val:PickType}) => (
    <button
      onClick={() => { onPick?.(val); setOpen(false); }}
      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 text-sm"
      role="menuitem"
    >
      <span className="w-4 h-4 inline-flex">{icon}</span>
      {label}
    </button>
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        aria-label="Connect"
        onClick={() => setOpen(v => !v)}
        className={compact
          ? "p-2 rounded-md bg-white/90 border border-neutral-200 shadow-sm hover:bg-white"
          : "w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50"}
      >
        {/* 3x3 grid dots */}
        <svg viewBox="0 0 24 24" className={compact ? "w-4 h-4" : "w-5 h-5"} fill="currentColor" aria-hidden>
          <circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
          <circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
        </svg>
      </button>

      {/* Menu */}
      {open && (
        <div
          className={`absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30 ${compact ? "" : ""}`}
          role="menu"
        >
          <div className="px-2 py-1 text-[12px] text-neutral-500">Connect</div>
          <Item val="Agents" label="Agents" icon={<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.33 0-7 1.17-7 3v2h7v-2c0-.71.24-1.37.65-1.94A8.2 8.2 0 0 1 8 14Z"/></svg>} />
          <Item val="Finance" label="Finance" icon={<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2Zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"/></svg>} />
          <Item val="Insurance" label="Insurance" icon={<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2 4 5v6c0 5 3.58 9.74 8 11 4.42-1.26 8-6 8-11V5Z"/></svg>} />
          <Item val="Energy" label="Energy" icon={<svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M11 21 19 10h-5l3-8-8 11h5Z"/></svg>} />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

export default function ConnectMenu({
  className = '',
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Connect"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="p-2 rounded-md hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      >
        {/* 9-dot icon */}
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" aria-hidden>
          <g fill="currentColor">
            <circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/>
            <circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/>
            <circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>
          </g>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white shadow-xl p-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-sm font-semibold text-neutral-700 mb-3">Connect</p>
          <ul className="grid gap-3">
            <li className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-neutral-100">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM2 21v-1.5C2 16.5 6 15 8 15s6 1.5 6 4.5V21"/><path d="M8 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Z"/></svg>
              </span>
              <span className="text-[15px]">Agents</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-neutral-100">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h8M8 14h6"/></svg>
              </span>
              <span className="text-[15px]">Finance</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-neutral-100">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5"/></svg>
              </span>
              <span className="text-[15px]">Insurance</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-neutral-100">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
              </span>
              <span className="text-[15px]">Energy</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

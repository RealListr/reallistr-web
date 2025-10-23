// src/components/ghost/GhostIcons.tsx
import React from 'react';

const cls = 'w-4 h-4 text-neutral-600';
const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' as const };

export const Ic = {
  // UI
  Search: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <circle cx="11" cy="11" r="6" {...stroke}/>
      <path d="M16 16l4 4" {...stroke}/>
    </svg>
  ),
  Calendar: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2" {...stroke}/>
      <path d="M16 3v4M8 3v4M3 10h18" {...stroke}/>
      <path d="M8 14h3v3H8z" {...stroke}/>
    </svg>
  ),
  ThumbUp: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <path d="M7 10v10M13 6l-3 4v8h8.2a2 2 0 0 0 2-1.6l1.1-6.5A2 2 0 0 0 19.4 8H13Z" {...stroke}/>
    </svg>
  ),
  ThumbDown: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <path d="M7 14V4M13 18l-3-4V6h8.2a2 2 0 0 1 2 1.6l1.1 6.5A2 2 0 0 1 19.4 16H13Z" {...stroke}/>
    </svg>
  ),
  Info: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <circle cx="12" cy="12" r="9" {...stroke}/>
      <path d="M12 8h.01M11 11h2v5h-2z" {...stroke}/>
    </svg>
  ),
  Pin: (p:any) => (
    <svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" {...stroke}/>
      <circle cx="12" cy="10" r="2.5" {...stroke}/>
    </svg>
  ),

  // Property row
  Bed: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M3 17v-6a2 2 0 0 1 2-2h4a4 4 0 0 1 4 4v4M3 13h18M21 17V9a2 2 0 0 0-2-2h-5" {...stroke}/>
  </svg>),
  Bath: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M5 13v-2a3 3 0 0 1 3-3h1M7 18h10M4 14h16l-1 3a3 3 0 0 1-2.8 2H7.8A3 3 0 0 1 5 17l-1-3Z" {...stroke}/>
  </svg>),
  Car: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M3 14l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 9l2 5M5 14h14" {...stroke}/>
    <circle cx="7.5" cy="17" r="1.25" fill="currentColor"/><circle cx="16.5" cy="17" r="1.25" fill="currentColor"/>
  </svg>),
  Home: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8Z" {...stroke}/>
  </svg>),
  Land: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M3 17h18M4 13l4-2 4 2 4-2 4 2" {...stroke}/>
  </svg>),
  Solar: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M4.2 6.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 17.8l1.4-1.4M18.4 5.6l1.4-1.4" {...stroke}/>
    <path d="M8 14h8l1-4H7l1 4Z" {...stroke}/>
  </svg>),
  Charger: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M7 7h6a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Z" {...stroke}/>
    <path d="M16 9h1a2 2 0 0 1 2 2v1.5A2.5 2.5 0 0 1 16.5 15H16" {...stroke}/>
  </svg>),
  Grass: (p:any)=>(<svg viewBox="0 0 24 24" className={cls} fill="none" {...p}>
    <path d="M3 20h18M6 20v-4m3 4v-3m3 3v-4m3 4v-3m3 3v-4M6 16l2-2m-2 2l-2-2m6 3l2-2m4 2l2-2" {...stroke}/>
  </svg>),
};

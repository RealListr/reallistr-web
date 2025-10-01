import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement> & { size?: number };
const base = { width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const IcImage = (p:Props)=>(
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 13l3-3 5 5M10 9h.01"/></svg>
);
export const IcShort = (p:Props)=>(
  <svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 10l4 2-4 2v-4z"/></svg>
);
export const IcPod = (p:Props)=>(
  <svg {...base} {...p}><circle cx="12" cy="12" r="3"/><path d="M12 5v2M12 17v2M5 12h2M17 12h2M7.5 7.5l1.4 1.4M15.1 15.1l1.4 1.4M16.5 7.5l-1.4 1.4M8.9 15.1L7.5 16.5"/></svg>
);
export const IcInfo = (p:Props)=>(
  <svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M10.5 12h1.5v4h1.5"/></svg>
);
export const IcFacts = (p:Props)=>(
  <svg {...base} {...p}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h8M8 14h5"/></svg>
);
export const IcBed = (p:Props)=>(
  <svg {...base} {...p}><path d="M3 14h18M5 14V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5M3 18v-4M21 18v-4"/></svg>
);
export const IcBath = (p:Props)=>(
  <svg {...base} {...p}><path d="M5 12h14v2a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5v-2zM7 7a3 3 0 0 1 6 0v5"/></svg>
);
export const IcCar = (p:Props)=>(
  <svg {...base} {...p}><path d="M5 16h14l-1.2-4a3 3 0 0 0-2.9-2.2H9.1A3 3 0 0 0 6.2 12L5 16z"/><circle cx="8" cy="18" r="1"/><circle cx="16" cy="18" r="1"/></svg>
);
export const IcSize = (p:Props)=>(
  <svg {...base} {...p}><path d="M3 8V5h3M21 8V5h-3M3 16v3h3M21 16v3h-3M7 7l10 10"/></svg>
);

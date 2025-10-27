'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ========================= Minimal icon set (inline) ========================= */
const Ic = {
  Info: (p:{className?:string}) => (
    <svg viewBox="0 0 24 24" className={p.className??'w-5 h-5'} fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="10" opacity=".1"/><path d="M12 11v6m0-10h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Pin: (p:{className?:string}) => (
    <svg viewBox="0 0 24 24" className={p.className??'w-5 h-5'} fill="currentColor" aria-hidden>
      <path d="M12 22s8-7.16 8-13a8 8 0 1 0-16 0c0 5.84 8 13 8 13Zm0-9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"/>
    </svg>
  ),
  Bed: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M4 7h9a3 3 0 0 1 3 3v1h4v6h-2v-2H6v2H4V7Z" fill="currentColor"/></svg>,
  Bath: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M5 12h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Zm2-5a3 3 0 0 1 6 0v3H7V7Z" fill="currentColor"/></svg>,
  Car: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M5 16l1-3 2-6h8l2 6 1 3v3h-2v-2H7v2H5v-3Z" fill="currentColor"/><circle cx="8" cy="18" r="1.2"/><circle cx="16" cy="18" r="1.2"/></svg>,
  Home: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M3 11 12 3l9 8v9h-6v-6H9v6H3v-9Z" fill="currentColor"/></svg>,
  Land: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M3 19h18l-4-5-5 3-3-4-6 6Z" fill="currentColor"/></svg>,
  Solar: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-6v3m0 14v3M4 12H1m22 0h-3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1m11.4-11.4 2.1-2.1" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg>,
  Charger: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="m11 22 3-8H11l2-8-6 9h4l-2 7Z" fill="currentColor"/></svg>,
  Grass: () => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M3 20h18M6 20v-3m2 3v-4m2 4v-3m2 3v-5m2 5v-3m2 3v-4m2 4v-3" stroke="currentColor" strokeWidth="1.3"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8"/></svg>,
};
// extras used in Connect menu
Ic.Users = Ic.Users ?? (() => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.33 0-7 1.17-7 3v2h7v-2c0-.71.24-1.37.65-1.94A8.2 8.2 0 0 1 8 14Z" fill="currentColor"/></svg>);
Ic.Card  = Ic.Card  ?? (() => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2Zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" fill="currentColor"/></svg>);
Ic.Shield= Ic.Shield?? (() => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2 4 5v6c0 5 3.58 9.74 8 11 4.42-1.26 8-6 8-11V5Z" fill="currentColor"/></svg>);
Ic.Bolt  = Ic.Bolt  ?? (() => <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M11 21 19 10h-5l3-8-8 11h5Z" fill="currentColor"/></svg>);

/* ========================= Types & Mock Data ========================= */
type Listing = {
  id: string;
  img: string;
  price: string;
  address: string;
  agent?: string;
  agency?: string;
  grassType?: 'None' | 'Real' | 'Artificial';
  photos?: string[];
  videos?: string[];
  shorts?: string[];
};

const LISTINGS: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  img: `https://images.unsplash.com/photo-${
    [
      '1500530855697-b586d89ba3ee',
      '1482192596544-9eb780fc7f66',
      '1508921912186-1d1a45ebb3c1',
      '1488330890490-c291ecf62571',
      '1501183638710-841dd1904471',
      '1494526585095-c41746248156',
    ][i % 6]
  }?q=80&w=1600&auto=format&fit=crop`,
  price: 'AED 4,250,000',
  address: 'One JLT, Jumeirah Lake Towers',
  agent: 'Aisha Patel',
  agency: 'Luxe Realty',
  grassType: (['Artificial', 'Real', 'None'] as const)[i % 3],
  photos: i % 2 === 0
    ? [
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=801&auto=format&fit=crop',
      ]
    : [],
  videos: [],
  shorts: [],
}));

/* ========================= Small ghost/mono actions ========================= */
function GhostIconButton({
  label, children, onClick, className = '',
}: { label: string; children: React.ReactNode; onClick?: () => void; className?: string; }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-md ${className}`}
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.45))' }}
    >
      <span className="inline-flex">{children}</span>
    </button>
  );
}

function IconHeart({ className = 'w-[22px] h-[22px] text-white' }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 21s-6.716-4.03-9.293-6.607A6 6 0 0 1 11.293 5.1L12 5.8l.707-.7A6 6 0 0 1 21.293 14.4C18.716 16.97 12 21 12 21Z" />
  </svg>);
}
function IconShare({ className = 'w-[22px] h-[22px] text-white' }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M14 9V5l7 7-7 7v-4H7a4 4 0 0 1-4-4V6h2v5a2 2 0 0 0 2 2h7Z" />
  </svg>);
}
function IconComment({ className = 'w-[22px] h-[22px] text-white' }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M4 5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4.5 3.5A1 1 0 0 1 3 19v-2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    <circle cx="9" cy="10.5" r="1.2" /><circle cx="12" cy="10.5" r="1.2" /><circle cx="15" cy="10.5" r="1.2" />
  </svg>);
}
function IconGridDots({ className = 'w-[22px] h-[22px] text-white' }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
  </svg>);
}

/* ========================= Connect menu ========================= */
function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Connect"
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50"
      >
        <IconGridDots className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30" role="menu">
          <div className="px-2 py-1 text-[12px] text-neutral-500">Connect</div>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Users /> <span className="text-sm">Agents</span></button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Card /> <span className="text-sm">Finance</span></button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Shield /> <span className="text-sm">Insurance</span></button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Bolt /> <span className="text-sm">Energy</span></button>
        </div>
      )}
    </div>
  );
}

/* ========================= Comments (sheet) ========================= */
type Comment = { id: string; name: string; suburb?: string; isAgent?: boolean; time: string; body: string; likes: number; replies?: Comment[]; };
const DEMO: Comment[] = [
  { id:'c1', name:'Mina K.', suburb:'JLT', time:'2h', body:'How noisy is it at night near the highway?', likes:6,
    replies:[{ id:'c1r1', name:'Aisha Patel', suburb:'Luxe Realty', isAgent:true, time:'1h', body:'After 9pm it’s pretty quiet; double glazing in bedrooms.', likes:12 }]}
];

function CommentsPanel({ open, onClose, listingTitle }:{ open:boolean; onClose:()=>void; listingTitle:string; }) {
  useEffect(() => { const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose(); }; document.addEventListener('keydown', onKey); return ()=>document.removeEventListener('keydown', onKey); }, [onClose]);
  return (
    <div className={`fixed inset-0 z-50 ${open?'pointer-events-auto':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl border-l border-neutral-200 transition-transform duration-200 ${open?'translate-x-0':'translate-x-full'}`}>
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs text-neutral-500 truncate">{listingTitle}</div>
              <div className="flex items-center gap-2">
                <div className="text-base font-semibold">Discussion</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">24</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-full border border-neutral-200 hover:bg-neutral-50">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <div className="px-4 pb-24">
          {DEMO.map(c => <CommentItem key={c.id} c={c} depth={0} />)}
        </div>
      </div>
    </div>
  );
}

function CommentItem({ c }:{ c: Comment; depth:number }) {
  const [showReplies, setShowReplies] = useState(true);
  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium truncate">{c.name}</span>
            {c.suburb && <span className="text-neutral-500 truncate">• {c.suburb}</span>}
            {c.isAgent && (<span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border border-neutral-200">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12 2 4 5v6c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V5Z" fill="currentColor"/></svg> Agent
            </span>)}
            <span className="text-neutral-400 text-xs ml-auto">{c.time}</span>
          </div>
          <div className="mt-1 text-[15px] leading-5 text-neutral-900">{c.body}</div>
          <div className="mt-2 flex items-center gap-3 text-xs text-neutral-600">
            <button className="inline-flex items-center gap-1 hover:underline"><svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 21s-6.7-4.03-9.29-6.61A6 6 0 0 1 11.3 5.1l.7.7.7-.7A6 6 0 0 1 21.3 14.4C18.7 16.97 12 21 12 21Z" fill="currentColor"/></svg> {c.likes}</button>
            <button className="hover:underline" onClick={()=>setShowReplies(v=>!v)}>{showReplies?'Hide replies':'View replies'}</button>
          </div>
          {c.replies && showReplies && <div className="mt-2 pl-4 border-l border-neutral-200">{c.replies.map(r => <CommentItem key={r.id} c={r} depth={1} />)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ========================= Media overlay (bottom-left) ========================= */
type OverlayItem = { kind: 'image'|'video'; src: string; alt?: string };

function MediaOverlay({ items }: { items: OverlayItem[] }) {
  // Parent decides to render this only when items.length >= 2
  const thumbs = items.slice(0, 4);
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-2.5 py-1.5 border border-neutral-200 shadow-sm">
      <div className="flex -space-x-1">
        {thumbs.map((m, i) => (
          <img
            key={m.src}
            src={m.src}
            alt={m.alt ?? ''}
            className="w-7 h-7 rounded-md object-cover border border-white"
            style={{ zIndex: thumbs.length - i }}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-700">{items.length} media</span>
    </div>
  );
}

/* ========================= Listing Card ========================= */
function ListingCard({ L }: { L: Listing }) {
  const CAL_SIZE = 50;
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const cardMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!cardMenuRef.current) return;
      if (!cardMenuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Build media payload (image + optional arrays)
  const media: OverlayItem[] = [
    ...(L.img ? [{ kind: 'image' as const, src: L.img, alt: L.address }] : []),
    ...((L.photos ?? []).map((p) => ({ kind: 'image' as const, src: p }))),
    ...((L.videos ?? []).map((v) => ({ kind: 'video' as const, src: v }))),
    ...((L.shorts ?? []).map((s) => ({ kind: 'video' as const, src: s }))),
  ];
  const mediaUnique = Array.from(new Map(media.map(m => [m.src, m])).values());
  const hasGallery = mediaUnique.length > 1;

  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center gap-3 p-5">
        <div className="w-10 h-10 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none" aria-hidden>
            <path d="M7 6h7l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold leading-tight truncate">{L.agent}</p>
            <p className="text-sm text-neutral-600 leading-tight truncate">{L.agency}</p>
            <button className="mt-1 text-[11px] rounded-full px-2 py-[2px] border border-neutral-200 bg-white hover:bg-neutral-50" aria-label="Follow">
              + Follow
            </button>
          </div>
        </div>
      </header>

      {/* Media (hero) */}
      <div className="relative bg-neutral-100 h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden rounded-xl">
        <img src={L.img} className="w-full h-full object-cover" alt="" />

        {/* MEDIA OVERLAY — bottom-left (only when 2+ items) */}
        {hasGallery && (
          <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 z-10">
            <MediaOverlay items={mediaUnique} />
          </div>
        )}

        {/* Right-side ghost mini actions (anchored overlay, no drift) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute right-2 top-2 flex flex-col gap-2 z-10" ref={cardMenuRef}>
            <GhostIconButton label="Like"><IconHeart /></GhostIconButton>

            <div className="relative">
              <GhostIconButton label="Connect" onClick={() => setMenuOpen(v => !v)}>
                <IconGridDots />
              </GhostIconButton>
              {menuOpen && (
                <div className="absolute right-10 top-0 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Users /> <span className="text-sm">Agents</span></button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Card /> <span className="text-sm">Finance</span></button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Shield /> <span className="text-sm">Insurance</span></button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50"><Ic.Bolt /> <span className="text-sm">Energy</span></button>
                </div>
              )}
            </div>

            <GhostIconButton label="Info"><Ic.Info className="w-[22px] h-[22px] text-white" /></GhostIconButton>
            <GhostIconButton label="Map"><Ic.Pin className="w-[22px] h-[22px] text-white" /></GhostIconButton>
            <GhostIconButton label="Share"><IconShare /></GhostIconButton>
            <GhostIconButton label="Comments" onClick={() => setCommentsOpen(true)}><IconComment /></GhostIconButton>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-5 border-t border-neutral-100">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-2xl font-bold">{L.price}</p>
            <p className="text-sm text-neutral-700 mt-1">{L.address}</p>
            <p className="text-sm text-neutral-600 mt-2">
              Elegant 2-bed in JLT with south light and EV charging.
            </p>
          </div>

        <div className="shrink-0 flex flex-col items-end gap-1 -mt-2">
          <CalendarMini day="Thu" date="23" time="11:15–11:45" size={CAL_SIZE} />
          <div style={{ width: CAL_SIZE }} className="text-[11px] text-center tracking-wide text-neutral-700">
            OPEN
          </div>
        </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-700 mt-4">
          <span className="inline-flex items-center gap-1.5"><Ic.Bed /> 4</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Bath /> 2</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Car /> 2</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Home /> Home</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Land /> Land Size m²</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Solar /> Solar &amp; wattage</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Charger /> EV Charger</span>
          <span className="inline-flex items-center gap-1.5"><Ic.Grass /> Grass: {L.grassType ?? 'None'}</span>
        </div>
      </footer>

      <CommentsPanel open={commentsOpen} onClose={() => setCommentsOpen(false)} listingTitle={L.address} />
    </article>
  );
}

/* ========================= Misc UI ========================= */
function CalendarMini({
  day = 'Thu', date = '23', time = '11:15–11:45', size = 40, className = '',
}: { day?: string; date?: string; time?: string; size?: number; className?: string; }) {
  return (
    <div
      className={`grid place-items-center rounded-lg bg-white border border-neutral-200 shadow-sm text-center leading-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Inspection ${day} ${date}, ${time}`} title={`Inspection ${day} ${date}, ${time}`}
    >
      <div className="text-[10px] -mt-0.5 font-medium text-red-600">{day}</div>
      <div className="text-[14px] -mt-0.5 font-bold text-neutral-900">{date}</div>
      <div className="text-[8px] -mt-0.5 text-neutral-500">{time}</div>
    </div>
  );
}

function ToggleDC({ value='D', onChange }:{ value?:'D'|'C'; onChange?:(v:'D'|'C')=>void; }) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden" role="tablist" aria-label="Choose Domestic or Commercial" title={value==='D'?'Domestic':'Commercial'}>
      <button role="tab" aria-selected={value==='D'} onClick={()=>onChange?.('D')} className={`px-2.5 py-1 text-sm leading-none ${value==='D'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}><span className="sr-only">Domestic</span><span aria-hidden>D</span></button>
      <span className="text-neutral-300 select-none">|</span>
      <button role="tab" aria-selected={value==='C'} onClick={()=>onChange?.('C')} className={`px-2.5 py-1 text-sm leading-none ${value==='C'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}><span className="sr-only">Commercial</span><span aria-hidden>C</span></button>
    </div>
  );
}

/* ========================= Page ========================= */
export default function FeedClean() {
  const [mode, setMode] = useState<'D'|'C'>('D');
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ToggleDC value={mode} onChange={setMode} />
          <ConnectMenu />
          <button aria-label="Search" className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50">
            <Ic.Search />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {LISTINGS.map((L) => <ListingCard key={L.id} L={L} />)}
      </div>
    </main>
  );
}

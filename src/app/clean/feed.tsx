'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ────────────────────────────── Icons (inline) ────────────────────────────── */
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
  Dots: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M12 21s-6.716-4.03-9.293-6.607A6 6 0 0 1 11.293 5.1L12 5.8l.707-.7A6 6 0 0 1 21.293 14.4C18.716 16.97 12 21 12 21Z"/></svg>,
  Share: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M14 9V5l7 7-7 7v-4H7a4 4 0 0 1-4-4V6h2v5a2 2 0 0 0 2 2h7Z"/></svg>,
  Comment: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M4 5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4.5 3.5A1 1 0 0 1 3 19v-2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><circle cx="9" cy="10.5" r="1.2"/><circle cx="12" cy="10.5" r="1.2"/><circle cx="15" cy="10.5" r="1.2"/></svg>,
};

/* ─────────────────────────────── Demo Data ──────────────────────────────── */
type MediaItem = {
  kind: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
};
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
  photos: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop',
  ],
  videos: [],
}));

/* ───────────────────────────── Utilities/atoms ───────────────────────────── */
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

function CalendarMini({
  day = 'Thu', date = '23', time = '11:15–11:45', size = 50, className = '',
}: { day?: string; date?: string; time?: string; size?: number; className?: string; }) {
  return (
    <div
      className={`grid place-items-center rounded-xl bg-white border border-neutral-200 shadow-sm text-center leading-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Inspection ${day} ${date}, ${time}`} title={`Inspection ${day} ${date}, ${time}`}
    >
      <div className="text-[10px] -mt-0.5 font-medium text-red-600">{day}</div>
      <div className="text-[14px] -mt-0.5 font-bold text-neutral-900">{date}</div>
      <div className="text-[8px] -mt-0.5 text-neutral-500">{time}</div>
    </div>
  );
}

/* ─────────────────────────── Image with blur-up ──────────────────────────── */
function ImgBlur({
  src, alt, className='', lazy=false,
}: { src:string; alt:string; className?:string; lazy?:boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-[filter,opacity,transform] duration-500 ${loaded?'opacity-100 filter-none':'opacity-90 blur-[12px]'} will-change-transform`}
    />
  );
}

/* ───────────────────────────── Focus Trap ───────────────────────────── */
function useFocusTrap(enabled: boolean, containerRef: React.RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const prev = document.activeElement as HTMLElement | null;
    const selector = 'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])';
    const getFocusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>(selector)).filter(
        (n) => !n.hasAttribute('disabled') && n.tabIndex !== -1
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = getFocusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && active === last) { first.focus(); e.preventDefault(); }
    };

    getFocusables()[0]?.focus();
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [enabled, containerRef]);
}

/* ───────────────────────────── Lightbox (portal) ───────────────────────────── */
type LightboxProps = {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  setIndex: (i:number)=>void;
};

function Lightbox({ items, index, onClose, setIndex }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref);

  // keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(Math.min(items.length - 1, index + 1));
      if (e.key === 'ArrowLeft') setIndex(Math.max(0, index - 1));
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, setIndex]);

  // swipe
  const startX = useRef(0);
  const delta = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchMove = (e: React.TouchEvent) => { delta.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd = () => {
    const THRESH = 60;
    if (delta.current > THRESH) setIndex(Math.max(0, index - 1));
    if (delta.current < -THRESH) setIndex(Math.min(items.length - 1, index + 1));
    delta.current = 0;
  };

  const item = items[index];
  if (!item) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      role="dialog" aria-modal="true" aria-label="Media viewer"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="relative w-[96vw] h-[calc(100vh-3.5rem)] sm:w-auto sm:h-auto sm:max-w-[70vw] sm:max-h-[86vh] bg-neutral-900/30 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        tabIndex={0}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute z-20 top-3 right-3 sm:-top-3 sm:-right-3 w-10 h-10 grid place-items-center rounded-full bg-white text-neutral-700 shadow"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        {/* Main media */}
        <div className="relative bg-black w-full h-full sm:pb-0">
          <div className="absolute inset-0 flex items-center justify-center">
            {item.kind === 'video' ? (
              <video src={item.src} poster={item.poster} controls playsInline className="max-w-full max-h-full object-contain" />
            ) : (
              <ImgBlur src={item.src} alt={item.alt ?? 'Listing media'} className="max-w/full max-h/full object-contain" />
            )}
          </div>

          {/* Chevrons */}
          {index>0 && (
            <button
              className="absolute z-20 left-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/95"
              onClick={() => setIndex(Math.max(0, index - 1))}
              aria-label="Previous media"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            </button>
          )}
          {index<items.length-1 && (
            <button
              className="absolute z-20 right-2 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-white/95"
              onClick={() => setIndex(Math.min(items.length - 1, index + 1))}
              aria-label="Next media"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            </button>
          )}

          {/* Thumbnails rail */}
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-auto">
            <div className="bg-gradient-to-t from-black/80 to-black/0 pt-8" />
            <div className="flex gap-2 px-3 pb-[max(12px,env(safe-area-inset-bottom))] overflow-x-auto bg-black/60 backdrop-blur-sm"
                 role="listbox" aria-label="Media thumbnails">
              {items.map((it, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative w-24 h-20 rounded-xl overflow-hidden border ${i===index?'border-white':'border-transparent'} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 shrink-0`}
                  aria-label={`Open media ${i+1} of ${items.length}`}
                  role="option" aria-selected={i===index}
                >
                  {it.kind === 'video'
                    ? <div className="relative w-full h-full bg-black">
                        <video src={it.src} poster={it.poster} className="w-full h-full object-cover" muted />
                        <span className="absolute bottom-1 right-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white">Video</span>
                      </div>
                    : <ImgBlur src={it.src} alt={it.alt ?? ''} className="w-full h-full object-cover" lazy />
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

/* ───────────────────────────── Listing Card ──────────────────────────────── */
function ListingCard({ L }: { L: Listing }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const raw: MediaItem[] = [
    ...(L.img ? [{ kind:'image' as const, src: L.img, alt: L.address }] : []),
    ...((L.photos ?? []).map((p) => ({ kind:'image' as const, src: p, alt: L.address }))),
    ...((L.videos ?? []).map((v) => ({ kind:'video' as const, src: v }))),
  ];
  const media = Array.from(new Map(raw.map(m => [m.src, m])).values());
  const hasGallery = media.length > 1;

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

      {/* Media */}
      <div className="relative bg-neutral-100 h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <button
          onClick={() => { setIdx(0); setOpen(true); }}
          className="block w-full h-full"
          aria-label="Open media"
        >
          <ImgBlur src={L.img} alt={L.address} className="w-full h-full object-cover hover:scale-[1.01]" />
        </button>

        {/* Media count pill */}
        {hasGallery && (
          <button
            onClick={() => { setIdx(0); setOpen(true); }}
            className="absolute left-4 bottom-4 rounded-2xl bg-black/70 text-white text-sm px-3 py-2 shadow-lg border border-white/10 hover:bg-black/80"
            aria-label={`Open gallery with ${media.length} media`}
          >
            {media.length} media
          </button>
        )}

        {/* Right-side ghost mini actions */}
        <div className="absolute right-1.5 sm:right-2 top-2 flex flex-col gap-2">
          <GhostIconButton label="Like"><Ic.Heart /></GhostIconButton>
          <GhostIconButton label="Connect"><Ic.Dots /></GhostIconButton>
          <GhostIconButton label="Info"><Ic.Info className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Map"><Ic.Pin className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Share"><Ic.Share /></GhostIconButton>
          <GhostIconButton label="Comments"><Ic.Comment /></GhostIconButton>
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
            <CalendarMini day="Thu" date="23" time="11:15–11:45" />
            <div className="w-[50px] text-[11px] text-center tracking-wide text-neutral-700">
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

      {open && (
        <Lightbox
          items={media}
          index={idx}
          setIndex={setIdx}
          onClose={() => setOpen(false)}
        />
      )}
    </article>
  );
}

/* ───────────────────────────── Page scaffold ───────────────────────────── */
function ToggleDC({ value='D', onChange }:{ value?:'D'|'C'; onChange?:(v:'D'|'C')=>void; }) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden" role="tablist" aria-label="Choose Domestic or Commercial" title={value==='D'?'Domestic':'Commercial'}>
      <button role="tab" aria-selected={value==='D'} onClick={()=>onChange?.('D')} className={`px-2.5 py-1 text-sm leading-none ${value==='D'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}><span className="sr-only">Domestic</span><span aria-hidden>D</span></button>
      <span className="text-neutral-300 select-none">|</span>
      <button role="tab" aria-selected={value==='C'} onClick={()=>onChange?.('C')} className={`px-2.5 py-1 text-sm leading-none ${value==='C'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}><span className="sr-only">Commercial</span><span aria-hidden>C</span></button>
    </div>
  );
}

export default function FeedClean() {
  const [mode, setMode] = useState<'D'|'C'>('D');
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ToggleDC value={mode} onChange={setMode} />
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

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Ic } from '../../components/ghost/GhostIcons';

type Listing = {
  id: string;
  img: string;
  price: string;
  address: string;
  agent?: string;
  agency?: string;
  grassType?: 'None' | 'Real' | 'Artificial';
};

const LISTINGS: Listing[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  img: `https://images.unsplash.com/photo-${
    [
      '1500530855697-b586d89ba3ee', // grass
      '1482192596544-9eb780fc7f66', // desert road
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
}));

const SHORTS = Array.from({ length: 6 }).map((_, i) => ({
  id: `s${i}`,
  cover: `https://picsum.photos/seed/short${i}/320/560`,
  title: `Tour #${i + 1}`,
  dur: 12 + i,
}));

const AGENTS = [
  { id: 'a1', name: 'Aisha Patel' },
  { id: 'a2', name: 'Mina Khan' },
  { id: 'ag1', name: 'Luxe Realty' },
  { id: 'ag2', name: 'Harbor Estates' },
  { id: 'ag3', name: 'Urban Nest' },
];

/* ========================= Icons (compact, RealListr-style) ========================= */

function GhostIconButton({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded-md ${className}`}
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.45))' }}
    >
      <span className="inline-flex">{children}</span>
    </button>
  );
}

// Bold thumbs for clarity
function ThumbUpBold({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2.25 12.75A2.25 2.25 0 0 1 4.5 10.5h3.18a2.25 2.25 0 0 0 2.199-1.757l.63-2.834A2.25 2.25 0 0 1 12.702 4.5c.809 0 1.468.659 1.468 1.468v3.032h4.68a2.25 2.25 0 0 1 2.219 2.639l-1.05 5.25A2.25 2.25 0 0 1 17.83 18H10.5a2.25 2.25 0 0 1-2.25-2.25v-3H4.5a2.25 2.25 0 0 1-2.25-2.25Z"/>
    </svg>
  );
}
function ThumbDownBold({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.75 11.25A2.25 2.25 0 0 1 19.5 13.5h-3.18a2.25 2.25 0 0 0-2.199 1.757l-.63 2.834A2.25 2.25 0 0 1 11.298 19.5c-.809 0-1.468-.659-1.468-1.468V15H5.15a2.25 2.25 0 0 1-2.219-2.639l1.05-5.25A2.25 2.25 0 0 1 6.17 6h7.33A2.25 2.25 0 0 1 15.75 8.25v3h3.75a2.25 2.25 0 0 1 2.25 2.25Z"/>
    </svg>
  );
}

// Connect trigger icon (grid of dots)
function IconGridDots({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    </svg>
  );
}
// Menu item icons
function IconUsers({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.33 0-7 1.17-7 3v2h7v-2c0-.71.24-1.37.65-1.94A8.2 8.2 0 0 1 8 14Z" />
    </svg>
  );
}
function IconCard({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2Zm0 4h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
    </svg>
  );
}
function IconShield({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.58 9.74 8 11 4.42-1.26 8-6 8-11V5Z" />
    </svg>
  );
}
function IconBolt({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M11 21 19 10h-5l3-8-8 11h5Z" />
    </svg>
  );
}

/** iOS-style compact calendar badge with time (size-able) */
function CalendarMini({
  day = 'Thu',
  date = '23',
  time = '11:15–11:45',
  size = 40,
  className = '',
}: {
  day?: string;
  date?: string;
  time?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid place-items-center rounded-lg bg-white border border-neutral-200 shadow-sm text-center leading-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Inspection ${day} ${date}, ${time}`}
      title={`Inspection ${day} ${date}, ${time}`}
    >
      <div className="text-[10px] -mt-0.5 font-medium text-red-600">{day}</div>
      <div className="text-[14px] -mt-0.5 font-bold text-neutral-900">{date}</div>
      <div className="text-[8px] -mt-0.5 text-neutral-500">{time}</div>
    </div>
  );
}

/* ========================= Top Controls ========================= */

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
        <IconGridDots />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30"
          role="menu"
        >
          <div className="px-2 py-1 text-[12px] text-neutral-500">Connect</div>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50">
            <IconUsers /> <span className="text-sm">Agents</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50">
            <IconCard /> <span className="text-sm">Finance</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50">
            <IconShield /> <span className="text-sm">Insurance</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50">
            <IconBolt /> <span className="text-sm">Energy</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================= Card ========================= */

function ListingCard({ L }: { L: Listing }) {
  const CAL_SIZE = 50; // 25% larger

  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header: aligned circles; Follow under agency */}
      <header className="flex items-center gap-3 p-5">
        {/* Agency glyph (same size as avatar) */}
        <div className="w-10 h-10 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none" aria-hidden>
            <path
              d="M7 6h7l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Agent */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold leading-tight truncate">{L.agent}</p>
            <p className="text-sm text-neutral-600 leading-tight truncate">{L.agency}</p>
            <button
              className="mt-1 text-[11px] rounded-full px-2 py-[2px] border border-neutral-200 bg-white hover:bg-neutral-50"
              aria-label="Follow"
            >
              + Follow
            </button>
          </div>
        </div>
      </header>

      {/* Media */}
      <div className="relative bg-neutral-100 h-[300px] sm:h-[360px] md:h-[380px] overflow-hidden">
        <img src={L.img} className="w-full h-full object-cover" alt="" />

        {/* Right-side ghost mini actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <GhostIconButton label="Like"><ThumbUpBold /></GhostIconButton>
          <GhostIconButton label="Dislike"><ThumbDownBold /></GhostIconButton>
          <GhostIconButton label="Info">
            <Ic.Info className="w-[22px] h-[22px] text-white" />
          </GhostIconButton>
          <GhostIconButton label="Map">
            <Ic.Pin className="w-[22px] h-[22px] text-white" />
          </GhostIconButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-5 border-t border-neutral-100">
        <div className="flex items-start justify-between gap-6">
          {/* Left: price + copy */}
          <div className="min-w-0">
            <p className="text-2xl font-bold">{L.price}</p>
            <p className="text-sm text-neutral-700 mt-1">{L.address}</p>
            <p className="text-sm text-neutral-600 mt-2">
              Elegant 2-bed in JLT with south light and EV charging.
            </p>
          </div>

        {/* Right: calendar pulled up near image; OPEN same width */}
          <div className="shrink-0 flex flex-col items-end gap-1 -mt-2">
            <CalendarMini day="Thu" date="23" time="11:15–11:45" size={CAL_SIZE} />
            <div
              style={{ width: CAL_SIZE }}
              className="text-[11px] text-center tracking-wide text-neutral-700"
            >
              OPEN
            </div>
          </div>
        </div>

        {/* Features */}
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
    </article>
  );
}

/* ========================= Extra Sections ========================= */

function ShortsRow() {
  return (
    <section className="my-6">
      <div className="flex items-end justify-between mb-2">
        <h3 className="text-sm font-semibold text-neutral-800">Shorts</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pr-1">
        {SHORTS.map((s) => (
          <div
            key={s.id}
            className="relative w-[170px] min-w-[170px] rounded-xl overflow-hidden bg-neutral-200 shadow-sm"
          >
            <img src={s.cover} className="w-full h-[260px] object-cover" alt="" />
            <div className="absolute bottom-1 right-1 text-[11px] px-1.5 py-0.5 rounded bg-black/70 text-white">
              {s.dur}s
            </div>
            <div className="p-2 text-xs text-neutral-800 line-clamp-2">{s.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentsRail() {
  return (
    <section className="my-6">
      <div className="mb-3 text-sm font-semibold text-neutral-800">Agents & Agencies</div>
      <div className="flex items-center gap-5">
        {AGENTS.map((a) => (
          <div key={a.id} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm" />
            <span className="text-xs text-neutral-600">{a.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HouseAd() {
  return (
    <section className="my-6">
      <a
        href="/agents"
        className="block rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm"
      >
        <div className="p-3 text-xs text-neutral-600">Sponsored • RealListr</div>
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-[220px] object-cover"
          alt=""
        />
      </a>
    </section>
  );
}

/* ========================= Page ========================= */

export default function FeedClean() {
  const INTERVAL = 6;

  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top bar: logo + segmented switch + CONNECT icon + search */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>

        <div className="flex items-center gap-3">
          {/* Segmented switch */}
          <div className="inline-flex rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <button className="px-3 py-1 text-sm bg-neutral-100">Domestic</button>
            <button className="px-3 py-1 text-sm hover:bg-neutral-50">Commercial</button>
          </div>

          {/* CONNECT dropdown trigger (single icon) */}
          <ConnectMenu />

          {/* Search */}
          <button
            aria-label="Search"
            className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50"
          >
            <Ic.Search />
          </button>
        </div>
      </div>

      {/* Top circular rail */}
      <section className="mb-6">
        <div className="flex items-center gap-6">
          {['Parina', 'Downtown', 'Marina', 'The Springs', 'Al Barsha'].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm" />
              <span className="text-xs text-neutral-600">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feed */}
      <div className="space-y-6">
        {LISTINGS.map((L, idx) => {
          const block: React.ReactNode[] = [<ListingCard key={L.id} L={L} />];

          const shouldInsert = (idx + 1) % INTERVAL === 0;
          if (shouldInsert) {
            block.push(<ShortsRow key={`shorts-${idx}`} />);
            block.push(<AgentsRail key={`agents-${idx}`} />);
            block.push(<HouseAd key={`ad-${idx}`} />);
          }

          return (
            <div key={`blk-${L.id}`} className="space-y-6">
              {block}
            </div>
          );
        })}
      </div>
    </main>
  );
}

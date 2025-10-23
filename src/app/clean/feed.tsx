'use client';

import { Ic } from '../../components/ghost/GhostIcons'
import React from 'react';

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

function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'green';
}) {
  const cls =
    tone === 'green'
      ? 'bg-green-100 text-green-800 ring-1 ring-green-200'
      : 'bg-neutral-100 text-neutral-800 ring-1 ring-neutral-200';
  return <span className={`text-[12px] rounded-full px-3 py-1 ${cls}`}>{children}</span>;
}

function ListingCard({ L }: { L: Listing }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          {/* Agency / brand glyph placeholder */}
          <div className="w-11 h-11 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none">
              <path
                d="M7 6h7l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Agent */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200" />
            <div>
              <p className="font-semibold leading-tight">{L.agent}</p>
              <p className="text-sm text-neutral-600 leading-tight">{L.agency}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-sm rounded-full px-3 py-1 border border-neutral-200 hover:bg-neutral-50">
            + Follow
          </button>
          <Pill tone="green">Open for Inspection</Pill>
          <Pill>Sat 11:15–11:45am</Pill>
        </div>
      </header>

      {/* Media */}
      <div className="relative bg-neutral-100 h-[380px] overflow-hidden">
        <img src={L.img} className="w-full h-full object-cover" alt="" />
        {/* Right-side action rail */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          {[
            { label: 'Like', icon: '👍' },
            { label: 'Dislike', icon: '👎' },
            { label: 'Info', icon: 'ℹ️' },
            { label: 'Map', icon: '📍' },
          ].map((a) => (
            <button
              key={a.label}
              aria-label={a.label}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur border border-neutral-200 shadow-sm grid place-items-center text-[15px] hover:bg-white"
            >
              {a.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="p-5 border-t border-neutral-100">
        <p className="text-2xl font-bold">{L.price}</p>
        <p className="text-sm text-neutral-700 mt-1">{L.address}</p>
        <p className="text-sm text-neutral-600 mt-2">
          Elegant 2-bed in JLT with south light and EV charging.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-700 mt-4">
          <span className="inline-flex items-center gap-1.5">
            <Ic.Bed /> 4
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Bath /> 2
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Car /> 2
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Home /> Home
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Land /> Land Size m²
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Solar /> Solar & wattage
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Charger /> EV Charger
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ic.Grass /> Grass: {L.grassType ?? 'None'}
          </span>
        </div>
      </footer>
    </article>
  );
}

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

export default function FeedClean() {
  // interleave extra rows every 6 items (simple, stable)
  const INTERVAL = 6;

  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top bar: logo + search */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>
        <button
          aria-label="Search"
          className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50"
        >
          🔍
        </button>
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

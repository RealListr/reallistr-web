'use client';

import React from 'react';
import ConnectMenu from '@/components/ConnectMenu';

const Ic = {
  Info: (p:{className?:string}) => (
    <svg viewBox=0

function GhostIconButton({ label, children, onClick, className = '' }:{
  label:string; children:React.ReactNode; onClick?:()=>void; className?:string;
}) {
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

function SpecsRow({ beds, baths, cars }:{beds:number;baths:number;cars:number}) {
  return (
    <div className="mt-3 flex items-center gap-4 text-[13px] text-neutral-700">
      <span className="inline-flex items-center gap-1.5"><Ic.Bed/> {beds} Beds</span>
      <span className="inline-flex items-center gap-1.5"><Ic.Bath/> {baths} Baths</span>
      <span className="inline-flex items-center gap-1.5"><Ic.Car/> {cars} Parking</span>
    </div>
  );
}

function MediaRail({ photos }:{photos:string[]}) {
  if (!photos?.length) return null;
  return (
    <div className="px-5 pb-4">
      <div className="mt-3 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {photos.map((src,i)=>(
          <img key={i} src={src} alt="" className="h-20 w-28 rounded-lg object-cover border border-neutral-200 shrink-0"/>
        ))}
      </div>
    </div>
  );
}

function CardCalendarButton() {
  return (
    <a
      href="/calendar"
      className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 border border-neutral-200 shadow-md grid place-items-center hover:bg-white"
      aria-label="Calendar"
    >
      <Ic.Calendar />
    </a>
  );
}

type Listing = {
  id: string;
  img: string;
  price: string;
  address: string;
  specs: { beds: number; baths: number; cars: number };
  photos: string[];
};

const P = (id: string) => `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;
const T = (id: string) => `https://images.unsplash.com/photo-${id}?q=60&w=400&auto=format&fit=crop`;

const LISTINGS: Listing[] = [
  {
    id: '1',
    img: P('1500530855697-b586d89ba3ee'),
    price: 'AED 4,250,000',
    address: 'One JLT, Jumeirah Lake Towers',
    specs: { beds: 2, baths: 2, cars: 1 },
    photos: [
      T('1500530855697-b586d89ba3ee'),
      T('1482192596544-9eb780fc7f66'),
      T('1508921912186-1d1a45ebb3c1'),
      T('1488330890490-c291ecf62571'),
    ],
  },
];

function ListingCard({ L }: { L: Listing }) {
  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center gap-3 p-5">
        <div className="w-10 h-10 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none" aria-hidden>
            <path d="M7 6h7l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-semibold leading-tight truncate">Aisha Patel</p>
          <p className="text-sm text-neutral-600 leading-tight truncate">Luxe Realty</p>
          <button className="mt-1 text-[11px] rounded-full px-2 py-[2px] border border-neutral-200 bg-white hover:bg-neutral-50">
            + Follow
          </button>
        </div>
      </header>

      {/* Media */}
      <div className="relative bg-neutral-100 h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img src={L.img} alt={L.address} className="w-full h-full object-cover" />

        {/* Right-side actions (NO Connect here) */}
        <div className="absolute right-1.5 sm:right-2 top-2 flex flex-col gap-2">
          <GhostIconButton label="Like"><Ic.Heart /></GhostIconButton>
          <GhostIconButton label="Info"><Ic.Info className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Map"><Ic.Pin className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Share"><Ic.Share /></GhostIconButton>
          <GhostIconButton label="Comments"><Ic.Comment /></GhostIconButton>
        </div>

        {/* Calendar inside card */}
        <CardCalendarButton />
      </div>

      {/* Footer + Specs */}
      <footer className="p-5 border-t border-neutral-100">
        <div className="min-w-0">
          <p className="text-2xl font-bold">{L.price}</p>
          <p className="text-sm text-neutral-700 mt-1">{L.address}</p>
          <p className="text-sm text-neutral-600 mt-2">
            Elegant 2-bed in JLT with south light and EV charging.
          </p>
          <SpecsRow {...L.specs}/>
        </div>
      </footer>

      {/* Media rail */}
      <MediaRail photos={L.photos}/>
    </article>
  );
}

function ToggleDC({ value='D', onChange }:{ value?:'D'|'C'; onChange?:(v:'D'|'C')=>void; }) {
  return (
    <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <button onClick={()=>onChange?.('D')} className={`px-2.5 py-1 text-sm leading-none ${value==='D'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}>D</button>
      <span className="text-neutral-300 select-none">|</span>
      <button onClick={()=>onChange?.('C')} className={`px-2.5 py-1 text-sm leading-none ${value==='C'?'bg-neutral-100 font-medium':'hover:bg-neutral-50'}`}>C</button>
    </div>
  );
}

export default function DashPage() {
  const [mode, setMode] = React.useState<'D'|'C'>('D');
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ToggleDC value={mode} onChange={setMode} />
          {/* Connects in the middle */}
          <ConnectMenu />
          <button aria-label="Search" className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50">
            {Ic.Search()}
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

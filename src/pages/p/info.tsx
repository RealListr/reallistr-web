'use client';

import React, { useState } from 'react';
import ConnectMenu from '@/components/ConnectMenu';
import AgentsLink from '@/components/AgentsLink';
import AgentsModal from '@/components/AgentsModal';

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
  Search: () => <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M12 21s-6.716-4.03-9.293-6.607A6 6 0 0 1 11.293 5.1L12 5.8l.707-.7A6 6 0 0 1 21.293 14.4C18.716 16.97 12 21 12 21Z"/></svg>,
  Share: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M14 9V5l7 7-7 7v-4H7a4 4 0 0 1-4-4V6h2v5a2 2 0 0 0 2 2h7Z"/></svg>,
  Comment: () => <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] text-white" fill="currentColor"><path d="M4 5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4.5 3.5A1 1 0 0 1 3 19v-2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><circle cx="9" cy="10.5" r="1.2"/><circle cx="12" cy="10.5" r="1.2"/><circle cx="15" cy="10.5" r="1.2"/></svg>,
  GhostHandshake: () => (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 13l3 3a3 3 0 0 0 4.24 0l2.26-2.26M10 11l2 2m-6.5 1.5L3 12l3-3 4 4" />
    </svg>
  ),
};

type Listing = { id: string; img: string; price: string; address: string; agent?: string; agency?: string; };
const LISTINGS: Listing[] = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  img: `https://images.unsplash.com/photo-${
    ['1500530855697-b586d89ba3ee','1482192596544-9eb780fc7f66','1508921912186-1d1a45ebb3c1','1488330890490-c291ecf62571','1501183638710-841dd1904471','1494526585095-c41746248156'][i%6]
  }?q=80&w=1600&auto=format&fit=crop`,
  price: 'AED 4,250,000',
  address: 'One JLT, Jumeirah Lake Towers',
  agent: 'Aisha Patel',
  agency: 'Luxe Realty',
}));

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

function ListingCard({ L, onOpenAgents }: { L: Listing; onOpenAgents: (id?: string)=>void; }) {
  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
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
            <button className="mt-1 text-[11px] rounded-full px-2 py-[2px] border border-neutral-200 bg-white hover:bg-neutral-50">
              + Follow
            </button>
          </div>
        </div>
      </header>

      <div className="relative bg-neutral-100 h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden">
        <img src={L.img} alt={L.address} className="w-full h-full object-cover" />
        <div className="absolute right-1.5 sm:right-2 top-2 flex flex-col gap-2">
          <GhostIconButton label="Like"><Ic.Heart /></GhostIconButton>
          <ConnectMenu compact className="self-start" />
          <GhostIconButton label="Info"><Ic.Info className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Map"><Ic.Pin className="w-[22px] h-[22px] text-white" /></GhostIconButton>
          <GhostIconButton label="Share"><Ic.Share /></GhostIconButton>
          <GhostIconButton label="Comments"><Ic.Comment /></GhostIconButton>
          {/* Agents: ghost icon (no yellow) + modal trigger */}
          <GhostIconButton label="Agents" onClick={() => onOpenAgents(L.id)} className="self-start text-white">
            <Ic.GhostHandshake />
          </GhostIconButton>
        </div>
      </div>

      <footer className="p-5 border-t border-neutral-100">
        <div className="min-w-0">
          <p className="text-2xl font-bold">{L.price}</p>
          <p className="text-sm text-neutral-700 mt-1">{L.address}</p>
          <p className="text-sm text-neutral-600 mt-2">
            Elegant 2-bed in JLT with south light and EV charging.
          </p>
        </div>
      </footer>
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

export default function FeedClean() {
  const [mode, setMode] = useState<'D'|'C'>('D');
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [agentsPropertyId, setAgentsPropertyId] = useState<string | undefined>(undefined);

  const openAgents = (id?: string) => { setAgentsPropertyId(id); setAgentsOpen(true); };
  const closeAgents = () => setAgentsOpen(false);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ToggleDC value={mode} onChange={setMode} />
          <ConnectMenu />
          {/* top-right: open modal */}
          <AgentsLink onClick={() => openAgents()} className="p-2 rounded-full hover:bg-neutral-100" />
          <button aria-label="Search" className="w-9 h-9 rounded-full bg-white border border-neutral-200 shadow-sm grid place-items-center hover:bg-neutral-50">
            <Ic.Search />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {LISTINGS.map((L) => (
          <ListingCard key={L.id} L={L} onOpenAgents={openAgents} />
        ))}
      </div>

      <AgentsModal open={agentsOpen} onClose={closeAgents} propertyId={agentsPropertyId} />
    </main>
  );
}

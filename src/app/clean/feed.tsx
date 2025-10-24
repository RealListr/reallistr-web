'use client';

import React, { useEffect, useRef, useState } from 'react';
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

/* ========================= Small ghost/mono icons ========================= */

function GhostIconButton({
  label,
  children,
  onClick,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
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

function IconHeart({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 21s-6.716-4.03-9.293-6.607A6 6 0 0 1 11.293 5.1L12 5.8l.707-.7A6 6 0 0 1 21.293 14.4C18.716 16.97 12 21 12 21Z" />
    </svg>
  );
}
function ToggleDC({
  value = 'D',
  onChange,
}: {
  value?: 'D' | 'C';
  onChange?: (v: 'D' | 'C') => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden"
      role="tablist"
      aria-label="Choose Domestic or Commercial"
      title={value === 'D' ? 'Domestic' : 'Commercial'}
    >
      <button
        role="tab"
        aria-selected={value === 'D'}
        onClick={() => onChange?.('D')}
        className={`px-2.5 py-1 text-sm leading-none ${
          value === 'D' ? 'bg-neutral-100 font-medium' : 'hover:bg-neutral-50'
        }`}
      >
        <span className="sr-only">Domestic</span>
        <span aria-hidden>D</span>
      </button>
      <span className="text-neutral-300 select-none">|</span>
      <button
        role="tab"
        aria-selected={value === 'C'}
        onClick={() => onChange?.('C')}
        className={`px-2.5 py-1 text-sm leading-none ${
          value === 'C' ? 'bg-neutral-100 font-medium' : 'hover:bg-neutral-50'
        }`}
      >
        <span className="sr-only">Commercial</span>
        <span aria-hidden>C</span>
      </button>
    </div>
  );
}
function IconShare({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 9V5l7 7-7 7v-4H7a4 4 0 0 1-4-4V6h2v5a2 2 0 0 0 2 2h7Z" />
    </svg>
  );
}
function IconComment({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      {/* bubble */}
      <path d="M4 5h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4.5 3.5A1 1 0 0 1 3 19v-2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      {/* dots */}
      <circle cx="9" cy="10.5" r="1.2" />
      <circle cx="12" cy="10.5" r="1.2" />
      <circle cx="15" cy="10.5" r="1.2" />
    </svg>
  );
}
function IconGridDots({ className = 'w-[22px] h-[22px] text-white' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    </svg>
  );
}
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

/** iOS-style compact calendar */
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

/* ========================= Top Connect (dropdown) ========================= */

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

/* ========================= Floating Comments (sheet) ========================= */

type Comment = {
  id: string;
  name: string;
  suburb?: string;
  isAgent?: boolean;
  isPinned?: boolean;
  time: string;
  body: string;
  likes: number;
  replies?: Comment[];
};

const DEMO: Comment[] = [
  {
    id:'c1', name:'Mina K.', suburb:'JLT', time:'2h', body:'How noisy is it at night near the highway?',
    likes:6, replies:[
      { id:'c1r1', name:'Aisha Patel', suburb:'Luxe Realty', isAgent:true, time:'1h', body:'After 9pm it’s pretty quiet; double glazing in bedrooms.', likes:12 }
    ]
  },
  { id:'c2', name:'Samir', suburb:'Marina', time:'3h', body:'Body corp fees estimate?', likes:2 }
];

function CommentsPanel({
  open,
  onClose,
  listingTitle,
}: {
  open: boolean;
  onClose: () => void;
  listingTitle: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return ()=>document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${open?'pointer-events-auto':'pointer-events-none'}`}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose} />
      {/* Slide-in sheet (floating window) */}
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl border-l border-neutral-200 transition-transform duration-200 ${open?'translate-x-0':'translate-x-full'}`}>
        {/* Header */}
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

        {/* Composer */}
        <Composer />

        {/* Thread */}
        <div className="px-4 pb-24">
          {DEMO.map(c => <CommentItem key={c.id} c={c} depth={0} />)}
        </div>
      </div>
    </div>
  );
}

function Composer() {
  const [text, setText] = useState('');
  const canPost = text.trim().length > 0;
  return (
    <div className="px-4 py-3 border-b border-neutral-200">
      <div className="flex gap-2 mb-2">
        {['Noise','Fees','Schools','Transport'].map(t=>(
          <button key={t} className="text-xs px-2 py-1 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50">{t}</button>
        ))}
      </div>
      <div className="flex items-end gap-2">
        <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 shrink-0" />
        <div className="flex-1">
          <textarea
            rows={1}
            placeholder="Reply to this listing…"
            value={text}
            onChange={e=>setText(e.target.value)}
            className="w-full resize-none outline-none text-sm bg-white placeholder:text-neutral-400"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-neutral-50" aria-label="Add image">
                <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M20 5H4a2 2 0 0 0-2 2v10h20V7a2 2 0 0 0-2-2Zm0 12H4v-2l4-4 3 3 5-5 4 4v4Z"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/></svg>
              </button>
              <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-neutral-50" aria-label="Attach doc">
                <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16h16V8Z"/><path fill="currentColor" d="M14 2v6h6"/></svg>
              </button>
              <button className="w-8 h-8 grid place-items-center rounded-md hover:bg-neutral-50" aria-label="Emoji">
                <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".08"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M8 14c.9 1.2 2.1 2 4 2s3.1-.8 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <button
              disabled={!canPost}
              className={`text-sm rounded-full px-3 py-1 border ${canPost?'bg-neutral-900 text-white border-neutral-900 hover:opacity-90':'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed'}`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-neutral-500">Anyone can reply • Replies may be quoted</div>
    </div>
  );
}

function CommentItem({ c, depth }:{ c: Comment; depth:number }) {
  const [showReplies, setShowReplies] = useState(true);
  return (
    <div className="py-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium truncate">{c.name}</span>
            {c.suburb && <span className="text-neutral-500 truncate">• {c.suburb}</span>}
            {c.isAgent && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border border-neutral-200">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12 2 4 5v6c0 5 3.6 9.7 8 11 4.4-1.3 8-6 8-11V5Z" fill="currentColor"/></svg>
                Agent
              </span>
            )}
            <span className="text-neutral-400 text-xs ml-auto">{c.time}</span>
          </div>
          <div className="mt-1 text-[15px] leading-5 text-neutral-900">{c.body}</div>
          <div className="mt-2 flex items-center gap-3 text-xs text-neutral-600">
            <button className="inline-flex items-center gap-1 hover:underline"><svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 21s-6.7-4.03-9.29-6.61A6 6 0 0 1 11.3 5.1l.7.7.7-.7A6 6 0 0 1 21.3 14.4C18.7 16.97 12 21 12 21Z" fill="currentColor"/></svg> {c.likes}</button>
            <button className="inline-flex items-center gap-1 hover:underline"><svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="currentColor" d="M14 9V5l7 7-7 7v-4H8a4 4 0 0 1-4-4V6h2v5a2 2 0 0 0 2 2h6Z"/></svg> Reply</button>
            <button className="hover:underline">Report</button>
          </div>
          {c.replies && c.replies.length>0 && (
            <div className="mt-3">
              <button onClick={()=>setShowReplies(v=>!v)} className="text-xs text-neutral-600 hover:underline">
                {showReplies ? `Hide replies (${c.replies.length})` : `View replies (${c.replies.length})`}
              </button>
              {showReplies && (
                <div className="mt-2 pl-4 border-l border-neutral-200">
                  {c.replies.map(r => <CommentItem key={r.id} c={r} depth={depth+1} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================= Listing Card ========================= */

function ListingCard({ L }: { L: Listing }) {
  const CAL_SIZE = 50;

  // Per-card connect (icon-only) + comments panel state
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

  return (
    <article className="relative rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header: agent/agency; Follow under agency */}
      <header className="flex items-center gap-3 p-5">
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
          {/* Like (heart) */}
          <GhostIconButton label="Like">
            <IconHeart />
          </GhostIconButton>

          {/* Per-card CONNECT (icon-only) */}
          <div className="relative" ref={cardMenuRef}>
            <GhostIconButton label="Connect" onClick={() => setMenuOpen((v) => !v)}>
              <IconGridDots />
            </GhostIconButton>
            {menuOpen && (
              <div className="absolute right-10 top-0 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg p-2 z-30">
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

          {/* Info + Map */}
          <GhostIconButton label="Info">
            <Ic.Info className="w-[22px] h-[22px] text-white" />
          </GhostIconButton>
          <GhostIconButton label="Map">
            <Ic.Pin className="w-[22px] h-[22px] text-white" />
          </GhostIconButton>

          {/* Share */}
          <GhostIconButton label="Share">
            <IconShare />
          </GhostIconButton>

          {/* Comments (icon-only, opens floating sheet) */}
          <GhostIconButton label="Comments" onClick={() => setCommentsOpen(true)}>
            <IconComment />
          </GhostIconButton>
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

          {/* Calendar + OPEN */}
          <div className="shrink-0 flex flex-col items-end gap-1 -mt-2">
            <CalendarMini day="Thu" date="23" time="11:15–11:45" size={CAL_SIZE} />
            <div style={{ width: CAL_SIZE }} className="text-[11px] text-center tracking-wide text-neutral-700">
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

      {/* Floating comments window (per card) */}
      <CommentsPanel
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        listingTitle={L.address}
      />
    </article>
  );
}


/* ========================= Extras ========================= */

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
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-full border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <button className="px-3 py-1 text-sm bg-neutral-100">Domestic</button>
            <button className="px-3 py-1 text-sm hover:bg-neutral-50">Commercial</button>
          </div>

          <ConnectMenu />

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

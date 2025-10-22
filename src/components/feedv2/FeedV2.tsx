'use client';
import { useEffect, useMemo, useState } from 'react';
import { FEED_V2_ENABLED, SHORTS_ROW_INTERVAL, AD_SLOT_INTERVAL, AGENTS_RAIL_INTERVAL_BASE, AGENTS_RAIL_INTERVAL_JITTER, SHOW_AD_SLOTS, SHOW_AGENTS_RAIL, SHOW_SHORTS_ROWS } from '@/src/lib/flags';
import ShortsRow, { Short } from './ShortsRow';
import AdSlot, { Ad } from './AdSlot';
import AgentsRail from './AgentsRail';

/* ---------- Avatars ---------- */
function CircleImg({ src, alt = '', size = 40, fallback = '' }:{
  src?: string; alt?: string; size?: number; fallback?: string;
}) {
  return (
    <div className="relative shrink-0 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200"
         style={{ width: size, height: size }} aria-label={alt}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> :
        <div className="w-full h-full grid place-items-center text-[12px] text-neutral-500">{fallback}</div>}
    </div>
  );
}

/* ---------- Mapbox ---------- */
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string | undefined;
async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const r = await fetch(url); const j = await r.json(); const f = j?.features?.[0];
    return f?.center || null;
  } catch { return null; }
}

/* ---------- Feed ---------- */
export default function FeedV2() {
  const [listings, setListings] = useState<any[]>([]);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [filter, setFilter] = useState<{kind:'agent'|'agency'; value:string} | null>(null);

  useEffect(() => {
    fetch('/api/listings').then(r=>r.json()).then(setListings).catch(console.error);
    if (SHOW_SHORTS_ROWS) fetch('/api/shorts').then(r=>r.json()).then(setShorts).catch(()=>{});
    if (SHOW_AD_SLOTS)    fetch('/api/ads').then(r=>r.json()).then(setAds).catch(()=>{});
  }, []);

  const filteredListings = useMemo(()=>{
    if(!filter) return listings;
    const key = filter.kind === 'agent' ? 'agent' : 'agency';
    return listings.filter(l => (l[key]||'').toLowerCase() === filter.value.toLowerCase());
  },[listings,filter]);

  const content: JSX.Element[] = [];
  let shortIdx = 0, adIdx = 0;

  const jitterSeed = listings[0]?.id?.length || 0;
  const railOffset = (jitterSeed % 3) - 1; // -1,0,1
  const RAIL_INTERVAL = Math.max(1, AGENTS_RAIL_INTERVAL_BASE + railOffset);

  filteredListings.forEach((item, idx) => {
    content.push(<ListingCard key={`card-${item.id}`} item={item} setFilter={setFilter} />);
    const at = idx + 1;

    // Shorts row every N
    if (SHOW_SHORTS_ROWS && at % SHORTS_ROW_INTERVAL === 0) {
      const slice = shorts.slice(shortIdx, shortIdx + 6);
      if (slice.length) content.push(<ShortsRow key={`shorts-${at}`} items={slice} />);
      shortIdx += slice.length;
    }

    // Ad slot every N
    if (SHOW_AD_SLOTS && at % AD_SLOT_INTERVAL === 0) {
      const ad = ads[adIdx];
      if (ad) { content.push(<AdSlot key={`ad-${ad.id}`} ad={ad} />); adIdx++; }
    }

    // Agents rail around 6 (5–7)
    if (SHOW_AGENTS_RAIL && at % RAIL_INTERVAL === 0) {
      const railItems = buildRailItems(listings).slice(0,14);
      if (railItems.length) content.push(
        <AgentsRail key={`rail-${at}`} items={railItems}
          onPick={(c)=> setFilter({ kind: c.kind, value: c.label }) } />
      );
    }
  });

  if (!content.length) return <p className="text-center text-neutral-500 p-6">No listings yet.</p>;

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Filter chip */}
      {filter ? (
        <div className="mb-2">
          <button onClick={()=>setFilter(null)} className="text-sm bg-neutral-100 border border-neutral-200 rounded-full px-3 py-1">
            ✕ {filter.kind === 'agent' ? 'Agent' : 'Agency'}: {filter.value}
          </button>
        </div>
      ) : null}
      {content}
    </div>
  );
}

/* Build a deduped rail from current listings */
function buildRailItems(list: any[]){
  const setA = new Set<string>(), setG = new Set<string>();
  const agents = list
    .filter(l=>l.agent)
    .filter(l=> (setA.has(l.agent)? false : setA.add(l.agent)))
    .map((l:any)=>({ id:`a-${l.agent}`, label:l.agent, image:l.agentAvatarUrl, kind:'agent' as const }));
  const agencies = list
    .filter(l=>l.agency)
    .filter(l=> (setG.has(l.agency)? false : setG.add(l.agency)))
    .map((l:any)=>({ id:`g-${l.agency}`, label:l.agency, image:l.agencyLogoUrl, kind:'agency' as const }));
  return [...agents, ...agencies];
}

/* ---------- Card ---------- */
function ListingCard({ item, setFilter }:{ item:any; setFilter:(f:any)=>void }) {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  useEffect(() => { if (!MAPBOX_TOKEN || !item.address) return; geocode(item.address).then(setCoords); }, [item.address]);
  const mapLink = useMemo(() => {
    if (!MAPBOX_TOKEN || !coords) return null;
    const [lng, lat] = coords;
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+000(${lng},${lat})/${lng},${lat},14,0/800x400?access_token=${MAPBOX_TOKEN}`;
  }, [coords]);
  const initials = (item.agent || '?').split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase();

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button className="focus:outline-none" onClick={()=> item.agency && setFilter({kind:'agency', value:item.agency})}>
            <CircleImg src={item.agencyLogoUrl} alt={`${item.agency || 'Agency'} logo`} size={40} />
          </button>
          <div className="flex items-center gap-3">
            <button className="focus:outline-none" onClick={()=> item.agent && setFilter({kind:'agent', value:item.agent})}>
              <CircleImg src={item.agentAvatarUrl} alt={`${item.agent || 'Agent'} avatar`} size={40} fallback={initials} />
            </button>
            <div>
              <p className="font-semibold leading-tight">{item.agent}</p>
              <p className="text-sm text-neutral-600 leading-tight">{item.agency}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.inspection ? (
            <span className="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1">Open: {item.inspection}</span>
          ) : null}
          {mapLink ? (
            <a href={mapLink} target="_blank" rel="noreferrer" className="text-sm border px-3 py-1 rounded-full hover:bg-neutral-50">Map</a>
          ) : null}
        </div>
      </header>

      {/* Media */}
      <div className="bg-neutral-100 h-[280px] sm:h-[340px] xl:h-[380px] overflow-hidden">
        {item.videoUrl ? (
          <video src={item.videoUrl} controls playsInline className="w-full h-full object-cover" />
        ) : item.imageUrl ? (
          <img src={item.imageUrl} alt={item.address || 'Listing'} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">(Listing Media)</div>
        )}
      </div>

      {/* Details */}
      <footer className="p-4 space-y-2 border-t border-neutral-100">
        <p className="text-xl font-bold">{item.price}</p>
        <p className="text-sm text-neutral-700">{item.address}</p>

        {/* Icon row (using your /public icons as before) */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-800 pt-2 border-t border-neutral-100 mt-2">
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/bed.svg" width="16" height="16" alt=""/>{item.beds ?? 0}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/bath.svg" width="16" height="16" alt=""/>{item.baths ?? 0}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/car.svg"  width="16" height="16" alt=""/>{item.cars ?? 0}</span>
          {item.propertyType ? <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/home.svg" width="16" height="16" alt=""/>{item.propertyType}</span> : null}
          {item.landSizeSqm > 0 ? <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/land.svg" width="16" height="16" alt=""/>{item.landSizeSqm} m²</span> : null}
          {item.solarWattage > 0 ? <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/solar.svg" width="16" height="16" alt=""/>{item.solarWattage} W</span> : null}
          {item.evCharger && item.evCharger !== 'None' ? <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/charger.svg" width="16" height="16" alt=""/>{item.evCharger}</span> : null}
          {item.grassType && item.grassType !== 'None' ? <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/grass.svg" width="16" height="16" alt=""/>{item.grassType}</span> : null}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-3">
          {item.tags?.map((t: string) => (
            <span key={t} className="text-xs border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-600">{t}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}

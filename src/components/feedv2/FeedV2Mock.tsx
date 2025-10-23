'use client';
import { useMemo, useState } from 'react';
import ShortsRow, { Short } from './ShortsRow';
import AdSlot, { Ad } from './AdSlot';
import AgentsRail from './AgentsRail';

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

/* ---------- MOCK DATA (no network) ---------- */
const listings = Array.from({length:12}).map((_,i)=>({
  id: String(i+1),
  agent: i%2 ? 'Mina Khan' : 'Aisha Patel',
  agency: i%2 ? 'Harbor Estates' : 'Luxe Realty',
  agentAvatarUrl: '', // leave blank to see initials fallback
  agencyLogoUrl: '',
  address: `Dubai Marina Tower ${i+1}`,
  price: `AED ${ (3500000 + i*50000).toLocaleString() }`,
  beds: (i%4)+2, baths: (i%3)+1, cars: (i%2)+1,
  propertyType: 'Home',
  landSizeSqm: 200 + i*5,
  solarWattage: 3200 + i*100,
  evCharger: 'Type 2',
  grassType: 'Artificial',
  tags: ['Home','Land Size m²','Solar & wattage','EV Charger'],
  inspection: 'Sat 11:15–11:45am',
  imageUrl: `https://picsum.photos/seed/reallistr${i}/1200/800`,
  videoUrl: ''
}));

const shorts: Short[] = Array.from({length:12}).map((_,i)=>({
  id: String(1000+i),
  title: `Tour #${i+1}`,
  creator: i%2? 'Luxe Realty' : 'Harbor Estates',
  avatarUrl: '',
  videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  coverImageUrl: `https://picsum.photos/seed/short${i}/720/1280`,
  durationSec: 12+i
}));

const ads: Ad[] = [
  { id:'ad1', imageUrl:'/ads/house-list-with-reallistr.jpg', clickUrl:'#', label:'Sponsored', advertiser:'RealListr' },
  { id:'ad2', imageUrl:'/ads/house-boost-with-shorts.jpg',  clickUrl:'#', label:'Sponsored', advertiser:'RealListr' },
  { id:'ad3', imageUrl:'/ads/house-join-agency.jpg',        clickUrl:'#', label:'Sponsored', advertiser:'RealListr' },
];

/* ---------- HELPERS ---------- */
function buildRailItems(list: any[]){
  const setA = new Set<string>(), setG = new Set<string>();
  const agents = list.filter(l=>l.agent).filter(l=> (setA.has(l.agent)? false : setA.add(l.agent)))
    .map((l:any)=>({ id:`a-${l.agent}`, label:l.agent, image:l.agentAvatarUrl, kind:'agent' as const }));
  const agencies = list.filter(l=>l.agency).filter(l=> (setG.has(l.agency)? false : setG.add(l.agency)))
    .map((l:any)=>({ id:`g-${l.agency}`, label:l.agency, image:l.agencyLogoUrl, kind:'agency' as const }));
  return [...agents, ...agencies];
}

/* ---------- CARD ---------- */
function ListingCard({ item, setFilter }:{ item:any; setFilter:(f:any)=>void }) {
  const initials = (item.agent || '?').split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase();
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button onClick={()=> item.agency && setFilter({kind:'agency', value:item.agency})} className="focus:outline-none">
            <CircleImg src={item.agencyLogoUrl} alt={`${item.agency || 'Agency'} logo`} size={40} />
          </button>
          <div className="flex items-center gap-3">
            <button onClick={()=> item.agent && setFilter({kind:'agent', value:item.agent})} className="focus:outline-none">
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
        </div>
      </header>

      <div className="bg-neutral-100 h-[280px] sm:h-[340px] xl:h-[380px] overflow-hidden">
        {item.videoUrl ? (
          <video src={item.videoUrl} controls playsInline className="w-full h-full object-cover" />
        ) : item.imageUrl ? (
          <img src={item.imageUrl} alt={item.address || 'Listing'} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">(Listing Media)</div>
        )}
      </div>

      <footer className="p-4 space-y-2 border-t border-neutral-100">
        <p className="text-xl font-bold">{item.price}</p>
        <p className="text-sm text-neutral-700">{item.address}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-800 pt-2 border-t border-neutral-100 mt-2">
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/bed.svg" width="16" height="16" alt=""/>{item.beds ?? 0}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/bath.svg" width="16" height="16" alt=""/>{item.baths ?? 0}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/car.svg"  width="16" height="16" alt=""/>{item.cars ?? 0}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/home.svg" width="16" height="16" alt=""/>{item.propertyType}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/land.svg" width="16" height="16" alt=""/>{item.landSizeSqm} m²</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/solar.svg" width="16" height="16" alt=""/>{item.solarWattage} W</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/charger.svg" width="16" height="16" alt=""/>{item.evCharger}</span>
          <span className="inline-flex items-center gap-1.5"><img src="/icons/ghost/grass.svg" width="16" height="16" alt=""/>{item.grassType}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {item.tags?.map((t: string) => (
            <span key={t} className="text-xs border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-600">{t}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}

/* ---------- MAIN DEMO FEED ---------- */
export default function FeedV2Mock() {
  const [filter, setFilter] = useState<{kind:'agent'|'agency'; value:string} | null>(null);
  const list = useMemo(()=>{
    if(!filter) return listings;
    const key = filter.kind === 'agent' ? 'agent' : 'agency';
    return listings.filter(l => (l[key]||'').toLowerCase() === filter.value.toLowerCase());
  },[filter]);

  const content: JSX.Element[] = [];
  let shortIdx = 0, adIdx = 0;

  // rail jitter: 5–7
  const jitterSeed = listings[0]?.id?.length || 0;
  const railOffset = (jitterSeed % 3) - 1;
  const RAIL_INTERVAL = Math.max(1, 6 + railOffset);
  const SHORTS_ROW_INTERVAL = 6;
  const AD_SLOT_INTERVAL = 6;

  list.forEach((item, idx) => {
    content.push(<ListingCard key={`card-${item.id}`} item={item} setFilter={setFilter} />);
    const at = idx + 1;

    if (at % SHORTS_ROW_INTERVAL === 0) {
      const slice = shorts.slice(shortIdx, shortIdx + 6);
      if (slice.length) content.push(<ShortsRow key={`shorts-${at}`} items={slice} />);
      shortIdx += slice.length;
    }
    if (at % AD_SLOT_INTERVAL === 0) {
      const ad = ads[adIdx];
      if (ad) { content.push(<AdSlot key={`ad-${ad.id}`} ad={ad} />); adIdx++; }
    }
    if (at % RAIL_INTERVAL === 0) {
      const railItems = buildRailItems(listings).slice(0,14);
      if (railItems.length) content.push(
        <AgentsRail key={`rail-${at}`} items={railItems}
          onPick={(c)=> setFilter({ kind: c.kind, value: c.label }) } />
      );
    }
  });

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
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

'use client';
import { useEffect, useMemo, useState } from 'react';

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

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string | undefined;

async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const r = await fetch(url); const j = await r.json(); const f = j?.features?.[0];
    return f?.center || null;
  } catch { return null; }
}

export default function FeedV2() {
  const [listings, setListings] = useState<any[]>([]);
  useEffect(() => { fetch('/api/listings').then(r => r.json()).then(setListings).catch(console.error); }, []);
  if (!listings.length) return <p className="text-center text-neutral-500 p-6">No listings yet.</p>;
  return <div className="space-y-6 p-4 max-w-4xl mx-auto">
    {listings.map(item => <ListingCard key={item.id} item={item} />)}
  </div>;
}

function ListingCard({ item }:{ item:any }) {
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
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <CircleImg src={item.agencyLogoUrl} alt={`${item.agency || 'Agency'} logo`} size={40} />
          <div className="flex items-center gap-3">
            <CircleImg src={item.agentAvatarUrl} alt={`${item.agent || 'Agent'} avatar`} size={40} fallback={initials} />
            <div>
              <p className="font-semibold leading-tight">{item.agent}</p>
              <p className="text-sm text-neutral-600 leading-tight">{item.agency}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.inspection ? <span className="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1">Open: {item.inspection}</span> : null}
          {mapLink ? <a href={mapLink} target="_blank" rel="noreferrer" className="text-sm border px-3 py-1 rounded-full hover:bg-neutral-50">Map</a> : null}
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

        {/* TEMP: icons removed to verify the oversized SVG is gone */}
        <div className="pt-2 border-t border-neutral-100 mt-2 text-sm text-neutral-600">
          {/* icons row will be re-added next */}
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

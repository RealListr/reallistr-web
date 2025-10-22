'use client';
import { useEffect, useMemo, useState } from 'react';

/* ---------- Round avatar helper ---------- */
function CircleImg({
  src,
  alt = '',
  size = 40,
  fallback = '',
}: {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: string;
}) {
  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200"
      style={{ width: size, height: size }}
      aria-label={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full grid place-items-center text-[12px] text-neutral-500">
          {fallback}
        </div>
      )}
    </div>
  );
}

/* ---------- Ghost mini icons (inline SVGs) ---------- */
const iconCls = 'w-4 h-4 stroke-[1.5] text-neutral-600';
const I = {
  Bed: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M3 17v-6a2 2 0 0 1 2-2h4a4 4 0 0 1 4 4v4M3 13h18M21 17V9a2 2 0 0 0-2-2h-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Bath: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M5 13v-2a3 3 0 0 1 3-3h1M7 18h10M4 14h16l-1 3a3 3 0 0 1-2.8 2H7.8A3 3 0 0 1 5 17l-1-3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Car: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M3 14l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 9l2 5M5 14h14M7.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Home: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Land: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M3 17h18M4 13l4-2 4 2 4-2 4 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Solar: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 5.6l1.4-1.4M8 14h8l1-4H7l1 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Charger: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M7 7h6a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Zm9 2h1a2 2 0 0 1 2 2v1.5a2.5 2.5 0 0 1-2.5 2.5H16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Grass: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" className={iconCls} {...p}>
      <path
        d="M3 20h18M6 20v-4m3 4v-3m3 3v-4m3 4v-3m3 3v-4M6 16l2-2m-2 2l-2-2m6 3l2-2m4 2l2-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* ---------- Mapbox helpers ---------- */
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string | undefined;

async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const r = await fetch(url);
    const j = await r.json();
    const f = j?.features?.[0];
    return f?.center || null; // [lng, lat]
  } catch {
    return null;
  }
}

/* ---------- Feed ---------- */
export default function FeedV2() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.json())
      .then(setListings)
      .catch(console.error);
  }, []);

  if (!listings.length)
    return <p className="text-center text-neutral-500 p-6">No listings yet.</p>;

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {listings.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  );
}

/* ---------- Card ---------- */
function ListingCard({ item }: { item: any }) {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !item.address) return;
    geocode(item.address).then(setCoords);
  }, [item.address]);

  const mapLink = useMemo(() => {
    if (!MAPBOX_TOKEN || !coords) return null;
    const [lng, lat] = coords;
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+000(${lng},${lat})/${lng},${lat},14,0/800x400?access_token=${MAPBOX_TOKEN}`;
  }, [coords]);

  const initials = (item.agent || '?')
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <CircleImg
            src={item.agencyLogoUrl}
            alt={`${item.agency || 'Agency'} logo`}
            size={40}
          />
          <div className="flex items-center gap-3">
            <CircleImg
              src={item.agentAvatarUrl}
              alt={`${item.agent || 'Agent'} avatar`}
              size={40}
              fallback={initials}
            />
            <div>
              <p className="font-semibold leading-tight">{item.agent}</p>
              <p className="text-sm text-neutral-600 leading-tight">
                {item.agency}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {item.inspection ? (
            <span className="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1">
              Open: {item.inspection}
            </span>
          ) : null}
          {MAPBOX_TOKEN && mapLink ? (
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm border px-3 py-1 rounded-full hover:bg-neutral-50"
            >
              Map
            </a>
          ) : null}
        </div>
      </header>

      {/* Media (video > image) */}
      <div className="bg-neutral-100 h-[280px] sm:h-[340px] xl:h-[380px] overflow-hidden">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.address || 'Listing'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            (Listing Media)
          </div>
        )}
      </div>

      {/* Details */}
      <footer className="p-4 space-y-2 border-t border-neutral-100">
        <p className="text-xl font-bold">{item.price}</p>
        <p className="text-sm text-neutral-700">{item.address}</p>

        {/* Icons row (ghost mini icons) */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-800 pt-2 border-t border-neutral-100 mt-2">
          <span className="inline-flex items-center gap-1.5">
            <I.Bed />
            {item.beds ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <I.Bath />
            {item.baths ?? 0}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <I.Car />
            {item.cars ?? 0}
          </span>

          {item.propertyType ? (
            <span className="inline-flex items-center gap-1.5">
              <I.Home />
              {item.propertyType}
            </span>
          ) : null}

          {item.landSizeSqm > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <I.Land />
              {item.landSizeSqm} m²
            </span>
          ) : null}

          {item.solarWattage > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <I.Solar />
              {item.solarWattage} W
            </span>
          ) : null}

          {item.evCharger && item.evCharger !== 'None' ? (
            <span className="inline-flex items-center gap-1.5">
              <I.Charger />
              {item.evCharger}
            </span>
          ) : null}

          {item.grassType && item.grassType !== 'None' ? (
            <span className="inline-flex items-center gap-1.5">
              <I.Grass />
              {item.grassType}
            </span>
          ) : null}
        </div>

        {/* Optional tag chips (unchanged) */}
        <div className="flex flex-wrap gap-2 pt-3">
          {item.tags?.map((t: string) => (
            <span
              key={t}
              className="text-xs border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-600"
            >
              {t}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}

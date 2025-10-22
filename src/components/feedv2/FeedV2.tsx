'use client';
import { useEffect, useState } from 'react';

export default function FeedV2() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(setListings)
      .catch(console.error);
  }, []);

  if (!listings.length)
    return <p className="text-center text-neutral-500 p-6">No listings yet.</p>;

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {listings.map((item) => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item.address || item.area || ''
        )}`;
        return (
          <article
            key={item.id}
            className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {/* Agency logo */}
                <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border">
                  {item.agencyLogoUrl ? (
                    <img src={item.agencyLogoUrl} alt="" className="w-full h-full object-cover" />
                  ) : null}
                </div>
                {/* Agent avatar + names */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border">
                    {item.agentAvatarUrl ? (
                      <img src={item.agentAvatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-semibold">{item.agent}</p>
                    <p className="text-sm text-neutral-600">{item.agency}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.inspection ? (
                  <span className="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1">
                    Open: {item.inspection}
                  </span>
                ) : null}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm border px-3 py-1 rounded-full hover:bg-neutral-50"
                >
                  Map
                </a>
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
                  alt={item.address || item.title || 'Listing'}
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

              {/* Icons: keep simple (swap to your icon set later) */}
              <div className="flex gap-4 text-sm text-neutral-700 pt-2 border-t border-neutral-100 mt-2">
                <span>🛏️ {item.beds ?? 0}</span>
                <span>🛁 {item.baths ?? 0}</span>
                <span>🚗 {item.cars ?? 0}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                {item.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>
        );
      })}
    </div>
  );
}

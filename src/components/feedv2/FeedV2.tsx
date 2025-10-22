'use client';
import { useEffect, useState } from 'react';

export default function FeedV2() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(setListings)
      .catch(console.error);
  }, []);

  if (!listings.length)
    return <p className="text-center text-neutral-500 p-6">No listings available yet.</p>;

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      {listings.map((item: any) => (
        <article
          key={item.id}
          className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm"
        >
          <header className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{item.agent}</p>
              <p className="text-sm text-neutral-600">{item.agency}</p>
            </div>
            <div className="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1">
              Open: {item.inspection}
            </div>
          </header>

          <div className="bg-neutral-100 h-[280px] sm:h-[320px] flex items-center justify-center text-neutral-400">
            (Listing Image)
          </div>

          <footer className="p-4 space-y-2 border-t border-neutral-100">
            <p className="text-xl font-bold">{item.price}</p>
            <p className="text-sm text-neutral-700">{item.address}</p>

            <div className="flex gap-3 text-sm text-neutral-600 pt-2 border-t border-neutral-100 mt-2">
              <span>🛏 {item.beds}</span>
              <span>🛁 {item.baths}</span>
              <span>🚗 {item.cars}</span>
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
      ))}
    </div>
  );
}

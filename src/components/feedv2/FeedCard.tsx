'use client';
import type { Listing } from '@/lib/feed/types';

function formatAED(n: number) {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n);
}

export default function FeedCard({ item }: { item: Listing }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Agent */}
      <header className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-900">{item.agent.name}</div>
          <div className="text-xs text-neutral-500">{item.agent.brokerage}</div>
        </div>
        <button className="rounded-full border px-3 py-1 text-xs hover:bg-neutral-50">+ Follow</button>
      </header>

      {/* Media placeholder */}
      <div className="mb-4 h-44 w-full overflow-hidden rounded-xl bg-neutral-100" />

      {/* Price & address */}
      <div className="mb-1 text-lg font-semibold">{formatAED(item.priceAED)}</div>
      <div className="mb-2 text-sm text-neutral-600">
        {item.address}, {item.suburb}
      </div>

      {/* Facts */}
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-700">
        <span>🛏 {item.beds}</span>
        <span>🛁 {item.baths}</span>
        <span>🚗 {item.cars}</span>
        <span>🏷 {item.type}</span>
      </div>

      {/* Tags */}
      {item.tags?.length ? (
        <div className="flex flex-wrap gap-1">
          {item.tags.map((t, i) => (
            <span key={`${t}-${i}`} className="rounded-full border px-2 py-0.5 text-xs text-neutral-700">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

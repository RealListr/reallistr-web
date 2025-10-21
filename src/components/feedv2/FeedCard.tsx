'use client';
import type { Listing } from '@/lib/feed/types';

export default function FeedCard({ item }: { item: Listing }) {
  return (
    <div className="rounded-xl border p-4 bg-white/80 shadow-sm hover:shadow-md transition mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="leading-tight">
          <div className="font-medium">{item.agent.name}</div>
          <div className="text-xs text-gray-500">{item.agent.brokerage}</div>
        </div>
      </div>

      <div className="aspect-[16/9] w-full rounded-lg bg-gray-100 mb-3 grid place-items-center text-gray-400 text-sm">
        Preview image
      </div>

      <div className="text-lg font-semibold">AED {item.priceAED.toLocaleString()}</div>
      <div className="text-sm text-gray-600">
        {item.address}, {item.suburb} • {item.beds} bd • {item.baths} ba • {item.cars} car • {item.type}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((t) => (
          <span key={t} className="text-xs border rounded-full px-2 py-0.5 bg-gray-50">{t}</span>
        ))}
      </div>
    </div>
  );
}

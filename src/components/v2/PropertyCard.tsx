'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/data/properties';
import { cn } from '@/lib/utils'; // if you don't have cn, replace cn(...) with the joined classes

function PriceBadge({ p }: { p: Property }) {
  const label = p.type === 'rental'
    ? `$${p.price.toLocaleString()}/wk`
    : `$${p.price.toLocaleString()}`;
  return (
    <span className="rounded-full bg-black/90 px-2.5 py-1 text-xs font-medium text-white shadow">
      {label}
    </span>
  );
}

export default function PropertyCard({ p }: { p: Property }) {
  const shortsCount = p.shorts?.length ?? 0;
  const podsCount = p.pods?.length ?? 0;

  return (
    <Link
      href={`/v2/p/${p.id}`}
      className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Image
          src={p.hero || '/placeholder.svg'}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          priority={true}
        />
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-gray-900/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">{p.type}</span>
          <PriceBadge p={p} />
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5">
          {shortsCount > 0 && (
            <span className="rounded-full bg-pink-600/90 px-2 py-0.5 text-[10px] font-medium text-white">
              ListrShorts • {shortsCount}
            </span>
          )}
          {podsCount > 0 && (
            <span className="rounded-full bg-indigo-600/90 px-2 py-0.5 text-[10px] font-medium text-white">
              ListrPods • {podsCount}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1 p-4">
        <h3 className="line-clamp-1 font-medium">{p.title}</h3>
        <p className="text-sm text-muted-foreground">{p.suburb}</p>
        <p className="text-sm text-muted-foreground">
          {p.beds} bd · {p.baths} ba · {p.cars} car
        </p>
      </div>
    </Link>
  );
}

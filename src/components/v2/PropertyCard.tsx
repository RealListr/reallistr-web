'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/data/properties';

export default function PropertyCard({ p }: { p: Property }) {
  const priceLabel =
    p.type === 'rental' || p.type === 'commercial'
      ? `$${p.price.toLocaleString()}/wk`
      : `$${p.price.toLocaleString()}`;

  return (
    <Link
      href={`/v2/p/${p.id}`}
      className="block rounded-2xl border hover:shadow-md transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-muted">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover"
          priority={false}
        />
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          {p.type.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <div className="text-base font-semibold">{priceLabel}</div>
        <div className="text-sm text-muted-foreground">{p.title}</div>
        <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
          <span>{p.beds} bd</span>
          <span>{p.baths} ba</span>
          <span>{p.area} m²</span>
        </div>
        <div className="mt-2 text-xs">{p.city}, {p.country}</div>
      </div>
    </Link>
  );
}

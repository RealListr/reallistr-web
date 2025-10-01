'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/data/properties';

export default function PropertyCard({ p }: { p: Property }) {
  const priceLabel =
    p.type === 'rental' ? `$${p.price.toLocaleString()}/wk` : `$${p.price.toLocaleString()}`;

  return (
    <article className="rounded-2xl border p-3 hover:shadow-sm transition">
      <Link href={`/v2/p/${p.id}`} className="block overflow-hidden rounded-xl">
        <Image
          src={p.image}
          alt={p.title}
          width={800}
          height={500}
          className="h-48 w-full object-cover"
          priority
        />
      </Link>
      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{p.title}</h3>
          <span className="text-sm font-medium text-foreground/80">{priceLabel}</span>
        </div>
        <p className="text-sm text-muted-foreground">{p.address}</p>
        <div className="text-xs text-muted-foreground">{p.beds} bd · {p.baths} ba · {p.area} m²</div>
      </div>
    </article>
  );
}

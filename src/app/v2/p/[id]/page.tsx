// Server component (no "use client")
import { notFound } from 'next/navigation';
import DetailClient from './DetailClient';
import { PROPERTIES, type Property } from '@/data/properties';

// Helpers to read alternative keys without 'any'
type MaybeBeds = Property & { bedrooms?: number; beds?: number };
type MaybeBaths = Property & { bathrooms?: number; baths?: number };
type MaybeCars = Property & { cars?: number; parking?: number };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = PROPERTIES.find(p => String(p.id) === id) as Property | undefined;
  if (!item) notFound();

  const priceLabel =
    item.type === 'rental'
      ? `$${(item.price ?? 0).toLocaleString()}/wk`
      : `$${(item.price ?? 0).toLocaleString()}`;

  const beds = (item as MaybeBeds).bedrooms ?? (item as MaybeBeds).beds;
  const baths = (item as MaybeBaths).bathrooms ?? (item as MaybeBaths).baths;
  const cars = (item as MaybeCars).cars ?? (item as MaybeCars).parking;

  const facts = [
    { label: 'Type', value: item.type === 'rental' ? 'RENTAL' : 'SALE' },
    { label: 'Bedrooms', value: beds != null ? String(beds) : '-' },
    { label: 'Bathrooms', value: baths != null ? String(baths) : '-' },
    { label: 'Parking', value: cars != null ? String(cars) : '-' },
    { label: 'Suburb', value: item.suburb ?? '-' },
    { label: 'Price', value: priceLabel },
  ];

  return (
    <DetailClient
      hero={item.images?.[0] ?? '/placeholder.svg'}
      address={item.title}
      suburb={item.suburb}
      priceLabel={priceLabel}
      status={item.type === 'rental' ? 'RENTAL' : 'SALE'}
      shorts={item.shorts ?? []}
      pods={item.pods ?? []}
      description={item.description ?? '—'}
      facts={facts}
      agents={item.agents ?? []}
    />
  );
}

// Server component (no "use client")
import { notFound } from 'next/navigation';
import DetailClient from './DetailClient';
import { PROPERTIES, type Property } from '@/data/properties';
import type { AgentLite } from '@/types/media';

// Helpers to read alternative keys without `any`
type MaybeBeds = Property & { bedrooms?: number; beds?: number };
type MaybeBaths = Property & { bathrooms?: number; baths?: number };
type MaybeCars = Property & { cars?: number; parking?: number };
type MaybeAgents = Property & { agents?: AgentLite[] };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = PROPERTIES.find(p => String(p.id) === id) as Property | undefined;
  if (!item) notFound();

  const priceLabel =
    item.type === 'rental'
      ? `$${(item.price ?? 0).toLocaleString()}/wk`
      : `$${(item.price ?? 0).toLocaleString()}`;

  const facts = [
    { label: 'Type', value: item.type === 'rental' ? 'RENTAL' : 'SALE', icon: 'size' as const },
    { label: 'Bedrooms', value: String((item as MaybeBeds).bedrooms ?? (item as MaybeBeds).beds ?? '-') , icon: 'bed' as const },
    { label: 'Bathrooms', value: String((item as MaybeBaths).bathrooms ?? (item as MaybeBaths).baths ?? '-') , icon: 'bath' as const },
    { label: 'Parking', value: String((item as MaybeCars).cars ?? (item as MaybeCars).parking ?? '-') , icon: 'car' as const },
  ];

  const agents = (item as MaybeAgents).agents ?? [];

  return (
    <DetailClient
      hero={item.images?.[0] ?? '/placeholder/hero.jpg'}
      address={item.address ?? '—'}
      suburb={item.suburb ?? item.city ?? ''}
      priceLabel={priceLabel}
      status={item.type === 'rental' ? 'RENTAL' : 'SALE'}
      shorts={item.shorts ?? []}
      pods={item.pods ?? []}
      description={item.description ?? '—'}
      facts={facts}
      agents={agents}
    />
  );
}

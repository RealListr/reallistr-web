// Server component (no "use client")
import { notFound } from 'next/navigation';
import DetailClient from './DetailClient';
import { PROPERTIES, type Property } from '@/data/properties';
import type { AgentLite } from '@/types/media';

// Optional extensions for heterogeneous seed data
type MaybeBeds   = Property & { bedrooms?: number; beds?: number };
type MaybeBaths  = Property & { bathrooms?: number; baths?: number };
type MaybeCars   = Property & { cars?: number; parking?: number };

// Address variants we've seen in seeds
type MaybeAddress = Property & {
  address?: string;
  streetAddress?: string;
  line1?: string;
};
// Suburb/City variants
type MaybeSuburb = Property & {
  suburb?: string;
  neighborhood?: string;
  city?: string;
  town?: string;
  region?: string;
};
// Agents (optional in seeds)
type MaybeAgents = Property & { agents?: AgentLite[] };

// Best-effort helpers
function pickAddress(p: Property): string {
  const m = p as MaybeAddress;
  return m.address ?? m.streetAddress ?? m.line1 ?? '—';
}
function pickSuburb(p: Property): string {
  const m = p as MaybeSuburb;
  return m.suburb ?? m.neighborhood ?? m.city ?? m.town ?? m.region ?? '';
}

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
      address={pickAddress(item)}
      suburb={pickSuburb(item)}
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

// Server component (no "use client")
import { notFound } from 'next/navigation';
import DetailClient from './DetailClient';
import { PROPERTIES, type Property } from '@/data/properties';
import type { AgentLite, Pod, Short } from '@/types/media';

type MaybeBeds   = Property & { bedrooms?: number; beds?: number };
type MaybeBaths  = Property & { bathrooms?: number; baths?: number };
type MaybeCars   = Property & { cars?: number; parking?: number };
type MaybeAddress = Property & { address?: string; streetAddress?: string; line1?: string };
type MaybeSuburb  = Property & { suburb?: string; city?: string; locality?: string };
type MaybeLatLng  = Property & { lat?: number; lng?: number; latitude?: number; longitude?: number };
// Typed media/agents on heterogeneous seed objects
type MaybeMedia   = Property & { shorts?: Short[]; pods?: Pod[]; agents?: AgentLite[] };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = PROPERTIES.find(p => String(p.id) === id) as Property | undefined;
  if (!item) notFound();

  const address =
    (item as MaybeAddress).address ??
    (item as MaybeAddress).streetAddress ??
    (item as MaybeAddress).line1 ??
    '—';

  const suburb =
    (item as MaybeSuburb).suburb ??
    (item as MaybeSuburb).city ??
    (item as MaybeSuburb).locality ??
    '';

  const priceLabel =
    item.type === 'rental'
      ? `$${(item.price ?? 0).toLocaleString()}/wk`
      : `$${(item.price ?? 0).toLocaleString()}`;

  const facts = [
    { label: 'Type', value: item.type === 'rental' ? 'RENTAL' : 'SALE' as const },
    { label: 'Bedrooms', value: String((item as MaybeBeds).bedrooms ?? (item as MaybeBeds).beds ?? '-') , icon: 'bed' as const },
    { label: 'Bathrooms', value: String((item as MaybeBaths).bathrooms ?? (item as MaybeBaths).baths ?? '-') , icon: 'bath' as const },
    { label: 'Parking', value: String((item as MaybeCars).cars ?? (item as MaybeCars).parking ?? '-') , icon: 'car' as const },
  ];

  const lat = (item as MaybeLatLng).lat ?? (item as MaybeLatLng).latitude;
  const lng = (item as MaybeLatLng).lng ?? (item as MaybeLatLng).longitude;

  // Typed reads (no any)
  const shorts: Short[] = (item as MaybeMedia).shorts ?? [];
  const pods: Pod[] = (item as MaybeMedia).pods ?? [];
  const agents: AgentLite[] = (item as MaybeMedia).agents ?? [];

  return (
    <DetailClient
      hero={item.images?.[0] ?? '/images/hero-fallback.jpg'}
      address={address}
      suburb={suburb}
      priceLabel={priceLabel}
      status={item.type === 'rental' ? 'RENTAL' : 'SALE'}
      description={item.description ?? '—'}
      facts={facts}
      shorts={shorts}
      pods={pods}
      agents={agents}
      lat={typeof lat === 'number' ? lat : undefined}
      lng={typeof lng === 'number' ? lng : undefined}
    />
  );
}

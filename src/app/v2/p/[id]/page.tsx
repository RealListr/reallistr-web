// Server component (no "use client")
import { notFound } from 'next/navigation';
import DetailClient from './DetailClient';
import { PROPERTIES, type Property } from '@/data/properties';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const item = PROPERTIES.find(p => String(p.id) === params.id) as Property | undefined;
  if (!item) notFound();

  const priceLabel =
    item.type === 'rental'
      ? `$${(item.price ?? 0).toLocaleString()}/wk`
      : `$${(item.price ?? 0).toLocaleString()}`;

  const facts = [
    { label: 'Type', value: item.type === 'rental' ? 'RENTAL' : 'SALE' },
    { label: 'Bedrooms', value: String((item as any).bedrooms ?? item.beds ?? '-') },
    { label: 'Bathrooms', value: String((item as any).bathrooms ?? item.baths ?? '-') },
    { label: 'Parking', value: String(item.cars ?? (item as any).parking ?? '-') },
    { label: 'Suburb', value: item.suburb ?? '' },
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

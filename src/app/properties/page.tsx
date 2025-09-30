'use client';
import AppShell from '@/components/shell/AppShell';
import PropertyFilters from '@/components/filters/PropertyFilters';
import { PropertyCard } from '@/components/cards/PropertyCard';

export default function PropertiesPage() {
  const items = [
    { slug: '23-ocean-ave-bondi', title: '23 Ocean Ave, Bondi', price: '$2,450,000', suburb: 'Bondi', beds: 4, baths: 3, cars: 2, heroUrl: 'https://picsum.photos/seed/house1/1200/800', listingType: 'sale' as const },
    { slug: '12-market-st-sydney', title: '12 Market St, Sydney', price: '$1,180 pw', suburb: 'Sydney CBD', beds: 2, baths: 2, cars: 1, heroUrl: 'https://picsum.photos/seed/apt1/1200/800', listingType: 'rental' as const },
  ];

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Browse Properties</h1>
      </div>
      <div className="mb-6"><PropertyFilters onChange={() => { /* wire up later */ }} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <PropertyCard key={p.slug} {...p} />
        ))}
      </div>
    </AppShell>
  );
}
export const dynamic = 'force-dynamic'

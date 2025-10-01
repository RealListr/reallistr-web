'use client';
import AppFrame from '@/components/v2/AppFrame';
import PropertyCard from '@/components/v2/PropertyCard';

const MOCK = [
  { id: 'au-syd-001', title: 'Harbour-view Apartment', price: 'A$1.25M', address: 'Sydney NSW', meta: '2 bed • 2 bath • 1 pkg' },
  { id: 'au-mel-002', title: 'Brunswick Terrace', price: 'A$910k', address: 'Melbourne VIC', meta: '3 bed • 1.5 bath' },
  { id: 'au-bne-003', title: 'Riverside Townhome', price: 'A$1.05M', address: 'Brisbane QLD', meta: '3 bed • 2 bath • 2 pkg' },
];

export default function V2Properties() {
  return (
    <AppFrame>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <div className="text-sm text-neutral-500">Mock data • Wireframe stage</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK.map((p) => (<PropertyCard key={p.id} {...p} />))}
      </div>
    </AppFrame>
  );
}

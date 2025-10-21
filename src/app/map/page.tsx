'use client';

import dynamic from 'next/dynamic';

// Load the map only on the client; avoids SSR crashes and route hijack.
const PropertyMap = dynamic(
  () => import('@/components/maps/PropertyMap').then(m => m.default ?? m),
  { ssr: false, loading: () => <div style={{height: 480}} /> }
);

export default function MapPage() {
  return <PropertyMap />;
}

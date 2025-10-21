'use client';

import dynamic from 'next/dynamic';

const PropertyMap = dynamic(
  () => import('@/components/maps/PropertyMap').then(m => m.default ?? m),
  { ssr: false, loading: () => <div style={{height: 480}} /> }
);

export default function MapPage() {
  return <PropertyMap />;
}

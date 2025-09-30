'use client';

import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

// Load on client only to avoid SSR errors
const MapGL = dynamic(() => import('react-map-gl').then(m => m.default), { ssr: false });
const Marker = dynamic(() => import('react-map-gl').then(m => m.Marker), { ssr: false });
const NavigationControl = dynamic(() => import('react-map-gl').then(m => m.NavigationControl), { ssr: false });

type MapPreviewProps = { lat: number; lng: number; height?: number | string };

export default function MapPreview({ lat, lng, height = 260 }: MapPreviewProps) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ height }}>
      <MapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 14 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-left" />
        <Marker longitude={lng} latitude={lat} />
      </MapGL>
    </div>
  );
}

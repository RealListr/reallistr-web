'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapBoxMini({ lat, lng }: { lat:number; lng:number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 13,
      interactive: false,
    });
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    return () => map.remove();
  }, [lat, lng]);
  return <div ref={ref} className="w-full h-48 rounded-xl overflow-hidden border border-neutral-200" />;
}

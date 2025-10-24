'use client';

import { useEffect, useRef } from 'react';

/**
 * Safe client-only Leaflet wrapper:
 * - No SSR usage of `L`
 * - Only touches `window.L` inside useEffect (browser)
 * - No imports from 'leaflet' / 'react-leaflet' to avoid server eval
 */
export default function PropertyMap({
  lat = 25.074282,
  lng = 55.145424,
  zoom = 14,
  className = 'w-full h-[280px] rounded-xl overflow-hidden border border-neutral-200',
}: {
  lat?: number;
  lng?: number;
  zoom?: number;
  className?: string;
}) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const Lwin = (window as any).L;
    if (!Lwin || !el.current) return;

    const map = Lwin.map(el.current).setView([lat, lng], zoom);
    Lwin
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
      })
      .addTo(map);

    Lwin.marker([lat, lng]).addTo(map);

    return () => {
      try { map.remove(); } catch { /* no-op */ }
    };
  }, [lat, lng, zoom]);

  return <div ref={el} className={className} />;
}

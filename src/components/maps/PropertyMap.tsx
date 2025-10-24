'use client';
import React, { useEffect, useRef } from 'react';

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
};

/**
 * Client-only Leaflet map:
 * - No global `L`
 * - Leaflet loaded dynamically inside useEffect (browser only)
 * - Safe to import anywhere without breaking SSR/prerender
 */
export default function PropertyMap({ lat, lng, zoom = 14, className = '' }: Props) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !el.current) return;

    let map: any;

    (async () => {
      // Dynamically import Leaflet on the client
      const mod: any = await import('leaflet');
      const L = mod?.default?.map ? mod.default : mod;

      map = L.map(el.current).setView([lat, lng], zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' })
        .addTo(map);
      L.marker([lat, lng]).addTo(map);
    })();

    return () => {
      try { map?.remove?.(); } catch {}
    };
  }, [lat, lng, zoom]);

  return (
    <div
      ref={el}
      className={`w-full h-[240px] rounded-xl border border-neutral-200 ${className}`}
      aria-label="Map"
    />
  );
}

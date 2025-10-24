'use client';
import React, { useEffect, useRef } from 'react';

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
};

export default function PropertyMap({ lat, lng, zoom = 14, className = '' }: Props) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Guard: never run on server
    if (typeof window === 'undefined' || !el.current) return;

    let map: any;
    let leaflet: any;

    (async () => {
      // Dynamically load leaflet only on the client
      const mod: any = await import('leaflet'); // handled by next.config alias on server anyway
      leaflet = mod?.default?.map ? mod.default : mod;

      map = leaflet.map(el.current).setView([lat, lng], zoom);
      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '' })
        .addTo(map);
      leaflet.marker([lat, lng]).addTo(map);
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

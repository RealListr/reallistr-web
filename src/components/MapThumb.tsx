'use client';
import React from 'react';

export default function MapThumb({
  lat, lng, zoom=13, w=160, h=110, className=''
}: {lat:number; lng:number; zoom?:number; w?:number; h?:number; className?:string}) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || (globalThis as any).process?.env?.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;

  const src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ff0000(${lng},${lat})/${lng},${lat},${zoom},0,0/${w}x${h}@2x?access_token=${token}`;

  return (
    <a
      href={`https://www.google.com/maps?q=${lat},${lng}`}
      target="_blank" rel="noopener noreferrer"
      className={`rounded-xl overflow-hidden border border-white/60 shadow-lg block ${className}`}
      aria-label="Open location in Maps"
      title="Open location in Maps"
    >
      <img src={src} alt="Map preview" className="block w-[160px] h-[110px] object-cover" />
    </a>
  );
}

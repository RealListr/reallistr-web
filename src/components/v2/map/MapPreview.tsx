'use client';
import { useEffect, useRef, useState } from 'react';

type Props = { lat: number; lng: number; zoom?: number; height?: number };

export default function MapPreview({ lat, lng, zoom = 14, height = 320 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !ref.current) return;

    (async () => {
      const mapboxgl = await import('mapbox-gl');
      mapboxgl.default.accessToken = token;
      const map = new mapboxgl.default.Map({
        container: ref.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [lng, lat],
        zoom,
      });
      new mapboxgl.default.Marker().setLngLat([lng, lat]).addTo(map);
      setReady(true);
      return () => map.remove();
    })();
  }, [lat, lng, zoom]);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-xl border"
      style={{ height }}
      aria-label="Location map"
    >
      {!ready && (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          Loading map…
        </div>
      )}
    </div>
  );
}

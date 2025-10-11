"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Props = { lat: number; lng: number; zoom?: number; height?: number };

export default function PropertyMap({ lat, lng, zoom = 14, height = 420 }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mapEl.current) return;

      map = L.map(mapEl.current).setView([lat, lng], zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      L.marker([lat, lng]).addTo(map);
    })();

    return () => {
      try { map?.remove(); } catch {/* noop */}
    };
  }, [lat, lng, zoom]);

  return <div ref={mapEl} style={{ height, border: "1px solid #333", borderRadius: 12 }} />;
}

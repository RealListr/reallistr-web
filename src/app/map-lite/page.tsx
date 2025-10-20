"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function MapLite() {
  const mapEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    (async () => {
      const L = (await import("leaflet")).default; // client-only import
      if (!mapEl.current) return;

      map = L.map(mapEl.current).setView([25.074282, 55.145424], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      L.marker([25.074282, 55.145424]).addTo(map);
    })();

    return () => { try { map?.remove(); } catch {} };
  }, []);

  return (
    <main style={{ padding: 24, background: "#000", color: "#fff" }}>
      <h1 style={{ marginBottom: 12 }}>Leaflet Lite ✅</h1>
      <div ref={mapEl} style={{ height: 360, border: "1px solid #333", borderRadius: 12 }} />
    </main>
  );
}

import * as React from "react";

const wrap: React.CSSProperties = { position: "fixed", inset: 0, background: "#eef2f7" };
const mapStyle: React.CSSProperties = { position: "absolute", inset: 0 };
const hud: React.CSSProperties = {
  position: "fixed", left: 12, top: 12, zIndex: 10,
  background: "rgba(255,255,255,.9)", border: "1px solid #e5e7eb",
  borderRadius: 12, padding: "10px 12px", boxShadow: "0 10px 24px rgba(15,23,42,.15)",
  fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial"
};

export default function MapPage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  React.useEffect(() => {
    (async () => {
      try {
        if (!ref.current) return;
        if (!token) { setErr("Missing NEXT_PUBLIC_MAPBOX_TOKEN"); return; }
        const { default: mapboxgl } = await import("mapbox-gl");
        (mapboxgl as any).accessToken = token;

        const u = new URL(window.location.href);
        const address = u.searchParams.get("address") || "12 Example Street, Bondi NSW";

        const geo = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${token}`
        ).then(r => r.json());
        const feat = geo?.features?.[0];
        const center = feat?.center || [151.2743, -33.8915]; // Bondi fallback

        const map = new (mapboxgl as any).Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center, zoom: 15,
        });

        map.addControl(new (mapboxgl as any).NavigationControl({ visualizePitch: true }), "top-right");
        new (mapboxgl as any).Marker({ color: "#111827" }).setLngLat(center).addTo(map);
      } catch (e: any) {
        setErr(e?.message || "Map init failed");
      }
    })();
  }, [token]);

  return (
    <div style={wrap}>
      <div style={hud}>
        <strong style={{fontWeight:600}}>Map</strong>
        {err ? <div style={{color:"#b91c1c", marginTop:6}}>Error: {err}</div> : null}
      </div>
      <div ref={ref} style={mapStyle} />
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" />
    </div>
  );
}

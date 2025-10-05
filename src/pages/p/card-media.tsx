import * as React from "react";
import MediaChooser from "@/components/rail/MediaChooser";
import MediaOverlay from "@/components/rail/MediaOverlay";
import { demoMedia, openMediaChooser, openMediaOverlay } from "@/lib/mediaBus";

export default function CardWithMedia() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
        Gallery demo (safe)
      </h1>

      {/* Minimal placeholder “card” content to avoid importing PropertyCard on SSR */}
      <div style={{
        maxWidth: 980, margin: "0 auto", borderRadius: 16,
        border: "1px solid rgba(148,163,184,.35)", background: "rgba(255,255,255,.9)",
        boxShadow: "0 10px 24px rgba(15,23,42,.08)", padding: 16
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>12 Example Street, Bondi NSW</div>
            <div style={{ fontSize: 14, color: "#374151" }}>$2,450,000</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => openMediaChooser(demoMedia)}
              style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,.35)", background: "#fff" }}>
              View gallery (chooser)
            </button>
            <button
              onClick={() => openMediaOverlay(demoMedia, 0)}
              style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,.35)", background: "#fff" }}>
              Open overlay directly
            </button>
          </div>
        </div>
      </div>

      {/* Mount the existing components once */}
      <MediaChooser />
      <MediaOverlay />
    </main>
  );
}

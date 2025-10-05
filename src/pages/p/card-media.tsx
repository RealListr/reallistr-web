import * as React from "react";
import PropertyCard from "@/app/components/PropertyCard";
import MediaChooser from "@/components/rail/MediaChooser";
import MediaOverlay from "@/components/rail/MediaOverlay";
import { demoMedia, openMediaChooser, openMediaOverlay } from "@/lib/mediaBus";

export default function CardWithMedia() {
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>Property Card + Gallery</h1>

      {/* The property card you already have */}
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        <PropertyCard />
      </div>

      {/* Quick actions to prove wiring */}
      <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
        <button
          onClick={() => openMediaChooser(demoMedia)}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,.35)", background: "white" }}
        >
          View gallery (chooser)
        </button>
        <button
          onClick={() => openMediaOverlay(demoMedia, 0)}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(148,163,184,.35)", background: "white" }}
        >
          Open overlay directly
        </button>
      </div>

      {/* Mount your existing rail components once */}
      <MediaChooser />
      <MediaOverlay />
    </main>
  );
}

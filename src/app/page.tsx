"use client";

import dynamic from "next/dynamic";
import AuthGate from "@/auth/AuthGate";
import GlobalMarketSwitch from "@/components/GlobalMarketSwitch";

// Client-only dynamic imports (match Oct 11 working setup)
const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), {
  ssr: false,
  loading: () => <div style={{ height: 320, border: "1px solid #333", borderRadius: 12 }} />,
});

const PropertyUpload = dynamic(() => import("@/properties/PropertyUpload"), {
  ssr: false,
  loading: () => <div style={{ height: 120 }} />,
});

export default function Page() {
  return (
    <main style={{ padding: 16, background: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>RealListr — Map</h1>
        {/* Domestic / Commercial toggle */}
        <GlobalMarketSwitch />
      </div>

      {/* Map */}
      <PropertyMap lat={25.074282} lng={55.145424} />

      <p style={{ marginTop: 12 }}>
        Canary:{" "}
        <a href="/map-lite" style={{ color: "#0bf" }}>
          /map-lite
        </a>
      </p>

      {/* Upload section (signed-in users) */}
      <div style={{ marginTop: 16 }}>
        <AuthGate>
          <PropertyUpload />
        </AuthGate>
      </div>
    </main>
  );
}

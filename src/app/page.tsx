"use client";

import dynamic from "next/dynamic";
import { MarketProvider } from "@/context/MarketContext";
import GlobalMarketSwitch from "@/components/GlobalMarketSwitch";

// Lazy so Supabase is never evaluated during prerender
const AuthGate = dynamic(() => import("@/auth/AuthGate"), { ssr: false });
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
    <MarketProvider>
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
          <GlobalMarketSwitch />
        </div>

        {/* Map (Oct-11 baseline) */}
        <PropertyMap lat={25.074282} lng={55.145424} />

        <p style={{ marginTop: 12 }}>
          Canary:{" "}
          <a href="/map-lite" style={{ color: "#0bf" }}>
            /map-lite
          </a>
        </p>

        {/* Uploader behind auth (unchanged, just lazy) */}
        <div style={{ marginTop: 16 }}>
          <AuthGate>
            <PropertyUpload />
          </AuthGate>
        </div>
      </main>
    </MarketProvider>
  );
}

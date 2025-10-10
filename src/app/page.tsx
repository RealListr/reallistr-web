"use client";

import dynamic from "next/dynamic";
import AuthGate from "@/auth/AuthGate";

// Render Leaflet only on the client
const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 320, border: "1px solid #333", borderRadius: 12 }} />
  ),
});

// Render the uploader only on the client
const PropertyUpload = dynamic(() => import("@/properties/PropertyUpload"), {
  ssr: false,
  loading: () => <div style={{ height: 120 }} />,
});

export default function Page() {
  return (
    <AuthGate>
      <main
        style={{
          padding: 16,
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <h1 style={{ margin: "12px 0 16px", fontSize: 20 }}>
          RealListr — Map Smoke Test
        </h1>

        <PropertyMap lat={25.074282} lng={55.145424} />

        <div style={{ marginTop: 16 }}>
          <PropertyUpload />
        </div>
      </main>
    </AuthGate>
  );
}

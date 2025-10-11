"use client";

import dynamic from "next/dynamic";
import AuthGate from "@/auth/AuthGate";

// Map is client-only
const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), {
  ssr: false,
  loading: () => <div style={{ height: 320, border: "1px solid #333", borderRadius: 12 }} />,
});

// Uploader is client-only (signed-in users)
const PropertyUpload = dynamic(() => import("@/properties/PropertyUpload"), {
  ssr: false,
  loading: () => <div style={{ height: 120 }} />,
});

export default function Page() {
  return (
    <main style={{ padding: 16, background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ margin: "12px 0 16px", fontSize: 20 }}>RealListr — Map</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
      <div style={{ marginTop: 16 }}>
        <AuthGate>
          <PropertyUpload />
        </AuthGate>
      </div>
    </main>
  );
}

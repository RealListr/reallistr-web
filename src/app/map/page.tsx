"use client";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), { ssr: false });

export default function MapPage() {
  return (
    <main style={{ padding: 24, background: "#000", color: "#fff" }}>
      <h1 style={{ marginBottom: 12 }}>Map Smoke ✅</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
    </main>
  );
}

"use client";
import React from "react";
import dynamic from "next/dynamic";
const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), { ssr: false });
export default function ForcePage() {
  return (
    <div style={{ padding: 16, color: "white", background: "black", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 12 }}>Forced Route — It’s Our Page Now ✅</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
    </div>
  );
}

"use client";
import React from "react";
import PropertyMap from "@/components/maps/PropertyMap";
export default function AlwaysPage() {
  return (
    <div style={{ padding: 16, color: "white", background: "black", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 12 }}>RealListr — Forced Route (Emergency Mode)</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
    </div>
  );
}

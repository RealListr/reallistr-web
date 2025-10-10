"use client";
import React from "react";
import PropertyMap from "@/components/maps/PropertyMap";

export default function Page() {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>RealListr — Map Smoke Test</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
    </div>
  );
}

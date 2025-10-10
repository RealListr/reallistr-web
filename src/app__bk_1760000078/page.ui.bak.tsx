"use client";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropertyMap from "@/components/maps/PropertyMap";

function MaskedToken() {
  const tok = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const masked = tok ? tok.slice(0, 6) + "…" + tok.slice(-4) : "(empty)";
  return (
    <div style={{ fontFamily: "monospace", fontSize: 12 }}>
      NEXT_PUBLIC_MAPBOX_TOKEN: <strong>{masked}</strong>
    </div>
  );
}

export default function Page() {
  // simple console breadcrumbs
  console.log("Home smoke test mounted");
  console.log("Token present?", Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN));

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>Home Map Smoke Test</h1>
      <MaskedToken />
      <div style={{ marginTop: 12 }}>
        <PropertyMap lat={25.074282} lng={55.145424} />
      </div>
    </div>
  );
}

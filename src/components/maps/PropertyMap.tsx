"use client";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

export default function PropertyMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div style={{ height: 320, width: "100%", borderRadius: 12, overflow: "hidden", border: "1px solid #333" }}>
      <MapContainer center={[lat, lng]} zoom={14} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={icon} />
      </MapContainer>
    </div>
  );
}

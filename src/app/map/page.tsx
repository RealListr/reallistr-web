"use client";
import GhostSlider from "@/components/GhostSlider";
import PropertyMap from "@/components/maps/PropertyMap"; // existing component

export default function MapPage() {
  return (
    <div className="p-6">
      <header className="flex items-center gap-3 mb-4">
        <h1 className="text-4xl font-extrabold">RealListr — Map</h1>
        <GhostSlider />
      </header>
      <div className="rounded-xl overflow-hidden border border-black/5 shadow-sm">
        <PropertyMap />
      </div>
    </div>
  );
}

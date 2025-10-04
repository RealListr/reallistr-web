"use client";
import * as React from "react";
import {
  Home, Car, Plug, CreditCard, MapPin, Phone, Shield, SunMedium,
  Bed, Bath, Circle, Info, Settings, List, Heart, Bookmark,
  Image as ImageIcon, Video as VideoIcon, Headphones,
  ChevronRight, X, Ruler
} from "lucide-react";

type IconName =
  | "home" | "car" | "plug" | "card" | "map" | "phone" | "shield" | "sun"
  | "bed" | "beds" | "bedroom" | "bedrooms"
  | "bath" | "baths" | "bathroom" | "bathrooms"
  | "circle" | "info" | "settings" | "list" | "heart" | "bookmark"
  | "solar" | "ev" | "like" | "media" | "data" | "ruler" | "floorplan"
  | "image" | "video" | "headphones" | "chevron-right" | "x";

const MAP: Partial<Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>>> = {
  // base
  home: Home, car: Car, plug: Plug, card: CreditCard, map: MapPin, phone: Phone, shield: Shield, sun: SunMedium,
  // bedrooms / bathrooms
  bed: Bed, beds: Bed, bedroom: Bed, bedrooms: Bed,
  bath: Bath, baths: Bath, bathroom: Bath, bathrooms: Bath,
  // misc / UI
  circle: Circle, info: Info, data: Info, settings: Settings, list: List, heart: Heart, like: Heart, bookmark: Bookmark,
  // product terms you’ve used in the rail
  solar: SunMedium, ev: Plug, media: ImageIcon, ruler: Ruler, floorplan: Ruler,
  // media UI
  image: ImageIcon, video: VideoIcon, headphones: Headphones, "chevron-right": ChevronRight, x: X,
};

export default function Icon({
  name,
  className,
  ...props
}: { name: IconName } & React.SVGProps<SVGSVGElement>) {
  const C = MAP[name];
  if (!C) {
    if (process.env.NODE_ENV !== "production") {
      // Helps catch any remaining unmapped names during dev
      console.warn("[Icon] unknown icon name:", name);
    }
    return <Circle className={className ?? "h-5 w-5"} aria-hidden="true" {...props} />;
  }
  return <C className={className ?? "h-5 w-5"} aria-hidden="true" {...props} />;
}

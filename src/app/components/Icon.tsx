import * as React from "react";
import * as Lucide from "lucide-react";
import {
  Home, Car, Plug, CreditCard, MapPin, Phone, Shield, SunMedium,
  Bed, Bath, Circle, Info, Settings, List, Heart, Bookmark
} from "lucide-react";

type AnyIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Common labels → concrete icons
const ALIASES: Record<string, AnyIcon> = {
  home: Home,
  car: Car,
  plug: Plug,
  ev: Plug,
  power: Plug,
  card: CreditCard,
  map: MapPin,
  phone: Phone,
  shield: Shield,

  // 🔆 solar & synonyms
  solar: SunMedium,
  sun: SunMedium,
  energy: SunMedium,

  // ❤️ like & synonyms
  like: Heart,
  liked: Heart,
  favourite: Heart,
  favorite: Heart,
  heart: Heart,
  save: Bookmark,
  saved: Bookmark,
  bookmark: Bookmark,

  // real-estate labels
  bed: Bed, beds: Bed, bedroom: Bed, bedrooms: Bed,
  bath: Bath, baths: Bath, bathroom: Bath, bathrooms: Bath,

  // misc ui
  info: Info, settings: Settings, list: List,
};

// kebab/snake/spaces → PascalCase for Lucide dynamic lookup
function toPascal(input: string) {
  return (input || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

function resolveIcon(name?: string): AnyIcon {
  if (!name) return Circle;
  const key = name.toLowerCase().trim();
  if (key in ALIASES) return ALIASES[key];

  // Try Lucide export name (e.g., "map-pin" -> "MapPin")
  const pascal = toPascal(key);
  const dynamic = (Lucide as Record<string, AnyIcon | undefined>)[pascal];
  return dynamic ?? Circle; // never undefined -> no prerender crash
}

export default function Icon({
  name,
  className,
  ...props
}: { name?: string } & React.SVGProps<SVGSVGElement>) {
  const C = resolveIcon(name);
  return <C className={className ?? "h-5 w-5"} aria-hidden="true" {...props} />;
}

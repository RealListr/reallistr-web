import * as React from "react";
import * as Lucide from "lucide-react";
import {
  Home, Car, Plug, CreditCard, MapPin, Phone, Shield, SunMedium,
  Bed, Bath, Circle, Info, Settings, List, Heart, Bookmark
} from "lucide-react";

type AnyIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ALIASES: Record<string, AnyIcon> = {
  home: Home, car: Car, plug: Plug, ev: Plug, power: Plug,
  card: CreditCard, map: MapPin, phone: Phone, shield: Shield,

  // solar + synonyms
  solar: SunMedium, sun: SunMedium, energy: SunMedium,

  // like + synonyms
  like: Heart, liked: Heart, favourite: Heart, favorite: Heart,
  heart: Heart, save: Bookmark, saved: Bookmark, bookmark: Bookmark,

  // real-estate
  bed: Bed, beds: Bed, bedroom: Bed, bedrooms: Bed,
  bath: Bath, baths: Bath, bathroom: Bath, bathrooms: Bath,

  // misc
  info: Info, settings: Settings, list: List,
};

function toPascal(s: string) {
  return (s||"").replace(/[_-]+/g," ").trim()
    .split(/\s+/).map(w=>w[0]?.toUpperCase()+w.slice(1).toLowerCase()).join("");
}

function resolveIcon(name?: string): AnyIcon {
  if (!name) return Circle;
  const key = name.toLowerCase().trim();
  if (key in ALIASES) return ALIASES[key];
  const dyn = (Lucide as Record<string, AnyIcon|undefined>)[toPascal(key)];
  return dyn ?? Circle;
}

export default function Icon({
  name, className, ...props
}: { name?: string } & React.SVGProps<SVGSVGElement>) {
  const C = resolveIcon(name);
  return <C className={className ?? "h-5 w-5"} aria-hidden="true" {...props} />;
}

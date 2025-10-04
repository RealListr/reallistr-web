import * as React from "react";
import {
  Home, Car, Plug, CreditCard, MapPin, Phone, Shield, SunMedium,
  Bed, Bath, Circle, Info, Settings, List, Heart, Bookmark,
  Image as ImageIcon, Video as VideoIcon, Headphones,
  ChevronRight, X
} from "lucide-react";

type IconName =
  | "home" | "car" | "plug" | "card" | "map" | "phone" | "shield" | "sun"
  | "bed" | "beds" | "bedroom" | "bedrooms"
  | "bath" | "baths" | "bathroom" | "bathrooms"
  | "circle" | "info" | "settings" | "list" | "heart" | "bookmark"
  | "image" | "video" | "headphones" | "chevron-right" | "x";

const MAP: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  home: Home,
  car: Car,
  plug: Plug,
  card: CreditCard,
  map: MapPin,
  phone: Phone,
  shield: Shield,
  sun: SunMedium,

  bed: Bed,
  beds: Bed,
  bedroom: Bed,
  bedrooms: Bed,

  bath: Bath,
  baths: Bath,
  bathroom: Bath,
  bathrooms: Bath,

  circle: Circle,
  info: Info,
  settings: Settings,
  list: List,
  heart: Heart,
  bookmark: Bookmark,

  image: ImageIcon,
  video: VideoIcon,
  headphones: Headphones,
  "chevron-right": ChevronRight,
  x: X,
};

export default function Icon({
  name,
  className,
  ...props
}: { name: IconName } & React.SVGProps<SVGSVGElement>) {
  const C = MAP[name];
  if (!C) return null;
  return <C className={className ?? "h-5 w-5"} aria-hidden="true" {...props} />;
}

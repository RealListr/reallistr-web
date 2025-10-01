export type MediaShort = {
  id: string;          // YouTube video id (or future Listr CDN id)
  title?: string;
  creator?: string;
};

export type MediaPod = {
  url: string;         // mp3 or a hosted audio file
  title?: string;
  durationSec?: number;
};

export type Property = {
  id: string;
  title: string;
  suburb: string;
  type: "sale" | "rental";
  price: number;       // for rentals: weekly price
  beds: number;
  baths: number;
  cars: number;
  hero: string;        // path under /public
  images: string[];    // gallery (paths under /public)
  shorts?: MediaShort[];
  pods?: MediaPod[];
  agentId?: string;
  description?: string;
};

export const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "23 Ocean Ave, Bondi",
    suburb: "Bondi",
    type: "sale",
    price: 2450000,
    beds: 4, baths: 3, cars: 2,
    hero: "/placeholders/house-1.jpg",
    images: [
      "/placeholders/house-1.jpg",
      "/placeholders/house-2.jpg",
      "/placeholders/house-3.jpg"
    ],
    shorts: [
      { id: "C0DPdy98e4c", title: "Sunlit tour", creator: "Ava Films" }
    ],
    pods: [
      { url: "/audio/bondi-overview.mp3", title: "Agent intro", durationSec: 78 }
    ],
    description:
      "Sunlit coastal home with open-plan living, minutes to the beach."
  },
  {
    id: "p2",
    title: "12 Market St, Sydney",
    suburb: "Sydney CBD",
    type: "rental",
    price: 1180,
    beds: 2, baths: 2, cars: 1,
    hero: "/placeholders/apt-1.jpg",
    images: [
      "/placeholders/apt-1.jpg",
      "/placeholders/apt-2.jpg",
      "/placeholders/apt-3.jpg"
    ],
    shorts: [
      { id: "aqz-KE-bpKQ", title: "City views walk-through" }
    ],
    pods: [
      { url: "/audio/cbd-fastfacts.mp3", title: "Fast facts", durationSec: 52 }
    ],
    description:
      "High-floor apartment with skyline outlook and hotel-style amenities."
  }
];

import * as React from "react";
import TopRail from "@/components/feed/TopRail";
import FeedCard, { type FeedListing } from "@/components/feed/FeedCard";
import MediaOverlay from "@/components/rail/MediaOverlay";
import InfoOverlay from "@/components/overlays/InfoOverlay";
import MapOverlay from "@/components/overlays/MapOverlay";

const pageCss = `
  body { background: linear-gradient(135deg,#f3f4f6,#eef2f7); }
  main { display:flex; flex-direction:column; align-items:center; padding: 10px 0 60px; }
  /* feed width token is set in TopRail */
`;

const DEMO: FeedListing[] = [
  {
    id: "1",
    agent: { name: "Aisha Patel", agency: "Luxe Realty" },
    price: "AED 4,250,000",
    address: "One JLT, Jumeirah Lake Towers",
    facts: { bed: 4, bath: 2, car: 2 },
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&q=80", label: "Living" },
      { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=80", label: "Kitchen" },
    ],
    liked: false, saved: false, following: true,
  },
  {
    id: "2",
    agent: { name: "Omar Rahman", agency: "Harbour & Co" },
    price: "AED 3,100,000",
    address: "Marina Promenade, Dubai Marina",
    facts: { bed: 3, bath: 2, car: 1 },
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1598300053651-95c0f3c51a5e?w=1400&q=80", label: "Lounge" },
      { type: "image", src: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1400&q=80", label: "Kitchen" },
    ],
    liked: false, saved: false, following: false,
  },
];

export default function Home() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />
      <TopRail />
      {DEMO.map((l) => (<FeedCard key={l.id} listing={l} />))}
      <MediaOverlay />
      <InfoOverlay />
      <MapOverlay />
    </main>
  );
}

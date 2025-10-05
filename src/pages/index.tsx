import * as React from "react";
import TopRail from "@/components/feed/TopRail";
import FeedCard, { type FeedListing } from "@/components/feed/FeedCard";
import MediaOverlay from "@/components/rail/MediaOverlay";
import InfoOverlay from "@/components/overlays/InfoOverlay";
import MapOverlay from "@/components/overlays/MapOverlay";

const DEMO: FeedListing[] = [
  {
    id: "1",
    agent: { name: "Aisha Patel", agency: "Luxe Realty" },
    price: "AED 4,250,000",
    address: "One JLT, Jumeirah Lake Towers",
    facts: { bed: 4, bath: 2, car: 2 },
    openTimes: ["Sat 11:15–11:45am", "Wed 5:30–6:00pm"],
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", label: "Kitchen" },
      { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1600&q=80", label: "Living" },
    ],
    infoHtml: "<ul><li>Internal 132sqm, Balcony 12sqm</li><li>North aspect, city views</li><li>Renovated 2023</li></ul>",
  },
  {
    id: "2",
    agent: { name: "Omar Rahman", agency: "Harbour & Co" },
    price: "AED 3,100,000",
    address: "Marina Promenade, Dubai Marina",
    facts: { bed: 3, bath: 2, car: 1 },
    openTimes: ["Sun 2:00–2:30pm"],
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80", label: "Living" },
      { type: "image", src: "https://images.unsplash.com/photo-1598300053651-95c0f3c51a5e?w=1600&q=80", label: "Bedroom" },
    ],
  },
];

export default function Home() {
  const shell: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f8fafc,#eef2f7)",
  };
  const container: React.CSSProperties = {
    width: "100%",
    maxWidth: 760,
    margin: "0 auto",
    paddingBottom: 40,
  };

  return (
    <main style={shell}>
      <div style={{ padding: "14px 16px" }}>
        <TopRail width={760} />
      </div>

      <div style={container}>
        {DEMO.filter(Boolean).map((it) => (
          <FeedCard key={it.id} data={it} />
        ))}
      </div>

      {/* Mount overlays once */}
      <MediaOverlay />
      <InfoOverlay />
      <MapOverlay />
    </main>
  );
}

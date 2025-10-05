import * as React from "react";
import TopRail from "@/components/feed/TopRail";
import FeedCard, { type FeedListing } from "@/components/feed/FeedCard";
import MediaOverlay from "@/components/rail/MediaOverlay"; // keep your existing gallery
import InfoOverlay from "@/components/overlays/InfoOverlay";
import MapOverlay from "@/components/overlays/MapOverlay";

const DEMO: FeedListing[] = [
  {
    id: "1",
    agent: { name: "Aisha Patel", agency: "Luxe Realty" },
    price: "AED 4,250,000",
    address: "One JLT, Jumeirah Lake Towers",
    facts: { bed: 4, bath: 2, car: 2 },
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", label: "Kitchen" },
      { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1600&q=80", label: "Living" },
      { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" },
    ],
    infoHtml:
      "<ul><li>Internal 132sqm, Balcony 12sqm</li><li>North aspect, city views</li><li>Renovated 2023</li></ul>",
  },
  {
    id: "2",
    agent: { name: "Omar Rahman", agency: "Harbour & Co" },
    price: "AED 3,100,000",
    address: "Marina Promenade, Dubai Marina",
    facts: { bed: 3, bath: 2, car: 1 },
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80", label: "Living" },
      { type: "image", src: "https://images.unsplash.com/photo-1598300053651-95c0f3c51a5e?w=1600&q=80", label: "Bedroom" },
    ],
    infoHtml: "<p>Waterfront, concierge, 200m to metro.</p>",
  },
];

const CHIPS = [
  { id: "parina", label: "Parina" },
  { id: "downtown", label: "Downtown" },
  { id: "marina", label: "Marina" },
  { id: "springs", label: "The Springs" },
  { id: "albarsha", label: "Al Barsha" },
];

export default function Home() {
  const [active, setActive] = React.useState<string | undefined>("marina");

  const page: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
  };

  return (
  <main style={page}>
    <div style={{ width: "100%", maxWidth: 760, margin: "0 auto", padding: "0 8px" }}>

      {/* Logo row */}
      <div style={{ padding: "14px 16px 0", display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: ".2px", color: "#0f172a" }}>RealListr</div>
        {/* Top-right mini controls could go here (search, etc.) */}
      </div>

      {/* Top Rail */}
      <TopRail chips={CHIPS} value={active} onChange={setActive} />

      {/* Feed */}
      <div>
        {DEMO.map((d) => (
          <FeedCard key={d.id} data={d} />
        ))}
      </div>

      {/* Overlays */}
      <MediaOverlay />
      <InfoOverlay />
      <MapOverlay />
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import GhostSlider from "@/components/GhostSlider";

// load feed bits on the client only
const TopRail  = dynamic(() => import("@/components/feed/TopRail"),  { ssr: false });
const FeedCard = dynamic(() => import("@/components/feed/FeedCard"), { ssr: false });

export default function HomeClient() {
  return (
    <div className="p-6">
      <header className="flex items-center gap-3 mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight">RealListr</h1>
        <GhostSlider />
      </header>
      <TopRail />
      <div className="mt-4 space-y-6">
        <FeedCard />
      </div>
    </div>
  );
}

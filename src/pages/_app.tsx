import type { AppProps } from "next/app";
import "../app/globals.css";

import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";
import FloorPlanCapture from "@/components/rail/FloorPlanCapture";
import MediaPanel from "@/components/rail/MediaPanel";
import MediaOverlay from "@/components/rail/MediaOverlay";
import MediaRailButton from "@/components/rail/MediaRailButton";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* Global mounts */}
      <FloorPlanCapture defaultSrc="/images/floorplans/demo-floorplan.svg" />
      <FloorPlanOverlay />
      <MediaPanel />
      <MediaOverlay />
      <MediaRailButton />
    </>
  );
}

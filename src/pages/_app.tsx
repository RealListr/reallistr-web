import type { AppProps } from "next/app";
import "../app/globals.css";

import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";
import MediaOverlay     from "@/components/rail/MediaOverlay";
import MediaPanel       from "@/components/rail/MediaPanel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <FloorPlanOverlay />
      <MediaOverlay />
      <MediaPanel />
    </>
  );
}

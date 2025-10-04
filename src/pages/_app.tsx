import React from "react";
import type { AppProps } from "next/app";
import "../app/globals.css";

import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";
import FloorPlanCapture from "@/components/rail/FloorPlanCapture";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FloorPlanOverlay />
      <FloorPlanCapture defaultSrc="/images/floorplan-123.png" />
      <Component {...pageProps} />
    </>
  );
}

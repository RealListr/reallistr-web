import type { AppProps } from "next/app";
import "../app/globals.css";
import MediaPanel from "@/components/rail/MediaPanel";
import MediaOverlay from "@/components/rail/MediaOverlay";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <MediaPanel />
      <MediaOverlay />
    </>
  );
}

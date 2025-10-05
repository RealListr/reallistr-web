import * as React from "react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hit = t?.closest?.("[data-rl-media]");
      if (!hit) return;

      // Open chooser with demo items (swap to real listing media later)
      const items = [
        { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label: "Living" },
        { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Kitchen" },
        { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" }
      ] as any;
      window.dispatchEvent(new CustomEvent("open-media-chooser", { detail: { items } }));
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return <Component {...pageProps} />;
}

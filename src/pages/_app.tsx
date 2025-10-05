import * as React from "react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Global capture for the rail Media button (aria/title/data).
    const openFromRail = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hit = t?.closest?.('[data-rl-media],button[aria-label="Media"],[title="Media"]');
      if (!hit) return;
      const items = [
        { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label: "Living" },
        { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Kitchen" },
        { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" },
      ] as any;
      window.dispatchEvent(new CustomEvent("open-media-chooser", { detail: { items } }));
    };
    document.addEventListener("click", openFromRail, true);

    // DEBUG KILL-SWITCH: remove stray top-left "Media" buttons if any slipped in.
    const nukeDebugButtons = () => {
      const cand = Array.from(document.querySelectorAll("button, a, div, span"))
        .filter(el => /media/i.test(el.textContent || ""))
        // exclude the right rail cluster area (right:24px region)
        .filter(el => {
          const r = el.getBoundingClientRect();
          // obvious top-left location guard
          return r.left < 120 && r.top < 80;
        });
      cand.forEach(el => el.remove());
    };
    nukeDebugButtons();
    const mo = new MutationObserver(nukeDebugButtons);
    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", openFromRail, true);
      mo.disconnect();
    };
  }, []);

  return <Component {...pageProps} />;
}

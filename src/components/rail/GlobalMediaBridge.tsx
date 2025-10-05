import * as React from "react";

export default function GlobalMediaBridge() {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const btn = t?.closest?.('[aria-label="Media"]');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      // Demo payload (swap to live data later)
      const demo = [
        { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80", label: "Living" },
        { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80", label: "Kitchen" },
        { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" },
      ] as any[];

      window.dispatchEvent(
        new CustomEvent("open-media-chooser", { detail: { items: demo } })
      );
    };

    // Capture phase so nothing can swallow the click before us
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, []);

  return null;
}

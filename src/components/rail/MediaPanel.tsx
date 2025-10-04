import * as React from "react";
import Icon from "@/app/components/Icon";

export default function MediaPanel() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onToggle = () => setOpen(v => !v);
    window.addEventListener("toggle-media-panel", onToggle);
    return () => window.removeEventListener("toggle-media-panel", onToggle);
  }, []);

  // Close on ESC
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const card =
    "flex items-center gap-3 rounded-xl border border-black/5 bg-white/90 backdrop-blur-md px-4 py-3 hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] transition";

  const openOverlay = (kind: "image"|"video"|"podcast") => {
    window.dispatchEvent(new CustomEvent("open-media", { detail: { kind } }));
  };

  return (
    <aside
      role="dialog"
      aria-label="Media"
      className="fixed right-4 top-20 z-[110] w-[360px] rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-black/5 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Media</h3>
        <button aria-label="Close media panel" onClick={()=>setOpen(false)} className="p-2 rounded-lg hover:bg-black/5">
          <Icon name="x" className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-3">
        <button className={card} onClick={()=>openOverlay("image")}>
          <Icon name="image" className="h-5 w-5" /><span>Images</span>
          <span className="ml-auto opacity-60"><Icon name="chevron-right" className="h-4 w-4" /></span>
        </button>
        <button className={card} onClick={()=>openOverlay("video")}>
          <Icon name="video" className="h-5 w-5" /><span>Videos</span>
          <span className="ml-auto opacity-60"><Icon name="chevron-right" className="h-4 w-4" /></span>
        </button>
        <button className={card} onClick={()=>openOverlay("podcast")}>
          <Icon name="headphones" className="h-5 w-5" /><span>Podcast</span>
          <span className="ml-auto opacity-60"><Icon name="chevron-right" className="h-4 w-4" /></span>
        </button>
      </div>
    </aside>
  );
}

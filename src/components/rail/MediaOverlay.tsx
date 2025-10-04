import * as React from "react";
import Icon from "@/app/components/Icon";
type OpenEvt = CustomEvent<{ kind: "image"|"video"|"podcast" }>;

export default function MediaOverlay() {
  const [open, setOpen] = React.useState(false);
  const [kind, setKind] = React.useState<"image"|"video"|"podcast">("image");

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as OpenEvt;
      if (ce?.detail?.kind) { setKind(ce.detail.kind); setOpen(true); }
    };
    window.addEventListener("open-media", handler as EventListener);
    return () => window.removeEventListener("open-media", handler as EventListener);
  }, []);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[120] bg-black/20 backdrop-blur-sm" onClick={()=>setOpen(false)} />
      <div className="fixed left-1/2 top-[45%] z-[130] -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[65vh] rounded-2xl bg-white/95 shadow-2xl border border-black/5 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 bg-white/80">
          <h3 className="font-semibold">{kind === "image" ? "Images" : kind === "video" ? "Videos" : "Podcast"}</h3>
          <button aria-label="Close" onClick={()=>setOpen(false)} className="p-2 rounded-lg hover:bg-black/5"><Icon name="x" className="h-5 w-5" /></button>
        </div>
        <div className="w-full h-[calc(65vh-56px)] grid place-items-center">
          {kind === "image" && <img src="/images/media/demo-gallery.svg" alt="Gallery demo" className="max-w-full max-h-full object-contain" />}
          {kind === "video" && <video src="/videos/demo.mp4" className="max-w-full max-h-full" controls />}
          {kind === "podcast" && <div className="text-sm opacity-80">Podcast player placeholder</div>}
        </div>
      </div>
    </>
  );
}

import * as React from "react";
import { openMedia } from "./MediaOverlay";

type MediaItem =
  | { type: "video"; src: string; poster?: string; label?: string }
  | { type: "image"; src: string; alt?: string; label?: string };

type OpenChooserDetail = { items: MediaItem[] };

const EVT = "open-media-chooser";

/** Fire this from the Media icon to open the chooser. */
export function openMediaChooser(items: MediaItem[]) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenChooserDetail>(EVT, { detail: { items } }));
}

export default function MediaChooser() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenChooserDetail>).detail;
      if (!detail?.items?.length) return;
      setItems(detail.items);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(EVT, onOpen as EventListener);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVT, onOpen as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[950] pointer-events-none">
      {/* Transparent scrim that closes the chooser */}
      <div className="absolute inset-0" onClick={close} />

      {/* Panel: floats next to the rail on the right side */}
      <div
        className="pointer-events-auto fixed right-20 top-1/2 -translate-y-1/2 z-[960]
                   w-[340px] max-h-[70vh] rounded-2xl bg-white shadow-2xl border border-black/10
                   p-3 flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Select Media</h3>
          <button className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200" onClick={close}>✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3 overflow-auto pr-1">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => {
                openMedia(items, i);
                setOpen(false);
              }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-black/5 border border-black/10 hover:border-black/20"
              title={("label" in it && it.label) || (it as any).alt || ""}
            >
              {/* simple visual preview without Next/Image requirements */}
              {it.type === "image" ? (
                <img
                  src={it.src}
                  alt={("alt" in it && it.alt) || "image"}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
                />
              ) : (
                <div className="w-full h-full bg-black/80 grid place-items-center text-white text-xs">
                  Video
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2 text-[11px] leading-tight
                              bg-gradient-to-t from-black/60 to-transparent text-white opacity-0
                              group-hover:opacity-100 transition">
                {("label" in it && it.label) || (it as any).alt || (it.type === "video" ? "Video" : "Image")}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { openMedia } from "./MediaOverlay";

type MediaItem =
  | { type: "video"; src: string; poster?: string; label?: string }
  | { type: "image"; src: string; alt?: string; label?: string };

type OpenChooserDetail = { items: MediaItem[] };

const EVT = "open-media-chooser";

export function openMediaChooser(items: MediaItem[]) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenChooserDetail>(EVT, { detail: { items } }));
}

export default function MediaChooser() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

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

  // Hidden until opened at least once
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1400] pointer-events-none">
      {/* Click anywhere to close */}
      <div className="absolute inset-0" onClick={close} />

      {/* Panel sits LEFT of the right rail: adjust right-* to snug up to your rail */}
      <div
        ref={panelRef}
        className={[
          "pointer-events-auto fixed right-24 top-1/2 -translate-y-1/2",
          "w-[360px] max-h-[72vh] rounded-2xl border border-black/10 bg-white shadow-2xl",
          "p-3 flex flex-col gap-3",
          "origin-right animate-[fadeIn_120ms_ease-out]",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold tracking-tight">Select Media</h3>
          <button
            className="px-2 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[12px]"
            onClick={close}
            aria-label="Close media chooser"
          >
            ✕
          </button>
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-3 overflow-auto pr-1">
          {items.map((it, i) => {
            const label =
              ("label" in it && it.label) || (it as any).alt || (it.type === "video" ? "Video" : "Image");
            return (
              <button
                key={i}
                onClick={() => { console.log("[MediaChooser] tile click", i, items[i]); openMedia(items, i);
                  setOpen(false);
                }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-50 border border-black/10 hover:border-black/20"
                title={label}
              >
                {it.type === "image" ? (
                  <img
                    src={it.src}
                    alt={label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
                    }}
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center">
                    <div className="rounded-full w-10 h-10 grid place-items-center border border-white/60 bg-black/70 text-white text-xs">
                      ▶
                    </div>
                  </div>
                )}

                {/* bottom label */}
                <div
                  className="absolute inset-x-0 bottom-0 text-[11px] leading-tight px-2 py-1
                             bg-gradient-to-t from-black/60 to-transparent text-white
                             opacity-0 group-hover:opacity-100 transition"
                >
                  {label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

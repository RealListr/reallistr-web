import * as React from "react";
import { sanitizeMedia } from "@/lib/media";

if (typeof window !== "undefined") {
  (window as any).__RL_MEDIA_CHOOSER_MOUNTED__ ??= 0;
  (window as any).__RL_MEDIA_CHOOSER_MOUNTED__++;
}
import { EVT_OPEN_MEDIA_CHOOSER, EVT_OPEN_MEDIA_OVERLAY } from "@/lib/events";
type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

const EVT_OPEN = "open-media-chooser";
const EVT_SHOW = "open-media-overlay";

/** Layout tokens */
const PANEL_W  = 560;  // width of chooser
const PANEL_H  = 360;  // height of chooser
const MARGIN   = 24;   // viewport margin
const GAP      = 20;   // space between rail icon and chooser
const OFFSET_Y = -40;  // nudge upwards so it clears the HUD

export default function MediaChooser() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  // Open and position next to the right-rail "Media" button
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items?: Item[] } | undefined;
      if (detail?.items?.length) setItems(sanitizeMedia(detail?.items || []));

      const btn = document.querySelector('[aria-label="Media"]') as HTMLElement | null;
      if (btn) {
        const r = btn.getBoundingClientRect();
        const idealTop = r.top + r.height / 2 - PANEL_H / 2 + OFFSET_Y;
        const top = Math.max(MARGIN, Math.min(window.innerHeight - PANEL_H - MARGIN, idealTop));
        const left = Math.max(
          MARGIN,
          Math.min(r.left - GAP - PANEL_W, window.innerWidth - PANEL_W - MARGIN)
        );
        setPos({ top, left });
      } else {
        // Safe fallback (bottom-right area)
        setPos({
          top: Math.max(MARGIN, window.innerHeight - PANEL_H - 120),
          left: Math.max(MARGIN, window.innerWidth - PANEL_W - 404),
        });
      }
      setOpen(true);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener(EVT_OPEN, onOpen as any);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener(EVT_OPEN, onOpen as any);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Click-away to close
  React.useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (!open) return;
      const target = ev.target as Node | null;
      if (panelRef.current && target && panelRef.current.contains(target)) return;
      setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDoc, { capture: true });
    return () => document.removeEventListener("mousedown", onDoc, { capture: true } as any);
  }, [open]);

  const openOverlay = (startIndex = 0) => {
    if (!items.length) return;
    window.dispatchEvent(new CustomEvent(EVT_SHOW, { detail: { items, startIndex } }));
    setOpen(false);
  };

  if (!open || !pos) return null;

  return (
    <div data-rl="media-chooser"
      ref={panelRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: PANEL_W,
        height: PANEL_H,
        zIndex: 1000,
        borderRadius: 16,
        border: "1px solid rgba(148,163,184,.35)",
        background: "rgba(255,255,255,.98)",
        boxShadow: "0 18px 48px rgba(15,23,42,.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      data-rl="media-chooser"
    >
      <header style={{ padding: "14px 16px 8px", display: "flex", alignItems: "center" }}>
        <div style={{ fontWeight: 700, letterSpacing: ".2px", color: "#0f172a" }}>Select Media</div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            marginLeft: "auto",
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid rgba(148,163,184,.35)",
            background: "rgba(255,255,255,.8)",
            display: "grid",
            placeItems: "center",
          }}
        >
          ×
        </button>
      </header>

      <div
        style={{
          padding: 16,
          paddingTop: 8,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          flex: 1,
        }}
      >
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => openOverlay(i)}
            title={it.label || it.type}
            style={{
              position: "relative",
              width: "100%",
              height: i === 2 && items.length >= 3 ? 140 : 180,
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,.28)",
              overflow: "hidden",
              background: "linear-gradient(180deg,#f8fafc,#eef2f7)",
              boxShadow: "0 6px 18px rgba(2,6,23,.08)",
              transition: "transform .12s ease, box-shadow .12s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {it.type === "image" && (
              <img
                src={it.src}
                alt={it.label || "image"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {it.type === "video" && (
              <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
                <div
                  style={{
                    width: 62,
                    height: 62,
                    borderRadius: "50%",
                    background: "#1f2937",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
            {it.type === "audio" && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "#0f172a",
                }}
              >
                Podcast
              </div>
            )}
            {it.label && (
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  bottom: 10,
                  background: "rgba(236,252,203,.9)",
                  color: "#052e16",
                  border: "1px solid rgba(163,230,53,.6)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {it.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

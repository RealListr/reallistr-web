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

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenChooserDetail>).detail;
      if (!detail?.items?.length) return;
      setItems(detail.items);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener(EVT, onOpen as EventListener);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVT, onOpen as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);

  // inline styles (no Tailwind)
  const wrap: React.CSSProperties = { position: "fixed", inset: 0 as any, zIndex: 1400, pointerEvents: "none" };
  const scrim: React.CSSProperties = { position: "absolute", inset: 0 as any };
  const panel: React.CSSProperties = {
    position: "fixed",
    right: 24, top: "50%",
    transform: "translateY(-50%)",
    width: 360, maxHeight: "72vh",
    borderRadius: 16, border: "1px solid rgba(0,0,0,.10)",
    background: "#fff", boxShadow: "0 18px 50px rgba(0,0,0,.18)",
    padding: 12, display: "flex", flexDirection: "column", gap: 12,
    pointerEvents: "auto"
  };
  const headerRow: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between" };
  const closeBtn: React.CSSProperties = { padding: "4px 8px", borderRadius: 8, background: "#eee", fontSize: 12, border: "1px solid #ddd" };
  const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, overflow: "auto", paddingRight: 4 };
  const tile: React.CSSProperties = {
    position: "relative", width: "100%", aspectRatio: "4 / 3",
    borderRadius: 12, overflow: "hidden",
    background: "#fafafa", border: "1px solid rgba(0,0,0,.10)",
    cursor: "pointer"
  };
  const labelBar: React.CSSProperties = {
    position: "absolute", left: 0, right: 0, bottom: 0,
    fontSize: 11, lineHeight: 1.15, padding: "6px 8px",
    color: "#fff",
    background: "linear-gradient(to top, rgba(0,0,0,.6), transparent)"
  };

  return (
    <div style={wrap} aria-label="Media chooser">
      <div style={scrim} onClick={close} />
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={headerRow}>
          <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>Select Media</h3>
          <button style={closeBtn} onClick={close} aria-label="Close media chooser">✕</button>
        </div>

        <div style={grid}>
          {items.map((it, i) => {
            const label = ("label" in it && it.label) || (it as any).alt || (it.type === "video" ? "Video" : "Image");
            return (
              <button
                key={i}
                style={tile}
                title={label}
                onClick={() => { openMedia(items, i); setOpen(false); }}
              >
                {it.type === "image" ? (
                  <img src={it.src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                       onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.2")} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 20,
                      display: "grid", placeItems: "center",
                      background: "rgba(0,0,0,.7)", color: "#fff",
                      border: "1px solid rgba(255,255,255,.5)", fontSize: 12
                    }}>▶</div>
                  </div>
                )}
                <div style={labelBar}>{label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

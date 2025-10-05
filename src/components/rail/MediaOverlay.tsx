import * as React from "react";

type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

const EVT = "open-media-overlay";

/**
 * MediaOverlay
 * - Opens via: window.dispatchEvent(new CustomEvent('open-media-overlay', { detail: { items, index } }))
 * - Arrow keys ← / → navigate; Esc closes
 * - Click backdrop closes
 */
export default function MediaOverlay() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [index, setIndex] = React.useState(0);

  const at = (i: number) => (i + items.length) % items.length;

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent).detail as { items?: Item[]; index?: number } | undefined;
      if (!d?.items?.length) return;
      setItems(d.items);
      setIndex(d.index ?? 0);
      setOpen(true);
    };
    window.addEventListener(EVT, onOpen as any);
    return () => window.removeEventListener(EVT, onOpen as any);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") setIndex((i) => at(i + 1));
      else if (e.key === "ArrowLeft") setIndex((i) => at(i - 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  if (!open || !items.length) return null;
  const current = items[at(index)];

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) setOpen(false);
      }}
      style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "rgba(2,6,23,.55)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        display: "grid", placeItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(1080px, 92vw)",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 24px 60px rgba(15,23,42,.35)",
          border: "1px solid rgba(148,163,184,.35)",
          padding: 14,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 6px 10px 6px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
            {current.label ?? (current.type === "image" ? "Image" : current.type === "video" ? "Video" : "Audio")}
          </div>
          <div style={{ fontSize: 12, color: "#475569" }}>· {at(index) + 1} / {items.length}</div>
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            style={{
              marginLeft: "auto", width: 28, height: 28, borderRadius: 10,
              border: "1px solid rgba(148,163,184,.35)", background: "rgba(248,250,252,.9)"
            }}
          >×</button>
        </div>

        {/* Media */}
        <div style={{ position: "relative" }}>
          {current.type === "image" ? (
            <img
              src={current.src}
              alt={current.label ?? "Image"}
              style={{
                width: "100%", height: "min(70vh, 720px)",
                objectFit: "cover", borderRadius: 10,
              }}
            />
          ) : current.type === "video" ? (
            <video
              src={current.src}
              controls
              style={{ width: "100%", height: "min(70vh, 720px)", borderRadius: 10, background: "#000" }}
            />
          ) : (
            <div style={{ height: 180, display: "grid", placeItems: "center" }}>
              <audio src={current.src} controls />
            </div>
          )}

          {/* Nav buttons */}
          {items.length > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={() => setIndex((i) => at(i - 1))}
                style={navBtnStyle("left")}
              >
                ‹
              </button>
              <button
                aria-label="Next"
                onClick={() => setIndex((i) => at(i + 1))}
                style={navBtnStyle("right")}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div style={{ fontSize: 11, color: "#64748b", paddingTop: 8 }}>
          Press <b>Esc</b> to close · ← → to navigate
        </div>
      </div>
    </div>
  );
}

function navBtnStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: -12,
    transform: "translateY(-50%)",
    width: 34,
    height: 34,
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(248,250,252,.92)",
    boxShadow: "0 6px 18px rgba(15,23,42,.16)",
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    lineHeight: 1,
  } as React.CSSProperties;
}

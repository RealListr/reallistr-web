import * as React from "react";

type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

const EVT = "open-media-chooser";

/**
 * MediaChooser
 * - Opens via: window.dispatchEvent(new CustomEvent('open-media-chooser', { detail: { items } }))
 * - Anchors to the LEFT of the right-rail "Media" button (aria-label="Media")
 * - Clamps to viewport
 * - Emits 'open-media-overlay' when a tile is clicked
 */
export default function MediaChooser() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items?: Item[] } | undefined;
      const next = detail?.items ?? [];
      setItems(next);

      // Anchor to the Media chip
      const btn = document.querySelector('[aria-label="Media"]') as HTMLElement | null;
      const railGap = 12;   // pad away from the rail
      const viewportPad = 16;

      if (btn) {
        const r = btn.getBoundingClientRect();
        // Preferred position: left of the button, vertically centered on it
        const preferred = { top: r.top + r.height / 2 - 170, left: r.left - 380 - railGap };
        // Clamp to viewport after we know our own size
        requestAnimationFrame(() => {
          const el = panelRef.current;
          const w = el?.offsetWidth ?? 360;
          const h = el?.offsetHeight ?? 300;
          const maxLeft = window.innerWidth - w - viewportPad;
          const maxTop = window.innerHeight - h - viewportPad;

          setPos({
            left: Math.max(viewportPad, Math.min(preferred.left, maxLeft)),
            top: Math.max(viewportPad, Math.min(preferred.top, maxTop)),
          });
          setOpen(true);
        });
      } else {
        // Fallback: bottom-right quadrant
        setPos({ left: Math.max(16, window.innerWidth - 420), top: Math.max(16, window.innerHeight - 360) });
        setOpen(true);
      }
    };

    window.addEventListener(EVT, onOpen as any);
    return () => window.removeEventListener(EVT, onOpen as any);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClickAway = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway, { capture: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway, { capture: true } as any);
    };
  }, [open]);

  if (!open || !pos) return null;

  const chrome: React.CSSProperties = {
    position: "fixed",
    left: pos.left,
    top: pos.top,
    width: 420,
    borderRadius: 14,
    background: "rgba(255,255,255,.92)",
    border: "1px solid rgba(148,163,184,.35)",
    boxShadow: "0 18px 40px rgba(15,23,42,.16)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    zIndex: 80,
    padding: 14,
  };

  const title: React.CSSProperties = { fontWeight: 700, color: "#0f172a", marginBottom: 10, fontSize: 14 };
  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  };
  const tileBase: React.CSSProperties = {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(148,163,184,.35)",
    background: "#fff",
    cursor: "pointer",
    transition: "transform .12s ease, box-shadow .12s ease",
  };

  function openOverlayAt(index: number) {
    window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { items, index } }));
    setOpen(false);
  }

  return (
    <div ref={panelRef} style={chrome} data-rl="media-chooser">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <div style={title}>Select Media</div>
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          style={{
            marginLeft: "auto", width: 24, height: 24, borderRadius: 8,
            border: "1px solid rgba(148,163,184,.35)", background: "rgba(255,255,255,.6)"
          }}
        >
          ×
        </button>
      </div>
      <div style={grid}>
        {items.map((it, i) => {
          const label = it.label ?? (it.type === "image" ? "Image" : it.type === "video" ? "Video" : "Audio");
          return (
            <div
              key={i}
              role="button"
              onClick={() => openOverlayAt(i)}
              onMouseDown={(e) => ((e.currentTarget.style.transform = "translateY(1px)"))}
              onMouseUp={(e) => ((e.currentTarget.style.transform = "translateY(0)"))}
              style={tileBase}
            >
              {it.type === "image" ? (
                <img src={it.src} alt={label} style={{ width: "100%", height: 140, objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: 140, background: "linear-gradient(135deg,#eef2ff,#e0e7ff)", display: "grid", placeItems: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(15,23,42,.85)", display: "grid", placeItems: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
              <span style={{
                position: "absolute", left: 8, bottom: 8,
                fontSize: 12, fontWeight: 700, color: "#0f172a",
                background: "rgba(255,255,255,.85)", borderRadius: 999, padding: "4px 8px",
                border: "1px solid rgba(148,163,184,.35)"
              }}>{label}</span>
            </div>
          );
        })}
        {items.length % 2 === 1 && <div style={{ visibility: "hidden" }} />}
      </div>
    </div>
  );
}

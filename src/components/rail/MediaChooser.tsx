import * as React from "react";

type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

const EVT = "open-media-chooser";

/**
 * MediaChooser
 * - Opens when window.dispatchEvent(new CustomEvent('open-media-chooser', { detail: { items } }))
 * - Anchors itself to the LEFT of the right-rail "Media" button (aria-label="Media")
 * - Clamps to viewport so it never collides with rail or goes off-screen
 */
export default function MediaChooser() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const [pos, setPos] = React.useState<{ top: number; left: number } | null>(null);

  const panel = React.useRef<HTMLDivElement | null>(null);

  // One-time event wiring
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items?: Item[] } | undefined;
      if (detail?.items && Array.isArray(detail.items)) setItems(detail.items);

      // Compute anchored position
      const PANEL_W = 560; // chooser width
      const PANEL_H = 360; // chooser height
      const MARGIN = 24;

      // Prefer the right-rail Media button as anchor
      const btn = document.querySelector('[aria-label="Media"]') as HTMLElement | null;

      if (btn) {
        const r = btn.getBoundingClientRect();
        const idealLeft = r.left - PANEL_W - MARGIN;                       // to the LEFT of the rail
        const idealTop = btn.top + btn.height/2 - PANEL_H/2 + OFFSET_Y;               // vertically centered on the button

        // Clamp inside viewport
        const left = Math.max(MARGIN, btn.left - GAP - PANEL_W);
        const top  = Math.max(MARGIN, Math.min(idealTop,  window.innerHeight - PANEL_H - MARGIN));

        setPos({ top, left });
      } else {
        // Fallback: leave room for rail (24 right + 44 chip + 12 gap + 24 pad)
        const fallbackRightSpace = 24 + 44 + 12 + 24;
        const left = Math.max(16, window.innerWidth - fallbackRightSpace - PANEL_W);
        const top  = Math.max(16, window.innerHeight - PANEL_H - 140); // above the HUD
        setPos({ top, left });
      }

      setOpen(true);
    };

    window.addEventListener(EVT, onOpen as EventListener);
    return () => window.removeEventListener(EVT, onOpen as EventListener);
  }, []);

  // Click-away (only when open and click occurs outside the panel)
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown, { capture: true });
    return () => window.removeEventListener("mousedown", onDown, { capture: true } as any);
  }, [open]);

  if (!open || !pos) return null;

  const openOverlay = (index: number) => {
    window.dispatchEvent(new CustomEvent("open-media", { detail: { items, index } }));
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60, // above the rail (rail is z-50)
        pointerEvents: "none",
      }}
      aria-hidden="false"
    >
      {/* soft backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,23,42,0.10)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
          pointerEvents: "auto",
        }}
      />

      {/* panel */}
      <div
        ref={panel}
        role="dialog"
        aria-label="Select Media"
        style={{
          position: "absolute",
          top: pos.top,
          left: pos.left,
          width: 560,
          height: 360,
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,.35)",
          background: "rgba(255,255,255,.92)",
          boxShadow: "0 18px 50px rgba(15,23,42,.18)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          padding: 16,
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: 12,
          pointerEvents: "auto",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Select Media</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              border: "1px solid rgba(148,163,184,.35)",
              background: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: 150,
            gap: 14,
            alignContent: "start",
          }}
        >
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => openOverlay(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                display: "grid",
                gridTemplateRows: "1fr auto",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,.35)",
                background: "white",
                boxShadow: "0 4px 14px rgba(15,23,42,.08)",
              }}
            >
              {/* thumbnail */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 120,
                  overflow: "hidden",
                  background: "#f3f4f6",
                }}
              >
                {it.type === "image" ? (
                  <img
                    src={it.src}
                    alt={it.label ?? "image"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "999px",
                        background: "rgba(17,24,39,.85)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              {/* label */}
              <div
                style={{
                  padding: "8px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {it.label ?? (it.type === "image" ? "Image" : it.type === "video" ? "Video" : "Audio")}
              </div>
            </button>
          ))}
          {/* ghost cell to keep layout balanced if odd count */}
          {items.length % 2 === 1 && <div aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}

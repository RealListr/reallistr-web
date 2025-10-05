import * as React from "react";

type MediaItem = {
  type: "image" | "video" | "podcast";
  src: string;
  label?: string;
  thumb?: string; // optional override
};

const EVT = "open-media-chooser";

export default function MediaChooser() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [pos, setPos] = React.useState<{top:number;left:number} | null>(null);

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const { detail } = e as CustomEvent;
      const list = (detail?.items || []) as MediaItem[];
      const anchor = detail?.anchor as { top:number; left:number; width:number; height:number } | undefined;

      // Only allow media types we support
      const filtered = list.filter((i: MediaItem) => ["image","video","podcast"].includes(i.type));
      setItems(filtered);

      // Position to the left of the icon (if present), otherwise fallback to right-bottom quadrant
      if (anchor) {
        const gap = 12;
        setPos({
          top: anchor.top - 8,
          left: anchor.left - 320 - gap, // float left of the rail button
        });
      } else {
        setPos(null);
      }

      setOpen(true);
    };

    window.addEventListener(EVT, onOpen as EventListener);
    return () => window.removeEventListener(EVT, onOpen as EventListener);
  }, []);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  if (!open) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 1200,
    width: 360,
    // Anchor near the icon, with viewport clamping
    top: Math.max(12, Math.min((pos?.top ?? window.innerHeight - 420), window.innerHeight - 420)),
    left: Math.max(12, Math.min((pos?.left ?? window.innerWidth - 396), window.innerWidth - 396)),
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.72)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 10px 28px rgba(15,23,42,.15)",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10
  };

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  };

  const tile: React.CSSProperties = {
    position: "relative",
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.55)",
    cursor: "pointer",
  };

  function openOverlay(index: number) {
    window.dispatchEvent(new CustomEvent("open-media", { detail: { items, index } }));
    setOpen(false);
  }

  return (
    <div ref={ref} style={style} role="dialog" aria-label="Select Media">
      <div style={headerStyle}>
        <div style={{fontSize:12, fontWeight:700, color:"#111827", letterSpacing:.2}}>Select Media</div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            width:24,height:24,borderRadius:8,
            border:"1px solid rgba(148,163,184,.35)",
            background:"rgba(255,255,255,.65)"
          }}>×</button>
      </div>

      <div style={grid}>
        {items.map((it, i) => {
          const isVideo = it.type === "video";
          const isPodcast = it.type === "podcast";
          const thumb = it.thumb || (isPodcast
            ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' fill='%236B7280' font-size='22' font-family='system-ui, -apple-system, Segoe UI'%3EPodcast%3C/text%3E%3C/svg%3E"
            : it.src);

          return (
            <div key={i} style={tile} onClick={() => openOverlay(i)} aria-label={it.label || it.type}>
              <img
                src={thumb}
                alt={it.label || it.type}
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                loading="lazy"
              />
              {(isVideo || isPodcast) && (
                <div style={{
                  position:"absolute", inset:0, display:"grid", placeItems:"center",
                  background:"linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.15))"
                }}>
                  <div style={{
                    width:36,height:36,borderRadius:9999,
                    background:"rgba(17,24,39,.85)", color:"white",
                    display:"grid", placeItems:"center", fontSize:12
                  }}>{isVideo ? "▶" : "♫"}</div>
                </div>
              )}
              {it.label && (
                <div style={{
                  position:"absolute", left:8, bottom:6,
                  fontSize:11, fontWeight:600, color:"#111827",
                  background:"rgba(255,255,255,.85)", padding:"3px 6px",
                  borderRadius:8, border:"1px solid rgba(148,163,184,.35)"
                }}>{it.label}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

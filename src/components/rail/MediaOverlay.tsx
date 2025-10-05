import * as React from "react";

type MediaItem = { type: "image" | "video" | "podcast"; src: string; label?: string; };

export default function MediaOverlay() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const { detail } = e as CustomEvent;
      const list = (detail?.items || []) as MediaItem[];
      const i = Math.max(0, Math.min(Number(detail?.index ?? 0), list.length - 1));
      setItems(list);
      setIndex(i);
      setOpen(true);
    };
    window.addEventListener("open-media", onOpen as EventListener);
    return () => window.removeEventListener("open-media", onOpen as EventListener);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex(i => Math.min(i + 1, items.length - 1));
      if (e.key === "ArrowLeft") setIndex(i => Math.max(i - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  if (!open) return null;
  const item = items[index];

  return (
    <div aria-modal="true" role="dialog" style={{
      position:"fixed", inset:0, zIndex:1500,
      background:"rgba(15,23,42,.36)", backdropFilter:"blur(2px)"
    }}>
      <div onClick={() => setOpen(false)} style={{position:"absolute", inset:0}} />

      <div style={{
        position:"absolute", left:"50%", top:"50%",
        transform:"translate(-50%, -50%)",
        width:"min(92vw, 1200px)", maxHeight:"86vh",
        borderRadius:20,
        border:"1px solid rgba(148,163,184,.35)",
        background:"rgba(255,255,255,.92)",
        boxShadow:"0 24px 60px rgba(15,23,42,.30)",
        overflow:"hidden",
        display:"grid",
        gridTemplateRows:"auto 1fr auto"
      }}>
        <header style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px"}}>
          <div style={{fontSize:14, fontWeight:700, color:"#111827"}}>
            {item?.label || (item?.type ?? "Media")} <span style={{opacity:.6, fontWeight:500}}>• {index+1} / {items.length}</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              width:28,height:28,borderRadius:10,
              border:"1px solid rgba(148,163,184,.35)",
              background:"rgba(255,255,255,.85)"
            }}>×</button>
        </header>

        <div style={{position:"relative", padding:12, display:"grid", placeItems:"center"}}>
          {item?.type === "image" && (
            <img src={item.src} alt={item.label || "image"} style={{
              maxWidth:"100%", maxHeight:"70vh", objectFit:"contain", borderRadius:12
            }} />
          )}
          {item?.type === "video" && (
            <video
              src={item.src}
              controls
              style={{maxWidth:"100%", maxHeight:"70vh", borderRadius:12, background:"#000"}}
            />
          )}
          {item?.type === "podcast" && (
            <audio src={item.src} controls style={{width:"100%"}} />
          )}

          {/* Arrows */}
          <button
            onClick={() => setIndex(i => Math.max(i - 1, 0))}
            aria-label="Previous"
            style={{
              position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
              width:36, height:36, borderRadius:9999, border:"1px solid rgba(148,163,184,.35)",
              background:"rgba(255,255,255,.85)"
            }}>‹</button>
          <button
            onClick={() => setIndex(i => Math.min(i + 1, items.length - 1))}
            aria-label="Next"
            style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              width:36, height:36, borderRadius:9999, border:"1px solid rgba(148,163,184,.35)",
              background:"rgba(255,255,255,.85)"
            }}>›</button>
        </div>

        <footer style={{padding:"10px 16px", fontSize:12, color:"#374151"}}>
          Press ⎋ to close • ← → to navigate
        </footer>
      </div>
    </div>
  );
}

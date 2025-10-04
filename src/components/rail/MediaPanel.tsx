"use client";
import * as React from "react";

export default function MediaPanel(){
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    const toggle = ()=> setOpen(v=>!v);
    window.addEventListener("toggle-media-panel", toggle);
    const onKey = (e: KeyboardEvent)=> e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return ()=>{
      window.removeEventListener("toggle-media-panel", toggle);
      document.removeEventListener("keydown", onKey);
    };
  },[]);

  if(!open) return null; // prevent any <img> from rendering while closed

  const Tile = ({label, kind}:{label:string; kind:"image"|"video"|"podcast"}) => (
    <button
      onClick={()=>{
        const src = kind==="image" ? "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='system-ui' font-size='28' fill='%23999'%3E"+label+" demo%3C/text%3E%3C/svg%3E" : "";
        window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { kind, src } }));
      }}
      className="group relative aspect-[4/3] w-full rounded-xl border border-black/5 bg-white/90 backdrop-blur-md shadow hover:shadow-lg transition"
    >
      <span className="absolute left-3 top-3 text-xs font-medium text-muted-foreground">{label}</span>
      <div className="absolute inset-0 grid place-items-center text-muted-foreground/60 text-sm">
        Open {label}
      </div>
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 z-[100]" onClick={()=>setOpen(false)} aria-hidden />
      <aside
        className="fixed right-4 top-24 z-[110] w-[360px] rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-black/5 p-4"
        role="dialog" aria-modal="true" aria-label="Media panel"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Media</h3>
          <button
            onClick={()=>setOpen(false)}
            className="h-8 w-8 grid place-items-center rounded-lg border border-black/5 bg-white/90"
            aria-label="Close media panel"
          >×</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Tile label="Images"  kind="image" />
          <Tile label="Videos"  kind="video" />
          <Tile label="Podcast" kind="podcast" />
        </div>
      </aside>
    </>
  );
}

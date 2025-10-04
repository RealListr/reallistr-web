"use client";
import * as React from "react";

declare global { interface Window { __openMediaPanel?: ()=>void; __closeMediaPanel?: ()=>void; } }

export default function MediaPanel(){
  const [open, setOpen] = React.useState(false);
  const openPanel  = React.useCallback(()=> setOpen(true), []);
  const closePanel = React.useCallback(()=> setOpen(false), []);

  React.useEffect(()=>{
    window.__openMediaPanel  = openPanel;
    window.__closeMediaPanel = closePanel;
    const toggle = ()=> setOpen(v=>!v);
    const esc = (e:KeyboardEvent)=> e.key==="Escape" && closePanel();
    window.addEventListener("toggle-media-panel", toggle);
    document.addEventListener("keydown", esc);
    return ()=> {
      window.removeEventListener("toggle-media-panel", toggle);
      document.removeEventListener("keydown", esc);
      if (window.__openMediaPanel===openPanel)   delete window.__openMediaPanel;
      if (window.__closeMediaPanel===closePanel) delete window.__closeMediaPanel;
    };
  }, [openPanel, closePanel]);

  if(!open) return null;

  const Tile = ({label, kind}:{label:string; kind:"image"|"video"|"podcast"}) => (
    <button
      onClick={()=>window.dispatchEvent(new CustomEvent("open-media-overlay",{detail:{kind,src:""}}))}
      className="group relative aspect-[4/3] w-full rounded-xl border border-black/5 bg-white/90 backdrop-blur-md shadow hover:shadow-lg transition"
    >
      <span className="absolute left-3 top-3 text-xs font-medium text-muted-foreground">{label}</span>
      <div className="absolute inset-0 grid place-items-center text-muted-foreground/60 text-sm">Open {label}</div>
    </button>
  );

  return (
    <>
      <div className="fixed inset-0 z-[200]" onClick={closePanel} aria-hidden />
      <aside className="fixed right-4 top-24 z-[201] w-[360px] rounded-2xl bg-white/70 backdrop-blur-xl shadow-2xl border border-black/5 p-4"
             role="dialog" aria-modal="true" aria-label="Media panel">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Media</h3>
          <button onClick={closePanel} className="h-8 w-8 grid place-items-center rounded-lg border border-black/5 bg-white/90" aria-label="Close">×</button>
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

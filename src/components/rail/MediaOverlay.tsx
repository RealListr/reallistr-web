"use client";
import * as React from "react";

type Evt = CustomEvent<{ kind:"image"|"video"|"podcast"; src?:string }>;

export default function MediaOverlay(){
  const [open,setOpen] = React.useState(false);
  const [kind,setKind] = React.useState<"image"|"video"|"podcast">("image");
  const [src,setSrc]   = React.useState<string>("");

  React.useEffect(()=>{
    const on = (e:Event)=>{
      const ce = e as Evt;
      setKind(ce.detail?.kind ?? "image");
      setSrc(ce.detail?.src ?? "");
      setOpen(true);
    };
    const esc = (e:KeyboardEvent)=> e.key==="Escape" && setOpen(false);
    window.addEventListener("open-media-overlay", on as EventListener);
    document.addEventListener("keydown", esc);
    return ()=> {
      window.removeEventListener("open-media-overlay", on as EventListener);
      document.removeEventListener("keydown", esc);
    };
  },[]);

  if(!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[220] bg-black/20 backdrop-blur-sm" onClick={()=>setOpen(false)} />
      <div className="fixed left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-[221] w-[75vw] h-[65vh] rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden">
        <div className="h-full w-full grid place-items-center text-muted-foreground">
          <div className="text-center">
            <div className="text-sm mb-2">Demo {kind} overlay</div>
            <div className="text-xs opacity-60">{src ? "src: "+src : "no source provided"}</div>
          </div>
        </div>
        <button aria-label="Close" onClick={()=>setOpen(false)} className="absolute right-4 top-4 h-10 w-10 grid place-items-center rounded-xl border border-black/5 bg-white/90">×</button>
      </div>
    </>
  );
}

"use client";
import * as React from "react";

type OpenEvt = CustomEvent<{ kind: "image"|"video"|"podcast"; src?: string }>;

export default function MediaOverlay(){
  const [open, setOpen] = React.useState(false);
  const [kind, setKind] = React.useState<"image"|"video"|"podcast">("image");
  const [src, setSrc]   = React.useState<string>("");

  React.useEffect(()=>{
    const onOpen = (e: Event)=>{
      const ce = e as OpenEvt;
      setKind(ce.detail?.kind ?? "image");
      setSrc(ce.detail?.src ?? "");
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent)=> e.key === "Escape" && setOpen(false);
    window.addEventListener("open-media-overlay", onOpen as EventListener);
    document.addEventListener("keydown", onKey);
    return ()=>{
      window.removeEventListener("open-media-overlay", onOpen as EventListener);
      document.removeEventListener("keydown", onKey);
    };
  },[]);

  if(!open) return null; // <-- nothing in DOM when closed (prevents Safari broken icon)

  return (
    <>
      <div
        className="fixed inset-0 z-[210] bg-black/20 backdrop-blur-sm"
        onClick={()=>setOpen(false)}
        aria-hidden
      />
      <div
        className="fixed left-1/2 top-[45%] z-[130] -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[65vh] rounded-2xl bg-white/95 shadow-2xl border border-black/5 overflow-hidden"
        role="dialog" aria-modal="true" aria-label="Media"
      >
        <div className="h-full w-full grid place-items-center">
          {kind==="image" && src && (
            <img src={src} alt="Media" className="max-h-full max-w-full object-contain" />
          )}
          {kind==="video" && (
            <div className="w-full h-full">
              <video controls className="h-full w-full bg-black">
                {src ? <source src={src} /> : null}
              </video>
            </div>
          )}
          {kind==="podcast" && (
            <div className="p-6 text-sm text-muted-foreground">
              <p>Podcast player</p>
              {src ? (
                <audio controls className="mt-2 w-full">
                  <source src={src}/>
                </audio>
              ) : null}
            </div>
          )}
        </div>

        <button
          aria-label="Close"
          onClick={()=>setOpen(false)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/90 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        >
          ×
        </button>
      </div>
    </>
  );
}

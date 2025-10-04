"use client";
import * as React from "react";

type OpenEvt = CustomEvent<{ src: string }>;

export default function FloorPlanOverlay() {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState<string>("");

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as OpenEvt;
      if (ce?.detail?.src) {
        setSrc(ce.detail.src);
        setOpen(true);
      }
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-floor-plan", handler as EventListener);
    document.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("open-floor-plan", handler as EventListener);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[210] bg-black/40 backdrop-blur-[2px]" onClick={()=>setOpen(false)} />
      <div
        className="fixed z-[211] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden
                   left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[78vw] h-[68vh]"
        role="dialog" aria-modal="true" aria-label="Floor plan"
      >
        <img src={src} alt="Floor plan" className="h-full w-full object-contain bg-white" loading="eager" decoding="async" />
        <button
          aria-label="Close"
          onClick={()=>setOpen(false)}
          className="absolute right-4 top-4 h-10 w-10 grid place-items-center rounded-xl border border-black/5 bg-white/90"
        >×</button>
      </div>
    </>
  );
}

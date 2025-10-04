import * as React from "react";
import Icon from "@/app/components/Icon";

type OpenEvt = CustomEvent<{ src: string }>;

export default function FloorPlanOverlay() {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState<string>("");
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as OpenEvt;
      if (ce?.detail?.src) {
        setSrc(ce.detail.src);
        setOpen(true);
      }
    };
    window.addEventListener("open-floor-plan", handler as EventListener);
    return () => window.removeEventListener("open-floor-plan", handler as EventListener);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <div
        className="fixed z-[81] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden"
        style={{ width: "75vw", height: "75vh", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
      >
        {!err ? (
          <img src={src} alt="Floor plan" className="h-full w-full object-contain bg-white" loading="eager" decoding="async" />
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/90 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        >
          <Icon name="x" className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

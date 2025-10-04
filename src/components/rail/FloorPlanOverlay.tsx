import * as React from "react";

type OpenEvt = CustomEvent<{ src: string }>;

export default function FloorPlanOverlay() {
  const [open, setOpen] = React.useState(false);
  const [src, setSrc] = React.useState("/images/floorplan-demo.svg");
  const [err, setErr] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as OpenEvt;
      setErr(false);
      if (ce?.detail?.src) setSrc(ce.detail.src);
      setOpen(true);
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
      {/* backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      {/* centered modal */}
      <div
        className="fixed left-1/2 top-[44%] z-[81] -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[65vh]
                   bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden border border-black/5"
      >
        <div className="relative h-full w-full grid place-items-center">
          {!err ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt="Floor plan"
              className="h-full w-full object-contain bg-white"
              onError={() => setErr(true)}
            />
          ) : (
            <div className="text-sm text-neutral-600">
              Couldn’t load the floor plan.{" "}
              <button
                onClick={() => {
                  setErr(false);
                  setSrc((s) => s);
                }}
                className="underline"
              >
                Retry
              </button>
            </div>
          )}

          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl
                       border border-black/5 bg-white/90 backdrop-blur-md hover:shadow
                       outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}

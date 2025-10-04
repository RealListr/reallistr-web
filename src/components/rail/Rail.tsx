import * as React from "react";
import { Ruler } from "lucide-react";

export default function Rail() {
  const btn =
    "grid h-12 w-12 place-items-center rounded-2xl border border-black/5 " +
    "bg-white/90 backdrop-blur-md transform-gpu will-change-transform " +
    "transition-[transform,box-shadow,opacity] duration-200 ease-out " +
    "hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] active:translate-y-[1px] " +
    "outline-none focus-visible:ring-2 focus-visible:ring-black/20";

  return (
    <div className="fixed right-4 top-20 z-[70] flex flex-col gap-3">
      <button
        aria-label="Floor Plan"
        className={btn}
        onClick={() => {
          const ev = new CustomEvent("open-floor-plan", {
            detail: { src: "/images/floorplan-demo.svg" },
          });
          window.dispatchEvent(ev);
        }}
      >
        <Ruler className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

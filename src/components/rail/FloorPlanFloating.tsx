import * as React from "react";
import Icon from "@/app/components/Icon";

export default function FloorPlanFloating({ imageSrc }: { imageSrc: string }) {
  const [open, setOpen] = React.useState(false);

  // 12x12 rail button with subtle hover (no lift)
  const btn =
    "grid h-12 w-12 place-items-center rounded-2xl border border-black/5 " +
    "bg-white/90 backdrop-blur-md " +
    "transition-[box-shadow,opacity] duration-150 ease-out " +
    "hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] active:opacity-95 " +
    "outline-none focus-visible:ring-2 focus-visible:ring-black/20";

  return (
    <>
      <button aria-label="Floor Plan" onClick={(e)=>{e.preventDefault&&e.preventDefault(); e.stopPropagation&&e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-floor-plan',{detail:{src:'/images/floorplan-123.png'}}));}} className={btn} onClick={() => setOpen(true)}>
        <Icon name="ruler" className="h-5 w-5" />
      </button>

      {open ? (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          {/* modal: 75% of viewport, centered */}
          <div
            className="fixed z-[81] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden"
            style={{
              width: "75vw",
              height: "75vh",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={imageSrc}
              alt="Floor plan"
              className="h-full w-full object-contain bg-white"
              loading="eager"
              decoding="async"
            />
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/90 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

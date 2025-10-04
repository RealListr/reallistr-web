import * as React from "react";
import Icon from "@/app/components/Icon";

export default function FloorPlanFloating({ imageSrc }: { imageSrc: string }) {
  const [open, setOpen] = React.useState(false);

  const btn =
    "grid h-12 w-12 place-items-center rounded-2xl border border-black/5 " +
    "bg-white/90 backdrop-blur-md " +
    "transition-[box-shadow,opacity] duration-150 ease-out " +
    "hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] active:opacity-95 " +
    "outline-none focus-visible:ring-2 focus-visible:ring-black/20";

  return (
    <>
      <button aria-label="Floor Plan" className={btn} onClick={() => setOpen(true)}>
        <Icon name="ruler" className="h-5 w-5" />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-6 md:inset-10 lg:inset-16 z-[81] rounded-2xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
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

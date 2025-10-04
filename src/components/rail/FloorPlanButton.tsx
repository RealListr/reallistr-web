import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Icon from "@/app/components/Icon";

export default function FloorPlanButton({ imageSrc }: { imageSrc: string }) {
  const btn =
    "grid h-12 w-12 place-items-center rounded-2xl border border-black/5 " +
    "bg-white/90 backdrop-blur-md " +
    "transform-gpu will-change-transform transition-[box-shadow,opacity] duration-150 ease-out " +
    "hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] active:opacity-95 " +
    "outline-none focus-visible:ring-2 focus-visible:ring-black/20";

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button aria-label="Floor Plan" onClick={(e)=>{e.preventDefault&&e.preventDefault(); e.stopPropagation&&e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-floor-plan',{detail:{src:'/images/floorplan-123.png'}}));}} className={btn}>
          {/* use a mapping-friendly name; 'ruler' or 'layout' both work via Icon resolver */}
          <Icon name="ruler" className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content
          className="fixed inset-6 md:inset-10 lg:inset-16 rounded-2xl overflow-hidden bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
        >
          <div className="h-full w-full bg-white">
            {/* Image scales to fit, preserves aspect */}
            <img
              src={imageSrc}
              alt="Floor plan"
              className="h-full w-full object-contain bg-white"
              loading="eager"
              decoding="async"
            />
          </div>

          <Dialog.Close
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/90 backdrop-blur-md
                       outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            <Icon name="x" className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

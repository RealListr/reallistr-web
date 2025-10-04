import * as React from "react";
import QuickFact from "@/components/ui/quick-fact";
import Icon from "@/app/components/Icon";
import FloorPlanFloating from "@/components/rail/FloorPlanFloating";
import FloorPlanButton from "@/components/rail/FloorPlanButton";

const btn =
  "grid h-12 w-12 place-items-center rounded-2xl border border-black/5 " +
  "bg-white/90 backdrop-blur-md " +
  "transform-gpu will-change-transform transition-[transform,box-shadow,opacity] duration-200 ease-out " +
  "hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] active:translate-y-0 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-black/20";

export default function QuickFactsRail(props: {
  beds?: number | string;
  baths?: number | string;
  parking?: number | string;
  solar?: string;
  ev?: string;
  floorPlanSrc?: string;   // 👈 add this
  className?: string;
}) {
  const { beds, baths, parking, solar, ev, floorPlanSrc, className } = props; // 👈 include here


  return (
    <nav
      aria-label="Property quick facts"
      className={"fixed right-4 top-20 z-[60] flex flex-col gap-3 " + (className ?? "")}
      style={{ isolation: "isolate" }}
    >
      <QuickFact
        label="Bedrooms"
        value={beds}
        trigger={
          <button aria-label="Bedrooms" className={btn}>
            <Icon name="bed" className="h-5 w-5" />
          </button>
        }
      />
      <QuickFact
        label="Bathrooms"
        value={baths}
        trigger={
          <button aria-label="Bathrooms" className={btn}>
            <Icon name="bath" className="h-5 w-5" />
          </button>
        }
      />
      <QuickFact
        label="Parking"
        value={parking}
        trigger={
          <button aria-label="Parking" className={btn}>
            <Icon name="car" className="h-5 w-5" />
          </button>
        }
      />
      <QuickFact
        label="Solar"
        value={solar}
        trigger={
          <button aria-label="Solar" className={btn}>
            <Icon name="solar" className="h-5 w-5" />
          </button>
        }
      />
      <QuickFact
        label="EV Charger"
        value={ev}
        trigger={
          <button aria-label="EV Charger" className={btn}>
            <Icon name="plug" className="h-5 w-5" />
          </button>
        }
      />
    {floorPlanSrc ? <FloorPlanButton imageSrc={floorPlanSrc} /> : null}
    {floorPlanSrc ? <FloorPlanFloating imageSrc={floorPlanSrc} /> : null}
  
  </nav>
  );
}

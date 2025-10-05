import React from "react";
import { Bed, Bath, Car, Heart, MoreVertical, User2 } from "lucide-react";

/**
 * Premium listing card + top rail.
 * - White background overall (handled in globals.css)
 * - Agent icon ~30% bigger
 * - Address under price
 * - Ghost mini icons for bed/bath/car
 * - Sleek font (Plus Jakarta Sans) – added in layout.tsx
 * - Top rail icons bigger, no shadow
 * - RealLIstr badge top-left, bold
 */

const stories = [
  { label: "Parina" },
  { label: "Downtown" },
  { label: "Marina" },
  { label: "The Spri…" },
  { label: "Al Barsha" },
];

export default function PremiumListingCard() {
  return (
    <div className="min-h-screen w-full bg-white py-6">
      <div className="mx-auto max-w-screen-md relative">
        {/* RealLIstr badge (top-left) */}
        <div className="absolute -top-2 left-0 z-20 select-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-4 py-1.5 text-[12px] font-extrabold tracking-wide text-neutral-900">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="uppercase">RealLIstr</span>
          </div>
        </div>

        {/* Top Rail – bigger, no shadow */}
        <div className="sticky top-0 z-10 mb-5 flex items-center gap-4 overflow-x-auto rounded-xl bg-white px-1 py-2">
          {stories.map((s, i) => (
            <button
              key={i}
              className="group inline-flex flex-col items-center gap-2"
              aria-label={s.label}
            >
              <span className="grid h-[66px] w-[66px] place-items-center rounded-full border border-neutral-200 bg-white transition-transform group-active:scale-95">
                <span className="h-[58px] w-[58px] rounded-full bg-neutral-100" />
              </span>
              <span className="text-[11px] font-medium text-neutral-600">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Listing Card */}
        <article className="rounded-2xl border border-neutral-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <div className="flex items-center gap-3">
              {/* Agent avatar +30% (52px) */}
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-neutral-100">
                <User2 className="h-6 w-6 text-neutral-500" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-neutral-900 leading-tight">Aisha Patel</div>
                <div className="text-[12px] text-neutral-500 leading-tight">Luxe Realty</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-neutral-500">
              <button aria-label="Follow" className="text-[13px] font-medium text-emerald-600">+ Follow</button>
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              <MoreVertical className="h-5 w-5" strokeWidth={1.5} />
            </div>
          </div>

          {/* Media */}
          <div className="mt-3 aspect-[4/5] w-full overflow-hidden rounded-2xl border-y border-neutral-200 bg-neutral-50">
            <img
              src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Price + Address */}
          <div className="px-4 pt-4">
            <div className="text-[22px] font-semibold tracking-tight text-neutral-900">AED 4,250,000</div>
            <div className="mt-0.5 text-[13px] text-neutral-600">One JLT, Jumeirah Lake Towers</div>
          </div>

          {/* Meta: ghost mini icons */}
          <div className="flex items-center gap-5 px-4 pb-4 pt-3 text-neutral-500">
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <Bed className="h-4 w-4 opacity-70" strokeWidth={1.25} />
              4
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <Bath className="h-4 w-4 opacity-70" strokeWidth={1.25} />
              2
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <Car className="h-4 w-4 opacity-70" strokeWidth={1.25} />
              2
            </span>
            <div className="ml-auto text-[12px] text-neutral-500">Sat 11:15–11:45am ▾</div>
          </div>
        </article>
      </div>
    </div>
  );
}

import { Bed, Bath, Car, Heart, MoreVertical, User2, Building2, MapPin, Info, Share2 } from "lucide-react";

const stories = ["Parina","Downtown","Marina","The Spri…","Al Barsha"];

export default function PremiumListingCard() {
  return (
    <div className="min-h-screen flex justify-center bg-white py-8">
      <div className="w-full max-w-screen-md px-4 relative">
        {/* Brand header */}
        <h1 className="mb-3 text-[22px] sm:text-2xl font-extrabold leading-none tracking-tight text-neutral-900">
          RealListr
        </h1>

        {/* Top Rail */}
        <div className="mb-5 flex items-center gap-4 overflow-x-auto rounded-xl bg-white p-2">
          {stories.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="grid h-[66px] w-[66px] place-items-center rounded-full border border-neutral-200">
                <span className="h-[58px] w-[58px] rounded-full bg-neutral-100" />
              </span>
              <span className="text-[11px] text-neutral-600">{s}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <article className="rounded-2xl border border-neutral-200 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 pt-4">
            <div className="flex items-center gap-3">
              {/* AGENCY circle icon — now same size as agent (52px) */}
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-neutral-100">
                <Building2 className="h-6 w-6 text-neutral-600" strokeWidth={1.5} />
              </div>
              {/* Agent avatar (52px) */}
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-neutral-100">
                <User2 className="h-6 w-6 text-neutral-500" strokeWidth={1.5} />
              </div>
              {/* Names */}
              <div className="ml-1">
                <div className="text-[15px] font-semibold text-neutral-900 leading-tight">Aisha Patel</div>
                <div className="text-[12px] text-neutral-500 leading-tight">Luxe Realty</div>
              </div>
            </div>

            {/* Actions — added Share */}
            <div className="flex items-center gap-5 text-neutral-600">
              <button aria-label="Follow" className="text-[13px] font-medium text-emerald-600">+ Follow</button>
              <Share2 className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <MapPin className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <Info className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <Heart className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <MoreVertical className="h-5 w-5 opacity-80" strokeWidth={1.5} />
            </div>
          </div>

          {/* Media placeholder */}
          <div className="mt-3 h-[460px] w-full overflow-hidden rounded-2xl border-y border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200" />

          {/* Price + Address */}
          <div className="px-4 pt-4">
            <div className="text-[22px] font-semibold tracking-tight text-neutral-900">AED 4,250,000</div>
            <div className="mt-0.5 text-[13px] text-neutral-600">One JLT, Jumeirah Lake Towers</div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-5 px-4 pb-4 pt-3 text-neutral-500">
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Bed className="h-4 w-4 opacity-70" strokeWidth={1.25}/>4</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Bath className="h-4 w-4 opacity-70" strokeWidth={1.25}/>2</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Car className="h-4 w-4 opacity-70" strokeWidth={1.25}/>2</span>
            <div className="ml-auto text-[12px] text-neutral-500">Sat 11:15–11:45am ▾</div>
          </div>
        </article>
      </div>
    </div>
  );
}

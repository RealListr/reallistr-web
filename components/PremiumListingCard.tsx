import {
  Bed, Bath, Car, Heart, MoreVertical, User2, Building2,
  MapPin, Info, Share2, Ruler, SunMedium, PlugZap, Home
} from "lucide-react";

const stories = ["Parina","Downtown","Marina","The Spri…","Al Barsha"];

export default function PremiumListingCard() {
  return (
    <div className="min-h-screen flex justify-center bg-white py-6">
      <div className="w-full max-w-screen-md sm:px-4 px-3 relative">
        <h1 className="mb-3 text-[22px] sm:text-2xl font-extrabold leading-none tracking-tight text-neutral-900">
          RealListr
        </h1>

        <div className="mb-5 flex items-center gap-4 overflow-x-auto rounded-xl bg-white p-2">
          {stories.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <span className="grid h-[66px] w-[66px] place-items-center rounded-full border border-neutral-200">
                <span className="h-[58px] w-[58px] rounded-full bg-neutral-100" />
              </span>
              <span className="text-[11px] text-neutral-600">{s}</span>
            </div>
          ))}
        </div>

        <article className="rounded-2xl border border-neutral-200 bg-white">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-neutral-100 shrink-0">
                <Building2 className="h-6 w-6 text-neutral-600" strokeWidth={1.5} />
              </div>
              <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-neutral-100 shrink-0">
                <User2 className="h-6 w-6 text-neutral-500" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="text-[16px] sm:text-[15px] font-semibold text-neutral-900 leading-tight truncate">
                  Aisha Patel
                </div>
                <div className="text-[12px] text-neutral-500 leading-tight truncate">
                  Luxe Realty
                </div>
              </div>
              <button
                className="ml-2 inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 text-[12px] font-medium text-emerald-600 sm:hidden"
                aria-label="Follow"
              >
                + Follow
              </button>
            </div>

            <div className="flex items-center gap-5 text-neutral-600 ml-auto">
              <button
                className="hidden sm:inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 text-[12px] font-medium text-emerald-600"
                aria-label="Follow"
              >
                + Follow
              </button>
              <Share2 className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <MapPin className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <Info className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <Heart className="h-5 w-5 opacity-80" strokeWidth={1.5} />
              <MoreVertical className="h-5 w-5 opacity-80" strokeWidth={1.5} />
            </div>
          </div>

          {/* Media */}
          <div className="mt-3 h-[380px] sm:h-[460px] w-full overflow-hidden rounded-2xl border-y border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-200" />

          {/* Price + Address */}
          <div className="px-4 pt-4">
            <div className="text-[22px] font-semibold tracking-tight text-neutral-900">AED 4,250,000</div>
            <div className="mt-0.5 text-[13px] text-neutral-600">One JLT, Jumeirah Lake Towers</div>
          </div>

          {/* Specs row — ghost mini icons (now includes property type, land, solar, EV) */}
          <div className="flex items-center flex-wrap gap-x-5 gap-y-2 px-4 pb-4 pt-3 text-neutral-500">
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Bed className="h-4 w-4 opacity-70" strokeWidth={1.25}/>4</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Bath className="h-4 w-4 opacity-70" strokeWidth={1.25}/>2</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Car className="h-4 w-4 opacity-70" strokeWidth={1.25}/>2</span>

            <span className="inline-flex items-center gap-1.5 text-[12px]"><Home className="h-4 w-4 opacity-70" strokeWidth={1.25}/>Home</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><Ruler className="h-4 w-4 opacity-70" strokeWidth={1.25}/>Land Size m²</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><SunMedium className="h-4 w-4 opacity-70" strokeWidth={1.25}/>Solar & wattage</span>
            <span className="inline-flex items-center gap-1.5 text-[12px]"><PlugZap className="h-4 w-4 opacity-70" strokeWidth={1.25}/>EV Charger</span>

            <span className="ml-auto text-[12px] text-neutral-500">Sat 11:15–11:45am ▾</span>
          </div>
        </article>
      </div>
    </div>
  );
}

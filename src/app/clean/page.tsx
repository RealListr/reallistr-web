'use client';
import { Ic } from '@/components/ghost/GhostIcons';

function Circle({label}:{label:string}){
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm"/>
      <span className="text-xs text-neutral-600">{label}</span>
    </div>
  );
}

function Pill({children, tone='neutral'}:{children:React.ReactNode; tone?:'neutral'|'green'}) {
  const cls = tone==='green'
    ? 'bg-green-100 text-green-800'
    : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50';
  return <span className={`text-sm rounded-full px-3 py-1 ${cls}`}>{children}</span>;
}

export default function Clean(){
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top circular rail */}
      <section className="mb-6">
        <div className="flex items-center gap-6">
          <Circle label="Parina"/><Circle label="Downtown"/><Circle label="Marina"/><Circle label="The Springs"/><Circle label="Al Barsha"/>
        </div>
      </section>

      {/* Feeder Card */}
      <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
        {/* Header */}
        <header className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200">
              {/* little doc icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none">
                <path d="M7 6h7l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200"/>
              <div>
                <p className="font-semibold leading-tight">Aisha Patel</p>
                <p className="text-sm text-neutral-600 leading-tight">Luxe Realty</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone="green">Open for Inspection</Pill>
            <Pill>Sat 11:15–11:45am</Pill>
          </div>
        </header>

        {/* Media (fixed height, cover) */}
        <div className="bg-neutral-100 h-[380px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
            className="w-full h-full object-cover" alt=""
          />
        </div>

        {/* Footer */}
        <footer className="p-5 border-t border-neutral-100">
          <p className="text-2xl font-bold">AED 4,250,000</p>
          <p className="text-sm text-neutral-700 mt-1">One JLT, Jumeirah Lake Towers</p>

          {/* Ghost mini icons row (16px) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-700 mt-4">
            <span className="inline-flex items-center gap-1.5"><Ic.Bed />4</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Bath />2</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Car />2</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Home />Home</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Land />Land Size m²</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Solar />Solar & wattage</span>
            <span className="inline-flex items-center gap-1.5"><Ic.Charger />EV Charger</span>
          </div>
        </footer>
      </article>
    </main>
  );
}

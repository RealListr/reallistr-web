'use client';

function GhostIcon({name, className=""}:{name:"bed"|"bath"|"car"|"home"|"land"|"solar"|"charger"; className?:string}) {
  const cls = "w-4 h-4 "+className;
  switch(name){
    case "bed":     return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M3 17v-6a2 2 0 0 1 2-2h4a4 4 0 0 1 4 4v4M3 13h18M21 17V9a2 2 0 0 0-2-2h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "bath":    return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M5 13v-2a3 3 0 0 1 3-3h1M7 18h10M4 14h16l-1 3a3 3 0 0 1-2.8 2H7.8A3 3 0 0 1 5 17l-1-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "car":     return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M3 14l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 9l2 5M5 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7.5" cy="17" r="1.5" fill="currentColor"/><circle cx="16.5" cy="17" r="1.5" fill="currentColor"/></svg>;
    case "home":    return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "land":    return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M3 17h18M4 13l4-2 4 2 4-2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "solar":   return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M12 3v2M12 19v2M3 12h2M19 12h2M4.2 6.2l1.4 1.4M18.4 18.4l1.4 1.4M4.2 17.8l1.4-1.4M18.4 5.6l1.4-1.4M8 14h8l1-4H7l1 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "charger": return <svg viewBox="0 0 24 24" className={cls} fill="none"><path d="M7 7h6a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2Zm9 2h1a2 2 0 0 1 2 2v1.5a2.5 2.5 0 0 1-2.5 2.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
}

function Circle({label}:{label:string}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full border border-neutral-200 bg-white shadow-sm"/>
      <span className="text-xs text-neutral-600">{label}</span>
    </div>
  );
}

function FeederCard(){
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full grid place-items-center bg-neutral-50 border border-neutral-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-600" fill="none">
              <path d="M4 10h16M6 10v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
          <span className="text-sm rounded-full px-3 py-1 bg-green-100 text-green-800">
            Open for Inspection
          </span>
          <span className="text-sm rounded-full px-3 py-1 border border-neutral-200 text-neutral-700">
            Sat 11:15–11:45am
          </span>
        </div>
      </header>

      {/* Media */}
      <div className="bg-neutral-100 h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer */}
      <footer className="p-5 border-t border-neutral-100">
        <p className="text-2xl font-bold">AED 4,250,000</p>
        <p className="text-sm text-neutral-700 mt-1">One JLT, Jumeirah Lake Towers</p>

        {/* Ghost icon row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-700 mt-4">
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="bed"/><span>4</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="bath"/><span>2</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="car"/><span>2</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="home"/><span>Home</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="land"/><span>Land Size m²</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="solar"/><span>Solar & wattage</span></span>
          <span className="inline-flex items-center gap-1.5"><GhostIcon name="charger"/><span>EV Charger</span></span>
        </div>
      </footer>
    </article>
  );
}

export default function CleanDemo(){
  return (
    <main className="mx-auto max-w-4xl p-6">
      {/* Top circular rail */}
      <section className="mb-6">
        <div className="flex items-center gap-6">
          <Circle label="Parina"/>
          <Circle label="Downtown"/>
          <Circle label="Marina"/>
          <Circle label="The Springs"/>
          <Circle label="Al Barsha"/>
        </div>
      </section>

      {/* Main card */}
      <FeederCard />
    </main>
  );
}

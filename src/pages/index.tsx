// src/pages/index.tsx
import * as React from "react";
import Icon from "@/app/components/Icon";
import AgentDock, { type Agent } from "@/app/components/AgentDock";

/** Property icons */
type IconName =
  | "bed" | "car" | "bath" | "solar" | "plug" | "ruler" | "home" | "bolt" | "map-pin" | "info" | "bar-chart";

const ORDER: IconName[] = ["bed","car","bath","solar","plug","ruler","home","bolt","map-pin","info","bar-chart"];
const STRONG: Record<IconName, boolean> = {
  bed:true, car:true, bath:true, solar:false, plug:false, ruler:false, home:false, bolt:false,
  "map-pin":false, info:false, "bar-chart":false
};

/** Tokens */
const EDGE = 24;
const STACK = 44;
const GAP  = 16;
const PANEL_H = 140;
const HUD_W   = 380;
const DOCK_W  = 320;

const AGENTS: Agent[] = [
  { id: "1", name: "Westley Buhagiar", role: "Principal",   phone: "+61123456789", messageHref: "sms:+61123456789" },
  { id: "2", name: "Alex Morton",       role: "Sales Agent", phone: "+61123450000", messageHref: "sms:+61123450000" },
  { id: "3", name: "Sam Lee",           role: "Buyer Specialist", phone: "+61123451111", messageHref: "sms:+61123451111" },
];

/** Single source of truth for the current property */
const PROPERTY = {
  price: "$2,450,000",
  addressLine: "12 Example Street, Bondi NSW",
  open1: "Sat 11:15–11:45am",
  open2: "Wed 5:30–6:00pm",
};

/** Quick-facts (shown on hover/tap; no navigation) */
const QUICK_FACTS = {
  bed: 4,
  bath: 3,
  car: 2,
  solar: true, // has solar?
  plug: true,  // has EV charger?
} as const;

type QuickName = "bed" | "bath" | "car" | "solar" | "plug";

function formatFact(name: QuickName) {
  if (name === "bed")  return { label: "Bedrooms",  value: `${QUICK_FACTS.bed}` };
  if (name === "bath") return { label: "Bathrooms", value: `${QUICK_FACTS.bath}` };
  if (name === "car")  return { label: "Parking",   value: `${QUICK_FACTS.car}` };
  if (name === "solar")return { label: "Solar",     value: QUICK_FACTS.solar ? "Installed" : "None" };
  return { label: "EV Charger", value: QUICK_FACTS.plug ? "Installed" : "None" };
}

/** Right-rail click router (non-quick icons only) */
function routeFor(name: Exclude<IconName, QuickName>) {
  switch (name) {
    case "map-pin":
      window.location.href = `/map?address=${encodeURIComponent(PROPERTY.addressLine)}`;
      return;
    case "bar-chart":
      window.location.href = "/dash";
      return;
    case "info":
      window.location.href = "/p/info";
      return;
    case "bolt":
      window.location.href = "/value";
      return;
    case "ruler":
      window.location.href = "/specs";
      return;
    case "home":
      window.location.href = "/";
      return;
    default:
      alert(`"${name}" tapped – wire specific action next.`);
  }
}

export default function Home() {
  const page: React.CSSProperties = {
    position: "relative", width: "100vw", height: "100vh",
    overflow: "hidden",
    background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
  };

  /* Right icon stack */
  const stack: React.CSSProperties = {
    position: "absolute", right: EDGE, bottom: EDGE,
    display: "flex", flexDirection: "column", gap: 12, alignItems: "center", zIndex: 50,
  };
  const chipBase: React.CSSProperties = {
    width: STACK, height: STACK, borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.35)",
    backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  };
  const chipStrong: React.CSSProperties = {
    ...chipBase,
    border: "1px solid rgba(148,163,184,.55)",
    background: "rgba(255,255,255,.55)",
  };

  /** One shared bottom bar card */
  const sharedCard: React.CSSProperties = {
    position: "absolute",
    right: EDGE + STACK + GAP,
    bottom: EDGE,
    display: "flex",
    alignItems: "stretch",
    gap: 0,
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.65)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(15,23,42,.08)",
    overflow: "hidden",
    zIndex: 40,
  };

  /* Inside sections get no outer chrome */
  const dockWrap: React.CSSProperties = {
    width: DOCK_W, height: PANEL_H, padding: 12, display: "flex",
  };
  const divider: React.CSSProperties = { width: 1, background: "rgba(148,163,184,.35)" };
  const hud: React.CSSProperties = {
    width: HUD_W, height: PANEL_H, padding: 14,
    display: "flex", flexDirection: "column", justifyContent: "space-between",
  };
  const price: React.CSSProperties   = { fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.1 };
  const address: React.CSSProperties = { fontSize: 14, color: "#374151" };
  const opens: React.CSSProperties   = { display: "flex", gap: 10, flexWrap: "wrap" };
  const pill: React.CSSProperties    = {
    fontSize: 12, color: "#111827",
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.65)",
    borderRadius: 999, padding: "6px 10px",
  };

  const css = `
    .chip:focus-visible { outline: 2px solid rgba(31,41,55,.6); outline-offset: 2px; }
    .chip:hover { background: rgba(255,255,255,.75); }
    @media (max-width: 1024px) {
      .shared { right: ${EDGE}px; left: ${EDGE}px; flex-direction: column; }
      .shared .divider { height: 1px; width: 100%; }
      .shared .hud, .shared .dock { width: auto; }
    }
    @media (max-width: 640px) {
      .dock .list { display: grid !important; grid-auto-flow: column; grid-auto-columns: minmax(160px, 1fr); overflow-x: auto; gap: 10px; }
    }
  `;

  /** Quick-fact toast state + positioned next to hovered/tapped icon */
  const [fact, setFact] = React.useState<null | { label: string; value: string }>(null);
  const [factTop, setFactTop] = React.useState<number | null>(null);
  const factTimer = React.useRef<number | null>(null);

  // toast visual
  const factStyle: React.CSSProperties = {
    position: "fixed",
    right: EDGE + STACK + 12, // to the LEFT of the icon rail
    top: factTop ?? 0,
    transform: "translateY(-50%)",
    zIndex: 60,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.90)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(15,23,42,.10)",
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
    fontSize: 13,
    color: "#111827",
    display: "flex",
    gap: 8,
    alignItems: "center",
    pointerEvents: "none",
  };
  const factDot: React.CSSProperties = { width: 6, height: 6, borderRadius: 999, background: "#111827" };

  /** Utility: compute top from a button’s rect (center vertically) */
  const centerTop = (btn: HTMLElement) => {
    const r = btn.getBoundingClientRect();
    return r.top + r.height / 2;
  };

  /** Utility to show/hide toast with optional auto-hide after tap */
  const showFact = (name: QuickName, btn?: HTMLElement, autoHideMs?: number) => {
    setFact(formatFact(name));
    if (btn) setFactTop(centerTop(btn));
    if (factTimer.current) window.clearTimeout(factTimer.current);
    if (autoHideMs) {
      factTimer.current = window.setTimeout(() => setFact(null), autoHideMs);
    }
  };
  const hideFact = () => {
    if (factTimer.current) window.clearTimeout(factTimer.current);
    setFact(null);
  };

  /** Is a given icon one of the quick facts? */
  const isQuick = (n: IconName): n is QuickName =>
    (["bed","bath","car","solar","plug"] as const).includes(n as any);

  /** Handle click across the rail */
  const handleIconClick = (name: IconName, btn?: HTMLElement) => {
    if (isQuick(name)) {
      showFact(name, btn, 1600); // auto hide after 1.6s
      return;
    }
    routeFor(name as Exclude<IconName, QuickName>);
  };

  return (
    <main style={page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Quick-fact toast */}
      {fact && factTop !== null && (
        <div style={factStyle} role="status" aria-live="polite">
          <span style={factDot} />
          <strong style={{fontWeight:600}}>{fact.label}</strong>
          <span>• {fact.value}</span>
        </div>
      )}

      {/* ONE long card containing Dock (bare) + divider + HUD (bare) */}
      <div className="shared" style={sharedCard}>
        <div className="dock" style={dockWrap}>
          <AgentDock agents={AGENTS} width={DOCK_W} height={PANEL_H} maxVisible={3} chrome="bare" />
        </div>

        <div className="divider" style={divider} />

        <section className="hud" style={hud} aria-label="Property summary">
          <div>
            <div style={price}>{PROPERTY.price}</div>
            <div style={address}>{PROPERTY.addressLine}</div>
          </div>
          <div style={opens}>
            <span style={pill}>{PROPERTY.open1}</span>
            <span style={pill}>{PROPERTY.open2}</span>
          </div>
        </section>
      </div>

      {/* Right-side icon stack (interactive) */}
      <div style={stack}>
        {ORDER.map((name) => {
          const base = STRONG[name] ? { ...chipStrong } : { ...chipBase };
          const style: React.CSSProperties = {
            ...base,
            transition: "transform .12s ease, background-color .12s ease, box-shadow .12s ease",
            outline: "none",
          };

          return (
            <button
              key={name}
              type="button"
              className="chip"
              style={style}
              title={name}
              aria-label={name}
              onMouseEnter={(e) => isQuick(name) && showFact(name, e.currentTarget)}
              onMouseLeave={hideFact}
              onFocus={(e) => isQuick(name) && showFact(name, e.currentTarget)}
              onBlur={hideFact}
              onClick={(e) => handleIconClick(name, e.currentTarget)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleIconClick(name, e.currentTarget)}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 6px 18px rgba(15,23,42,.10)")}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <Icon
                name={name as any}
                size={22}
                style={{ color: STRONG[name] ? "rgba(17,24,39,.85)" : "rgba(17,24,39,.70)" }}
              />
            </button>
          );
        })}
      </div>
    </main>
  );
}

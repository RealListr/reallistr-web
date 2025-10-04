import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";
import FloorPlanCapture from "@/components/rail/FloorPlanCapture";
import * as React from "react";
import Icon from "@/app/components/Icon";
import AgentDock, { type Agent } from "@/app/components/AgentDock";
import QuickFactsRail from "@/components/rail/QuickFactsRail";

// ...
<QuickFactsRail
  beds={3}
  baths={2}
  parking={1}
  solar="Installed"
  ev="Available"
  floorPlanSrc="/images/floorplan-123.png"   // 👈 set to your real path
 floorPlanSrc="/images/floorplan-123.png" floorPlanSrc="/images/floorplan-123.png" floorPlanSrc="/images/floorplan-123.png"/>


/** ===== Naming & glyphs ================================================== */
/** Public names we’ll use in the rail. */
type IconName =
  | "bed"
  | "car"
  | "bath"
  | "solar"
  | "plug"
  | "floor"     // was "ruler"
  | "media"     // was "home"
  | "like"      // was "bolt"
  | "map"       // was "map-pin"
  | "info"
  | "data";     // was "bar-chart"

/** Order on the rail (top→bottom). */
const ORDER: IconName[] = [
  "bed", "car", "bath", "solar", "plug", "floor", "media", "map", "info", "like", "data",
];

/** Which chips get the “strong” tone (darker icon). */
const STRONG: Record<IconName, boolean> = {
  bed: true, car: true, bath: true,
  solar: false, plug: false, floor: false, media: false, map: false, info: false, like: false, data: false,
};

/** Map friendly labels for tooltips/popovers. */
const LABEL: Record<IconName, string> = {
  bed: "Bedrooms",
  car: "Parking",
  bath: "Bathrooms",
  solar: "Solar",
  plug: "EV Charger",
  floor: "Floor Plan",
  media: "Media",
  map: "Map",
  info: "Property Info",
  like: "Like",
  data: "Data Facts",
};

/** Our sprite may not have “like” or “map” names; alias them to existing glyphs. */
const GLYPH: Record<IconName, string> = {
  bed: "bed",
  car: "car",
  bath: "bath",
  solar: "sun",           // use your solar glyph id if it’s different
  plug: "plug",
  floor: "ruler",         // ruler glyph used for “Floor Plan”
  media: "home",          // home glyph represents Media hub for now
  map: "map-pin",         // existing map-pin glyph
  info: "info",
  like: "heart",          // heart glyph as “Like”
  data: "bar-chart",      // bar-chart glyph
};

/** ===== Property Data (single source of truth) =========================== */
const PROPERTY = {
  price: "$2,450,000",
  addressLine: "12 Example Street, Bondi NSW",
  open1: "Sat 11:15–11:45am",
  open2: "Wed 5:30–6:00pm",
  facts: {
    bed: 4,
    bath: 2,
    car: 2,
    solar: true,
    plug: true,
  },
};

const AGENTS: Agent[] = [
  { id: "1", name: "Westley Buhagiar", role: "Principal", phone: "+61123456789", messageHref: "sms:+61123456789" },
  { id: "2", name: "Alex Morton", role: "Sales Agent", phone: "+61123450000", messageHref: "sms:+61123450000" },
  { id: "3", name: "Sam Lee", role: "Buyer Specialist", phone: "+61123451111", messageHref: "sms:+61123451111" },
];

/** ===== Layout tokens ==================================================== */
const EDGE = 24;
const STACK = 44;
const GAP = 16;
const PANEL_H = 140;
const HUD_W = 380;
const DOCK_W = 320;

/** ===== Click routing ==================================================== */
function handleIconClick(name: IconName) {
  switch (name) {
    case "map":
      window.location.href = `/map?address=${encodeURIComponent(PROPERTY.addressLine)}`;
      return;
    case "data":
      window.location.href = "/dash";
      return;
    case "info":
      window.location.href = "/p/info";
      return;
    case "floor":
      window.location.href = "/specs";
      return;
    case "media":
      window.location.href = "/media"; // stub route to a media hub page
      return;
    case "like":
      alert("Saved to favourites (placeholder)."); // TODO: hook to user list
      return;
    // These show popovers on hover/tap; click can stay noop for now.
    case "bed":
    case "bath":
    case "car":
    case "solar":
    case "plug":
      return;
  }
}

/** ===== Small popover positioned next to an icon ======================== */
type PopoverState =
  | { open: false }
  | {
      open: true;
      name: IconName;
      left: number;
      top: number;
      text: string;
    };

function getQuickText(name: IconName): string | null {
  switch (name) {
    case "bed":
      return `${PROPERTY.facts.bed}`;
    case "bath":
      return `${PROPERTY.facts.bath}`;
    case "car":
      return `${PROPERTY.facts.car}`;
    case "solar":
      return PROPERTY.facts.solar ? "Installed" : "Not installed";
    case "plug":
      return PROPERTY.facts.plug ? "Installed" : "Not installed";
    default:
      return null;
  }
}

/** ===== Page ============================================================ */
export default function Home() {
  const page: React.CSSProperties = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
  };

  // right rail styles
  const stack: React.CSSProperties = {
    position: "absolute",
    right: EDGE,
    bottom: EDGE,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    zIndex: 50,
  };
  const chipBase: React.CSSProperties = {
    width: STACK,
    height: STACK,
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.35)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  const chipStrong: React.CSSProperties = {
    ...chipBase,
    border: "1px solid rgba(148,163,184,.55)",
    background: "rgba(255,255,255,.55)",
  };

  // shared bottom bar (dock + summary)
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
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(15,23,42,.08)",
    overflow: "hidden",
    zIndex: 40,
  };
  const dockWrap: React.CSSProperties = {
    width: DOCK_W,
    height: PANEL_H,
    padding: 12,
    display: "flex",
  };
  const divider: React.CSSProperties = { width: 1, background: "rgba(148,163,184,.35)" };
  const hud: React.CSSProperties = {
    width: HUD_W,
    height: PANEL_H,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  const price: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.1 };
  const address: React.CSSProperties = { fontSize: 14, color: "#374151" };
  const opens: React.CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap" };
  const pill: React.CSSProperties = {
    fontSize: 12,
    color: "#111827",
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.65)",
    borderRadius: 999,
    padding: "6px 10px",
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
<QuickFactsRail beds={3} baths={2} parking={1} solar="Installed" ev="Available" />

  /** Popover state anchored to icon rect */
  const [pop, setPop] = React.useState<PopoverState>({ open: false });
  const hideTimer = React.useRef<number | null>(null);

  function showPopover(name: IconName, target: HTMLElement) {
    const txt = getQuickText(name);
    if (!txt) return;
    const r = target.getBoundingClientRect();
    const left = r.left - 14; // nudge left a touch
    const top = r.top + r.height / 2;
    setPop({
      open: true,
      name,
      left,
      top,
      text: txt,
    });
  }
  function scheduleHide() {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setPop({ open: false }), 140) as unknown as number;
  }

  return (
  <>
    <FloorPlanOverlay />
    <FloorPlanCapture defaultSrc="/images/floorplan-123.png" />
  <main style={page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

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
              title={LABEL[name]}
              aria-label={LABEL[name]}
              onClick={() => handleIconClick(name)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleIconClick(name)}
              onMouseEnter={(e) => showPopover(name, e.currentTarget)}
              onMouseLeave={scheduleHide}
              onFocus={(e) => showPopover(name, e.currentTarget)}
              onBlur={scheduleHide}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Icon
                name={GLYPH[name] as any}
                size={22}
                style={{ color: STRONG[name] ? "rgba(17,24,39,.85)" : "rgba(17,24,39,.70)" }}
              />
            </button>
          );
  </>
)
        })}
      </div>

      {/* Popover anchored next to hovered icon */}
      {pop.open && (
        <div
          onMouseEnter={() => hideTimer.current && window.clearTimeout(hideTimer.current)}
          onMouseLeave={scheduleHide}
          style={{
            position: "fixed",
            transform: `translate(calc(${pop.left}px - 12rem), calc(${pop.top}px - 50%))`, // to LEFT of the icon
            zIndex: 60,
            background: "rgba(255,255,255,.95)",
            border: "1px solid rgba(148,163,184,.35)",
            borderRadius: 12,
            boxShadow: "0 10px 24px rgba(15,23,42,.14)",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 160,
          }}
          role="status"
          aria-live="polite"
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "rgba(17,24,39,.9)",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14, color: "#111827", fontWeight: 600 }}>{LABEL[pop.name]}</span>
          <span style={{ fontSize: 14, color: "#111827", marginLeft: "auto" }}>{pop.text}</span>
        </div>
      )}
    </main>
  );
}

import * as React from "react";
import Icon from "@/app/components/Icon";
import AgentDock, { type Agent } from "@/app/components/AgentDock";
import FloorPlanOverlay from "@/components/rail/FloorPlanOverlay";
import MediaOverlay from "@/components/rail/MediaOverlay";
import MediaChooser from "@/components/rail/MediaChooser";
// near other imports

// inside your page component's JSX (toward the bottom of <main>)
<MediaOverlay />

/** ===== Naming & glyphs ================================================== */
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

/** Strong tone (darker glyph). */
const STRONG: Record<IconName, boolean> = {
  bed: true, car: true, bath: true,
  solar: false, plug: false, floor: false, media: false, map: false, info: false, like: false, data: false,
};

/** Tooltip labels. */
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

/** Aliases to Icon glyph names. */
const GLYPH: Record<IconName, string> = {
  bed: "bed",
  car: "car",
  bath: "bath",
  solar: "sun",
  plug: "plug",
  floor: "ruler",
  media: "home",
  map: "map-pin",
  info: "info",
  like: "heart",
  data: "bar-chart",
};

/** ===== Property Data ==================================================== */
const PROPERTY = {
  price: "$2,450,000",
  addressLine: "12 Example Street, Bondi NSW",
  open1: "Sat 11:15–11:45am",
  open2: "Wed 5:30–6:00pm",
  facts: { bed: 4, bath: 2, car: 2, solar: true, plug: true },
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

/** Popover state anchored to icon rect */
type PopoverState =
  | { open: false }
  | { open: true; name: IconName; left: number; top: number; text: string };

function getQuickText(name: IconName): string | null {
  switch (name) {
    case "bed": return `${PROPERTY.facts.bed}`;
    case "bath": return `${PROPERTY.facts.bath}`;
    case "car": return `${PROPERTY.facts.car}`;
    case "solar": return PROPERTY.facts.solar ? "Installed" : "Not installed";
    case "plug": return PROPERTY.facts.plug ? "Installed" : "Not installed";
    default: return null;
  }
}

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
    case "floor": {
      const ev = new CustomEvent("open-floor-plan", {
        detail: { src: "/images/floorplan-demo.svg" },
      });
      window.dispatchEvent(ev);
      return;
    }
    case "media": {
      window.dispatchEvent(new Event("toggle-media-panel"));
      return;
    }
    case "like":
      alert("Saved to favourites (placeholder).");
      return;
    // popover-only
    case "bed":
    case "bath":
    case "car":
    case "solar":
    case "plug":
      return;
  }
}

/** ===== Page ============================================================ */
export default function Home() {
  
  
  React.useEffect(() => {
    const handler = (e:any) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-rl-media]");
      if (!el) return;
      console.log("[Media] rail icon clicked");
      window.dispatchEvent(new CustomEvent("open-media-chooser", {
        detail: { items: [
          { type:"image", src:"https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label:"Living" },
          { type:"image", src:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label:"Kitchen" },
          { type:"video", src:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label:"Video" }
        ] }
      }));
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
React.useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = (e: any) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const el = t.closest("[data-rl-media]") as HTMLElement | null;
      if (!el) return;
      console.log("[Media] icon clicked via doc trap");
      const demo = [
        { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label: "Living" },
        { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Kitchen" },
        { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" }
      ] as any;
      openMediaChooser(demo);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
const page: React.CSSProperties = {
    position: "relative", width: "100vw", height: "100vh", overflow: "hidden",
    background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
  };

  // right rail styles
  const stack: React.CSSProperties = {
    position: "absolute", right: EDGE, bottom: EDGE,
    display: "flex", flexDirection: "column", gap: 12, alignItems: "center", zIndex: 50,
  };
  const chipBase: React.CSSProperties = {
    width: STACK, height: STACK, borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)", background: "rgba(255,255,255,.35)",
    backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  };
  const chipStrong: React.CSSProperties = {
    ...chipBase, border: "1px solid rgba(148,163,184,.55)", background: "rgba(255,255,255,.55)",
  };

  // shared bottom bar (dock + summary)
  const sharedCard: React.CSSProperties = {
    position: "absolute", right: EDGE + STACK + GAP, bottom: EDGE,
    display: "flex", alignItems: "stretch", gap: 0, borderRadius: 16,
    border: "1px solid rgba(148,163,184,.35)", background: "rgba(255,255,255,.65)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(15,23,42,.08)", overflow: "hidden", zIndex: 40,
  };
  const dockWrap: React.CSSProperties = { width: DOCK_W, height: PANEL_H, padding: 12, display: "flex" };
  const divider: React.CSSProperties = { width: 1, background: "rgba(148,163,184,.35)" };
  const hud: React.CSSProperties = {
    width: HUD_W, height: PANEL_H, padding: 14,
    display: "flex", flexDirection: "column", justifyContent: "space-between",
  };
  const price: React.CSSProperties = { fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1.1 };
  const address: React.CSSProperties = { fontSize: 14, color: "#374151" };
  const opens: React.CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap" };
  const pill: React.CSSProperties = {
    fontSize: 12, color: "#111827", border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.65)", borderRadius: 999, padding: "6px 10px",
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

  // Popover state & helpers (must be BEFORE return)
  const [pop, setPop] = React.useState<PopoverState>({ open: false });
  const hideTimer = React.useRef<number | null>(null);

  function showPopover(name: IconName, target: HTMLElement) {
    const txt = getQuickText(name);
    if (!txt) return;
    const r = target.getBoundingClientRect();
    const left = r.left - 14;
    const top = r.top + r.height / 2;
    setPop({ open: true, name, left, top, text: txt });
  }
  function scheduleHide() {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setPop({ open: false }), 140) as unknown as number;
  }

  return (
    <main style={page}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ONE long card containing Dock + divider + HUD */}
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
                className="h-[22px] w-[22px]"
                style={{ color: STRONG[name] ? "rgba(17,24,39,.85)" : "rgba(17,24,39,.70)" }}
              />
            </button>
          );
        })}
      </div>

      {/* Popover anchored next to hovered icon */}
      {pop.open && (
        <div
          onMouseEnter={() => hideTimer.current && window.clearTimeout(hideTimer.current)}
          onMouseLeave={scheduleHide}
          style={{
            position: "fixed",
            transform: `translate(calc(${pop.left}px - 12rem), calc(${pop.top}px - 50%))`,
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
              width: 6, height: 6, borderRadius: 999,
              background: "rgba(17,24,39,.9)", display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14, color: "#111827", fontWeight: 600 }}>{LABEL[pop.name]}</span>
          <span style={{ fontSize: 14, color: "#111827", marginLeft: "auto" }}>{pop.text}</span>
        </div>
      )}

      {/* Floor plan overlay mounted once */}
      <FloorPlanOverlay />
    
      
      
      
      
      
      
      <MediaChooser />
      <MediaOverlay />
<MediaChooser />
      <MediaOverlay />
<MediaChooser />
      <MediaOverlay />
<MediaChooser />
      <MediaOverlay />
<MediaChooser />
      <MediaOverlay />
<MediaChooser />
      <MediaOverlay />
<MediaOverlay />
  <button
        onClick={() => { (window as any).rlOpenMediaChooser?.([
          { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label: "Living" },
          { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Kitchen" },
          { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" },
        ]); }}
        className="fixed bottom-6 right-6 z-[3000] px-3 py-2 rounded-full shadow-lg bg-black text-white text-xs">
        Media ▶︎
      </button>
      <button
        onClick={() => { (window as any).rlOpenMediaChooser?.([
          { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80", label: "Living" },
          { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80", label: "Kitchen" },
          { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" }
        ]); }}
        className="fixed bottom-6 right-6 z-[3000] px-3 py-2 rounded-full shadow-lg bg-black text-white text-xs">
        Media ▶︎
      </button>
    </main>
  );
}

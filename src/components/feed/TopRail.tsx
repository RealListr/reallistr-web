import * as React from "react";

const railWrap: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  padding: "14px 0 10px",
};

const railInner: React.CSSProperties = {
  width: "var(--feed-w, 760px)",
  display: "flex",
  gap: 14,
  overflowX: "auto",
  scrollbarWidth: "none" as any,
  padding: "0 8px",
};

const chipStyle: React.CSSProperties = {
  flex: "0 0 auto",
  display: "grid",
  placeItems: "center",
  width: 56,
  gap: 6,
};

const avatarWrap: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: "999px",
  border: "3px solid rgba(236, 72, 153, .35)",
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
};

const avatarDot: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "999px",
  background: "url(/images/city-chip.jpg) center/cover, #e5e7eb",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#111827",
  whiteSpace: "nowrap" as const,
  maxWidth: 64,
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center" as const,
};

const css = `
  /* Hide scrollbars for WebKit chips */
  .rl-rail::-webkit-scrollbar { display: none; }

  /* Breakpoints: control the feed width token and chip size */
  :root { --feed-w: 760px; }
  @media (max-width: 1279px) { :root { --feed-w: 680px; } }
  @media (max-width: 767px)  { :root { --feed-w: calc(100vw - 24px); } }

  /* Sticky rail on mobile */
  @media (max-width: 767px) {
    .rl-rail-wrap { position: sticky; top: 0; z-index: 30; backdrop-filter: blur(6px); }
    .rl-rail-wrap::after { content:""; position:absolute; inset:0; background:rgba(255,255,255,.65); }
    .rl-rail { position: relative; z-index: 1; }
  }

  /* Chip scale on mobile */
  @media (max-width: 767px) {
    .rl-chip { width: 52px; gap: 4px; }
    .rl-ava { width: 40px; height: 40px; border-width: 2px; }
    .rl-dot { width: 32px; height: 32px; }
    .rl-lbl { font-size: 11px; max-width: 56px; }
  }
`;

type Chip = { id: string; name: string };
const CHIPS: Chip[] = [
  { id: "parina", name: "Parina" },
  { id: "downtown", name: "Downtown" },
  { id: "marina", name: "Marina" },
  { id: "springs", name: "The Springs" },
  { id: "albarsha", name: "Al Barsha" },
];

export default function TopRail() {
  return (
    <div className="rl-rail-wrap" style={railWrap}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="rl-rail" style={railInner} aria-label="Areas">
        {CHIPS.map((c) => (
          <button key={c.id} type="button" className="rl-chip" style={chipStyle} title={c.name}>
            <span className="rl-ava" style={avatarWrap}><i className="rl-dot" style={avatarDot} /></span>
            <span className="rl-lbl" style={labelStyle}>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

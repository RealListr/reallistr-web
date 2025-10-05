import * as React from "react";
import { openMediaOverlay } from "@/lib/mediaBus";

export type Media =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string };

export type FeedListing = {
  id: string;
  agent: { name: string; agency: string; avatarUrl?: string };
  price: string;
  address: string;
  facts: { bed: number; bath: number; car: number };
  media: Media[];
  infoHtml?: string;
  liked?: boolean;
  saved?: boolean;
  following?: boolean;
};

const card: React.CSSProperties = {
  width: "var(--feed-w, 760px)",
  margin: "0 auto 18px",
  borderRadius: 16,
  border: "1px solid rgba(148,163,184,.35)",
  background: "rgba(255,255,255,.98)",
  boxShadow: "0 12px 32px rgba(15,23,42,.08)",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 14px",
};

const avatar: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 999, background: "#e5e7eb", flex: "0 0 auto",
};

const hmeta: React.CSSProperties = { lineHeight: 1.1 };
const nameCss: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#0f172a" };
const agencyCss: React.CSSProperties = { fontSize: 12, color: "#475569" };

const headRight: React.CSSProperties = { marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" };
const ghostButton = (active=false): React.CSSProperties => ({
  height: 32, padding: "0 10px", borderRadius: 999, border: "1px solid rgba(148,163,184,.35)",
  background: active ? "rgba(34,197,94,.12)" : "rgba(255,255,255,.75)",
  display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer"
});

const mediaWrap: React.CSSProperties = {
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 5",   // lock 4:5 like Instagram
  background: "#f3f4f6",
};

const mediaImg: React.CSSProperties = {
  position: "absolute", inset: 0,
  width: "100%", height: "100%",
  objectFit: "cover" as const, objectPosition: "center",
};

const body: React.CSSProperties = { padding: "12px 14px" };
const priceCss: React.CSSProperties = { fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 4 };
const addrCss: React.CSSProperties = {
  fontSize: 13, color: "#374151", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
};

const factsRow: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 16, paddingTop: 10, paddingBottom: 6, fontSize: 13, color: "#0f172a"
};
const bottomRow: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px 12px", borderTop: "1px solid rgba(148,163,184,.28)"
};

const iconBtn = (active=false): React.CSSProperties => ({
  width: 34, height: 34, borderRadius: 10,
  border: "1px solid rgba(148,163,184,.35)",
  background: active ? "rgba(15,23,42,.08)" : "rgba(255,255,255,.85)",
  display: "inline-grid", placeItems: "center", cursor: "pointer"
});

const css = `
  @media (max-width: 1279px) {
    .rl-price { font-size: 17px !important; }
  }
  @media (max-width: 767px) {
    .rl-card { margin-bottom: 14px !important; }
  }
`;

export default function FeedCard({ listing }: { listing: FeedListing }) {
  const [liked, setLiked] = React.useState(!!listing.liked);
  const [saved, setSaved] = React.useState(!!listing.saved);
  const [following, setFollowing] = React.useState(!!listing.following);

  const openMedia = () => openMediaOverlay(listing.media, 0);

  return (
    <article className="rl-card" style={card} aria-label={`${listing.address} by ${listing.agent.name}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Header */}
      <header style={header}>
        <i style={avatar} aria-hidden />
        <div style={hmeta}>
          <div style={nameCss}>{listing.agent.name}</div>
          <div style={agencyCss}>{listing.agent.agency}</div>
        </div>
        <div style={headRight}>
          <button type="button" style={ghostButton(following)} onClick={() => setFollowing(v => !v)} aria-label={following ? "Following" : "Follow"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 11V7m-8 4V7m-3 8h14" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span style={{fontSize:12, color:"#0f172a"}}>{following ? "Following" : "Follow"}</span>
          </button>
          <button type="button" style={iconBtn(liked)} onClick={() => setLiked(v => !v)} aria-label="Like">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#ef4444" : "none"} stroke="#0f172a"><path d="M12 21s-6.5-4.35-9-7.5C1 10 2.5 6.5 6 6.5c2 0 3.5 1.5 6 4 2.5-2.5 4-4 6-4 3.5 0 5 3.5 3 7  -2.5 3.15-9 7.5-9 7.5z"/></svg>
          </button>
          <button type="button" style={iconBtn(saved)} onClick={() => setSaved(v => !v)} aria-label="Save">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#0f172a" : "none"} stroke="#0f172a"><path d="M6 3h12v18l-6-3-6 3V3z"/></svg>
          </button>
        </div>
      </header>

      {/* Media (4:5 fixed; click to open gallery) */}
      <div style={mediaWrap} role="button" onClick={openMedia} aria-label="Open gallery">
        {listing.media?.[0]?.type === "image" ? (
          <img src={listing.media[0].src} alt={listing.media[0].label || "image"} style={mediaImg} />
        ) : (
          <div style={{...mediaImg, display:"grid", placeItems:"center"}}>
            <svg width="58" height="58" viewBox="0 0 24 24" fill="#0f172a"><path d="M8 5v14l11-7z"/></svg>
          </div>
        )}
      </div>

      {/* Body */}
      <section style={body}>
        <div className="rl-price" style={priceCss}>{listing.price}</div>
        <div style={addrCss} title={listing.address}>{listing.address}</div>

        <div style={factsRow} aria-label="Property facts">
          <span title="Bedrooms">🛏 {listing.facts.bed}</span>
          <span title="Bathrooms">🛁 {listing.facts.bath}</span>
          <span title="Parking">🚗 {listing.facts.car}</span>
        </div>
      </section>

      {/* Bottom mini actions */}
      <div style={bottomRow}>
        <button type="button" style={iconBtn()} aria-label="Property info" data-rl="info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h2v4h-2z"/></svg>
        </button>
        <button type="button" style={iconBtn()} aria-label="Open map" data-rl="map">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a"><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z"/><circle cx="15" cy="10" r="2"/></svg>
        </button>
      </div>
    </article>
  );
}

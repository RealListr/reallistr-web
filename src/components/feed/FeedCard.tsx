import * as React from "react";

export type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export type FeedListing = {
  id: string;
  agent: { name: string; agency?: string; avatarUrl?: string; agencyLogoUrl?: string };
  price: string;
  address: string;
  facts: { bed?: number; bath?: number; car?: number };
  openTimes?: string[];               // e.g., ["Sat 11:15–11:45am", "Wed 5:30–6:00pm"]
  media: MediaItem[];
  infoHtml?: string;                  // shown in Info overlay
};

type Props = {
  data: FeedListing;
  onFollow?: () => void;
  onLike?: () => void;
  onSave?: () => void;
};

const COL_W = 760; // matches centered feed
const MEDIA_ASPECT = 4 / 5; // 4:5 like Instagram

function openMediaOverlay(items: MediaItem[], startIndex = 0) {
  if (!items?.length) return;
  window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { items, startIndex } }));
}
function openInfoOverlay(listing: FeedListing) {
  window.dispatchEvent(new CustomEvent("open-listing-info", { detail: { listing } }));
}
function openMapOverlay(listing: FeedListing) {
  window.dispatchEvent(new CustomEvent("open-listing-map", { detail: { listing } }));
}

export default function FeedCard({ data, onFollow, onLike, onSave }: Props) {
  const w = COL_W;
  const h = Math.round((COL_W / MEDIA_ASPECT) * 1); // fixed 4:5 box

  return (
    <article
      style={{
        width: "100%",
        maxWidth: w,
        margin: "24px auto",
        borderRadius: 16,
        border: "1px solid rgba(148,163,184,.30)",
        background: "rgba(255,255,255,.96)",
        boxShadow: "0 10px 28px rgba(15,23,42,.06)",
        overflow: "hidden",
      }}
      aria-label={`${data.agent?.name || "Agent"} listing card`}
    >
      {/* Header: avatar + agent + agency badge + follow / like / save */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(148,163,184,.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {/* Agent avatar */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                data.agent?.avatarUrl ? `url(${data.agent.avatarUrl}) center/cover` : "linear-gradient(180deg,#f1f5f9,#e5e7eb)",
              border: "1px solid rgba(148,163,184,.35)",
              flex: "0 0 auto",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <div style={{ display: "grid", lineHeight: 1.1 }}>
              <span style={{ fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap" }}>{data.agent?.name || "Agent"}</span>
              <span style={{ fontSize: 12, color: "#374151", whiteSpace: "nowrap" }}>{data.agent?.agency || "Agency"}</span>
            </div>
            {/* Agency badge (logo or neutral building) */}
            <div
              title={data.agent?.agency || "Agency"}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "1px solid rgba(148,163,184,.30)",
                background: data.agent?.agencyLogoUrl
                  ? `url(${data.agent.agencyLogoUrl}) center/cover`
                  : "rgba(241,245,249,.9)",
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
              }}
            >
              {!data.agent?.agencyLogoUrl && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 21h18M5 21V9l7-4 7 4v12" stroke="#334155" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={onFollow}
            title="Follow"
            style={{
              height: 30,
              padding: "0 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,.35)",
              background: "rgba(240,253,244,.9)",
              color: "#065f46",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 12v7m-3.5-3.5h7" stroke="#065f46" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Follow
          </button>
          <IconBtn title="Like" onClick={onLike} glyph="heart" />
          <IconBtn title="Save" onClick={onSave} glyph="bookmark" />
        </div>
      </header>

      {/* Media */}
      <div
        style={{
          width: "100%",
          height: h,
          background: "#e5e7eb",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={() => openMediaOverlay(data.media, 0)}
        role="button"
        aria-label="Open gallery"
      >
        {/* Use the first media item as the poster */}
        {data.media?.[0]?.type === "image" && (
          <img
            src={data.media[0].src}
            alt={data.media[0].label || "photo"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
        {data.media?.[0]?.type === "video" && (
          <video
            src={data.media[0].src}
            muted
            playsInline
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* Meta: price on the left, open times to the right */}
      <div
        style={{
          padding: "12px 14px 4px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{data.price}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {(data.openTimes || []).map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                color: "#0f172a",
                border: "1px solid rgba(148,163,184,.30)",
                background: "rgba(255,255,255,.9)",
                borderRadius: 999,
                padding: "6px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Address */}
      <div style={{ padding: "0 14px 10px", color: "#374151" }}>{data.address}</div>

      {/* Facts row: bed / bath / car / info / map (all mini ghost icons in ONE line) */}
      <div
        style={{
          padding: "8px 12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderTop: "1px solid rgba(148,163,184,.20)",
        }}
      >
        <Fact icon="bed" value={data.facts?.bed} />
        <Fact icon="bath" value={data.facts?.bath} />
        <Fact icon="car" value={data.facts?.car} />

        <span style={{ flex: 1 }} />

        <MiniBtn title="Property info" onClick={() => openInfoOverlay(data)} glyph="info" />
        <MiniBtn title="Map" onClick={() => openMapOverlay(data)} glyph="map" />
      </div>
    </article>
  );
}

/* ---------- Small building blocks ---------- */

function IconBtn({ title, onClick, glyph }: { title: string; onClick?: () => void; glyph: "heart" | "bookmark" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid rgba(148,163,184,.35)",
        background: "rgba(255,255,255,.9)",
        display: "grid",
        placeItems: "center",
      }}
    >
      {glyph === "heart" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s-7-4.35-9.5-8.1C.9 9.5 3.2 6 6.8 6c2 0 3.4 1.1 4.2 2.3C11.8 7.1 13.2 6 15.2 6c3.6 0 5.9 3.5 4.3 6.9C19 16.65 12 21 12 21z" stroke="#334155" strokeWidth="1.4" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 3h12v18l-6-4-6 4V3z" stroke="#334155" strokeWidth="1.4" />
        </svg>
      )}
    </button>
  );
}

function Fact({ icon, value }: { icon: "bed" | "bath" | "car"; value?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0f172a" }}>
      {icon === "bed" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 18V6m18 12V6M3 12h18" stroke="#0f172a" strokeWidth="1.6" />
        </svg>
      )}
      {icon === "bath" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 13h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3Zm3-6a3 3 0 0 1 6 0v6" stroke="#0f172a" strokeWidth="1.6" />
        </svg>
      )}
      {icon === "car" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 16h16l-2-6H6l-2 6Zm3 0v2m10-2v2" stroke="#0f172a" strokeWidth="1.6" />
        </svg>
      )}
      <span style={{ fontWeight: 600 }}>{value ?? 0}</span>
    </div>
  );
}

function MiniBtn({ title, onClick, glyph }: { title: string; onClick?: () => void; glyph: "info" | "map" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        height: 32,
        padding: "0 10px",
        borderRadius: 999,
        border: "1px solid rgba(148,163,184,.30)",
        background: "rgba(255,255,255,.9)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: "#0f172a",
      }}
    >
      {glyph === "info" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M12 10v6m0-8.5v.01" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s6-6.6 6-11.1A6 6 0 0 0 6 9.9C6 14.4 12 21 12 21z" stroke="#0f172a" strokeWidth="1.5" />
        </svg>
      )}
      <span style={{ fontWeight: 600 }}>{title}</span>
    </button>
  );
}

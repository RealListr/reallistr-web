import * as React from "react";
import Icon from "@/app/components/Icon";
import { openMediaOverlay, openInfoOverlay, openMapOverlay, type MediaItem } from "@/lib/listingBus";

export type FeedListing = {
  id: string;
  agent: { name: string; avatar?: string; agency?: string };
  price: string;
  address: string;
  facts: { bed?: number; bath?: number; car?: number };
  media: MediaItem[];
  infoHtml?: string;
};

export default function FeedCard({ data }: { data: FeedListing }) {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <article
      style={{
        width: "min(680px, 94vw)",
        margin: "18px auto",
        background: "rgba(255,255,255,.98)",
        border: "1px solid rgba(148,163,184,.35)",
        borderRadius: 16,
        boxShadow: "0 10px 28px rgba(15,23,42,.10)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 10, padding: 14 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: data.agent.avatar
              ? `url(${data.agent.avatar}) center/cover no-repeat`
              : "linear-gradient(135deg,#d1d5db,#e5e7eb)",
            border: "1px solid rgba(148,163,184,.45)",
          }}
          aria-hidden
        />
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontWeight: 600, color: "#111827" }}>{data.agent.name}</div>
          <div style={{ fontSize: 12, color: "#475569" }}>{data.agent.agency || ""}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            aria-label="Like"
            onClick={() => setLiked((v) => !v)}
            style={iconBtn}
            title="Like"
          >
            <Icon name="heart" style={{ width: 18, height: 18, color: liked ? "#ef4444" : "#0f172a" }} />
          </button>
          <button
            aria-label="Save"
            onClick={() => setSaved((v) => !v)}
            style={iconBtn}
            title="Save"
          >
            <Icon name="bookmark" style={{ width: 18, height: 18, color: saved ? "#0ea5e9" : "#0f172a" }} />
          </button>
          <button aria-label="More" style={iconBtn} title="More">
            <Icon name="more-vertical" style={{ width: 18, height: 18, color: "#0f172a" }} />
          </button>
        </div>
      </header>

      {/* Media */}
      <button
        onClick={() => openMediaOverlay(data.media, 0)}
        style={{ display: "block", width: "100%", border: "none", padding: 0, background: "transparent" }}
        aria-label="Open gallery"
      >
        <img
          src={(data.media.find((m) => m.type === "image") as any)?.src || ""}
          alt={data.address}
          style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
        />
      </button>

      {/* Body */}
      <div style={{ padding: "14px 16px 6px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{data.price}</div>
        <div style={{ fontSize: 14, color: "#374151", marginTop: 2 }}>{data.address}</div>

        {/* mini facts */}
        <div style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 10 }}>
          {data.facts.bed != null && (
            <span style={fact}>
              <Icon name="bed" style={factIcon} />
              {data.facts.bed}
            </span>
          )}
          {data.facts.bath != null && (
            <span style={fact}>
              <Icon name="bath" style={factIcon} />
              {data.facts.bath}
            </span>
          )}
          {data.facts.car != null && (
            <span style={fact}>
              <Icon name="car" style={factIcon} />
              {data.facts.car}
            </span>
          )}
          {/* compact actions on the same row */}
          <span style={{ marginLeft: "auto", display: "inline-flex", gap: 8 }}>
            <button
              aria-label="Property info"
              style={chipBtn}
              onClick={() =>
                openInfoOverlay({
                  title: "Property information",
                  html: data.infoHtml || "<p>Agent has not added details yet.</p>",
                })
              }
              title="Info"
            >
              <Icon name="info" style={{ width: 16, height: 16, color: "#0f172a" }} />
            </button>
            <button
              aria-label="Open map"
              style={chipBtn}
              onClick={() => openMapOverlay({ address: data.address })}
              title="Map"
            >
              <Icon name="map-pin" style={{ width: 16, height: 16, color: "#0f172a" }} />
            </button>
          </span>
        </div>
      </div>
    </article>
  );
}

const iconBtn: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid rgba(148,163,184,.35)",
  background: "rgba(255,255,255,.8)",
  display: "grid",
  placeItems: "center",
};

const fact: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 8, color: "#0f172a", fontSize: 14 };
const factIcon: React.CSSProperties = { width: 16, height: 16, color: "#0f172a" };
const chipBtn: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,.35)",
  background: "rgba(255,255,255,.9)",
  display: "grid",
  placeItems: "center",
};

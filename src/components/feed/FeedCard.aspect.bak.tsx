import * as React from "react";
import Icon from "@/app/components/Icon";
import { showToast } from "@/lib/toast";

type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export type FeedListing = {
  id: string;
  agent: { name: string; agency?: string; avatarUrl?: string };
  price: string;
  address: string;
  facts: { bed?: number; bath?: number; car?: number };
  media: MediaItem[];
  infoHtml?: string;
  liked?: boolean;
  saved?: boolean;
  followed?: boolean;
};

type Props = {
  item?: FeedListing;  // <-- defensive
  onFocus?: (id: string) => void;
};

export default function FeedCard({ item, onFocus }: Props) {
  // Normalize early so SSR never touches undefined fields
  const data: FeedListing = item ?? {
    id: "unknown",
    agent: { name: "Agent" },
    price: "",
    address: "",
    facts: {},
    media: [],
    infoHtml: "",
    liked: false,
    saved: false,
    followed: false,
  };

  const [liked, setLiked] = React.useState(!!data.liked);
  const [saved, setSaved] = React.useState(!!data.saved);
  const [followed, setFollowed] = React.useState(!!data.followed);

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onFocusIn = () => onFocus?.(data.id);
    el.addEventListener("focusin", onFocusIn);
    return () => el.removeEventListener("focusin", onFocusIn);
  }, [data.id, onFocus]);

  const openMedia = () => {
    if (!data.media?.length) return;
    window.dispatchEvent(new CustomEvent("open-media-overlay", {
      detail: { items: data.media, startIndex: 0 }
    }));
  };

  const openInfo = () => {
    window.dispatchEvent(new CustomEvent("open-info-overlay", {
      detail: { html: data.infoHtml || "<p>No extra info.</p>" }
    }));
  };

  const openMap = () => {
    window.dispatchEvent(new CustomEvent("open-map-overlay", {
      detail: { address: data.address }
    }));
  };

  const toggleLiked = () => {
    setLiked(v => !v);
    showToast(!liked ? "Liked" : "Unliked");
  };
  const toggleSaved = () => {
    setSaved(v => !v);
    showToast(!saved ? "Saved to Watchlist" : "Removed from Watchlist");
  };
  const toggleFollow = () => {
    setFollowed(v => !v);
    showToast(!followed ? `Following ${data.agent.name}` : `Unfollowed ${data.agent.name}`);
  };

  const Card = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      ref={rootRef}
      tabIndex={0}
      {...props}
      style={{
        ...props.style,
        outline: "none",
        borderRadius: 18,
        border: "1px solid rgba(148,163,184,.35)",
        background: "rgba(255,255,255,.80)",
        boxShadow: "0 10px 28px rgba(15,23,42,.10)",
        overflow: "hidden",
        transition: "transform .12s ease, box-shadow .12s ease",
      }}
      onMouseEnter={(e) => ((e.currentTarget.style.boxShadow = "0 14px 34px rgba(15,23,42,.14)"))}
      onMouseLeave={(e) => ((e.currentTarget.style.boxShadow = "0 10px 28px rgba(15,23,42,.10)"))}
    />
  );

  return (
    <Card className="rl-card" aria-label={`${data.address}`}>
      {/* Header: agent chip + mini Follow */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#e5e7eb" }} aria-hidden />
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{data.agent.name}</div>
          {data.agent.agency && <div style={{ fontSize: 11, color: "#475569" }}>{data.agent.agency}</div>}
        </div>
        <button
          onClick={toggleFollow}
          aria-label={followed ? "Unfollow agent" : "Follow agent"}
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "1px solid rgba(148,163,184,.35)",
            background: "rgba(255,255,255,.65)",
            borderRadius: 999,
            padding: "6px 10px",
            fontSize: 12
          }}
        >
          <Icon name="user-plus" className="h-[14px] w-[14px]" />
          {followed ? "Following" : "Follow"}
        </button>
        <div style={{ display: "flex", gap: 8, marginLeft: 10 }}>
          <IconToggle on={liked} onClick={toggleLiked} onIcon="heart" offIcon="heart" labelOn="Unlike" labelOff="Like" />
          <IconToggle on={saved} onClick={toggleSaved} onIcon="bookmark" offIcon="bookmark" labelOn="Unsave" labelOff="Save" />
        </div>
      </div>

      {/* Media hero (clickable) */}
      <button
        onClick={openMedia}
        aria-label="Open gallery"
        style={{ display: "block", width: "100%", height: 360, overflow: "hidden", position: "relative", cursor: "pointer" }}
      >
        <img
          src={(data.media?.[0]?.src) || "/images/placeholder.jpg"}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </button>

      {/* Body */}
      <div style={{ padding: "12px 14px 8px" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{data.price}</div>
        <div style={{ fontSize: 13, color: "#475569" }}>{data.address}</div>

        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8, color: "#0f172a" }}>
          {data.facts.bed != null && <Fact icon="bed" value={data.facts.bed} />}
          {data.facts.bath != null && <Fact icon="bath" value={data.facts.bath} />}
          {data.facts.car != null && <Fact icon="car" value={data.facts.car} />}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <MiniIconButton icon="info" label="Property info" onClick={openInfo} />
          <MiniIconButton icon="map-pin" label="Map" onClick={openMap} />
        </div>
      </div>
    </Card>
  );
}

function Fact({ icon, value }: { icon: string; value: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
      <Icon name={icon as any} className="h-[16px] w-[16px]" />
      <span>{value}</span>
    </span>
  );
}

function MiniIconButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        width: 36, height: 36, borderRadius: 10,
        border: "1px solid rgba(148,163,184,.35)", background: "rgba(255,255,255,.65)",
        display: "grid", placeItems: "center"
      }}
    >
      <Icon name={icon as any} className="h-[18px] w-[18px]" />
    </button>
  );
}

function IconToggle({
  on, onClick, onIcon, offIcon, labelOn, labelOff
}: { on: boolean; onClick: () => void; onIcon: string; offIcon: string; labelOn: string; labelOff: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={on ? labelOn : labelOff}
      title={on ? labelOn : labelOff}
      style={{
        width: 36, height: 36, borderRadius: 10,
        border: "1px solid rgba(148,163,184,.35)",
        background: on ? "rgba(251,207,232,.65)" : "rgba(255,255,255,.65)",
        display: "grid", placeItems: "center"
      }}
    >
      <Icon name={(on ? onIcon : offIcon) as any} className="h-[18px] w-[18px]" />
    </button>
  );
}

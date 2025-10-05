import * as React from "react";

type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

type Groups = {
  image: Item[];
  video: Item[];
  audio: Item[];
};

const TILE_W = 96;
const TILE_H = 152;
const GAP = 16;
const EDGE = 24; // distance from right rail

function groupItems(items: Item[]): Groups {
  const g: Groups = { image: [], video: [], audio: [] };
  for (const it of items) {
    if (it.type === "image") g.image.push(it);
    else if (it.type === "video") g.video.push(it);
    else if (it.type === "audio") g.audio.push(it);
  }
  return g;
}

function thumbFor(list: Item[]): string | null {
  if (!list.length) return null;
  return list[0].src;
}

function openOverlay(items: Item[], title: string) {
  // Try the overlay event first (if your MediaOverlay listens for it)…
  const evName = "open-media-overlay";
  const ev = new CustomEvent(evName, { detail: { items, title } });
  window.dispatchEvent(ev);

  // …fallbacks (in case only a helper is exposed)
  (window as any).rlOpenMediaOverlay?.(items, title);
}

export default function MediaDock() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [ready, setReady] = React.useState(false);

  // Keep in sync with the same event you already raise when the Media chip is clicked.
  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items?: Item[] } | undefined;
      if (!detail?.items?.length) return;
      setItems(detail.items);
      setReady(true);
    };
    window.addEventListener("open-media-chooser", onOpen as EventListener, { passive: true });
    return () => window.removeEventListener("open-media-chooser", onOpen as EventListener);
  }, []);

  const g = groupItems(items);
  const tiles: Array<{
    key: keyof Groups;
    label: string;
    list: Item[];
    accent: string;
  }> = [
    { key: "image", label: "Images", list: g.image, accent: "rgba(17,24,39,.85)" },
    { key: "video", label: "Video", list: g.video, accent: "rgba(17,24,39,.85)" },
    { key: "audio", label: "Podcast", list: g.audio, accent: "rgba(17,24,39,.85)" },
  ];

  // Hide until we have something to show
  if (!ready) return null;

  // Position: to the LEFT of the rail, vertically centered-ish above the bottom card
  const wrap: React.CSSProperties = {
    position: "absolute",
    right: EDGE + 44 /* chip width */ + 16 /* gap to rail */,
    bottom: 160, // sits nicely above the HUD card; tweak if desired
    display: "flex",
    gap: GAP,
    zIndex: 45,
  };

  const tileBase: React.CSSProperties = {
    width: TILE_W,
    height: TILE_H,
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.45)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.88))",
    boxShadow: "0 10px 24px rgba(15,23,42,.14)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform .12s ease, box-shadow .12s ease",
    backdropFilter: "blur(8px)" as any,
    WebkitBackdropFilter: "blur(8px)",
  };

  const thumbStyle: React.CSSProperties = {
    width: "100%",
    height: TILE_H - 40,
    objectFit: "cover",
    background: "linear-gradient(135deg,#f3f4f6,#e5e7eb)",
  };

  const footer: React.CSSProperties = {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    fontSize: 12,
    color: "#111827",
  };

  return (
    <div style={wrap} aria-label="Quick media categories">
      {tiles.map((t) => {
        const src = thumbFor(t.list);
        const count = t.list.length;
        const disabled = count === 0;

        return (
          <div
            key={t.key}
            role="button"
            aria-disabled={disabled}
            onClick={() => !disabled && openOverlay(t.list, t.label)}
            onMouseDown={(e) => ((e.currentTarget.style.transform = "translateY(1px)"))}
            onMouseUp={(e) => ((e.currentTarget.style.transform = "translateY(0)"))}
            style={{
              ...tileBase,
              opacity: disabled ? 0.45 : 1,
              border:
                "1px solid rgba(148,163,184," + (disabled ? ".30" : ".45") + ")",
            }}
          >
            {src ? (
              <img alt="" src={src} style={thumbStyle} />
            ) : (
              <div style={thumbStyle} />
            )}
            <div style={footer}>
              <span style={{ fontWeight: 600 }}>{t.label}</span>
              <span
                aria-label={`${count} ${t.label.toLowerCase()}`}
                style={{
                  minWidth: 22,
                  height: 22,
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,.35)",
                  background: "rgba(255,255,255,.85)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 6px",
                  fontSize: 11,
                  color: t.accent,
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

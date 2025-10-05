import * as React from "react";

export default function MapOverlay() {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent).detail as { address?: string };
      setAddress(d?.address || "");
      setOpen(true);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-map-overlay", onOpen as any);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("open-map-overlay", onOpen as any);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  if (!open) return null;
  const q = encodeURIComponent(address || "");
  return (
    <div
      onMouseDown={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.35)",
        backdropFilter: "blur(3px)",
        zIndex: 1000,
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 94vw)",
          height: "min(620px, 78vh)",
          background: "rgba(255,255,255,.98)",
          border: "1px solid rgba(148,163,184,.35)",
          borderRadius: 16,
          boxShadow: "0 18px 48px rgba(15,23,42,.18)",
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <header style={{ padding: "14px 16px", display: "flex", alignItems: "center" }}>
          <strong style={{ fontSize: 16, color: "#0f172a" }}>Map</strong>
          <span style={{ marginLeft: 8, color: "#475569" }}>{address}</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{
              marginLeft: "auto",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(148,163,184,.35)",
              background: "rgba(255,255,255,.8)",
            }}
          >
            ×
          </button>
        </header>
        <iframe
          title="map"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          style={{ width: "100%", height: "100%", border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

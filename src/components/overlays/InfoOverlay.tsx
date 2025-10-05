import * as React from "react";

export default function InfoOverlay() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("Property info");
  const [html, setHtml] = React.useState("<p>—</p>");

  React.useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent).detail as { title?: string; html?: string };
      setTitle(d?.title || "Property info");
      setHtml(d?.html || "<p>—</p>");
      setOpen(true);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-info-overlay", onOpen as any);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("open-info-overlay", onOpen as any);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  if (!open) return null;
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
          width: "min(760px, 92vw)",
          maxHeight: "82vh",
          overflow: "auto",
          background: "rgba(255,255,255,.98)",
          border: "1px solid rgba(148,163,184,.35)",
          borderRadius: 16,
          boxShadow: "0 18px 48px rgba(15,23,42,.18)",
        }}
      >
        <header style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <strong style={{ fontSize: 16, color: "#0f172a" }}>{title}</strong>
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
        <div style={{ padding: 16 }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

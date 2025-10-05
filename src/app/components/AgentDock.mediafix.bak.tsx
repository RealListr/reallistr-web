import React from "react";

export type Agent = {
  id: string;
  name: string;
  role: string;          // e.g., "Principal"
  phone?: string;
  messageHref?: string;  // sms:, whatsapp:, mailto:, etc.
  photoUrl?: string;     // optional (we'll fall back to monogram)
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last  = parts[parts.length - 1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

const monoAvatar: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 8,
  background: "linear-gradient(135deg,#d1d5db,#e5e7eb)",
  color: "#111827",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  letterSpacing: ".5px"
};

const actionBtnBase: React.CSSProperties = {
  width: 28, height: 28,
  borderRadius: 8,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(148,163,184,.35)",
  background: "rgba(255,255,255,.55)",
};

function PhoneIcon() {
  return (
    <svg width="16" height="16" aria-hidden="true" style={{color:"#111827"}}>
      <path d="M3 12c3 3 5 3 7 1l1-1a1 1 0 0 1 1 0l2 1a1 1 0 0 1 .5.9V15a2 2 0 0 1-2 2c-6 0-10-4-10-10A2 2 0 0 1 5 5h1a1 1 0 0 1 .9.5l1 2a1 1 0 0 1 0 1l-1 1c-2 2-2 4 1 7Z" fill="currentColor"/>
    </svg>
  );
}
function MsgIcon() {
  return (
    <svg width="16" height="16" aria-hidden="true" style={{color:"#111827"}}>
      <path d="M3 3h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 3v-3H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" fill="currentColor"/>
    </svg>
  );
}

export default function AgentDock({
  agents,
  height = 140,        // matches HUD height
  width  = 340,        // desktop width
  maxVisible = 3,
}: {
  agents: Agent[];
  height?: number;
  width?: number;
  maxVisible?: number;
}) {

  const dockWrap: React.CSSProperties = {
    position: "absolute",
    bottom: 24,
    // right is set by parent; we only define size & visuals
    width,
    height,
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.65)",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 6px 24px rgba(15,23,42,.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const list: React.CSSProperties = {
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: agents.length > maxVisible ? "auto" : "hidden",
  };

  const rowBase: React.CSSProperties = {
    height: 56,
    borderRadius: 12,
    border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.55)",
    display: "grid",
    gridTemplateColumns: "28px 1fr auto",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    transition: "transform .12s ease, box-shadow .12s ease",
  };

  const nameStyle: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: 1.15 };
  const roleStyle: React.CSSProperties = { fontSize: 13, color: "#374151" };

  const actions: React.CSSProperties = { display: "inline-flex", gap: 8 };

  return (
    <aside style={dockWrap} aria-label="Agents">
      <div style={list}>
        {agents.slice(0, maxVisible).map((a, idx) => (
          <button
            key={a.id}
            type="button"
            aria-label={`Contact ${a.name}, ${a.role}`}
            style={{
              ...rowBase,
              border:
                idx === 0 ? "1px solid rgba(148,163,184,.55)" : rowBase.border,
              background:
                idx === 0 ? "rgba(255,255,255,.70)" : rowBase.background,
            }}
            onClick={() => {
              // default click opens phone if present, else message if present; otherwise no-op
              if (a.phone) window.location.href = `tel:${a.phone}`;
              else if (a.messageHref) window.location.href = a.messageHref!;
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 16px rgba(15,23,42,.10)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            {/* Avatar / monogram */}
            {a.photoUrl ? (
              <img
                alt=""
                src={a.photoUrl}
                width={28}
                height={28}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            ) : (
              <div aria-hidden="true" style={monoAvatar}>{initials(a.name)}</div>
            )}

            {/* Name + role */}
            <div style={{ textAlign: "left", overflow: "hidden" }}>
              <div style={{ ...nameStyle, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                {a.name}
              </div>
              <div style={roleStyle}>{a.role}</div>
            </div>

            {/* Quick actions */}
            <div style={actions} aria-hidden="true">
              {a.phone && (
                <a
                  href={`tel:${a.phone}`}
                  title="Call"
                  style={{ ...actionBtnBase }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PhoneIcon />
                </a>
              )}
              {a.messageHref && (
                <a
                  href={a.messageHref}
                  title="Message"
                  style={{ ...actionBtnBase }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MsgIcon />
                </a>
              )}
            </div>
          </button>
        ))}
        {agents.length > maxVisible && (
          <div style={{ fontSize: 12, color: "#111827", opacity: .8, paddingLeft: 2 }}>
            +{agents.length - maxVisible} more
          </div>
        )}
      </div>
    </aside>
  );
}

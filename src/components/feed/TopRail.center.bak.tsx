import * as React from "react";

type Chip = { id: string; label: string; thumb?: string };
export default function TopRail({
  chips,
  value,
  onChange,
}: {
  chips: Chip[];
  value?: string;
  onChange?: (id: string) => void;
}) {
  return (
    <div style={{ padding: "14px 12px 8px", borderBottom: "1px solid rgba(148,163,184,.25)" }}>
      <div style={{ display: "flex", gap: 14, overflowX: "auto" }}>
        {chips.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              onClick={() => onChange?.(c.id)}
              style={{
                flex: "0 0 auto",
                display: "grid",
                placeItems: "center",
                gap: 6,
                padding: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-pressed={active}
            >
              <span
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "999px",
                  background:
                    c.thumb
                      ? `url(${c.thumb}) center/cover no-repeat`
                      : "linear-gradient(135deg,#d1d5db,#e5e7eb)",
                  border: active ? "3px solid #60a5fa" : "2px solid rgba(148,163,184,.45)",
                  boxShadow: active ? "0 0 0 3px rgba(96,165,250,.25)" : "none",
                }}
                aria-hidden
              />
              <span style={{ fontSize: 12, color: "#374151" }}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

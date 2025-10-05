import * as React from "react";

const FEED_MAX_W = 760;

const AREAS = [
  "Parina", "Downtown", "Marina", "The Springs", "Al Barsha"
];

export default function TopRail() {
  return (
    <div style={{ background: "transparent" }}>
      <div style={{ width: "100%", maxWidth: FEED_MAX_W, margin: "12px auto", padding: "0 8px" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", overflowX: "auto", padding: "8px 2px" }}>
          {AREAS.map((name, i) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: "999px",
                  border: "2px solid rgba(59,130,246,.35)", background: "linear-gradient(135deg,#e5e7eb,#f8fafc)"
                }}
              />
              <div style={{ fontSize: 12, color: "#374151", marginTop: 6 }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

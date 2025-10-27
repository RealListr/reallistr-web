"use client";

export function Header() {
  return (
    <header style={{ maxWidth: 896, margin: "0 auto", padding: "24px 16px 0" }}>
      <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: "34px" }}>RealListr</h1>
      {/* bulletproof rail */}
      <hr
        style={{
          marginTop: 12,
          height: 1,
          border: 0,
          background: "rgba(0,0,0,0.12)"
        }}
      />
    </header>
  );
}

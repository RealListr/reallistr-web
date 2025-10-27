"use client";
import Link from "next/link";

export function TabBar() {
  return (
    <nav style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 50,
      borderTop: "1px solid rgba(0,0,0,0.12)", background: "rgba(255,255,255,0.95)",
      backdropFilter: "saturate(180%) blur(8px)"
    }}>
      <div style={{ maxWidth: 896, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
        <Link href="/"        style={{ padding: 12, display: "flex", justifyContent: "center" }}>��</Link>
        <Link href="/search"  style={{ padding: 12, display: "flex", justifyContent: "center" }}>🔎</Link>
        <Link href="/calendar"style={{ padding: 12, display: "flex", justifyContent: "center" }}>📅</Link>
        <Link href="/alerts"  style={{ padding: 12, display: "flex", justifyContent: "center" }}>🔔</Link>
        <Link href="/me"      style={{ padding: 12, display: "flex", justifyContent: "center" }}>👤</Link>
      </div>
    </nav>
  );
}

import * as React from "react";
import type { Listing } from "@/lib/useListing";

export default function PropertyCard({ listing }: { listing: Listing }) {
  const card: React.CSSProperties = {
    borderRadius: 16, border: "1px solid rgba(148,163,184,.35)",
    background: "rgba(255,255,255,.75)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 10px 28px rgba(15,23,42,.12)", overflow: "hidden",
    display: "grid", gridTemplateColumns: "1.2fr 1fr", minHeight: 300,
  };

  const heroWrap: React.CSSProperties = { position: "relative", background: "#eef2f7" };
  const hero: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
  const ribbon: React.CSSProperties = {
    position:"absolute", left: 16, bottom:16, borderRadius: 999,
    background:"rgba(17,24,39,.85)", color:"#fff", padding:"6px 12px", fontWeight:700
  };

  const meta: React.CSSProperties = { padding: 18, display:"grid", gap: 14, alignContent:"space-between" };
  const price: React.CSSProperties = { fontSize: 26, fontWeight: 800, color:"#0f172a" };
  const addr: React.CSSProperties = { color:"#334155", fontSize: 14 };

  const pillsRow: React.CSSProperties = { display:"flex", gap: 8, flexWrap:"wrap" };
  const pill: React.CSSProperties = {
    border: "1px solid rgba(148,163,184,.35)", borderRadius: 999, padding:"6px 10px",
    background:"rgba(255,255,255,.85)", color:"#0f172a", fontSize:12
  };

  const fact: React.CSSProperties = { display:"flex", gap:12, color:"#0f172a", fontWeight:600 };

  const firstMedia = listing.media?.[0];

  return (
    <section style={card} aria-label="Property card">
      <div style={heroWrap}>
        {firstMedia?.type === "image" ? (
          <img src={firstMedia.src} alt={firstMedia.label || "Property image"} style={hero} />
        ) : (
          <div style={{...heroWrap, display:"grid", placeItems:"center", height:"100%"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"#1f2937",display:"grid",placeItems:"center"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
        <div style={ribbon}>{listing.price}</div>
      </div>

      <div style={meta}>
        <div>
          <div style={price}>{listing.price}</div>
          <div style={addr}>{listing.addressLine}</div>
        </div>

        <div style={fact}>
          <span>🛏 {listing.bed}</span>
          <span>🛁 {listing.bath}</span>
          <span>🚗 {listing.car}</span>
        </div>

        <div style={pillsRow}>
          {listing.open1 && <span style={pill}>{listing.open1}</span>}
          {listing.open2 && <span style={pill}>{listing.open2}</span>}
        </div>

        <div style={{display:"flex", gap:10}}>
          <a href="tel:+61123456789" style={{...pill, textDecoration:"none"}}>Call Agent</a>
          <a href="/p/info" style={{...pill, textDecoration:"none"}}>Property Info</a>
        </div>
      </div>
    </section>
  );
}

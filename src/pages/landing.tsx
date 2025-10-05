import * as React from "react";
import PropertyCard from "@/app/components/PropertyCard";
import { useListing } from "@/lib/useListing";

export default function Landing() {
  const listing = useListing();

  const hero: React.CSSProperties = {
    padding: "64px 24px", textAlign:"center",
    background:"radial-gradient(1200px 400px at 50% -20%, #ffffff 0%, #eef2f7 100%)",
    borderBottom: "1px solid rgba(148,163,184,.35)"
  };

  const h1: React.CSSProperties = { fontSize: 44, fontWeight: 900, letterSpacing: -0.5, color:"#0f172a" };
  const sub: React.CSSProperties = { fontSize: 18, color:"#334155", marginTop: 8 };

  const cta: React.CSSProperties = {
    marginTop: 20, display:"inline-block",
    borderRadius: 999, padding:"10px 16px",
    border:"1px solid rgba(148,163,184,.35)",
    background:"#111827", color:"#fff", textDecoration:"none", fontWeight:700
  };

  return (
    <main style={{minHeight:"100vh", background:"#f6f7fb"}}>
      <section style={hero}>
        <h1 style={h1}>RealListr</h1>
        <p style={sub}>Premium property marketing — images, video, podcasts and data in one elegant card.</p>
        <a href="/p/card" style={cta}>View Property Card</a>
      </section>

      <section style={{padding:"40px 24px", display:"grid", placeItems:"center"}}>
        <div style={{maxWidth: 1100, width:"100%"}}>
          <PropertyCard listing={listing} />
        </div>
      </section>
    </main>
  );
}

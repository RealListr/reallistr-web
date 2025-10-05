import * as React from "react";
import PropertyCard from "@/app/components/PropertyCard";
import { useListing } from "@/lib/useListing";

export default function CardDemo() {
  const listing = useListing();
  return (
    <main style={{
      minHeight:"100vh", display:"grid", placeItems:"center",
      background:"linear-gradient(135deg,#f3f4f6,#e5e7eb)", padding: 24
    }}>
      <div style={{maxWidth: 1100, width:"100%"}}>
        <PropertyCard listing={listing} />
      </div>
    </main>
  );
}

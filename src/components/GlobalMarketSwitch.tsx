"use client";
import { useMarket } from "@/context/MarketContext";
import { Home, Building2 } from "lucide-react";

export default function GlobalMarketSwitch() {
  const { market, setMarket } = useMarket();
  return (
    <div
      role="tablist"
      aria-label="Market"
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      <button
        role="tab"
        aria-selected={market === "domestic"}
        onClick={() => setMarket("domestic")}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
          market === "domestic" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        title="Domestic"
      >
        <Home size={14} />
        <span>Domestic</span>
      </button>

      <button
        role="tab"
        aria-selected={market === "commercial"}
        onClick={() => setMarket("commercial")}
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
          market === "commercial" ? "bg-white/15" : "hover:bg-white/10"
        }`}
        title="Commercial"
      >
        <Building2 size={14} />
        <span>Commercial</span>
      </button>
    </div>
  );
}

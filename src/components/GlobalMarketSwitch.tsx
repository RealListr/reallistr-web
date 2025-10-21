"use client";
import { useMarket } from "@/context/MarketContext";
import { Home, Building2 } from "lucide-react";

export default function GlobalMarketSwitch() {
  const { market, setMarket } = useMarket();
  const isCommercial = market === "commercial";

  return (
    <button
      aria-label="Toggle market"
      onClick={() => setMarket(isCommercial ? "domestic" : "commercial")}
      className="group relative inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-sm backdrop-blur transition hover:bg-white"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}
    >
      <span
        className="absolute inset-y-0 left-0 m-0.5 h-[calc(100%-4px)] w-1/2 rounded-full bg-black/5 transition-all"
        style={{ transform: isCommercial ? "translateX(100%)" : "translateX(0)" }}
      />
      <Home size={16} className={isCommercial ? "opacity-40" : "opacity-100"} />
      <span className="min-w-[3.8rem] text-[12px] font-medium">
        {isCommercial ? "Commercial" : "Domestic"}
      </span>
      <Building2 size={16} className={isCommercial ? "opacity-100" : "opacity-40"} />
    </button>
  );
}

"use client";
import { useContext } from "react";
import { MarketContext } from "@/context/MarketContext";
export default function GhostSlider(){
  const { market, setMarket } = useContext(MarketContext);
  const isCommercial = market === "commercial";
  return (
    <div
      className="relative w-28 h-8 rounded-full bg-white/60 backdrop-blur-lg cursor-pointer border border-white/70 shadow-sm"
      role="switch" aria-checked={isCommercial} aria-label="Market switch"
      onClick={() => setMarket(isCommercial ? "domestic" : "commercial")}
      title={isCommercial ? "Commercial" : "Domestic"}
    >
      <div className={`absolute top-1 left-1 w-10 h-6 rounded-full shadow flex items-center justify-center transition-transform ${
        isCommercial ? "translate-x-16 bg-slate-100" : "translate-x-0 bg-emerald-100"
      }`}>{isCommercial ? "🏢" : "🏠"}</div>
    </div>
  );
}

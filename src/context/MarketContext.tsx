"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Market = "domestic" | "commercial";

type MarketCtx = {
  market: Market;
  setMarket: (m: Market) => void;
};

export const MarketContext = createContext<MarketCtx | undefined>(undefined);

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarket must be used within <MarketProvider>");
  return ctx;
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>("domestic");
  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

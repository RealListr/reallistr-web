"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Market = "domestic" | "commercial";
type Ctx = { market: Market; setMarket: (m: Market) => void };
const MarketContext = createContext<Ctx>({ market: "domestic", setMarket: () => {} });

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>("domestic");
  return <MarketContext.Provider value={{ market, setMarket }}>{children}</MarketContext.Provider>;
}

export const useMarket = () => useContext(MarketContext);
export default MarketContext;

"use client";
import { createContext, useState, ReactNode } from "react";
export const MarketContext = createContext({
  market: "domestic" as "domestic" | "commercial",
  setMarket: (_m: "domestic" | "commercial") => {}
});
export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<"domestic" | "commercial">("domestic");
  return <MarketContext.Provider value={{ market, setMarket }}>{children}</MarketContext.Provider>;
}

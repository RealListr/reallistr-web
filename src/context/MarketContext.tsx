"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Market = "domestic" | "commercial";
type Ctx = { market: Market; setMarket: (m: Market) => void };

const Ctx = createContext<Ctx | null>(null);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>("domestic");
  return <Ctx.Provider value={{ market, setMarket }}>{children}</Ctx.Provider>;
}

export function useMarket() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMarket must be used inside <MarketProvider>");
  return v;
}

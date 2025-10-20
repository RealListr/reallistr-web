import type { Metadata } from "next";
import "./globals.css";
import { MarketProvider } from "@/context/MarketContext";
export const metadata: Metadata = { title: "RealListr", description: "RealListr Platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><MarketProvider>{children}</MarketProvider></body></html>);
}

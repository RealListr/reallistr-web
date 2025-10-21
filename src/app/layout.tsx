import "./globals.css";
import { MarketProvider } from "@/context/MarketContext";
import GlobalMarketSwitch from "@/components/GlobalMarketSwitch";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <MarketProvider>
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold">RealListr</h1>
              {/* Domestic / Commercial toggle */}
              <GlobalMarketSwitch />
            </div>
          </header>

          {children}
        </MarketProvider>
      </body>
    </html>
  );
}

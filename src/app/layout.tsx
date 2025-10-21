// src/app/layout.tsx
import "./globals.css";
import { MarketProvider } from "@/context/MarketContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MarketProvider>{children}</MarketProvider>
      </body>
    </html>
  );
}

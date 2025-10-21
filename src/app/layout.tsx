import type { Metadata } from "next";
import "./globals.css";
import QuotesRoot from "../components/quotes/QuotesRoot"; // relative from src/app -> src/components

export const metadata: Metadata = {
  title: "RealListr",
  description: "Property discovery, quotes, and agent tooling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Mount the compact quotes sheet globally */}
        <QuotesRoot />
      </body>
    </html>
  );
}

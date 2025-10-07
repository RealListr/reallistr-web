import dynamic from "next/dynamic";
const FloatingQuotesMount = dynamic(() => import("../components/quotes/FloatingQuotesMount"), { ssr: false });
import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  display: "swap",
  preload: true,
  variable: "--font-plusjakarta",
});

export const metadata: Metadata = {
  title: "RealListr",
  description: "Premium property listings",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={plusJakarta.variable}>{children}  <FloatingQuotesMount />
  </body>
    </html>
  );
}

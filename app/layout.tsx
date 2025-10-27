import "./globals.css";
import type { Metadata } from "next";
import { Header } from "../components/Header";
import { TabBar } from "../components/TabBar";
import React from "react";

export const metadata: Metadata = {
  title: "RealListr",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <div className="mx-auto max-w-4xl">
          <Header />
          <main className="pb-20">{children}</main>
        </div>
        <TabBar />
      </body>
    </html>
  );
}

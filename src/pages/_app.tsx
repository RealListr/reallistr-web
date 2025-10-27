import type { AppProps } from "next/app";
import "../app/globals.css";
import { Header } from "../components/Header";
import { TabBar } from "../components/TabBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        <Header />
        <main style={{ paddingBottom: 80 }}>
          <Component {...pageProps} />
        </main>
      </div>
      <TabBar />
    </div>
  );
}

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";
import { Header } from "../components/Header";
import { TabBar } from "../components/TabBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const hideHeaderOn = pathname.startsWith("/map");   // no rail on Maps

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        {!hideHeaderOn && <Header />}   {/* People rail ONLY on feed and normal pages */}
        <main style={{ paddingBottom: 80 }}>
          <Component {...pageProps} />
        </main>
      </div>
      <TabBar />
    </div>
  );
}

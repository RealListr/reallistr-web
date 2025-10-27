import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";
import FeedHeader from "../components/FeedHeader";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const showFeedHeader = pathname === "/p/info";
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        {showFeedHeader && <FeedHeader />}
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

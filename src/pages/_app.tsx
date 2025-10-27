import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../app/globals.css";
import FeedHeader from "../components/FeedHeader";

const FEED_PATHS = new Set<string>(["/", "/dash"]); // <-- put your real feed paths here

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const showFeedHeader = FEED_PATHS.has(pathname);
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111" }}>
      <div style={{ maxWidth: 896, margin: "0 auto" }}>
        {showFeedHeader && <FeedHeader />}
        <main style={{ paddingBottom: 0 }}>
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

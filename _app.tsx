mkdir -p src/pages
cat > src/pages/_app.tsx <<'TSX'
import type { AppProps } from "next/app";
import "../app/globals.css"; // ✅ bring in Tailwind + your globals

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
TSX

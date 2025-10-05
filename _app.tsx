mkdir -p src/pages
cat > src/pages/_app.tsx <<'TSX'
import type { AppProps } from "next/app";
import "../app/globals.css"; // ✅ bring in Tailwind + your globals
import * as React from "react";
import GlobalMediaBridge from "@/components/rail/GlobalMediaBridge";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalMediaBridge />
    </>
  );
}

TSX

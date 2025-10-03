cat > src/pages/_document.tsx <<'TSX'
import { Html, Head, Main, NextScript } from "next/document";
import IconsSprite from "@/app/components/IconsSprite";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* Make SVG symbols available to all Pages routes */}
        <IconsSprite />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
TSX

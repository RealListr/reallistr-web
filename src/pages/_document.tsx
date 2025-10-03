import { Html, Head, Main, NextScript } from "next/document";
import IconsSprite from "@/app/components/IconsSprite";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* Load the ghost icon sprite once for all Pages Router routes */}
        <IconsSprite />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

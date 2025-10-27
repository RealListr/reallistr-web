import type { AppProps } from "next/app";
import "../app/globals.css";
import { Header } from "../components/Header";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-4xl">
        <Header />
        <main className="pb-20">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

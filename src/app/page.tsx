import dynamic from "next/dynamic";
import GlobalMarketSwitch from "@/components/GlobalMarketSwitch";

// Render your existing HomeClient ONLY on the client to avoid SSR crashes.
const HomeClient = dynamic(() => import("./HomeClient"), { ssr: false });

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">RealListr</h1>
        <GlobalMarketSwitch />
      </div>
      <HomeClient />
    </main>
  );
}

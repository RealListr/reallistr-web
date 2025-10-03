import { Icon } from "@/app/components/Icon";
export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Reallistr</h1>
      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
        <Icon name="tag" tone="ghost" className="w-5 h-5" />
        <span className="text-sm text-gray-700">SALE</span>
      </div>
      <a href="/demo" className="underline text-sm">View icon demo →</a>
    </main>
  );
}

import { Icon } from "@/app/components/Icon";
import { IconButton } from "@/app/components/IconButton";
export default function DemoIcons() {
  return (
    <main className="p-6 space-y-6">
      <section className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-900">
        <div className="absolute right-4 top-4 flex flex-col gap-3">
          <IconButton icon="info" label="Info" />
          <IconButton icon="play" label="Shorts" />
          <IconButton icon="mic" label="Pods" />
          <IconButton icon="map-pin" label="Map" />
        </div>
      </section>
      <section className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2">
        <Icon name="bed" tone="ghost" className="w-5 h-5" />
        <span className="text-sm text-gray-700">4</span>
      </section>
    </main>
  );
}

type Pod = {
  title?: string;        // <- optional to match your data
  src: string;
  duration?: string;
  by?: string;
};

export default function ListrPodsList({ items = [] as Pod[] }: { items?: Pod[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">ListrPods</h2>
        <span className="text-xs text-muted-foreground">{items.length} episode{items.length > 1 ? "s" : ""}</span>
      </div>

      <div className="space-y-3">
        {items.map((p, i) => {
          const title = p.title?.trim() || "Property podcast";
          return (
            <div key={`${title}-${i}`} className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.by ?? "Agent"} {p.duration ? ` • ${p.duration}` : ""}
                  </p>
                </div>
                <audio className="w-40 sm:w-56" controls preload="none" src={p.src} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import Image from "next/image";

type Short = {
  id: string;               // YouTube video id
  title?: string;           // <- optional to match MediaShort
  by?: string;
  url?: string;             // optional external link
};

export default function ListrShortsGrid({ items = [] as Short[] }: { items?: Short[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">ListrShorts</h2>
        <span className="text-xs text-muted-foreground">{items.length} video{items.length > 1 ? "s" : ""}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((s) => {
          const href = s.url ?? `https://youtube.com/shorts/${s.id}`;
          const thumb = `https://img.youtube.com/vi/${s.id}/hqdefault.jpg`;
          const title = s.title?.trim() || "Property short";
          return (
            <a
              key={s.id}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border bg-card shadow-sm"
            >
              <div className="relative aspect-[9/16]">
                <Image
                  src={thumb}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="line-clamp-2 text-sm font-medium text-white drop-shadow">{title}</p>
                  {s.by && <p className="text-[11px] text-white/80">{s.by}</p>}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

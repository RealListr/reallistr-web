// Server component (no "use client")
import Image from "next/image";
import ListrShortsGrid from "@/components/v2/media/ListrShortsGrid";
import ListrPodsList from "@/components/v2/media/ListrPodsList";
import PropertyFacts from "@/components/v2/PropertyFacts";
import { PROPERTIES, type Property } from "@/data/properties";

export default async function PropertyDetail(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const item = PROPERTIES.find((p) => p.id === id) as Property | undefined;
  if (!item) return <main className="mx-auto max-w-6xl p-6">Not found.</main>;

  // Derive small facts block (edit as needed)
  const facts = {
    headline: item.title,
    description: item.description,
    facts: [
      { label: "Type", value: item.type.toUpperCase() },
      { label: "Bedrooms", value: item.beds },
      { label: "Bathrooms", value: item.baths },
      { label: "Parking", value: item.cars },
      { label: "Suburb", value: item.suburb },
      { label: "Price", value: item.type === "rental" ? `$${item.price.toLocaleString()}/wk` : `$${item.price.toLocaleString()}` },
    ],
  };

  const images = item.images ?? [];
  const hero = images[0] ?? "/placeholders/house-1.jpg";
  const thumbs = images.slice(1, 3);

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Top grid: gallery + quick actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={hero}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {!!thumbs.length && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {thumbs.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
                  <Image
                    src={src}
                    alt={`${item.title} ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary / CTA */}
        <aside className="lg:pl-4">
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <div className="mt-1 text-sm text-muted-foreground">{item.suburb}</div>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <span>{item.beds} beds</span>
            <span>{item.baths} baths</span>
            <span>{item.cars} cars</span>
          </div>

          <button className="mt-6 w-full rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90">
            Request Info
          </button>

          {/* Map placeholder stays for now */}
          <div className="mt-4 rounded-xl border p-10 text-center text-sm text-muted-foreground">
            Map preview temporarily unavailable
          </div>
        </aside>
      </div>

      {/* Key facts */}
      <PropertyFacts data={facts} />

      {/* Media sections */}
      <ListrShortsGrid items={item.shorts ?? []} />
      <ListrPodsList items={item.pods ?? []} />
    </main>
  );
}

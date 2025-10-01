import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PROPERTIES } from '@/data/properties';

type Params = { params: { id: string } };

export default function PropertyDetailPage({ params }: Params) {
  const p = PROPERTIES.find((x) => x.id === params.id);
  if (!p) return notFound();

  const priceLabel =
    p.type === 'rental' ? `$${p.price.toLocaleString()}/wk` : `$${p.price.toLocaleString()}`;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="overflow-hidden rounded-2xl border">
        <Image
          src={p.image}
          alt={p.title}
          width={1400}
          height={800}
          className="h-[360px] w-full object-cover"
          priority
        />
      </div>

      <section className="mt-6 grid gap-6 md:grid-cols-[1fr,320px]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <div className="text-muted-foreground">{p.address}</div>
          <div className="text-sm text-muted-foreground">
            {p.beds} bd · {p.baths} ba · {p.area} m² · {p.city}
          </div>
          <p className="mt-4 text-lg font-semibold">{priceLabel}</p>
        </div>

        <aside className="rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">Contact</div>
          <div className="mt-2 text-base font-medium">RealListr Agent</div>
          <button className="mt-4 h-10 w-full rounded-lg border font-medium">
            Request Info
          </button>
        </aside>
      </section>
    </main>
  );
}

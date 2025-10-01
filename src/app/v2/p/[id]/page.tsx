'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { Property } from '@/data/properties';
import { PROPERTIES } from '@/data/properties';

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const p: Property | undefined = useMemo(
    () => PROPERTIES.find(x => x.id === params.id),
    [params.id]
  );

  if (!p) {
    return <main className="mx-auto max-w-6xl p-6">Not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl gap-8 p-6 lg:grid lg:grid-cols-12">
      {/* gallery */}
      <section className="lg:col-span-7">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-gray-50">
          <Image
            src={p.hero}
            alt={p.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
            priority
          />
        </div>
        {p.images?.length > 1 && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {p.images.slice(1).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-gray-50">
                <Image src={src} alt={`${p.title} ${i+2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* summary */}
      <aside className="lg:col-span-5">
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <p className="mt-1 text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
          <span>{p.beds} beds</span>
          <span>{p.baths} baths</span>
          <span>{p.cars} cars</span>
        </div>
        <button className="mt-6 w-full rounded-full bg-black px-5 py-3 text-white">
          Request Info
        </button>

        {/* map placeholder (replace with Mapbox later) */}
        <div className="mt-4 rounded-2xl border p-8 text-center text-sm text-muted-foreground">
          Map preview temporarily unavailable
        </div>
      </aside>

      {/* ListrShorts */}
      <section className="lg:col-span-12">
        {p.shorts && p.shorts.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">ListrShorts</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.shorts.map(s => (
                <div key={s.id} className="overflow-hidden rounded-2xl border">
                  {/* YouTube shorts embed (works with any YT id) */}
                  <div className="relative aspect-[9/16] w-full bg-black">
                    <iframe
                      className="absolute left-0 top-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${s.id}?rel=0&modestbranding=1&playsinline=1`}
                      title={s.title || 'ListrShort'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-medium">{s.title || 'Short video'}</p>
                    {s.creator && <p className="text-xs text-muted-foreground">by {s.creator}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ListrPods */}
      <section className="lg:col-span-12">
        {p.pods && p.pods.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-3 text-lg font-semibold">ListrPods</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.pods.map((pod, i) => (
                <div key={i} className="rounded-2xl border p-4">
                  <p className="line-clamp-1 text-sm font-medium">{pod.title || 'Podcast'}</p>
                  <audio className="mt-2 w-full" controls preload="none" src={pod.url}>
                    Your browser does not support audio.
                  </audio>
                  {pod.durationSec ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      ~{Math.round(pod.durationSec / 60)} min
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

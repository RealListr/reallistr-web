'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageSafe(props: any) {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className="aspect-[16/9] w-full rounded-xl bg-neutral-100 grid place-items-center text-neutral-400 text-xs">
      image unavailable
    </div>;
  }
  return (
    <Image {...props} onError={() => setErr(true)} loading="lazy" decoding="async" />
  );
}

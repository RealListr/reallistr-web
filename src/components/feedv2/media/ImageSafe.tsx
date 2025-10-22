'use client';
import Image from 'next/image';
import { useState } from 'react';

type Props = { src?: string; alt: string; className?: string; fill?: boolean; width?: number; height?: number };

export default function ImageSafe({ src, alt, className, fill, width, height }: Props) {
  const [ok, setOk] = useState(true);
  const finalSrc =
    ok && src
      ? src
      : `https://placehold.co/${(width ?? 800)}x${(height ?? 600)}?text=RealListr`;

  const onErr = () => setOk(false);

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className={className}
        onError={onErr}
      />
    );
  }
  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      onError={onErr}
    />
  );
}

'use client';
import React from 'react';

export default function InlineVideo({
  src,
  className = '',
  controls = false,
}: {
  src: string;
  className?: string;
  controls?: boolean;
}) {
  return (
    <video
      src={src}
      className={className}
      muted
      playsInline
      loop
      controls={controls}
      preload="metadata"
      aria-label="Listing video"
    />
  );
}

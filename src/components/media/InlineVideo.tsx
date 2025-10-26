'use client';
import React from 'react';

export default function InlineVideo({ src, className = '' }: { src: string; className?: string }) {
  return (
    <video
      className={className}
      src={src}
      playsInline
      muted
      controls
      preload="metadata"
      style={{ backgroundColor: '#000' }}
    />
  );
}

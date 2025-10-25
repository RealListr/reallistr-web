'use client';
import React from 'react';

export default function InlineVideo({
  src, poster, className = '', autoPlay = false, muted = true, loop = false,
}: { src: string; poster?: string; className?: string; autoPlay?: boolean; muted?: boolean; loop?: boolean }) {
  return (
    <video
      className={`w-full h-full object-cover rounded-xl ${className}`}
      src={src}
      poster={poster}
      playsInline
      controls
      {...(autoPlay ? { autoPlay: true } : {})}
      {...(muted ? { muted: true } : {})}
      {...(loop ? { loop: true } : {})}
    />
  );
}

"use client"

import * as React from "react";
import Icon from "@/app/components/Icon";

export default function MediaRailButton() {
  return (
    <button
      aria-label="Media"
      onClick={() => window.dispatchEvent(new Event("toggle-media-panel"))}
      className={
        "fixed right-4 top-[calc(50vh+180px)] z-[105] grid h-12 w-12 place-items-center " +
        "rounded-2xl border border-black/5 bg-white/90 backdrop-blur-md " +
        "transform-gpu transition duration-200 hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)]"
      }
    >
      <Icon name="image" className="h-5 w-5" />
    </button>
  );
}

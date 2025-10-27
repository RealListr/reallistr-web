"use client";
import { EllipsisVertical } from "lucide-react";

export function ConnectsButton() {
  return (
    <button
      aria-label="More"
      className="p-2 bg-transparent hover:bg-transparent active:bg-transparent focus:outline-none focus:ring-0 icon-button"
    >
      <EllipsisVertical className="h-5 w-5 text-neutral-500" />
    </button>
  );
}

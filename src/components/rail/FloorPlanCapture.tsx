"use client";
import * as React from "react";

export default function FloorPlanCapture({ defaultSrc = "/images/floorplan-123.png" }: { defaultSrc?: string }) {
  React.useEffect(() => {
    const handler = (ev: Event) => {
      const t = ev.target as HTMLElement | null;
      if (!t) return;

      // Match aria-label, data attribute, link text, or href containing "floor"
      const withAttr =
        (t.closest?.("[data-floor-plan]") as HTMLElement) ||
        (t.closest?.("[aria-label=\"Floor Plan\"]") as HTMLElement) ||
        (t.closest?.("a[href*=\"floor\"]") as HTMLElement);

      const textMatch = (n: HTMLElement | null) => !!n && /\bFloor\s*Plan\b/i.test(n.textContent || "");
      const withText =
        textMatch(t) ? (t as HTMLElement) :
        textMatch(t.closest?.("a,button,div,span") as HTMLElement) ? (t.closest?.("a,button,div,span") as HTMLElement) : null;

      const target = withAttr || withText;
      if (!target) return;

      ev.preventDefault();
      ev.stopPropagation();

      const src =
        (target as any).dataset?.fpSrc ||
        (target as any).dataset?.floorPlanSrc ||
        defaultSrc;

      window.dispatchEvent(new CustomEvent("open-floor-plan", { detail: { src } }));
    };

    // capture phase so we beat Links/anchors
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [defaultSrc]);

  return null;
}

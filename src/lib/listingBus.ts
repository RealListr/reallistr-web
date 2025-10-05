export type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export function openMediaOverlay(items: MediaItem[], startIndex = 0) {
  if (!items?.length) return;
  window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { items, startIndex } }));
}

export function openInfoOverlay(payload: { title: string; html: string }) {
  window.dispatchEvent(new CustomEvent("open-info-overlay", { detail: payload }));
}

export function openMapOverlay(payload: { address: string }) {
  window.dispatchEvent(new CustomEvent("open-map-overlay", { detail: payload }));
}

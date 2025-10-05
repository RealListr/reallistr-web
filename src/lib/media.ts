export type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export function isMediaItem(x: any): x is MediaItem {
  return !!x && typeof x === "object"
    && (x.type === "image" || x.type === "video" || x.type === "audio")
    && typeof x.src === "string" && x.src.length > 4;
}
export function sanitizeMedia(items: any[]): MediaItem[] {
  return Array.isArray(items) ? items.filter(isMediaItem) : [];
}

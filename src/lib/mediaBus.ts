export type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export function openMediaOverlay(items: MediaItem[], startIndex = 0) {
  if (!items?.length) return;
  window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { items, startIndex } }));
}

export function openMediaChooser(items: MediaItem[]) {
  if (!items?.length) return;
  window.dispatchEvent(new CustomEvent("open-media-chooser", { detail: { items } }));
}

export const demoMedia: MediaItem[] = [
  { type: "image", src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&q=80", label: "Living" },
  { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1400&q=80", label: "Kitchen" },
  { type: "video", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label: "Video" },
];

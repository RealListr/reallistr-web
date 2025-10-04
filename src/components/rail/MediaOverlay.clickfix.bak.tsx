import * as React from "react";

type MediaItem =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; alt?: string };

type OpenMediaDetail = { items: MediaItem[]; index?: number };

const MEDIA_EVENT = "open-media";

export default function MediaOverlay() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [index, setIndex] = React.useState(0);

  // Lazy-load hls.js only in the browser
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const hlsRef = React.useRef<any>(null);

  const current = items[index];

  React.useEffect(() => {
    const onOpen = async (e: Event) => {
      const detail = (e as CustomEvent<OpenMediaDetail>).detail;
      if (!detail || !detail.items?.length) return;

      setItems(detail.items);
      setIndex(detail.index ?? 0);
      setOpen(true);
    };
    window.addEventListener(MEDIA_EVENT, onOpen as EventListener);
    return () => {
      window.removeEventListener(MEDIA_EVENT, onOpen as EventListener);
      if (hlsRef.current) {
        hlsRef.current.destroy?.();
        hlsRef.current = null;
      }
    };
  }, []);

  // Prepare HLS playback if needed
  React.useEffect(() => {
    const v = videoRef.current;
    if (!open || !v) return;
    if (current?.type !== "video") return;

    // Reset any previous hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy?.();
      hlsRef.current = null;
    }

    const src = current.src;
    const isHls = /\.m3u8($|\?)/i.test(src);

    const setup = async () => {
      if (isHls) {
        // Native HLS (Safari / iOS)
        if (v.canPlayType("application/vnd.apple.mpegurl")) {
          v.src = src;
          await v.play().catch(() => {});
          return;
        }
        // hls.js for other browsers
        const { default: Hls } = await import("hls.js");
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true });
          hlsRef.current = hls;
          hls.attachMedia(v);
          hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
          return;
        }
      }
      // MP4 / fallback
      v.src = src;
      await v.play().catch(() => {});
    };

    setup();

    return () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, [open, current]);

  const close = () => setOpen(false);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={close}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        <div className="relative bg-black aspect-video">
          {current?.type === "image" ? (
            // Use <img> to avoid Next/Image config issues for now
            <img
              src={current.src}
              alt={current.alt ?? "media"}
              className="w-full h-full object-contain bg-black"
              onError={(e) => console.warn("Image failed:", current.src, e)}
            />
          ) : (
            <video
              ref={videoRef}
              // iOS / mobile requirements
              playsInline
              controls
              preload="metadata"
              poster={current.poster}
              className="w-full h-full object-contain bg-black"
              onError={(e) => {
                const v = e.currentTarget;
                console.warn("Video error", { code: v.error?.code, msg: v.error?.message, src: current.src });
              }}
            />
          )}
        </div>

        {/* Controls */}
        {items.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between">
            <button onClick={prev} className="px-3 py-2 rounded-xl bg-white/90 hover:bg-white">◀︎</button>
            <span className="text-white/90">{index + 1} / {items.length}</span>
            <button onClick={next} className="px-3 py-2 rounded-xl bg-white/90 hover:bg-white">▶︎</button>
          </div>
        )}

        <button
          onClick={close}
          className="absolute top-3 right-3 px-3 py-2 rounded-xl bg-white/90 hover:bg-white"
          aria-label="Close media"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/** Helper for callers */
export function openMedia(items: MediaItem[], index = 0) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenMediaDetail>("open-media", { detail: { items, index } }));
}

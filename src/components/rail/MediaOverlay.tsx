import * as React from "react";
import Icon from "@/app/components/Icon";

type MediaKind = "image" | "video" | "podcast";
type OpenEvt = CustomEvent<{ kind: MediaKind; src: string; title?: string }>;

export default function MediaOverlay() {
  const [open, setOpen] = React.useState(false);
  const [kind, setKind] = React.useState<MediaKind>("image");
  const [src, setSrc] = React.useState("");
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as OpenEvt;
      if (ce?.detail?.src) {
        setErr(null);
        setKind(ce.detail.kind);
        setSrc(ce.detail.src);
        setTitle(ce.detail.title);
        setOpen(true);
      }
    };
    window.addEventListener("open-media", handler as EventListener);
    return () => window.removeEventListener("open-media", handler as EventListener);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  // crude YouTube check
  const isYouTube = kind === "video" && /youtube\.com\/watch|youtu\.be|youtube\.com\/embed/.test(src);
  const embedSrc = isYouTube
    ? (src.includes("/embed/") ? src : src.replace("watch?v=", "embed/"))
    : src;

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <div
        className="fixed z-[91] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.24)] rounded-2xl overflow-hidden"
        style={{ width: "75vw", height: "75vh", left: "50%", top: "calc(50% - 64px)", transform: "translate(-50%,-50%)" }}
      >
        {title ? (
          <div className="px-4 py-3 border-b text-sm font-medium text-muted-foreground">{title}</div>
        ) : null}

        <div className="w-full h-full">
          {!err ? (
            kind === "image" ? (
              <img
                src={src}
                alt={title || "Image"}
                className="h-full w-full object-contain bg-white"
                loading="eager"
                decoding="async"
                onError={() => setErr("Couldn’t load the image.")}
              />
            ) : kind === "video" ? (
              isYouTube ? (
                <iframe
                  src={embedSrc}
                  className="h-full w-full bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={title || "Video"}
                />
              ) : (
                <video className="h-full w-full bg-black" src={src} controls onError={() => setErr("Couldn’t load the video.")}/>
              )
            ) : (
              <div className="h-full w-full grid place-items-center p-8">
                <audio controls className="w-full max-w-3xl" onError={() => setErr("Couldn’t load the audio.")}>
                  <source src={src} />
                </audio>
              </div>
            )
          ) : (
            <div className="h-full w-full grid place-items-center text-sm text-muted-foreground">
              <div className="text-center">
                <div className="mb-2 font-medium">{err}</div>
                <button
                  className="px-3 py-1 rounded-md border border-black/10 bg-white hover:bg-black/5"
                  onClick={() => { setErr(null); const t = src; setSrc(""); setTimeout(() => setSrc(t), 0); }}
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/90 backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        >
          <Icon name="x" className="h-5 w-5" />
        </button>
      </div>
    </>
  );
}

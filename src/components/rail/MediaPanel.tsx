"use client";
import * as React from "react";
import Icon from "@/app/components/Icon";

type ToggleEvt = Event;

export default function MediaPanel() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onToggle = (_e: ToggleEvt) => setOpen((v) => !v);
    window.addEventListener("toggle-media-panel", onToggle as EventListener);
    return () => window.removeEventListener("toggle-media-panel", onToggle as EventListener);
  }, []);

  if (!open) return null;

  const Tile = ({
    label, sub, onClick, icon
  }: { label: string; sub: string; onClick: () => void; icon: React.ReactNode }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full rounded-xl border border-black/10 bg-white/95 hover:bg-black/5 px-4 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-black/20"
    >
      <div className="grid h-11 w-11 place-items-center rounded-lg border border-black/10 bg-white/90">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <Icon name="chevron-right" className="h-4 w-4 opacity-50" />
    </button>
  );

  const openImage = () =>
    window.dispatchEvent(new CustomEvent("open-media", {
      detail: { kind: "image", src: "/images/media/demo-photo.svg", title: "Gallery" }
    }));

  const openVideo = () =>
    window.dispatchEvent(new CustomEvent("open-media", {
      detail: { kind: "video", src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Video" }
    }));

  const openPodcast = () =>
    window.dispatchEvent(new CustomEvent("open-media", {
      detail: { kind: "podcast", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Podcast" }
    }));

  return (
    <>
      {/* light scrim to click-away */}
      <div className="fixed inset-0 z-[70]" onClick={() => setOpen(false)} />
      <div
        className="fixed z-[71] rounded-2xl border border-black/10 bg-white/95 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
        style={{ right: "88px", top: "calc(50% - 120px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 w-[320px]">
          <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Media</div>
          <div className="grid gap-2">
            <Tile label="Images" sub="Open gallery" onClick={openImage} icon={<Icon name="image" className="h-5 w-5" />} />
            <Tile label="Video" sub="Play video" onClick={openVideo} icon={<Icon name="video" className="h-5 w-5" />} />
            <Tile label="Podcast" sub="Play audio" onClick={openPodcast} icon={<Icon name="headphones" className="h-5 w-5" />} />
          </div>
        </div>
      </div>
    </>
  );
}

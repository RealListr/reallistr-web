import * as React from "react";

type Item =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

const EVT_SHOW = "open-media-overlay";

const wrap: React.CSSProperties = {
  position:"absolute",
  right: 24 + 44 + 16,
  bottom: 24 + 140 + 20,
  display:"flex",
  gap: 16,
  zIndex: 45,
};

const tile: React.CSSProperties = {
  width: 88,
  height: 128,
  border: "2px solid rgba(15,23,42,.8)",
  borderRadius: 8,
  background: "rgba(255,255,255,.6)",
};

export default function MediaDock() {
  const media: Item[] = [
    { type:"image", src:"https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1400&q=80", label:"Images" },
    { type:"video", src:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", label:"Video" },
    { type:"audio", src:"/audio/podcast-demo.mp3", label:"Podcast" },
  ];

  const open = (startIndex = 0) => {
    window.dispatchEvent(new CustomEvent(EVT_SHOW, { detail: { items: media, startIndex } }));
  };

  return (
    <div style={wrap} aria-label="Media Dock">
      <button style={tile} onClick={()=>open(0)} title="Images" />
      <button style={tile} onClick={()=>open(1)} title="Videos" />
      <button style={tile} onClick={()=>open(2)} title="Podcast" />
    </div>
  );
}

import * as React from "react";

export type MediaItem =
  | { type: "image"; src: string; label?: string }
  | { type: "video"; src: string; label?: string }
  | { type: "audio"; src: string; label?: string };

export type FeedListing = {
  id: string;
  agent: { name: string; agency?: string; avatarUrl?: string; agencyLogoUrl?: string };
  price: string;
  address: string;
  facts: { bed?: number; bath?: number; car?: number };
  openTimes?: string[];          // e.g., ["Sat 11:15–11:45am", "Wed 5:30–6:00pm"]
  media: MediaItem[];
  infoHtml?: string;             // HTML for Info overlay
};

type Props = {
  data: FeedListing;
  onFollow?: () => void;
  onLike?: () => void;
  onSave?: () => void;
};

const COL_W = 760;            // centered feed width
const MEDIA_ASPECT = 4 / 5;   // 4:5 like Instagram

// ---- tiny inline icons (ghost-y stroke) -------------------------------
const ico = {
  bed:   (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M3 10h18M6 10V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3M3 21v-6m18 6v-6" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  bath:  (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M5 13h14m-14 0a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4M8 5a3 3 0 0 1 6 0v8" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  car:   (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M3 12l2-5h14l2 5M5 17h14M7 17v2m10-2v2" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  info:  (p:any) => (<svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9" fill="none" stroke="#334155" strokeWidth="1.6"/><path d="M12 8h.01M11 12h2v5h-2z" fill="#334155"/></svg>),
  map:   (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M9 3l-6 3v15l6-3 6 3 6-3V3l-6 3-6-3z" fill="none" stroke="#334155" strokeWidth="1.6"/><circle cx="15" cy="9" r="2" fill="#334155"/></svg>),
  heart: (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M20.8 8.6a4.6 4.6 0 0 0-8-2.9 4.6 4.6 0 0 0-8 2.9c0 5.2 8 9.8 8 9.8s8-4.6 8-9.8z" fill="none" stroke="#334155" strokeWidth="1.6"/></svg>),
  save:  (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M6 3h12v18l-6-3-6 3V3z" fill="none" stroke="#334155" strokeWidth="1.6"/></svg>),
  user:  (p:any) => (<svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="8" r="4" fill="none" stroke="#334155" strokeWidth="1.6"/><path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="#334155" strokeWidth="1.6"/></svg>),
  building: (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M4 20h16M6 20V6h8v14M10 10h2m-2 4h2m3 6V9h3v11" fill="none" stroke="#334155" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  chev:  (p:any) => (<svg viewBox="0 0 24 24" {...p}><path d="M6 9l6 6 6-6" fill="none" stroke="#334155" strokeWidth="1.8" strokeLinecap="round"/></svg>),
};

// ---- helpers for overlays we already have mounted ---------------------
function openInfo(html?: string) {
  window.dispatchEvent(new CustomEvent("open-info-overlay", { detail: { html } }));
}
function openMap(address: string) {
  window.dispatchEvent(new CustomEvent("open-map-overlay", { detail: { address } }));
}
function openGallery(items: MediaItem[], startIndex = 0) {
  window.dispatchEvent(new CustomEvent("open-media-overlay", { detail: { items, startIndex } }));
}

// ---- FeedCard ----------------------------------------------------------
export default function FeedCard({ data, onFollow, onLike, onSave }: Props) {
  const { agent, price, address, facts, openTimes = [], media } = data;

  // carousel state
  const imgs = media.filter(m => m.type === "image");
  const [idx, setIdx] = React.useState(0);
  const cap = Math.min(imgs.length || 0, 6);

  // simple swipe
  const startX = React.useRef<number | null>(null);
  function onTouchStart(e: React.TouchEvent) { startX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) setIdx(i => {
      const n = imgs.length;
      if (!n) return 0;
      return dx < 0 ? Math.min(i + 1, n - 1) : Math.max(i - 1, 0);
    });
    startX.current = null;
  }

  const wrap: React.CSSProperties = {
    width: "100%",
    maxWidth: COL_W,
    margin: "22px auto",
    borderRadius: 16,
    border: "1px solid rgba(148,163,184,.28)",
    boxShadow: "0 10px 24px rgba(2,6,23,.06)",
    background: "#fff",
    overflow: "hidden",
  };

  const hdr: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
  };

  const chip: React.CSSProperties = {
    height: 32, borderRadius: 999, padding: "0 12px",
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "1px solid rgba(148,163,184,.38)", background: "rgba(236,253,245,.8)",
    fontSize: 13, color: "#065f46",
  };

  const iconBtn = (title:string, onClick:()=>void, children:React.ReactNode) => (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 34, height: 34, borderRadius: 999,
        border: "1px solid rgba(148,163,184,.35)",
        background: "rgba(255,255,255,.9)",
        display: "grid", placeItems: "center",
      }}
    >
      {children}
    </button>
  );

  // upcoming (first) open time only; dropdown for the rest
  const [opensOpen, setOpensOpen] = React.useState(false);
  const primaryOpen = openTimes[0];

  return (
    <article style={wrap} aria-label={`${agent?.name} listing`}>
      {/* Header */}
      <div style={hdr}>
        <div style={{width:24, height:24, borderRadius:999, background:"#e5e7eb"}} />
        <div style={{display:"flex", flexDirection:"column", lineHeight:1}}>
          <strong style={{fontSize:13, color:"#0f172a"}}>{agent?.name || "Agent"}</strong>
          <div style={{display:"flex", alignItems:"center", gap:6, fontSize:12, color:"#475569"}}>
            {agent?.agency && (<ico.building width={14} height={14} /> as any)}
            <span>{agent?.agency || "Agency"}</span>
          </div>
        </div>
        <div style={{marginLeft:"auto", display:"flex", gap:8}}>
          <span style={chip} onClick={onFollow}>
            <span style={{display:"grid", placeItems:"center", width:16, height:16, borderRadius:999, background:"#a7f3d0"}}>+</span>
            <span>Follow</span>
          </span>
          {iconBtn("Like",    onLike  || (()=>{}), <ico.heart width={18} height={18} />)}
          {iconBtn("Save",    onSave  || (()=>{}), <ico.save  width={18} height={18} />)}
        </div>
      </div>

      {/* Media (4:5) with swipe + pager dots */}
      <div
        style={{
          position:"relative",
          width:"100%",
          height: Math.round((COL_W) / MEDIA_ASPECT),
          background:"#f1f5f9",
          overflow:"hidden",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={()=> openGallery(media, idx)}
      >
        <div
          style={{
            display:"flex",
            height:"100%",
            transform:`translateX(-${idx * 100}%)`,
            transition:"transform .25s ease",
          }}
        >
          {(imgs.length ? imgs : [{src:"/images/placeholder.jpg", type:"image" as const}]).map((m, i) => (
            <img
              key={i}
              src={m.src}
              alt={m.label || `image ${i+1}`}
              style={{width:"100%", height:"100%", objectFit:"cover", flex:"0 0 100%"}}
              loading="lazy"
            />
          ))}
        </div>

        {/* Pager dots (capped at 6), centered in white strip below image */}
        {imgs.length > 1 && (
          <div style={{position:"absolute", left:"50%", bottom:12, transform:"translateX(-50%)", display:"flex", gap:6}}>
            {Array.from({length: cap}).map((_, i) => {
              const active = i === Math.min(idx, cap-1);
              return (
                <button
                  key={i}
                  onClick={(e)=>{e.stopPropagation(); setIdx(i);}}
                  aria-label={`Go to image ${i+1}`}
                  style={{
                    width:8, height:8, borderRadius:999,
                    border: "1px solid rgba(148,163,184,.6)",
                    background: active ? "#0f172a" : "rgba(255,255,255,.9)",
                    opacity: active ? 1 : .8
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Price + single open pill (dropdown for rest) */}
      <div style={{display:"flex", alignItems:"center", gap:12, padding:"14px 16px 6px 16px"}}>
        <div style={{fontSize:22, fontWeight:800, color:"#0f172a"}}>{price}</div>
        <div style={{fontSize:14, color:"#475569"}}>{address}</div>
        <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:8, position:"relative"}}>
          {primaryOpen && (
            <button
              onClick={()=> setOpensOpen(o=>!o)}
              style={{fontSize:12, padding:"6px 10px", borderRadius:999, border:"1px solid rgba(148,163,184,.35)", background:"#fff"}}
            >
              {primaryOpen}
              <span style={{marginLeft:6, display:"inline-block", verticalAlign:"middle"}}>
                <ico.chev width={14} height={14} />
              </span>
            </button>
          )}
          {opensOpen && openTimes.length > 1 && (
            <div
              style={{
                position:"absolute", right:0, top:"calc(100% + 6px)",
                background:"#fff", border:"1px solid rgba(148,163,184,.35)", borderRadius:12,
                boxShadow:"0 10px 24px rgba(2,6,23,.1)", padding:8, zIndex:10
              }}
            >
              {openTimes.slice(1).map((t, i)=>(<div key={i} style={{fontSize:12, padding:"6px 10px", whiteSpace:"nowrap"}}>{t}</div>))}
            </div>
          )}
        </div>
      </div>

      {/* Facts row (icons only) + Info/Map mini buttons on SAME row */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"6px 12px 12px 12px",
      }}>
        <div style={{display:"flex", alignItems:"center", gap:16}}>
          <span style={{display:"inline-flex", alignItems:"center", gap:6, color:"#0f172a"}}>
            <ico.bed width={18} height={18} /> {facts.bed ?? 0}
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap:6, color:"#0f172a"}}>
            <ico.bath width={18} height={18} /> {facts.bath ?? 0}
          </span>
          <span style={{display:"inline-flex", alignItems:"center", gap:6, color:"#0f172a"}}>
            <ico.car width={18} height={18} /> {facts.car ?? 0}
          </span>

          {/* divider */}
          <span style={{width:1, height:16, background:"rgba(148,163,184,.45)"}} />

          {/* icons-only Info + Map */}
          <button
            onClick={()=> openInfo(data.infoHtml)}
            title="Property info"
            style={{width:34, height:34, borderRadius:999, border:"1px solid rgba(148,163,184,.35)", background:"#fff", display:"grid", placeItems:"center"}}
          >
            <ico.info width={18} height={18} />
          </button>
          <button
            onClick={()=> openMap(address)}
            title="Map"
            style={{width:34, height:34, borderRadius:999, border:"1px solid rgba(148,163,184,.35)", background:"#fff", display:"grid", placeItems:"center"}}
          >
            <ico.map width={18} height={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

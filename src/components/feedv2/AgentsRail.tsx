'use client';
type Circle = { id:string; label:string; image?:string; kind:'agent'|'agency'; };
function CircleImg({src,alt,size=56}:{src?:string;alt?:string;size?:number}){
  return <div className="rounded-full overflow-hidden border border-neutral-200 bg-neutral-100" style={{width:size,height:size}}>
    {src ? <img src={src} alt={alt} className="w-full h-full object-cover"/> : null}
  </div>;
}
export default function AgentsRail({
  items, onPick
}:{ items: Circle[]; onPick:(c:Circle)=>void }) {
  if(!items?.length) return null;
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Agents & Agencies</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-1">
        {items.map(c=>(
          <button key={c.id} onClick={()=>onPick(c)} className="shrink-0 text-center focus:outline-none">
            <CircleImg src={c.image} alt={c.label}/>
            <div className="text-xs mt-1 w-24 truncate">{c.label}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

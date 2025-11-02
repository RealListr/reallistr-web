import * as React from 'react';

type Props = { id: string };

export function FeederCard({ id }: Props){
  const [p, setP] = React.useState<any>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try{
        const r = await fetch(`/api/agents/${encodeURIComponent(id)}`);
        const j = await r.json();
        if (alive) setP(j);
      }catch(e:any){ if (alive) setErr(String(e)); }
    })();
    return () => { alive = false; };
  }, [id]);

  const box: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: 12,
    background: '#fff'
  };

  if (err) return <div style={box}>Failed to load</div>;
  if (!p)  return <div style={box}>Loading…</div>;

  const price = p.price != null ? `$${(p.price as number).toLocaleString?.() ?? p.price}` : '';

  return (
    <div style={box}>
      <div style={{fontWeight:700}}>{p.address}</div>
      <div style={{color:'#6b7280', marginTop:4}}>
        {p.suburb}, {p.state} {price ? `— ${price}` : ''}
      </div>
    </div>
  );
}

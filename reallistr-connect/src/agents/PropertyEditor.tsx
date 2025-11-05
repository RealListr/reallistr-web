import { useState } from "react";

type Property = {
  title: string;
  price: string;
  address: string;
  bedrooms: number | "";
  bathrooms: number | "";
  areaSqm: number | "";
  status: "draft" | "published";
  imageUrl: string;
  description: string;
};

const box: React.CSSProperties = {
  maxWidth: 900, margin: "6vh auto", padding: 24,
  borderRadius: 16, background: "#14161a", color: "#f5f7fa",
  boxShadow: "0 10px 30px rgba(0,0,0,.35)"
};
const row: React.CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" };
const label: React.CSSProperties = { fontSize: 12, opacity: .8, marginBottom: 4 };
const input: React.CSSProperties = { padding: "10px 12px", borderRadius: 10, border: "1px solid #2a2d34", background:"#0f1115", color:"#fff" };
const btnBar: React.CSSProperties = { display: "flex", gap: 12, marginTop: 16 };

export default function PropertyEditor() {
  const [prop, setProp] = useState<Property>({
    title: "", price: "", address: "", bedrooms: "", bathrooms: "", areaSqm: "",
    status: "draft", imageUrl: "", description: ""
  });
  const [saved, setSaved] = useState<string>("");

  const set = <K extends keyof Property>(k: K) => (v: any) =>
    setProp(p => ({ ...p, [k]: v }));

  const save = async () => {
    // TODO: replace with your real API
    localStorage.setItem("reallistr:lastProperty", JSON.stringify(prop));
    setSaved("Saved locally ✅ (wire API next)");
    console.log("[PropertyEditor] payload", prop);
  };

  const publish = async () => {
    // Example POST (uncomment when your endpoint exists)
    // await fetch("/api/agents/properties", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(prop) });
    setSaved("Publish simulated ✅ (connect endpoint)");
  };

  return (
    <main style={box}>
      <h1 style={{marginTop:0}}>Agents Portal – Property Editor</h1>
      <p style={{opacity:.85, marginTop:4}}>Create or update a property listing.</p>

      <div style={{display:"grid", gap:16, marginTop:16}}>
        <div>
          <div style={label}>Title</div>
          <input style={input} value={prop.title} onChange={e=>set("title")(e.target.value)} placeholder="Elegant 2-bed in JLT" />
        </div>

        <div style={row}>
          <div>
            <div style={label}>Price</div>
            <input style={input} value={prop.price} onChange={e=>set("price")(e.target.value)} placeholder="AED 4,250,000" />
          </div>
          <div>
            <div style={label}>Status</div>
            <select style={input} value={prop.status} onChange={e=>set("status")(e.target.value as any)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <div style={label}>Address</div>
          <input style={input} value={prop.address} onChange={e=>set("address")(e.target.value)} placeholder="One JLT, Jumeirah Lake Towers" />
        </div>

        <div style={row}>
          <div>
            <div style={label}>Bedrooms</div>
            <input style={input} type="number" value={prop.bedrooms} onChange={e=>set("bedrooms")(e.target.value === "" ? "" : Number(e.target.value))} placeholder="2" />
          </div>
          <div>
            <div style={label}>Bathrooms</div>
            <input style={input} type="number" value={prop.bathrooms} onChange={e=>set("bathrooms")(e.target.value === "" ? "" : Number(e.target.value))} placeholder="2" />
          </div>
        </div>

        <div>
          <div style={label}>Area (sqm)</div>
          <input style={input} type="number" value={prop.areaSqm} onChange={e=>set("areaSqm")(e.target.value === "" ? "" : Number(e.target.value))} placeholder="120" />
        </div>

        <div>
          <div style={label}>Hero Image URL</div>
          <input style={input} value={prop.imageUrl} onChange={e=>set("imageUrl")(e.target.value)} placeholder="https://…" />
          {prop.imageUrl && (
            <img src={prop.imageUrl} alt="preview" style={{marginTop:12, width:"100%", borderRadius:12, border:"1px solid #2a2d34"}} />
          )}
        </div>

        <div>
          <div style={label}>Description</div>
          <textarea style={{...input, minHeight:120}} value={prop.description} onChange={e=>set("description")(e.target.value)} placeholder="South light, EV charging, close to metro…" />
        </div>

        <div style={btnBar}>
          <button style={{...input, cursor:"pointer"}} onClick={save}>Save</button>
          <button style={{...input, cursor:"pointer"}} onClick={publish}>Publish</button>
          {saved && <span style={{marginLeft:8, opacity:.9}}>{saved}</span>}
        </div>
      </div>
    </main>
  );
}

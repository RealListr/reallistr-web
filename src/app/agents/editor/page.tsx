"use client";
import { useState } from "react";

export default function AgentsEditorPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  return (
    <main style={{maxWidth:900,margin:"6vh auto",padding:24,borderRadius:16,background:"#14161a",color:"#f5f7fa"}}>
      <h1 style={{marginTop:0}}>Agents Portal – Property Editor</h1>

      <label style={{fontSize:12,opacity:.8,display:"block",margin:"12px 0 4px"}}>Title</label>
      <input style={{padding:"10px 12px",borderRadius:10,border:"1px solid #2a2d34",background:"#0f1115",color:"#fff",width:"100%"}}
             value={title} onChange={e=>setTitle(e.target.value)} placeholder="Elegant 2-bed in JLT" />

      <label style={{fontSize:12,opacity:.8,display:"block",margin:"12px 0 4px"}}>Price</label>
      <input style={{padding:"10px 12px",borderRadius:10,border:"1px solid #2a2d34",background:"#0f1115",color:"#fff",width:"100%"}}
             value={price} onChange={e=>setPrice(e.target.value)} placeholder="AED 4,250,000" />

      <p style={{opacity:.85,marginTop:12}}>Agents Editor route is alive ✅</p>
    </main>
  );
}

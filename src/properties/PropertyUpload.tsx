"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PropertyUpload() {
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setOk(null);

    const { data: sessionData } = await supabase.auth.getUser();
    const userId = sessionData.user?.id;
    if (!userId) { setErr("Please sign in"); return; }
    if (lat === "" || lng === "") { setErr("Lat/Lng required"); return; }

    setBusy(true);
    try {
      // 1) upload images (if any)
      const imageUrls: string[] = [];
      if (files && files.length) {
        for (const f of Array.from(files)) {
          const path = `${userId}/${Date.now()}-${f.name}`;
          const up = await supabase.storage.from("property-images").upload(path, f, { upsert: true });
          if (up.error) throw up.error;
          const { data: pub } = supabase.storage.from("property-images").getPublicUrl(path);
          imageUrls.push(pub.publicUrl);
        }
      }

      // 2) insert property
      const { error } = await supabase.from("properties").insert({
        user_id: userId,
        address,
        description: desc,
        lat: Number(lat),
        lng: Number(lng),
        images: imageUrls,
      });
      if (error) throw error;
      setOk("Property saved ✅");
      setAddress(""); setDesc(""); setLat(""); setLng(""); setFiles(null);
    } catch (e: any) {
      setErr(e.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-white/10 p-4 text-white">
      <div className="text-lg font-semibold">Add Property</div>
      <input className="w-full rounded bg-white/10 p-2" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
      <textarea className="w-full rounded bg-white/10 p-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <div className="flex gap-2">
        <input className="w-1/2 rounded bg-white/10 p-2" placeholder="Latitude" value={lat} onChange={e=>setLat(e.target.value as any)} />
        <input className="w-1/2 rounded bg-white/10 p-2" placeholder="Longitude" value={lng} onChange={e=>setLng(e.target.value as any)} />
      </div>
      <input type="file" multiple accept="image/*" onChange={(e)=>setFiles(e.target.files)} className="block" />
      <div className="flex gap-2">
        <button className="rounded bg-blue-600 px-3 py-2 text-sm disabled:opacity-50" disabled={busy}>
          {busy ? "Uploading…" : "Save Property"}
        </button>
      </div>
      {err && <div className="text-rose-300 text-sm">{err}</div>}
      {ok && <div className="text-emerald-300 text-sm">{ok}</div>}
    </form>
  );
}

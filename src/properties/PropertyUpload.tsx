import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import PropertyMap from "@/components/maps/PropertyMap";

export default function PropertyUpload() {
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [coords, setCoords] = useState<{lat:number,lng:number}|null>(null);
  const [images, setImages] = useState<FileList|null>(null);
  const [videos, setVideos] = useState<FileList|null>(null);
  const [ok, setOk] = useState<string|null>(null); const [err,setErr]=useState<string|null>(null);

  async function geocode() {
    try {
      const token = import.meta.env.VITE_MAPBOX_TOKEN!;
      const q = encodeURIComponent(address);
      const r = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${token}`);
      const j = await r.json();
      const [lng, lat] = j.features[0].center;
      setCoords({ lat, lng });
    } catch(e:any){ setErr("Could not geocode address"); }
  }

  async function onSave() {
    try {
      setErr(null); setOk(null);
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not signed in");
      const { data: prop, error: pe } = await supabase.from("properties").insert({
        user_id: user.user.id, address, description: desc, map_lat: coords?.lat, map_lng: coords?.lng
      }).select().single();
      if (pe) throw pe;
      if (images?.length) {
        for (const f of Array.from(images)) {
          await supabase.storage.from("media").upload(`properties/${prop.id}/images/${Date.now()}-${f.name}`, f, { upsert: true });
        }
      }
      if (videos?.length) {
        for (const f of Array.from(videos)) {
          await supabase.storage.from("media").upload(`properties/${prop.id}/videos/${Date.now()}-${f.name}`, f, { upsert: true });
        }
      }
      setOk("Saved!");
    } catch(e:any){ setErr(e.message); }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <input className="rounded-md bg-white/10 px-3 py-2" placeholder="Property address"
               value={address} onChange={e=>setAddress(e.target.value)} />
        <textarea className="rounded-md bg-white/10 px-3 py-2" placeholder="Description"
                  value={desc} onChange={e=>setDesc(e.target.value)} />
        <div className="flex gap-2">
          <button className="rounded-md bg-blue-600 px-3 py-2" onClick={geocode}>Pin on Map</button>
          <button className="rounded-md bg-emerald-600 px-3 py-2" onClick={onSave}>Save Listing</button>
        </div>
      </div>
      {coords && <PropertyMap lat={coords.lat} lng={coords.lng} />}
      <div className="grid gap-2">
        <label className="text-sm text-slate-300">Upload images</label>
        <input type="file" multiple accept="image/*" onChange={(e)=>setImages(e.target.files)} />
        <label className="text-sm text-slate-300">Upload videos</label>
        <input type="file" multiple accept="video/*" onChange={(e)=>setVideos(e.target.files)} />
      </div>
      {ok && <div className="text-emerald-300 text-sm">{ok}</div>}
      {err && <div className="text-rose-300 text-sm">{err}</div>}
    </div>
  );
}

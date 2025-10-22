'use client';
import { useState } from 'react';

type MediaState = { url: string; file?: File | null };

async function uploadToBlob(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || 'upload failed');
  return json.url as string;
}

export default function AgentUpload() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    agent: '',
    agency: '',
    address: '',
    price: '',
    beds: '',
    baths: '',
    cars: '',
    propertyType: 'Home',
    landSizeSqm: '',
    solarWattage: '',
    evCharger: 'None',
    grassType: 'None',
    tags: '',
    inspection: '',
    area: '',
  });

  const [agentAvatar, setAgentAvatar] = useState<MediaState>({ url: '' });
  const [agencyLogo, setAgencyLogo]   = useState<MediaState>({ url: '' });
  const [image, setImage]             = useState<MediaState>({ url: '' });
  const [video, setVideo]             = useState<MediaState>({ url: '' });

  function text(label: string, key: keyof typeof form, type='text') {
    return (
      <input
        placeholder={label}
        className="w-full border p-2 rounded text-sm"
        type={type}
        value={(form as any)[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
      />
    );
  }

  function select(label: string, key: keyof typeof form, options: string[]) {
    return (
      <select
        aria-label={label}
        className="w-full border p-2 rounded text-sm bg-white"
        value={(form as any)[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  function media(label: string, state: MediaState, setState: (v: MediaState)=>void, accept: string) {
    return (
      <div className="space-y-1">
        <input
          placeholder={`${label} URL (optional)`}
          className="w-full border p-2 rounded text-sm"
          value={state.url}
          onChange={e => setState({ ...state, url: e.target.value })}
        />
        <input
          type="file"
          accept={accept}
          onChange={e => setState({ ...state, file: e.target.files?.[0] || null })}
          className="text-sm"
        />
      </div>
    );
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const ensureUrl = async (m: MediaState) =>
      m.file ? await uploadToBlob(m.file) : (m.url || '');

    const [agentAvatarUrl, agencyLogoUrl, imageUrl, videoUrl] = await Promise.all([
      ensureUrl(agentAvatar),
      ensureUrl(agencyLogo),
      ensureUrl(image),
      ensureUrl(video),
    ]);

    await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        beds: Number(form.beds || 0),
        baths: Number(form.baths || 0),
        cars: Number(form.cars || 0),
        landSizeSqm: Number((form.landSizeSqm as any) || 0),
        solarWattage: Number((form.solarWattage as any) || 0),
        agentAvatarUrl,
        agencyLogoUrl,
        imageUrl,
        videoUrl,
      }),
    });

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white border rounded-xl p-4 space-y-3 shadow-sm">
      <h2 className="text-xl font-semibold">Add Property</h2>

      {/* Basics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {text('Agent', 'agent')}
        {text('Agency', 'agency')}
        {text('Address', 'address')}
        {text('Price (e.g., AED 1,234,000)', 'price')}
        {text('Beds', 'beds', 'number')}
        {text('Baths', 'baths', 'number')}
        {text('Cars', 'cars', 'number')}
        {select('Property Type', 'propertyType', ['Home','Apartment','Villa','Townhouse','Land','Other'])}
        {text('Land Size (m²)', 'landSizeSqm', 'number')}
        {text('Solar Wattage (W)', 'solarWattage', 'number')}
        {select('EV Charger', 'evCharger', ['None','Type 1','Type 2','CCS','CHAdeMO'])}
        {select('Type of Grass', 'grassType', ['None','Real','Artificial'])}
        {text('Tags (comma separated)', 'tags')}
        {text('Inspection (e.g., Sat 11:15–11:45am)', 'inspection')}
        {text('Area', 'area')}
      </div>

      {/* Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {media('Agent Avatar', agentAvatar, setAgentAvatar, 'image/*')}
        {media('Agency Logo', agencyLogo, setAgencyLogo, 'image/*')}
        {media('Listing Image', image, setImage, 'image/*')}
        {media('Listing Video', video, setVideo, 'video/*')}
      </div>

      <button type="submit" disabled={loading} className="w-full md:w-auto bg-black text-white px-4 py-2 rounded hover:bg-neutral-800">
        {loading ? 'Publishing…' : 'Publish Listing'}
      </button>
    </form>
  );
}

'use client';
import { useState } from 'react';

export default function AgentUpload() {
  const [form, setForm] = useState({
    agent: '',
    agency: '',
    agentAvatarUrl: '',
    agencyLogoUrl: '',
    address: '',
    price: '',
    beds: '',
    baths: '',
    cars: '',
    tags: '',
    inspection: '',
    area: '',
    imageUrl: '',
    videoUrl: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    window.location.reload(); // simple for launch
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white border rounded-xl p-4 space-y-3 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Add Property</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries({
          agent: 'Agent',
          agency: 'Agency',
          agentAvatarUrl: 'Agent Avatar URL',
          agencyLogoUrl: 'Agency Logo URL',
          address: 'Address',
          price: 'Price (e.g., AED 1,234,000)',
          beds: 'Beds',
          baths: 'Baths',
          cars: 'Cars',
          tags: 'Tags (comma separated)',
          inspection: 'Inspection (e.g., Sat 11:15–11:45am)',
          area: 'Area',
          imageUrl: 'Listing Image URL (optional)',
          videoUrl: 'Listing Video URL (mp4, optional)',
        }).map(([key, label]) => (
          <input
            key={key}
            placeholder={label as string}
            className="w-full border p-2 rounded text-sm"
            value={(form as any)[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            type={['beds','baths','cars'].includes(key) ? 'number' : 'text'}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-black text-white px-4 py-2 rounded hover:bg-neutral-800"
      >
        {loading ? 'Publishing…' : 'Publish Listing'}
      </button>
    </form>
  );
}

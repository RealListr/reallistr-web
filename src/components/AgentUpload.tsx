'use client';
import { useState } from 'react';

export default function AgentUpload() {
  const [form, setForm] = useState({
    agent: '',
    agency: '',
    address: '',
    price: '',
    beds: '',
    baths: '',
    cars: '',
    tags: '',
    inspection: '',
    area: '',
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
    window.location.reload();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white border rounded-xl p-4 space-y-3 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-center">Add Property</h2>

      {Object.keys(form).map(key => (
        <input
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="w-full border p-2 rounded text-sm"
          value={(form as any)[key]}
          onChange={e => setForm({ ...form, [key]: e.target.value })}
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded hover:bg-neutral-800"
      >
        {loading ? 'Uploading...' : 'Publish Listing'}
      </button>
    </form>
  );
}

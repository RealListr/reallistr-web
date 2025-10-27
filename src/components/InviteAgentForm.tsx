'use client';
import React, { useState } from 'react';

export type Invite = { id: string; name: string; email: string; message?: string; };

export default function InviteAgentForm({ onAdd }: { onAdd: (invite: Invite) => void; }) {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      onAdd({ id: `${Date.now()}`, name: name.trim(), email: email.trim(), message: message.trim() || undefined });
      setName(''); setEmail(''); setMessage(''); setSubmitting(false);
    }, 400);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Agent name</label>
        <input className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none ${errors.name ? 'border-red-400' : 'border-neutral-200'} focus:ring-2 focus:ring-neutral-300`}
               value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aisha Patel" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none ${errors.email ? 'border-red-400' : 'border-neutral-200'} focus:ring-2 focus:ring-neutral-300`}
               value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@agency.com" inputMode="email" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Message (optional)</label>
        <textarea className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300"
                  rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Quick intro or context for the invite…" />
      </div>
      <div className="pt-1">
        <button type="submit" disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-black text-white px-4 py-2 disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send Invite'}
        </button>
      </div>
    </form>
  );
}

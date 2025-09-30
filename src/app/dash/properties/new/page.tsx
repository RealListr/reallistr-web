'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewProperty() {
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Property</h1>
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Title" />
          <Input placeholder="Address" />
          <Input placeholder="Price" />
          <Input placeholder="Suburb" />
          <Textarea placeholder="Description" className="md:col-span-2" />
        </div>
      )}
      {step === 2 && (
        <div className="rounded-xl border p-6 text-sm text-neutral-600">Upload images/videos here (wire later).</div>
      )}
      {step === 3 && (
        <div className="rounded-xl border p-6 text-sm text-neutral-600">Extras & SEO (wire later).</div>
      )}
      <div className="flex gap-3">
        {step > 1 && <Button variant="secondary" onClick={() => setStep(step-1)}>Back</Button>}
        {step < 3 ? (
          <Button onClick={() => setStep(step+1)}>Next</Button>
        ) : (
          <Button className="bg-black">Publish</Button>
        )}
      </div>
    </div>
  );
}

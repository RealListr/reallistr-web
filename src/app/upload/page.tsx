'use client';
import AgentUpload from '@/components/AgentUpload';

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-xl font-semibold mb-4">Add Property</h1>
      <AgentUpload />
    </main>
  );
}

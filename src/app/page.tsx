'use client';
import AgentUpload from '../components/AgentUpload';
import FeedV2 from '../components/feedv2/FeedV2';

export default function Page() {
  return (
    <main className="space-y-6">
      <AgentUpload />
      <FeedV2 />
    </main>
  );
}

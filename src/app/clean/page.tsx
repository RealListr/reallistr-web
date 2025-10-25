import dynamic from 'next/dynamic';

// ensure this route is dynamic and not statically pre-rendered
export const dynamic = 'force-dynamic';

// Do NOT SSR this client chunk; avoids server touching feed.tsx
const ClientClean = dynamic(() => import('./ClientClean'), { ssr: false });

export default function Page() {
  return <ClientClean />;
}

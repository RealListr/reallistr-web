import Script from "next/script";
import LightboxMount from '@/components/media/LightboxMount';
/* ... inside <body> ... */
<LightboxMount />
import MediaStrip from '@/components/media/MediaStrip';
import type { MediaItem, PlanTier } from '@/types/media';

const plan: PlanTier = 'active'; // derive from user/account
const media: MediaItem[] = [
  { id:'1', kind:'image', src:'/sample/a.jpg', alt:'Front' },
  { id:'2', kind:'video', src:'/sample/tour.mp4', thumb:'/sample/tour.jpg' },
  { id:'3', kind:'cut',   src:'/sample/short1.mp4', thumb:'/sample/short1.jpg', durationSec:18 },
  // ...
];

<MediaStrip items={media} plan={plan} />

export const metadata = { title: "RealListr" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind via CDN for preview (no PostCSS, no build errors) */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}

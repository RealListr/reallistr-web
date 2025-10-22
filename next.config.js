/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'cdn.reallistr.com' },
      // Add your exact Supabase/S3 host here when ready:
      // { protocol: 'https', hostname: 'YOUR-SUPABASE-PROJECT.supabase.co' },
    ],
  },
};

module.exports = nextConfig;

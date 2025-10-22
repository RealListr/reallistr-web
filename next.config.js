/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'cdn.reallistr.com' },   // <-- your CDN/S3
      { protocol: 'https', hostname: 'YOUR-SUPABASE-PROJECT.supabase.co' },
    ],
  },
};
export default nextConfig;

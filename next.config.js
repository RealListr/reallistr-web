/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.images.unsplash.com' },
      // { protocol: 'https', hostname: 'YOUR-CDN.example.com' },
    ],
  },
};
module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.images.unsplash.com' },
      // { protocol: 'https', hostname: 'YOUR-CDN.example.com' }, // add your CDN here
    ],
  },
};
module.exports = nextConfig;

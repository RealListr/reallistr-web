/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // ✅ explicit pass-through for API so nothing can intercept it
    return [
      { source: '/api/:path*', destination: '/api/:path*' },
    ];
  },
};
module.exports = nextConfig;

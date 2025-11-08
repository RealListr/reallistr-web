import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Don’t fail the Vercel build on lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don’t fail the Vercel build on type errors
    ignoreBuildErrors: true,
  },
  // Keep this here if you rely on the Node runtime for API routes like summarize polling
  experimental: {},
};

export default nextConfig;

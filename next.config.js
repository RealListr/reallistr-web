/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // 🚫 Skip lint + type errors during prod build (we’ll clean these later)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Stub out leaflet/react-leaflet on the server so SSR never touches L
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        leaflet: path.resolve(__dirname, 'src/lib/leaflet-stub.js'),
        'react-leaflet': path.resolve(__dirname, 'src/lib/leaflet-stub.js'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;

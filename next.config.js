/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      leaflet: path.resolve(__dirname, 'src/lib/empty.ts'),
      'react-leaflet': path.resolve(__dirname, 'src/lib/empty.ts'),
    };
    return config;
  },
};

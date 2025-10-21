/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      leaflet: require('path').resolve(__dirname, 'src/lib/empty.ts'),
      'react-leaflet': require('path').resolve(__dirname, 'src/lib/empty.ts'),
    };
    return config;
  },
};
module.exports = nextConfig;

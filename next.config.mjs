/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: { optimizePackageImports: [] },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        leaflet: require('path').resolve(__dirname, 'src/lib/leaflet-stub.js'),
        'react-leaflet': require('path').resolve(__dirname, 'src/lib/leaflet-stub.js'),
      };
    }
    return config;
  },
};
export default nextConfig;

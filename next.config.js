/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing config here if you have one; this is safe to merge.
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Alias 'leaflet' and 'react-leaflet' to a harmless stub on the server
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        leaflet: require('path').resolve(__dirname, 'src/lib/leaflet-stub.js'),
        'react-leaflet': require('path').resolve(__dirname, 'src/lib/leaflet-stub.js'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;

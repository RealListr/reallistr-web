/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/translate', destination: 'http://localhost:8787/translate' },
      { source: '/health', destination: 'http://localhost:8787/health' },
    ];
  },
};
module.exports = nextConfig;
// next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: "/translate", destination: "https://<codespace>-5175.app.github.dev/translate" },
      { source: "/health",    destination: "https://<codespace>-5175.app.github.dev/health" },
    ];
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias["@"] = new URL(".", import.meta.url).pathname;
    return config;
  },
  images: {
    domains: ['https://storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;

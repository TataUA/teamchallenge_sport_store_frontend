/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias["@"] = new URL(".", import.meta.url).pathname;
    return config;
  },
  images: {
    images: {
      unoptimized: true,
    },
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

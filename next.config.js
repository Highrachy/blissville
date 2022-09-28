/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['blissville-staging.s3.amazonaws.com'],
  },
  optimizeFonts: false,
};

module.exports = nextConfig;

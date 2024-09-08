/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'blissville-staging.s3.amazonaws.com',
      'blissville-staging.s3.us-east-1.amazonaws.com',
    ],
  },
  optimizeFonts: false,
};

module.exports = nextConfig;

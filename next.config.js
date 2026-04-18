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

  async redirects() {
    return [
      {
        source: '/blog/sangotedo-inflection-point',
        destination: '/blog/why-sangotedo-properties-keep-growing',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

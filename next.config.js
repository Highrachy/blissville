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

  async headers() {
    const cspHeader = [
      "default-src * 'unsafe-inline' 'unsafe-eval' data: blob: url:",
      "script-src * 'unsafe-inline' 'unsafe-eval' data: blob: url:",
      "style-src * 'unsafe-inline' data: blob:",
      "img-src * data: blob: android-webview-video-poster:",
      "connect-src * 'unsafe-inline' 'unsafe-eval' data: blob:",
      "frame-src * data: blob:",
      "media-src * data: blob:",
      "font-src * data: blob:",
      "object-src 'none'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

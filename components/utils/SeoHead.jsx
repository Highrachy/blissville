import Head from 'next/head';

export default function SeoHead({
  title = 'Blissville by Highrachy | Luxury & Affordable Homes in Lagos',
  description = 'Discover luxury and affordable homes in Lagos, Sangotedo, and Lekki. Explore waterfront terraces, detached homes, and family-friendly estates built by trusted developer Highrachy.',
  canonical = 'https://www.blissville.com.ng',
  ogImage = 'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg',
  keywords = [
    'Lagos real estate for sale',
    'Affordable real estate in Lagos',
    'Luxury homes Lekki',
    'Sangotedo Terraces',
    'Homes by waterfront',
    'Homes near Novare Mall',
    'Quality homes Lagos',
    'Close to Lagos Business School',
    'Trusted builder Highrachy',
    'Trusted builder Bojije',
    'Terraced duplexes Ajah',
    'Detached homes Omu Resort',
  ],
}) {
  const keywordContent = keywords.join(', ');

  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon / Branding */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#0D1B2A" />

      {/* Misc */}
      <meta name="author" content="Highrachy" />
      <meta name="robots" content="index, follow" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

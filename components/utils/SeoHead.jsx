import Head from 'next/head';

export default function SeoHead({
  title = 'Blissville by Highrachy | Luxury & Affordable Homes in Lagos',
  description = 'Discover luxury and affordable homes in Lagos, Lekki, and Sangotedo. Explore waterfront terraces and family-friendly estates by trusted developer Highrachy.',
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
    'Terraced duplexes Ajah',
    'Detached homes Omu Resort',
  ],
}) {
  const keywordContent = keywords.join(', ');

  // --- Schema.org Structured Data ---
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Highrachy Investment and Technology Ltd.',
    url: canonical,
    logo: 'https://www.blissville.com.ng/logo.png',
    description,
    sameAs: [
      'https://www.facebook.com/blissvillehomes',
      'https://www.instagram.com/blissvillehomes',
      'https://www.linkedin.com/company/highrachy/',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+234-818-888-8877',
        contactType: 'Customer Support',
        areaServed: 'NG',
        availableLanguage: 'English',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blissville by Highrachy',
    url: canonical,
    description:
      'Blissville by Highrachy offers luxury and affordable homes in Lagos. Discover terraces, apartments, and smart estates designed for modern living.',
  };

  return (
    <Head>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

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

      {/* Fix: No content freshness information */}
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* ✅ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
    </Head>
  );
}

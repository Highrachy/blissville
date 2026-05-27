import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SeoHead({
  title = 'Blissville | Luxury & Affordable Homes in Lagos',
  description = 'Discover luxury and affordable waterfront homes in Lagos by Highrachy. Explore modern family-friendly terraced duplexes in Lekki & Sangotedo.',
  canonical,
  ogImage = 'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg',
  robots = 'index, follow',
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
  const router = useRouter();
  const currentUrl = `https://www.blissville.com.ng${router.asPath.split('?')[0]}`;
  const resolvedCanonical = canonical || currentUrl;

  const keywordContent = keywords.join(', ');

  // --- Schema.org Structured Data ---
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Highrachy Investment and Technology Ltd.',
    url: resolvedCanonical,
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
    url: resolvedCanonical,
    description:
      'Blissville by Highrachy offers luxury and affordable homes in Lagos. Discover terraces, apartments, and smart estates designed for modern living.',
  };

  const pathnames = router.asPath.split('?')[0].split('/').filter((x) => x);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.blissville.com.ng',
      },
      ...pathnames.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        item: `https://www.blissville.com.ng/${pathnames.slice(0, index + 1).join('/')}`,
      })),
    ],
  };

  return (
    <Head>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={resolvedCanonical} />
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
      <meta name="robots" content={robots} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ✅ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, breadcrumbSchema]),
        }}
      />
    </Head>
  );
}

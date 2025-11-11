export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.blissville.com.ng';

  const pages = [
    '',
    '/about-us',
    '/projects',
    '/our-projects/blissville-terraces',
    '/our-projects/blissville-apartments',
    '/past-projects',
    '/our-properties',
    '/investors',
    '/faqs',
    '/contact-us',
    '/privacy-policy',
    '/our-properties/blissville-apartments/4-bedroom-apartments',
    '/our-properties/blissville-apartments/4-bedroom-waterview-terrace-duplex',
    '/our-properties/blissville-apartments/3-bedroom-apartments',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}

import BLOG_POSTS from '@/data/blog';

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
    '/blissville-terraces',
    '/beyond-the-hype',
    '/our-properties/blissville-apartments/4-bedroom-apartments',
    '/our-properties/blissville-apartments/4-bedroom-waterview-terrace-duplex',
    '/our-properties/blissville-apartments/3-bedroom-apartments',
  ];

  const blogPages = BLOG_POSTS.map((post) => post.slug);
  const allPages = [...pages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${
            page.startsWith('/blog') ? 'weekly' : 'monthly'
          }</changefreq>
          <priority>${page.startsWith('/blog') ? '0.7' : '0.8'}</priority>
        </url>
      `,
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

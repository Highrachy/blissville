import BLOG_POSTS from '@/data/blog';

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.blissville.com.ng';

  const pages = [
    '',
    '/about-us',
    '/our-projects/blissville-terraces',
    '/our-projects',
    '/past-projects',
    '/our-properties',
    '/investors',
    '/faqs',
    '/contact-us',
    '/blissville-terraces',
    '/beyond-the-hype',
    '/testimonials',
    '/terms-of-use',
  ];

  let dynamicProjects = [];
  let dynamicProperties = [];

  try {
    const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
    const { data: projectsData } = await projectsRes.json();
    dynamicProjects = projectsData?.map((p) => `/our-projects/${p.attributes.slug.toLowerCase()}`) || [];
  } catch (error) {}

  try {
    const propertiesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=*`);
    const { data: propertiesData } = await propertiesRes.json();
    dynamicProperties = propertiesData?.map((p) => `/our-properties/${p.attributes.project.data.attributes.slug.toLowerCase()}/${p.attributes.slug.toLowerCase()}`) || [];
  } catch (error) {}

  const blogPages = BLOG_POSTS.map((post) => post.slug);
  const allPages = [...new Set([...pages, ...blogPages, ...dynamicProjects, ...dynamicProperties])];

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

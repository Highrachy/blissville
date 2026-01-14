import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ params, res }) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'newsletters',
    `${params.slug}.html`
  );

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end('Newsletter not found');
    return { props: {} };
  }

  const html = fs.readFileSync(filePath);

  // IMPORTANT: Send raw HTML, not props
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  res.write(html);
  res.end();

  return { props: {} };
}

export default function NewsletterPage() {
  // This component never renders
  return null;
}

import { readContent } from '../src/server/content';

export default function Robots() { return null; }
export async function getServerSideProps({ res }) {
  const { content } = await readContent();
  res.setHeader('Content-Type', 'text/plain; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
  res.end(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin/\nDisallow: /api/inquiries\nSitemap: ${content.site.SITE_URL}/sitemap.xml\n`);
  return { props: {} };
}

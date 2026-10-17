import { readContent } from '../src/server/content';

const escape = value => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]);
export default function Sitemap() { return null; }
export async function getServerSideProps({ res }) {
  const { content, updatedAt } = await readContent();
  const paths = Object.values(content.seo).filter(page => !page.noindex).map(page => page.path);
  paths.push(...content.services.filter(item => !item.noindex).map(item => `/services/${item.slug}`));
  paths.push(...content.blogs.filter(item => !item.noindex).map(item => `/blog/${item.slug}`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escape(content.site.SITE_URL + path)}</loc><lastmod>${updatedAt}</lastmod></url>`).join('')}</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
  res.end(xml); return { props: {} };
}

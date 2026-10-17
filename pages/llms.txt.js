import { readContent } from '../src/server/content';

export default function Information() { return null; }
export async function getServerSideProps({ res }) {
  const { content } = await readContent(); const { site } = content;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8'); res.setHeader('Cache-Control', 'no-store');
  res.end(`# ${site.SITE_NAME}\n\n${content.seo.home.description}\n\n- Website: ${site.SITE_URL}\n- Phone: ${site.BUSINESS_PHONE}\n- WhatsApp: https://wa.me/${site.WHATSAPP_NUMBER}\n- Email: ${site.BUSINESS_EMAIL}\n- Areas: ${site.BUSINESS_AREAS.join(', ')}\n\n## Services\n${content.services.map(s => `- ${s.title}: ${site.SITE_URL}/services/${s.slug}`).join('\n')}\n\n## Contact\n${site.SITE_URL}/contact\n`);
  return { props: {} };
}

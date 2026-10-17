import { Layout } from '../src/components/Layout';
import { Home } from '../src/pages/Home';
import { About } from '../src/pages/About';
import { Services } from '../src/pages/Services';
import { ServiceDetail } from '../src/pages/ServiceDetail';
import { Blog } from '../src/pages/Blog';
import { BlogPost } from '../src/pages/BlogPost';
import { Testimonials } from '../src/pages/Testimonials';
import { FAQ } from '../src/pages/FAQ';
import { Contact } from '../src/pages/Contact';
import { readContent } from '../src/server/content';

const views = { home: Home, about: About, services: Services, service: ServiceDetail, blog: Blog, post: BlogPost, testimonials: Testimonials, faq: FAQ, contact: Contact };

export default function PublicPage({ view }) {
  const View = views[view];
  return <Layout><View /></Layout>;
}

export async function getServerSideProps({ params, res }) {
  const parts = params?.slug || [];
  const { content } = await readContent();
  let view = parts.length === 0 ? 'home' : parts.length === 1 && Object.hasOwn(views, parts[0]) && !['home', 'service', 'post'].includes(parts[0]) ? parts[0] : null;
  if (parts.length === 2 && parts[0] === 'services' && content.services.some(item => item.slug === parts[1])) view = 'service';
  if (parts.length === 2 && parts[0] === 'blog' && content.blogs.some(item => item.slug === parts[1])) view = 'post';
  if (!view) return { notFound: true };
  res.setHeader('Cache-Control', 'no-store');
  return { props: { content, view } };
}

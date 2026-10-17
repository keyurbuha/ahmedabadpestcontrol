import { useSiteContent } from "../content/SiteContent";
import { Seo } from '../components/NextSeo';
import { BlogCard } from '../components/BlogCard';
import { SectionHeading } from '../components/SectionHeading';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { Marquee } from '../components/Marquee';
export const Blog = () => {
  const {
    contentText,
    pageSeo,
    blogs
  } = useSiteContent();
  const categories = [...new Set(blogs.map(b => b.category))];
  return <>
      <Seo {...pageSeo.blog} />

      <PageHero eyebrow={contentText("Blog", "field1")} title={contentText("Blog", "field2")} subtitle={contentText("Blog", "field3")} />

      <div className="border-y border-brand-dark/8 bg-white py-3.5">
        <Marquee speed="slow" gap="gap-8">
          {categories.map(cat => <span key={cat} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark/50">
              {cat}
              <span className="mx-6 text-brand-green">✦</span>
            </span>)}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-brand-offwhite min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading eyebrow={contentText("Blog", "field4")} title={contentText("Blog", "field5")} subtitle={contentText("Blog", "field6")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}
          </div>
        </div>
      </section>

      <PageCta title={contentText("Blog", "field7")} subtitle={contentText("Blog", "field8")} />
    </>;
};

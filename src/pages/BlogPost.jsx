import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react';
import { blogs } from '../data/blogs';
import { Button } from '../components/Button';
import { PageCta } from '../components/PageCta';
import { BlogCard } from '../components/BlogCard';
export const BlogPost = () => {
    const { slug } = useParams();
    const post = blogs.find((b) => b.slug === slug);
    if (!post) {
        return <Navigate to="/blog" replace/>;
    }
    const related = blogs.filter((b) => b.id !== post.id).slice(0, 2);
    return (<>
      <Helmet>
        <title>{post.title} | Ahmedabad Pest Control</title>
        <meta name="description" content={post.excerpt}/>
      </Helmet>

      <section className="bg-brand-offwhite pt-14 pb-10 md:pt-16 md:pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-dark transition-colors">
            <ArrowLeft size={16}/> Back to articles
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="mb-5 inline-block bg-brand-green px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <h1 className="font-display text-3xl font-bold leading-tight text-brand-dark md:text-5xl mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 border-b border-brand-dark/10 pb-8 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <User size={16}/> {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16}/> {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16}/> {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-10 -mt-2 overflow-hidden border border-brand-dark/8">
            <img src={post.image} alt={post.title} className="h-auto max-h-[460px] w-full object-cover"/>
          </div>

          <article className="max-w-none text-gray-700 leading-relaxed text-lg">
            {post.content.map((paragraph, index) => (<p key={index} className="mb-6">
                {paragraph}
              </p>))}
          </article>

          <div className="mt-12 flex flex-col gap-5 border border-brand-dark/8 bg-brand-offwhite p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <h4 className="font-display text-xl font-bold text-brand-dark mb-1">
                Need professional help?
              </h4>
              <p className="text-gray-600 text-sm">Our Ahmedabad team is ready to inspect and treat.</p>
            </div>
            <Button href="/contact">Book Free Inspection</Button>
          </div>

          {related.length > 0 && (<div className="mt-16">
              <h3 className="font-display text-2xl font-bold text-brand-dark mb-6">
                Keep reading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map((p, i) => (<BlogCard key={p.id} post={p} index={i}/>))}
              </div>
            </div>)}
        </div>
      </section>

      <PageCta />
    </>);
};

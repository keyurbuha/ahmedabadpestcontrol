import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
export const BlogCard = ({ post, index }) => {
    return (<motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group flex h-full flex-col overflow-hidden border border-brand-dark/8 bg-white">
      <div className="relative h-52 overflow-hidden">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent opacity-60"/>
        <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-wider text-white">
          {post.category}
        </span>
      </div>

      <div className="flex flex-grow flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <Clock size={13}/>
          <span>{post.readTime}</span>
        </div>

        <h3 className="mb-3 text-xl font-bold leading-snug tracking-tight text-brand-dark transition-colors group-hover:text-brand-green">
          {post.title}
        </h3>

        <p className="mb-6 flex-grow text-[15px] leading-relaxed text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>

        <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-green">
          Read article
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
        </Link>
      </div>
    </motion.article>);
};

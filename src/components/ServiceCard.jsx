import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative flex h-full min-h-[300px] overflow-hidden sm:min-h-[340px]"
        aria-label={service.title}
      >
        <img
          src={service.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent transition-colors duration-300 group-hover:from-brand-dark/90 group-hover:via-brand-dark/35" />

        <div className="relative mt-auto w-full p-0">
          <div className="relative overflow-hidden border-t border-white/25 bg-white/15 px-4 py-3.5 backdrop-blur-xl sm:px-5 sm:py-4">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

            <div className="relative">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                  {service.title}
                </h3>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition-colors group-hover:border-brand-green group-hover:bg-brand-green sm:h-10 sm:w-10">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="hidden pt-2.5 text-sm leading-relaxed text-white/75 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

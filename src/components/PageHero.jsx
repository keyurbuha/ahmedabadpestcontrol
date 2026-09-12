import { motion } from 'framer-motion';
export const PageHero = ({ eyebrow, title, subtitle, children }) => {
    return (<section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,158,68,0.22),_transparent_55%)]"/>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
          {eyebrow && (<p className="mb-3 sm:mb-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-brand-green">
              {eyebrow}
            </p>)}
          <h1 className="font-display text-[1.85rem] sm:text-4xl font-bold leading-tight md:text-5xl mb-3 sm:mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-gray-400 max-w-2xl">
            {subtitle}
          </p>
          {children}
        </motion.div>
      </div>
    </section>);
};

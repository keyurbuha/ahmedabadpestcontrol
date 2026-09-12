import { motion } from 'framer-motion';
import { Button } from './Button';
import { Marquee } from './Marquee';
const ctaItems = [
    'Free Inspection',
    'WhatsApp Quote',
    'Same-Day Service',
    'Warranty Backed',
    'Family Safe',
    '10,000+ Homes Protected',
    'Eco-Friendly Treatment',
    'All Ahmedabad Areas',
];
export const PageCta = ({ title = 'Ready for a pest-free home?', subtitle = 'Book a free inspection today. Clear recommendations, family-safe treatments, and honest pricing.', }) => {
    return (<section className="relative overflow-hidden bg-brand-dark">
      <div className="border-b border-white/10 py-3.5">
        <Marquee speed="slow" reverse gap="gap-10" pauseOnHover={false}>
          {ctaItems.map((item) => (<span key={item} className="inline-flex items-center gap-10 whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
              {item}
              <span className="text-white/25" aria-hidden>
                ✦
              </span>
            </span>))}
        </Marquee>
      </div>

      <div className="relative py-14 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(47,158,68,0.22),_transparent_50%)]"/>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display mb-3 sm:mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mb-7 sm:mb-8 max-w-xl text-sm sm:text-base text-gray-400">
              {subtitle}
            </p>
            <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Button href="/contact" size="lg">
                Get a Free Quote
              </Button>
              <Button href="tel:+919876543210" variant="white" size="lg">
                Call +91 98765 43210
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);
};

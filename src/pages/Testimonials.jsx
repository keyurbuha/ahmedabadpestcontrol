import { Seo } from '../components/Seo';
import { pageSeo } from '../data/seo';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { SectionHeading } from '../components/SectionHeading';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
export const Testimonials = () => {
    return (<>
      <Seo {...pageSeo.testimonials} />

      <PageHero eyebrow="Client stories" title="Testimonials" subtitle="Real feedback from families and businesses we’ve helped across Ahmedabad."/>

      <div className="overflow-hidden border-y border-brand-dark/8 bg-white py-5">
        <Marquee speed="slow" gap="gap-5" pauseOnHover>
          {testimonials.map((t) => (<article key={`m-${t.id}`} className="w-[min(280px,82vw)] shrink-0 border border-brand-dark/8 bg-brand-offwhite p-4 sm:w-[300px] sm:p-5 md:w-[340px]">
              <div className="mb-3 flex gap-0.5 text-brand-gold">
                {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={13} fill="currentColor"/>))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">“{t.review}”</p>
              <p className="font-display text-sm font-bold text-brand-dark">{t.name}</p>
              <p className="text-xs text-brand-green">{t.locality}</p>
            </article>))}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading eyebrow="All reviews" title="Trusted across Ahmedabad localities" subtitle="From termite treatments to mosquito fogging — here’s what clients say after the job." centered/>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (<motion.article key={t.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="border border-brand-dark/8 bg-white p-7">
                <div className="mb-5 flex gap-0.5 text-brand-gold">
                  {Array.from({ length: t.rating }).map((_, idx) => (<Star key={idx} size={15} fill="currentColor"/>))}
                </div>
                <p className="mb-8 leading-relaxed text-gray-600">“{t.review}”</p>
                <div className="flex items-center gap-3 border-t border-brand-dark/8 pt-5">
                  <div className="flex h-11 w-11 items-center justify-center bg-brand-green/10 font-display text-lg font-bold text-brand-green">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-dark">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.locality}</p>
                  </div>
                </div>
              </motion.article>))}
          </div>
        </div>
      </section>

      <AreasMarquee />
      <PageCta title="Ready to experience the same service?"/>
    </>);
};

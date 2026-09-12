import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/faqs';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { Marquee } from '../components/Marquee';
export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    return (<>
      <Helmet>
        <title>FAQs | Ahmedabad Pest Control</title>
        <meta name="description" content="Frequently asked questions about our pest control services in Ahmedabad."/>
      </Helmet>

      <PageHero eyebrow="Help center" title="Frequently Asked Questions" subtitle="Clear answers on safety, process, pricing, and what to expect from our team."/>

      <div className="border-y border-brand-dark/8 bg-white py-3.5">
        <Marquee speed="slow" gap="gap-10">
          {['Safety', 'Pricing', 'Process', 'Warranty', 'Same-Day Service', 'Pets & Kids'].map((item) => (<span key={item} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark/50">
                {item}
                <span className="mx-6 text-brand-green">✦</span>
              </span>))}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-brand-offwhite min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionHeading eyebrow="Common queries" title="Everything you need to know" centered/>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (<div key={index} className="overflow-hidden border border-brand-dark/8 bg-white">
                  <button type="button" className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left sm:items-center sm:gap-4 sm:px-5 md:px-6" onClick={() => setOpenIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span className="min-w-0 font-display text-[15px] font-bold leading-snug text-brand-dark sm:text-base md:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown className={`shrink-0 text-brand-green transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20}/>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className="border-t border-brand-dark/8 px-5 pb-5 pt-4 text-gray-600 leading-relaxed md:px-6">
                          {faq.answer}
                        </div>
                      </motion.div>)}
                  </AnimatePresence>
                </div>);
        })}
          </div>

          <div className="mt-12 border border-brand-green/20 bg-brand-green/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can’t find what you need? Our team is happy to help over call or WhatsApp.
            </p>
            <Button href="/contact">Contact Us</Button>
          </div>
        </div>
      </section>

      <PageCta />
    </>);
};

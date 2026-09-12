import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, MapPin, Search, ClipboardList, Shield } from 'lucide-react';
import { services, serviceAreas } from '../data/services';
import { Button } from '../components/Button';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
import { InquiryForm } from '../components/InquiryForm';
import { SectionHeading } from '../components/SectionHeading';
export const ServiceDetail = () => {
    const { slug } = useParams();
    const service = services.find((s) => s.slug === slug);
    if (!service) {
        return <Navigate to="/services" replace/>;
    }
    const Icon = service.icon;
    const related = services.filter((s) => s.id !== service.id).slice(0, 3);
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.h1,
        description: service.metaDescription,
        provider: {
            '@type': 'LocalBusiness',
            name: 'Ahmedabad Pest Control',
            areaServed: 'Ahmedabad, Gujarat',
            telephone: '+919876543210',
        },
        areaServed: serviceAreas.map((area) => ({
            '@type': 'Place',
            name: `${area}, Ahmedabad`,
        })),
        serviceType: service.title,
    };
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
    return (<>
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription}/>
        <meta name="keywords" content={`${service.title.toLowerCase()} Ahmedabad, ${service.title.toLowerCase()} in Ahmedabad, pest control Ahmedabad, ${service.slug} treatment Ahmedabad`}/>
        <link rel="canonical" href={`https://ahmedabadpestcontrol.com/services/${service.slug}`}/>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,158,68,0.22),_transparent_55%)]"/>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-20">
          <Link to="/services" className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-brand-green transition-colors">
            <ArrowLeft size={16}/> All pest control services
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center border border-brand-green/30 bg-brand-green/15 text-brand-green">
              <Icon size={30}/>
            </div>
            <div>
              <p className="mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                Pest control in Ahmedabad
              </p>
              <h1 className="font-display text-[1.75rem] sm:text-4xl font-bold md:text-5xl mb-3 leading-tight">
                {service.h1}
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-y border-brand-dark/8 bg-brand-offwhite py-3.5">
        <Marquee speed="slow" gap="gap-8">
          {service.features.map((f) => (<span key={f} className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-dark/70">
              <CheckCircle size={15} className="text-brand-green"/>
              {f}
              <span className="ml-4 text-brand-green/40">✦</span>
            </span>))}
        </Marquee>
      </div>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-12 sm:space-y-14">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark mb-4 sm:mb-5">
                  About our {service.title.toLowerCase()} in Ahmedabad
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] sm:text-base">
                  {service.intro.map((para) => (<p key={para.slice(0, 32)}>{para}</p>))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">
                  What’s included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (<li key={feature} className="flex items-start gap-3 border border-brand-dark/8 bg-brand-offwhite px-4 py-3 text-sm sm:text-[15px] text-gray-700">
                      <CheckCircle className="text-brand-green shrink-0 mt-0.5" size={18}/>
                      {feature}
                    </li>))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">
                  Common signs you need {service.title.toLowerCase()}
                </h2>
                <ul className="space-y-3">
                  {service.signs.map((sign) => (<li key={sign} className="flex gap-3 text-gray-700 text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-green shrink-0"/>
                      {sign}
                    </li>))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">
                  Our {service.title.toLowerCase()} process
                </h2>
                <ol className="space-y-4">
                  {service.process.map((step, index) => {
            const icons = [Search, ClipboardList, Shield, CheckCircle];
            const StepIcon = icons[index] ?? CheckCircle;
            return (<li key={step} className="flex gap-4 border border-brand-dark/8 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-green/10 text-brand-green">
                          <StepIcon size={18}/>
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest text-brand-green mb-1">
                            STEP {String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="text-[15px] text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </li>);
        })}
                </ol>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  {service.title} near you in Ahmedabad
                </h2>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-5">
                  We provide {service.title.toLowerCase()} across major Ahmedabad localities including Satellite,
                  Vastrapur, Bopal, Prahlad Nagar, SG Highway, Thaltej, Gota, Chandkheda, Navrangpura, Maninagar, and more.
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.slice(0, 12).map((area) => (<span key={area} className="inline-flex items-center gap-1.5 border border-brand-dark/10 bg-brand-offwhite px-2.5 py-1.5 text-xs font-medium text-gray-700">
                      <MapPin size={12} className="text-brand-green"/>
                      {area}
                    </span>))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">
                  FAQs about {service.title.toLowerCase()} in Ahmedabad
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq) => (<details key={faq.question} className="group border border-brand-dark/8 bg-brand-offwhite open:bg-white">
                      <summary className="cursor-pointer list-none px-4 py-3.5 font-display font-bold text-brand-dark text-[15px] flex justify-between gap-3">
                        {faq.question}
                        <span className="text-brand-green group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-brand-dark/8 pt-3">
                        {faq.answer}
                      </div>
                    </details>))}
                </div>
              </div>

              {related.length > 0 && (<div>
                  <h3 className="font-display text-xl font-bold text-brand-dark mb-4">
                    Related pest control services
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {related.map((s) => (<Link key={s.id} to={`/services/${s.slug}`} className="border border-brand-dark/10 px-4 py-2 text-sm font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors">
                        {s.title} in Ahmedabad
                      </Link>))}
                  </div>
                </div>)}
            </div>

            <aside>
              <div className="lg:sticky lg:top-28 border border-brand-dark/8 bg-brand-offwhite p-4 sm:p-6 md:p-7">
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
                  Book {service.title} in Ahmedabad
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Share your locality and pest issue — we’ll open WhatsApp with your inquiry ready to send.
                </p>
                <InquiryForm variant="quick"/>
                <div className="mt-4 space-y-3">
                  <Button href="tel:+919876543210" variant="outline" className="w-full">
                    Call +91 98765 43210
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Serving homes & businesses across Ahmedabad
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite border-y border-brand-dark/8">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Need help choosing?" title={`Get expert ${service.title.toLowerCase()} guidance today`} subtitle="Free inspection, clear recommendations, and treatment planned for Ahmedabad homes and commercial spaces." centered/>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <Button href="/contact" size="lg">
              Request Free Quote
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <AreasMarquee />
      <PageCta title={`Need ${service.title.toLowerCase()} in your area?`} subtitle="Tell us your Ahmedabad locality and we’ll schedule inspection or treatment at the earliest slot."/>
    </>);
};

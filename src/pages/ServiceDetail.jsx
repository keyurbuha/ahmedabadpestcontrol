import { useSiteContent } from "../content/SiteContent";
import { Seo } from '../components/NextSeo';
import Link from 'next/link';
import { useParams, Navigate } from '../lib/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, MapPin, Search, ClipboardList, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
import { InquiryForm } from '../components/InquiryForm';
import { SectionHeading } from '../components/SectionHeading';
import { JsonLd } from '../components/NextJsonLd';
export const ServiceDetail = () => {
  const {
    contentText,
    services,
    serviceAreas,
    getBreadcrumbSchema,
    getFaqSchema,
    SITE_URL,
    BUSINESS_PHONE,
    BUSINESS_PHONE_DISPLAY
  } = useSiteContent();
  const {
    slug
  } = useParams();
  const service = services.find(s => s.slug === slug);
  if (!service) {
    return <Navigate href="/services" replace />;
  }
  const related = services.filter(s => s.id !== service.id).slice(0, 3);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.metaDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: contentText("ServiceDetail", "field1"),
      areaServed: 'Ahmedabad, Gujarat',
      telephone: BUSINESS_PHONE,
      url: SITE_URL
    },
    areaServed: serviceAreas.map(area => ({
      '@type': 'Place',
      name: `${area}, Ahmedabad`
    })),
    serviceType: service.title
  };
  return <>
      <Seo noindex={service.noindex} canonical={service.canonical} image={service.ogImage || service.image} title={service.metaTitle} description={service.metaDescription} keywords={service.metaKeywords || `${service.title.toLowerCase()} Ahmedabad, ${service.title.toLowerCase()} in Ahmedabad, pest control Ahmedabad, ${service.slug} treatment Ahmedabad, ${service.title.toLowerCase()} near me Ahmedabad`} path={`/services/${service.slug}`} />
      <JsonLd data={[serviceSchema, getFaqSchema(service.faqs), getBreadcrumbSchema([{
      name: contentText("ServiceDetail", "field2"),
      path: '/'
    }, {
      name: contentText("ServiceDetail", "field3"),
      path: '/services'
    }, {
      name: service.title,
      path: `/services/${service.slug}`
    }])]} />

      <section className="relative overflow-hidden bg-brand-dark text-white">
        {service.image && <img src={service.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/92 via-brand-dark/78 to-brand-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,158,68,0.22),_transparent_55%)]" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-20">
          <Link href="/services" className="mb-6 sm:mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/65 hover:text-brand-green transition-colors">
            <ArrowLeft size={16} />{contentText("ServiceDetail", "field4")}</Link>
          <motion.div initial={{
          opacity: 0,
          y: 16
        }} animate={{
          opacity: 1,
          y: 0
        }} className="max-w-3xl">
            <p className="mb-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{contentText("ServiceDetail", "field5")}</p>
            <h1 className="font-display text-[1.75rem] sm:text-4xl font-bold md:text-5xl mb-3 leading-tight text-white">
              {service.h1}
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="border-y border-brand-dark/8 bg-brand-offwhite py-3.5">
        <Marquee speed="slow" gap="gap-8">
          {service.features.map(f => <span key={f} className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-dark/70">
              <CheckCircle size={15} className="text-brand-green" />
              {f}
              <span className="ml-4 text-brand-green/40">✦</span>
            </span>)}
        </Marquee>
      </div>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-12 sm:space-y-14">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark mb-4 sm:mb-5">{contentText("ServiceDetail", "field6")}{service.title.toLowerCase()}{contentText("ServiceDetail", "field7")}</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] sm:text-base">
                  {service.intro.map(para => <p key={para.slice(0, 32)}>{para}</p>)}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">{contentText("ServiceDetail", "field8")}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map(feature => <li key={feature} className="flex items-start gap-3 border border-brand-dark/8 bg-brand-offwhite px-4 py-3 text-sm sm:text-[15px] text-gray-700">
                      <CheckCircle className="text-brand-green shrink-0 mt-0.5" size={18} />
                      {feature}
                    </li>)}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">{contentText("ServiceDetail", "field9")}{service.title.toLowerCase()}
                </h2>
                <ul className="space-y-3">
                  {service.signs.map(sign => <li key={sign} className="flex gap-3 text-gray-700 text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                      {sign}
                    </li>)}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">{contentText("ServiceDetail", "field10")}{service.title.toLowerCase()}{contentText("ServiceDetail", "field11")}</h2>
                <ol className="space-y-4">
                  {service.process.map((step, index) => {
                  const icons = [Search, ClipboardList, Shield, CheckCircle];
                  const StepIcon = icons[index] ?? CheckCircle;
                  return <li key={step} className="flex gap-4 border border-brand-dark/8 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-green/10 text-brand-green">
                          <StepIcon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest text-brand-green mb-1">{contentText("ServiceDetail", "field12")}{String(index + 1).padStart(2, '0')}
                          </p>
                          <p className="text-[15px] text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </li>;
                })}
                </ol>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  {service.title}{contentText("ServiceDetail", "field13")}</h2>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-5">{contentText("ServiceDetail", "field14")}{service.title.toLowerCase()}{contentText("ServiceDetail", "field15")}</p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.slice(0, 12).map(area => <span key={area} className="inline-flex items-center gap-1.5 border border-brand-dark/10 bg-brand-offwhite px-2.5 py-1.5 text-xs font-medium text-gray-700">
                      <MapPin size={12} className="text-brand-green" />
                      {area}
                    </span>)}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-5">{contentText("ServiceDetail", "field16")}{service.title.toLowerCase()}{contentText("ServiceDetail", "field17")}</h2>
                <div className="space-y-3">
                  {service.faqs.map(faq => <details key={faq.question} className="group border border-brand-dark/8 bg-brand-offwhite open:bg-white">
                      <summary className="cursor-pointer list-none px-4 py-3.5 font-display font-bold text-brand-dark text-[15px] flex justify-between gap-3">
                        {faq.question}
                        <span className="text-brand-green group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-brand-dark/8 pt-3">
                        {faq.answer}
                      </div>
                    </details>)}
                </div>
              </div>

              {related.length > 0 && <div>
                  <h3 className="font-display text-xl font-bold text-brand-dark mb-4">{contentText("ServiceDetail", "field18")}</h3>
                  <div className="flex flex-wrap gap-3">
                    {related.map(s => <Link key={s.id} href={`/services/${s.slug}`} className="border border-brand-dark/10 px-4 py-2 text-sm font-semibold text-brand-dark hover:border-brand-green hover:text-brand-green transition-colors">
                        {s.title}{contentText("ServiceDetail", "field19")}</Link>)}
                  </div>
                </div>}
            </div>

            <aside>
              <div className="lg:sticky lg:top-28 border border-brand-dark/8 bg-brand-offwhite p-4 sm:p-6 md:p-7">
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2">{contentText("ServiceDetail", "field20")}{service.title}{contentText("ServiceDetail", "field21")}</h3>
                <p className="text-sm text-gray-600 mb-6">{contentText("ServiceDetail", "field22")}</p>
                <InquiryForm variant="quick" />
                <div className="mt-4 space-y-3">
                  <Button href={`tel:${BUSINESS_PHONE}`} variant="outline" className="w-full">{contentText("ServiceDetail", "field23")}{BUSINESS_PHONE_DISPLAY}
                  </Button>
                  <p className="text-xs text-center text-gray-500">{contentText("ServiceDetail", "field24")}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-offwhite border-y border-brand-dark/8">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow={contentText("ServiceDetail", "field25")} title={`${contentText('ServiceDetail', 'guideTitlePrefix')}${service.title.toLowerCase()}${contentText('ServiceDetail', 'guideTitleSuffix')}`} subtitle={contentText("ServiceDetail", "field26")} centered />
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <Button href="/contact" size="lg">{contentText("ServiceDetail", "field27")}</Button>
            <Button href="/services" variant="outline" size="lg">{contentText("ServiceDetail", "field28")}</Button>
          </div>
        </div>
      </section>

      <AreasMarquee />
      <PageCta title={`${contentText('ServiceDetail', 'areaCtaPrefix')}${service.title.toLowerCase()}${contentText('ServiceDetail', 'areaCtaSuffix')}`} subtitle={contentText("ServiceDetail", "field29")} />
    </>;
};

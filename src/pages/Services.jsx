import { useSiteContent } from "../content/SiteContent";
import { JsonLd } from '../components/NextJsonLd';
import { Seo } from '../components/NextSeo';
import Link from 'next/link';
import { Building2, CheckCircle, Home, MapPin, ShieldCheck, Store, Users } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
export const Services = () => {
  const {
    contentText,
    pageSeo,
    BUSINESS_PHONE,
    SITE_URL,
    services,
    serviceAreas
  } = useSiteContent();
  const audience = [{
    icon: Home,
    title: contentText("Services", "field1"),
    text: contentText("Services", "field2")
  }, {
    icon: Users,
    title: contentText("Services", "field3"),
    text: contentText("Services", "field4")
  }, {
    icon: Store,
    title: contentText("Services", "field5"),
    text: contentText("Services", "field6")
  }, {
    icon: Building2,
    title: contentText("Services", "field7"),
    text: contentText("Services", "field8")
  }];
  const whyUs = [contentText('Services', 'sameDayNote'), contentText("Services", "field9"), contentText("Services", "field10"), contentText("Services", "field11"), contentText("Services", "field12"), contentText("Services", "field13")];
  const pageFaqs = [{
    q: contentText("Services", "field14"),
    a: contentText("Services", "field15")
  }, {
    q: contentText("Services", "field16"),
    a: contentText("Services", "field17")
  }, {
    q: contentText("Services", "field18"),
    a: contentText("Services", "field19")
  }, {
    q: contentText("Services", "field20"),
    a: contentText("Services", "field21")
  }];
  const serviceListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/services/${service.slug}`,
      name: `${service.title} in Ahmedabad`
    }))
  };
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PestControlService',
    name: contentText("Services", "field22"),
    areaServed: {
      '@type': 'City',
      name: contentText("Services", "field23")
    },
    serviceType: services.map(s => s.title),
    url: `${SITE_URL}/services`
  };
  return <>
      <Seo {...pageSeo.services} />
      <JsonLd data={[serviceListSchema, localBusinessSchema]} />

      <PageHero eyebrow={contentText("Services", "field24")} title={contentText("Services", "field25")} subtitle={contentText("Services", "field26")} />

      <div className="border-y border-brand-dark/8 bg-brand-offwhite py-4">
        <Marquee speed="slow" gap="gap-8">
          {services.map(s => <span key={s.id} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark/50">
              {s.title}{contentText("Services", "field27")}<span className="mx-6 text-brand-green">✦</span>
            </span>)}
        </Marquee>
      </div>

      {/* Local intro */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <SectionHeading eyebrow={contentText("Services", "field28")} title={contentText("Services", "field29")} subtitle={contentText("Services", "field30")} />
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] sm:text-base">
                <p>{contentText("Services", "field31")}{' '}
                  <strong className="text-brand-dark">{contentText("Services", "field32")}</strong>{contentText("Services", "field33")}{' '}
                  <strong className="text-brand-dark">{contentText("Services", "field34")}</strong>{contentText("Services", "field35")}{' '}
                  <strong className="text-brand-dark">{contentText("Services", "field36")}</strong>{contentText("Services", "field37")}</p>
                <p>{contentText("Services", "field38")}</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" size="lg">{contentText("Services", "field39")}</Button>
                <Button href={`tel:${BUSINESS_PHONE}`} variant="outline" size="lg">{contentText("Services", "field40")}</Button>
              </div>
            </div>

            <div className="border border-brand-dark/8 bg-brand-offwhite p-5 sm:p-7">
              <div className="flex items-center gap-2 text-brand-green mb-4">
                <ShieldCheck size={22} />
                <h3 className="font-display text-lg font-bold text-brand-dark">{contentText("Services", "field41")}</h3>
              </div>
              <ul className="space-y-3">
                {whyUs.map(item => <li key={item} className="flex gap-3 text-sm sm:text-[15px] text-gray-700 leading-relaxed">
                    <CheckCircle className="text-brand-green shrink-0 mt-0.5" size={18} />
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow={contentText("Services", "field42")} title={contentText("Services", "field43")} subtitle={contentText("Services", "field44")} centered />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow={contentText("Services", "field45")} title={contentText("Services", "field46")} subtitle={contentText("Services", "field47")} centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audience.map(item => <div key={item.title} className="border border-brand-dark/8 bg-brand-offwhite p-5 sm:p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center bg-brand-green/10 text-brand-green">
                  <item.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow={contentText("Services", "field48")} title={contentText("Services", "field49")} subtitle={contentText("Services", "field50")} light centered />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {serviceAreas.map(area => <div key={area} className="flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-200">
                <MapPin size={14} className="text-brand-green shrink-0" />
                <span className="leading-tight">{area}</span>
              </div>)}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400 max-w-2xl mx-auto">{contentText("Services", "field51")}</p>
        </div>
      </section>

      <AreasMarquee />

      {/* Process */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow={contentText("Services", "field52")} title={contentText("Services", "field53")} centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[{
            step: '01',
            title: contentText("Services", "field54"),
            text: contentText("Services", "field55")
          }, {
            step: '02',
            title: contentText("Services", "field56"),
            text: contentText("Services", "field57")
          }, {
            step: '03',
            title: contentText("Services", "field58"),
            text: contentText("Services", "field59")
          }].map(item => <div key={item.step} className="border border-brand-dark/8 p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-brand-green mb-3">{item.step}</p>
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeading eyebrow={contentText("Services", "field60")} title={contentText("Services", "field61")} centered />
          <div className="space-y-3">
            {pageFaqs.map(faq => <details key={faq.q} className="group border border-brand-dark/8 bg-white open:shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-4 sm:px-5 font-display font-bold text-brand-dark text-[15px] sm:text-base flex items-start justify-between gap-3">
                  <span>{faq.q}</span>
                  <span className="text-brand-green group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 sm:px-5 text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-brand-dark/8 pt-3">
                  {faq.a}
                </div>
              </details>)}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">{contentText("Services", "field62")}{' '}
            {services.slice(0, 3).map((s, i) => <span key={s.id}>
                <Link href={`/services/${s.slug}`} className="text-brand-green font-semibold hover:underline">
                  {s.title}
                </Link>
                {i < 2 ? ' · ' : ''}
              </span>)}
          </p>
        </div>
      </section>

      <PageCta title={contentText("Services", "field63")} subtitle={contentText("Services", "field64")} />
    </>;
};

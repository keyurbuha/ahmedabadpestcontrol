import { useSiteContent } from "../content/SiteContent";
import { Seo } from '../components/NextSeo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import { InquiryForm } from '../components/InquiryForm';
import { PageHero } from '../components/PageHero';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
export const Contact = () => {
  const {
    contentText,
    WHATSAPP_NUMBER,
    pageSeo,
    BUSINESS_PHONE,
    BUSINESS_PHONE_DISPLAY,
    BUSINESS_EMAIL,
    BUSINESS_ADDRESS_LINE,
    MAP_EMBED_URL
  } = useSiteContent();
  return <>
      <Seo {...pageSeo.contact} />

      <PageHero eyebrow={contentText("Contact", "field1")} title={contentText("Contact", "field2")} subtitle={contentText("Contact", "field3")} />

      <div className="border-y border-brand-dark/8 bg-white py-3.5">
        <Marquee speed="slow" gap="gap-10" pauseOnHover={false}>
          {[contentText("Contact", "field4"), contentText("Contact", "field5"), contentText("Contact", "field6"), contentText("Contact", "field7"), contentText("Contact", "field8")].map(item => <span key={item} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark/50">
              {item}
              <span className="mx-6 text-brand-green">✦</span>
            </span>)}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal direction="left">
              <SectionHeading eyebrow={contentText("Contact", "field9")} title={contentText("Contact", "field10")} subtitle={contentText("Contact", "field11")} />

              <div className="mt-8 space-y-5">
                {[{
                icon: MapPin,
                title: contentText("Contact", "field12"),
                body: <p className="text-gray-600">{BUSINESS_ADDRESS_LINE}</p>
              }, {
                icon: Phone,
                title: contentText("Contact", "field13"),
                body: <div className="space-y-1">
                        <a href={`tel:${BUSINESS_PHONE}`} className="block text-gray-600 hover:text-brand-green">
                          {BUSINESS_PHONE_DISPLAY}
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block text-brand-green font-semibold hover:underline">{contentText("Contact", "field14")}</a>
                      </div>
              }, {
                icon: Mail,
                title: contentText("Contact", "field15"),
                body: <a href={`mailto:${BUSINESS_EMAIL}`} className="text-gray-600 hover:text-brand-green">
                        {BUSINESS_EMAIL}
                      </a>
              }, {
                icon: Clock,
                title: contentText("Contact", "field16"),
                body: <p className="text-gray-600">{contentText("Contact", "field17")}<br />{contentText("Contact", "field18")}</p>
              }].map(item => <div key={item.title} className="flex gap-4 border border-brand-dark/8 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-green/10 text-brand-green">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-dark mb-1">
                        {item.title}
                      </h4>
                      {item.body}
                    </div>
                  </div>)}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="border border-brand-dark/8 bg-white p-6 md:p-8 shadow-[0_24px_60px_-40px_rgba(12,22,16,0.35)]">
                <h3 className="font-display text-2xl font-bold text-brand-dark mb-2">{contentText("Contact", "field19")}</h3>
                <p className="text-gray-500 text-sm mb-6">{contentText("Contact", "field20")}</p>
                <InquiryForm variant="full" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <AreasMarquee />

      <section className="h-[380px] w-full bg-gray-200">
        <iframe src={MAP_EMBED_URL} width="100%" height="100%" style={{
        border: 0
      }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={contentText("Contact", "field21")} />
      </section>
    </>;
};

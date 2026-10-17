import { useSiteContent } from "../content/SiteContent";
import { Seo } from '../components/NextSeo';
import { ShieldCheck, Users, Target, Award, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
export const About = () => {
  const {
    contentText,
    pageSeo
  } = useSiteContent();
  const values = [contentText("About", "field1"), contentText("About", "field2"), contentText("About", "field3"), contentText("About", "field4"), contentText("About", "field5"), contentText("About", "field6")];
  return <>
      <Seo {...pageSeo.about} />

      <PageHero eyebrow={contentText("About", "field7")} title={contentText("About", "field8")} subtitle={contentText("About", "field9")} />

      <div className="border-y border-brand-dark/8 bg-white py-4">
        <Marquee speed="slow" gap="gap-10">
          {values.map(item => <span key={item} className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-brand-dark/70">
              <CheckCircle size={16} className="text-brand-green" />
              {item}
              <span className="text-brand-green/40 ml-4">✦</span>
            </span>)}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] overflow-hidden border border-brand-dark/8 bg-brand-offwhite">
                <img src={contentText("About", "image10")} alt={contentText("About", "field11")} className="h-full w-full object-cover object-center" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <SectionHeading eyebrow={contentText("About", "field12")} title={contentText("About", "field13")} subtitle={contentText("About", "field14")} />
              <div className="space-y-4 text-gray-600 text-[17px] leading-relaxed">
                <p>{contentText("About", "field15")}</p>
                <p>{contentText("About", "field16")}</p>
                <p>{contentText("About", "field17")}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading eyebrow={contentText("About", "field18")} title={contentText("About", "field19")} centered />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[{
            number: '15+',
            label: contentText("About", "field20"),
            icon: Award
          }, {
            number: '10k+',
            label: contentText("About", "field21"),
            icon: ShieldCheck
          }, {
            number: '45+',
            label: contentText("About", "field22"),
            icon: Users
          }, {
            number: '99%',
            label: contentText("About", "field23"),
            icon: Target
          }].map(stat => <div key={stat.label} className="border border-brand-dark/8 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-brand-green/10 text-brand-green">
                  <stat.icon size={24} />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-1">
                  {stat.number}
                </p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </section>

      <AreasMarquee />
      <PageCta title={contentText("About", "field24")} />
    </>;
};

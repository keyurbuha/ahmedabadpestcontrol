import { Seo } from '../components/Seo';
import { pageSeo } from '../data/seo';
import { ShieldCheck, Users, Target, Award, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
const values = [
    'Family-safe treatments',
    'Certified technicians',
    'Root-cause inspection',
    'Warranty-backed service',
    'Transparent pricing',
    'Same-day availability',
];
export const About = () => {
    return (<>
      <Seo {...pageSeo.about} />

      <PageHero eyebrow="Who we are" title="About Ahmedabad Pest Control" subtitle="Committed to safe, effective, and environmentally responsible pest control across Ahmedabad since 2008."/>

      <div className="border-y border-brand-dark/8 bg-white py-4">
        <Marquee speed="slow" gap="gap-10">
          {values.map((item) => (<span key={item} className="inline-flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-brand-dark/70">
              <CheckCircle size={16} className="text-brand-green"/>
              {item}
              <span className="text-brand-green/40 ml-4">✦</span>
            </span>))}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/3] overflow-hidden border border-brand-dark/8 bg-brand-offwhite">
                <img src="/how-we-work.png" alt="Ahmedabad Pest Control team at work" className="h-full w-full object-cover object-center"/>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <SectionHeading eyebrow="Our story" title="Protecting homes and health for 15+ years" subtitle="Built on trust, training, and treatments that last."/>
              <div className="space-y-4 text-gray-600 text-[17px] leading-relaxed">
                <p>
                  Ahmedabad Pest Control started with one mission: deliver high-quality pest management while keeping families, pets, and the environment safe.
                </p>
                <p>
                  We’ve grown into one of the city’s trusted names by using proven methods and continuously training our technicians. Every visit focuses on finding the source — not just spraying symptoms.
                </p>
                <p>
                  From termite barriers to mosquito fogging, we tailor each plan to your property and Ahmedabad’s climate.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading eyebrow="By the numbers" title="Results that speak for themselves" centered/>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
            { number: '15+', label: 'Years Experience', icon: Award },
            { number: '10k+', label: 'Homes Protected', icon: ShieldCheck },
            { number: '45+', label: 'Expert Technicians', icon: Users },
            { number: '99%', label: 'Satisfaction Rate', icon: Target },
        ].map((stat) => (<div key={stat.label} className="border border-brand-dark/8 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-brand-green/10 text-brand-green">
                  <stat.icon size={24}/>
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-1">
                  {stat.number}
                </p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>))}
          </div>
        </div>
      </section>

      <AreasMarquee />
      <PageCta title="Let’s protect your space"/>
    </>);
};

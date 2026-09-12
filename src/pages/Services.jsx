import { Helmet } from 'react-helmet-async';
import { Seo } from '../components/Seo';
import { pageSeo } from '../data/seo';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle, Home, MapPin, ShieldCheck, Store, Users, } from 'lucide-react';
import { services, serviceAreas } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { PageHero } from '../components/PageHero';
import { PageCta } from '../components/PageCta';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
const audience = [
    {
        icon: Home,
        title: 'Homes & bungalows',
        text: 'Flats, duplexes, and independent houses across Ahmedabad needing safe indoor treatment.',
    },
    {
        icon: Users,
        title: 'Residential societies',
        text: 'Common-area mosquito, rodent, and general pest programs for societies and townships.',
    },
    {
        icon: Store,
        title: 'Shops & restaurants',
        text: 'Kitchen-focused cockroach and rodent control with discreet scheduling.',
    },
    {
        icon: Building2,
        title: 'Offices & warehouses',
        text: 'Commercial pest management for offices, clinics, godowns, and industrial units.',
    },
];
const whyUs = [
    'Local Ahmedabad team with same-day / next-day inspection options',
    'Family-safe methods with clear prep and after-care guidance',
    'Targeted treatment plans — not one spray for every pest',
    'Coverage across west, central, and east Ahmedabad localities',
    'WhatsApp quotes and transparent pricing before work starts',
    'Warranty options on selected services like termite treatment',
];
const pageFaqs = [
    {
        q: 'Which pest control service do I need in Ahmedabad?',
        a: 'It depends on the pest and where activity is happening. Termites need structural treatment, kitchen cockroaches need gel baiting, and monsoon mosquitoes often need fogging plus larval control. A free inspection helps us recommend the right plan.',
    },
    {
        q: 'Do you provide pest control near Satellite, Bopal, and SG Highway?',
        a: 'Yes. We regularly serve Satellite, Bopal, Bodakdev, Prahlad Nagar, SG Highway, Thaltej, Vastrapur, Gota, Chandkheda, Maninagar, and many other Ahmedabad areas.',
    },
    {
        q: 'Are your treatments safe for kids and pets?',
        a: 'Safety is prioritized. We use approved methods, explain precautions, and plan applications carefully around kitchens, bedrooms, and living areas.',
    },
    {
        q: 'How fast can I book pest control in Ahmedabad?',
        a: 'In most cases we can schedule inspection or service within 24 hours. Share your locality and pest issue on WhatsApp for the quickest response.',
    },
];
export const Services = () => {
    const serviceListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: services.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://ahmedabadpestcontrol.com/services/${service.slug}`,
            name: `${service.title} in Ahmedabad`,
        })),
    };
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'PestControlService',
        name: 'Ahmedabad Pest Control',
        areaServed: {
            '@type': 'City',
            name: 'Ahmedabad',
        },
        serviceType: services.map((s) => s.title),
        url: 'https://ahmedabadpestcontrol.com/services',
    };
    return (<>
      <Seo {...pageSeo.services} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <PageHero eyebrow="Pest control in Ahmedabad" title="Professional Pest Control Services in Ahmedabad" subtitle="Safe, targeted treatments for homes, societies, offices, and commercial spaces across Ahmedabad — from Satellite and Bopal to Maninagar and Chandkheda."/>

      <div className="border-y border-brand-dark/8 bg-brand-offwhite py-4">
        <Marquee speed="slow" gap="gap-8">
          {services.map((s) => (<span key={s.id} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark/50">
              {s.title} in Ahmedabad
              <span className="mx-6 text-brand-green">✦</span>
            </span>))}
        </Marquee>
      </div>

      {/* Local intro */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <SectionHeading eyebrow="Why Ahmedabad needs specialist care" title="Pest problems here need local solutions" subtitle="Warm weather, monsoon humidity, and dense housing make infestations spread fast — DIY sprays rarely fix the source."/>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] sm:text-base">
                <p>
                  Ahmedabad Pest Control provides end-to-end pest management for residential and commercial properties across the city. Whether you need{' '}
                  <strong className="text-brand-dark">termite control in Ahmedabad</strong>, kitchen{' '}
                  <strong className="text-brand-dark">cockroach treatment</strong>, society{' '}
                  <strong className="text-brand-dark">mosquito fogging</strong>, or rodent management for shops and warehouses, our technicians inspect first and treat with precision.
                </p>
                <p>
                  Every service plan is built around your property type — apartment, bungalow, society common area, restaurant, office, or godown — and the pest behaviour common to Gujarat’s climate.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button href="/contact" size="lg">
                  Book Free Inspection
                </Button>
                <Button href="tel:+919876543210" variant="outline" size="lg">
                  Call Now
                </Button>
              </div>
            </div>

            <div className="border border-brand-dark/8 bg-brand-offwhite p-5 sm:p-7">
              <div className="flex items-center gap-2 text-brand-green mb-4">
                <ShieldCheck size={22}/>
                <h3 className="font-display text-lg font-bold text-brand-dark">
                  What you get with every service
                </h3>
              </div>
              <ul className="space-y-3">
                {whyUs.map((item) => (<li key={item} className="flex gap-3 text-sm sm:text-[15px] text-gray-700 leading-relaxed">
                    <CheckCircle className="text-brand-green shrink-0 mt-0.5" size={18}/>
                    <span>{item}</span>
                  </li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Our treatments" title="Pest control services we offer in Ahmedabad" subtitle="Choose a service below for detailed process, signs of infestation, and local coverage information." centered/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {services.map((service, index) => (<ServiceCard key={service.id} service={service} index={index}/>))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Who we serve" title="Residential and commercial pest control across Ahmedabad" subtitle="From single flats to full society contracts — we match the treatment to your space." centered/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audience.map((item) => (<div key={item.title} className="border border-brand-dark/8 bg-brand-offwhite p-5 sm:p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center bg-brand-green/10 text-brand-green">
                  <item.icon size={22}/>
                </div>
                <h3 className="font-display text-lg font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Areas we cover" title="Pest control near you in Ahmedabad" subtitle="Fast response across major Ahmedabad localities — west, central, and east corridors." light centered/>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {serviceAreas.map((area) => (<div key={area} className="flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-200">
                <MapPin size={14} className="text-brand-green shrink-0"/>
                <span className="leading-tight">{area}</span>
              </div>))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-400 max-w-2xl mx-auto">
            Don’t see your society or road listed? Message us your landmark — we cover most of Ahmedabad and nearby developing areas.
          </p>
        </div>
      </section>

      <AreasMarquee />

      {/* Process */}
      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="How booking works" title="Simple process from inquiry to protection" centered/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
            {
                step: '01',
                title: 'Share your pest issue',
                text: 'Tell us your locality in Ahmedabad and the pest problem via WhatsApp or our inquiry form.',
            },
            {
                step: '02',
                title: 'Free inspection & quote',
                text: 'We inspect the property, identify the source, and share a clear treatment plan with pricing.',
            },
            {
                step: '03',
                title: 'Treat & follow up',
                text: 'Certified technicians complete the service and guide you on prevention for lasting results.',
            },
        ].map((item) => (<div key={item.step} className="border border-brand-dark/8 p-6">
                <p className="text-xs font-bold tracking-[0.2em] text-brand-green mb-3">{item.step}</p>
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-16 md:py-20 bg-brand-offwhite">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeading eyebrow="Local FAQs" title="Common questions about pest control in Ahmedabad" centered/>
          <div className="space-y-3">
            {pageFaqs.map((faq) => (<details key={faq.q} className="group border border-brand-dark/8 bg-white open:shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-4 sm:px-5 font-display font-bold text-brand-dark text-[15px] sm:text-base flex items-start justify-between gap-3">
                  <span>{faq.q}</span>
                  <span className="text-brand-green group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 sm:px-5 text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-brand-dark/8 pt-3">
                  {faq.a}
                </div>
              </details>))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Need a specific service page?{' '}
            {services.slice(0, 3).map((s, i) => (<span key={s.id}>
                <Link to={`/services/${s.slug}`} className="text-brand-green font-semibold hover:underline">
                  {s.title}
                </Link>
                {i < 2 ? ' · ' : ''}
              </span>))}
          </p>
        </div>
      </section>

      <PageCta title="Need pest control in your Ahmedabad locality?" subtitle="Book a free inspection. We’ll identify the pest, recommend the right treatment, and share clear pricing before we start."/>
    </>);
};

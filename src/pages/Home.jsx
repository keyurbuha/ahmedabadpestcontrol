import { motion } from 'framer-motion';
import { Seo } from '../components/Seo';
import { pageSeo } from '../data/seo';
import { JsonLd } from '../components/JsonLd';
import { getBreadcrumbSchema, getFaqSchema } from '../data/structuredData';
import { ShieldCheck, Award, ThumbsUp, CheckCircle, Search, SprayCan, Shield, Phone, Star, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { Marquee } from '../components/Marquee';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { blogs } from '../data/blogs';
import { BlogCard } from '../components/BlogCard';
import { InquiryForm } from '../components/InquiryForm';
const trustItems = [
    { icon: ShieldCheck, label: 'Trusted Professionals' },
    { icon: ThumbsUp, label: 'Safe & Effective' },
    { icon: Award, label: 'Advanced Technology' },
    { icon: CheckCircle, label: '100% Satisfaction' },
    { icon: Star, label: '15+ Years Experience' },
    { icon: MapPin, label: 'All Ahmedabad Areas' },
];
const localities = [
    'Satellite',
    'Vastrapur',
    'Bopal',
    'Navrangpura',
    'Prahlad Nagar',
    'SG Highway',
    'Thaltej',
    'Ambli',
    'Gota',
    'Maninagar',
    'Chandkheda',
    'Bodakdev',
];
const serviceTags = services.map((s) => s.title);
export const Home = () => {
  const homeFaqs = [
    {
      question: 'Do you provide pest control across Ahmedabad?',
      answer:
        'Yes. Ahmedabad Pest Control serves major localities including Satellite, Bopal, Vastrapur, Prahlad Nagar, SG Highway, Thaltej, Gota, Chandkheda, Navrangpura, Maninagar and nearby areas.',
    },
    {
      question: 'Which pests do you treat in Ahmedabad?',
      answer:
        'We treat termites, cockroaches, rodents, mosquitoes, bed bugs and lizards for homes, societies, offices and commercial spaces.',
    },
    {
      question: 'How can I get a free pest control quote in Ahmedabad?',
      answer:
        'Use the Quick Inquiry form on our website or WhatsApp/call +91 98765 43210. We can often schedule inspection within 24 hours.',
    },
  ];

  return (
    <>
      <Seo {...pageSeo.home} />
      <JsonLd
        data={[
          getBreadcrumbSchema([{ name: 'Home', path: '/' }]),
          getFaqSchema(homeFaqs),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-offwhite">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(47,158,68,0.12),_transparent_55%)]"/>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl"/>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <p className="mb-4 sm:mb-5 inline-flex max-w-full items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-brand-green">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green animate-pulse"/>
                <span className="leading-snug">Serving Ahmedabad homes & businesses</span>
              </p>
              <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.1] text-brand-dark sm:text-5xl lg:text-6xl xl:text-[4.25rem] mb-4 sm:mb-6">
                Pest-free spaces.
                <br />
                <span className="text-brand-green">Healthier living.</span>
              </h1>
              <p className="mb-6 sm:mb-8 max-w-md text-base sm:text-lg leading-relaxed text-gray-600">
                Professional inspection, precise treatment, and lasting protection — built for Ahmedabad’s climate and your family’s safety.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#quick-inquiry" size="lg">
                  Get Free Quote
                </Button>
                <a href="tel:+919876543210" className="inline-flex min-h-12 items-center justify-center gap-2 px-2 py-3 text-brand-dark font-semibold hover:text-brand-green transition-colors">
                  <Phone size={18} className="text-brand-green"/>
                  +91 98765 43210
                </a>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3 border-t border-brand-dark/10 pt-6 sm:pt-8 text-sm text-gray-600">
                <span className="font-semibold text-brand-dark">10,000+ homes protected</span>
                <span>Family-safe treatments</span>
                <span>Same-day service available</span>
              </div>
            </motion.div>

            <motion.div id="quick-inquiry" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }} className="relative scroll-mt-24">
              <div className="absolute -inset-2 sm:-inset-3 rounded-[1.25rem] bg-brand-green/10 blur-2xl"/>
              <div className="relative border border-brand-dark/8 bg-white p-4 shadow-[0_30px_80px_-40px_rgba(12,22,16,0.45)] sm:p-6 md:p-8">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-dark">Quick Inquiry</h2>
                  <span className="hidden sm:inline-flex items-center gap-1.5 bg-brand-gold/15 px-2.5 py-1 text-xs font-bold text-brand-gold">
                    <Award size={14}/>
                    15+ Yrs
                  </span>
                </div>
                <p className="mb-5 sm:mb-6 text-sm text-gray-500">
                  Share details — we’ll open WhatsApp with your inquiry ready to send.
                </p>
                <InquiryForm variant="quick"/>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live trust marquee */}
        <div className="border-y border-white/10 bg-brand-dark py-4">
          <Marquee speed="slow" gap="gap-10 md:gap-16">
            {trustItems.map((item) => (<div key={item.label} className="flex items-center gap-3 whitespace-nowrap text-white/90">
                <item.icon size={18} className="text-brand-green"/>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                <span className="ml-6 h-1 w-1 rounded-full bg-brand-green/50" aria-hidden/>
              </div>))}
          </Marquee>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="What we treat" title="Pest control services for every infestation" subtitle="Targeted solutions for homes, societies, offices, and warehouses across Ahmedabad."/>
            <Button href="/services" variant="outline" className="shrink-0 self-start md:mb-12">
              View all services
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {services.map((service, index) => (<ServiceCard key={service.id} service={service} index={index}/>))}
          </div>
        </div>

        <div className="mt-16 border-y border-brand-dark/8 bg-brand-offwhite py-5">
          <Marquee speed="slow" reverse gap="gap-8">
            {serviceTags.map((tag) => (<span key={tag} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark/45">
                {tag}
                <span className="mx-8 text-brand-green">✦</span>
              </span>))}
          </Marquee>
        </div>
      </section>

      {/* Process */}
      <section className="overflow-hidden bg-brand-dark text-white">
        <div className="grid min-h-[640px] grid-cols-1 lg:grid-cols-2">
          <div className="relative order-2 min-h-[380px] lg:order-1 lg:min-h-full">
            <img src="/how-we-work.png" alt="Certified Ahmedabad Pest Control technician treating a home" className="absolute inset-0 h-full w-full object-cover object-[center_20%]"/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-dark/50"/>
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto">
              <div className="inline-flex items-center gap-3 border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-sm">
                <ShieldCheck className="shrink-0 text-brand-green" size={22}/>
                <div>
                  <p className="text-sm font-semibold leading-tight">Family-safe treatments</p>
                  <p className="mt-0.5 text-xs text-gray-300">Warranty-backed service across Ahmedabad</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 flex items-center px-6 py-16 md:px-10 lg:order-2 lg:py-20 xl:px-16">
            <div className="w-full max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
                Our process
              </p>
              <h2 className="font-display mb-4 text-3xl font-bold leading-tight md:text-4xl xl:text-5xl">
                From inspection to lasting protection
              </h2>
              <p className="mb-12 max-w-md text-base text-gray-400 md:text-lg">
                Every visit follows a clear method — find the source, treat precisely, then close the gaps that bring pests back.
              </p>

              <ol>
                {[
            {
                icon: Search,
                step: '01',
                title: 'Inspect the property',
                desc: 'We check entry points, moisture zones, and breeding spots before any treatment begins.',
            },
            {
                icon: SprayCan,
                step: '02',
                title: 'Treat with precision',
                desc: 'Certified technicians apply targeted, low-odour solutions suited to your space — not a blanket spray.',
            },
            {
                icon: Shield,
                step: '03',
                title: 'Protect & follow up',
                desc: 'Prevention guidance and follow-ups so the problem stays solved, not quiet for a week.',
            },
        ].map((item, i, arr) => (<li key={item.step} className="relative flex gap-5 pb-10 last:pb-0">
                    {i < arr.length - 1 && (<span className="absolute left-[23px] top-12 bottom-0 w-px bg-white/15" aria-hidden/>)}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
                      <item.icon size={20} strokeWidth={2}/>
                    </div>
                    <div className="pt-1">
                      <div className="mb-2 flex items-baseline gap-3">
                        <span className="text-xs font-bold tracking-widest text-brand-green">{item.step}</span>
                        <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed text-gray-400">{item.desc}</p>
                    </div>
                  </li>))}
              </ol>

              <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:gap-8">
                <Button href="/contact" size="lg">
                  Book Free Inspection
                </Button>
                <p className="text-sm text-gray-400">Same-day visits in most Ahmedabad localities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas served marquee */}
      <section className="bg-brand-green py-4 overflow-hidden">
        <Marquee speed="slow" gap="gap-0">
          {localities.map((area) => (<span key={area} className="mx-5 inline-flex items-center gap-3 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.16em] text-white">
              <MapPin size={14} className="opacity-80"/>
              {area}
              <span className="text-white/40">/</span>
            </span>))}
        </Marquee>
      </section>

      {/* Testimonials marquee */}
      <section className="overflow-hidden bg-brand-offwhite py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 mb-10 md:mb-14">
          <SectionHeading eyebrow="Client stories" title="Trusted by families across Ahmedabad" subtitle="Real results from homes, kitchens, and societies we’ve treated." centered/>
        </div>

        <div className="space-y-5">
          <Marquee speed="slow" gap="gap-5" pauseOnHover>
            {testimonials.map((t) => (<TestimonialCard key={`a-${t.id}`} t={t}/>))}
          </Marquee>
          <Marquee speed="slow" reverse gap="gap-5" pauseOnHover>
            {[...testimonials].reverse().map((t) => (<TestimonialCard key={`b-${t.id}`} t={t}/>))}
          </Marquee>
        </div>

        <div className="container mx-auto px-4 md:px-6 mt-10 text-center">
          <Button href="/testimonials" variant="outline">
            Read all reviews
          </Button>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Guides & tips" title="Practical advice for a pest-free home" subtitle="Simple, expert guidance written for Ahmedabad homes."/>
            <Button href="/blog" variant="outline" className="shrink-0 self-start md:mb-12">
              Browse articles
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((post, index) => (<BlogCard key={post.id} post={post} index={index}/>))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="border-b border-white/10 bg-brand-dark/80 py-3.5">
          <Marquee speed="slow" reverse gap="gap-10" pauseOnHover={false}>
            {[
            'Free Inspection',
            'WhatsApp Quote',
            'Same-Day Service',
            'Warranty Backed',
            'Family Safe',
            '10,000+ Homes Protected',
            'Eco-Friendly Treatment',
            'All Ahmedabad Areas',
        ].map((item) => (<span key={item} className="inline-flex items-center gap-10 whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
                {item}
                <span className="text-white/25" aria-hidden>
                  ✦
                </span>
              </span>))}
          </Marquee>
        </div>

        <div className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(47,158,68,0.25),_transparent_50%)]"/>
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display mb-5 text-3xl font-bold text-white md:text-5xl">
                Ready for a pest-free home?
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-gray-400">
                Book a free inspection today. Our team will assess the issue and recommend the right treatment — no pressure, clear pricing.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </section>
    </>);
};
function TestimonialCard({ t, }) {
    return (<article className="w-[320px] shrink-0 border border-brand-dark/8 bg-white p-6 md:w-[380px]">
      <div className="mb-4 flex gap-0.5 text-brand-gold">
        {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={14} fill="currentColor"/>))}
      </div>
      <p className="mb-6 text-[15px] leading-relaxed text-gray-600">“{t.review}”</p>
      <div className="border-t border-brand-dark/8 pt-4">
        <p className="font-display font-bold text-brand-dark">{t.name}</p>
        <p className="text-sm text-brand-green">{t.locality}</p>
      </div>
    </article>);
}

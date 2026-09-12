import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ScrollReveal } from '../components/ScrollReveal';
import { InquiryForm } from '../components/InquiryForm';
import { PageHero } from '../components/PageHero';
import { AreasMarquee } from '../components/AreasMarquee';
import { Marquee } from '../components/Marquee';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
export const Contact = () => {
    return (<>
      <Helmet>
        <title>Contact Us | Ahmedabad Pest Control</title>
        <meta name="description" content="Get in touch with Ahmedabad Pest Control for a free inspection and quote."/>
      </Helmet>

      <PageHero eyebrow="Get in touch" title="Contact Us" subtitle="Ready to secure your home from pests? Send an inquiry on WhatsApp or call us today."/>

      <div className="border-y border-brand-dark/8 bg-white py-3.5">
        <Marquee speed="slow" gap="gap-10" pauseOnHover={false}>
          {[
            'Free Inspection',
            'WhatsApp Quotes',
            'Same-Day Visits',
            'Mon–Sat 8AM–8PM',
            'All Ahmedabad Areas',
        ].map((item) => (<span key={item} className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark/50">
              {item}
              <span className="mx-6 text-brand-green">✦</span>
            </span>))}
        </Marquee>
      </div>

      <section className="py-20 md:py-24 bg-brand-offwhite">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal direction="left">
              <SectionHeading eyebrow="Reach us" title="We’re here to help" subtitle="Ask about inspections, treatments, or ongoing maintenance for your home or business."/>

              <div className="mt-8 space-y-5">
                {[
            {
                icon: MapPin,
                title: 'Our Office',
                body: (<p className="text-gray-600">
                        123, SG Highway, Satellite,
                        <br />
                        Ahmedabad, Gujarat 380015
                      </p>),
            },
            {
                icon: Phone,
                title: 'Phone & WhatsApp',
                body: (<div className="space-y-1">
                        <a href="tel:+919876543210" className="block text-gray-600 hover:text-brand-green">
                          +91 98765 43210
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block text-brand-green font-semibold hover:underline">
                          Chat on WhatsApp
                        </a>
                      </div>),
            },
            {
                icon: Mail,
                title: 'Email',
                body: (<a href="mailto:info@ahmedabadpest.com" className="text-gray-600 hover:text-brand-green">
                        info@ahmedabadpest.com
                      </a>),
            },
            {
                icon: Clock,
                title: 'Business Hours',
                body: (<p className="text-gray-600">
                        Mon – Sat: 8:00 AM – 8:00 PM
                        <br />
                        Sun: 9:00 AM – 2:00 PM
                      </p>),
            },
        ].map((item) => (<div key={item.title} className="flex gap-4 border border-brand-dark/8 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-green/10 text-brand-green">
                      <item.icon size={20}/>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-dark mb-1">{item.title}</h4>
                      {item.body}
                    </div>
                  </div>))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="border border-brand-dark/8 bg-white p-6 md:p-8 shadow-[0_24px_60px_-40px_rgba(12,22,16,0.35)]">
                <h3 className="font-display text-2xl font-bold text-brand-dark mb-2">
                  Request a Free Quote
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Fill the form and we’ll open WhatsApp with your inquiry ready to send.
                </p>
                <InquiryForm variant="full"/>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <AreasMarquee />

      <section className="h-[380px] w-full bg-gray-200">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d117506.11434914105!2d72.482012!3d23.0201818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ahmedabad Pest Control Location"/>
      </section>
    </>);
};

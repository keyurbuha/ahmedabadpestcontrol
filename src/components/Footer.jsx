import { useSiteContent } from "../content/SiteContent";
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
const InstagramIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>;
};
const YouTubeIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>;
};
export const Footer = () => {
  const {
    contentText,
    services,
    BUSINESS_PHONE,
    BUSINESS_PHONE_DISPLAY,
    BUSINESS_EMAIL,
    BUSINESS_ADDRESS_LINE,
    SOCIAL_LINKS,
    LOGO_IMAGE
  } = useSiteContent();
  return <footer className="bg-brand-dark text-white pt-12 pb-24 sm:pt-16 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div>
            <Link href="/" className="inline-block mb-5 sm:mb-6">
              <img src={LOGO_IMAGE} alt={contentText("Footer", "field1")} className="h-14 sm:h-16 md:h-20 w-auto max-w-full object-contain" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{contentText("Footer", "field2")}</p>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors" aria-label={contentText("Footer", "field3")}>
                <InstagramIcon />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors" aria-label={contentText("Footer", "field4")}>
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">{contentText("Footer", "field5")}<span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green" />
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-brand-green transition-colors">{contentText("Footer", "field6")}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-green transition-colors">{contentText("Footer", "field7")}</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-green transition-colors">{contentText("Footer", "field8")}</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-brand-green transition-colors">{contentText("Footer", "field9")}</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-green transition-colors">{contentText("Footer", "field10")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition-colors">{contentText("Footer", "field11")}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">{contentText("Footer", "field12")}<span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green" />
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {services.slice(0, 6).map(service => <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="hover:text-brand-green transition-colors">
                    {service.title}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">{contentText("Footer", "field13")}<span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-brand-green" />
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="text-brand-green shrink-0" size={20} />
                <span>{contentText("Footer", "field14")}{BUSINESS_ADDRESS_LINE}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-brand-green shrink-0" size={20} />
                <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-white transition-colors">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-brand-green shrink-0" size={20} />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
                  {BUSINESS_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}{contentText("Footer", "field15")}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">{contentText("Footer", "field16")}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{contentText("Footer", "field17")}</Link>
          </div>
        </div>
      </div>
    </footer>;
};

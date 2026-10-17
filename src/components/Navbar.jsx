import { useSiteContent } from "../content/SiteContent";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocation } from '../lib/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const Navbar = () => {
  const {
    contentText,
    SITE_NAME,
    BUSINESS_PHONE,
    BUSINESS_PHONE_DISPLAY,
    LOGO_IMAGE
  } = useSiteContent();
  const navLinks = [
    { name: contentText('Navbar', 'homeLabel'), path: '/' },
    { name: contentText('Navbar', 'aboutLabel'), path: '/about' },
    { name: contentText('Navbar', 'servicesLabel'), path: '/services' },
    { name: contentText('Navbar', 'blogLabel'), path: '/blog' },
    { name: contentText('Navbar', 'testimonialsLabel'), path: '/testimonials' },
    { name: contentText('Navbar', 'faqLabel'), path: '/faq' },
    { name: contentText('Navbar', 'contactLabel'), path: '/contact' },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    router.events.on('routeChangeStart', closeMenu);
    return () => router.events.off('routeChangeStart', closeMenu);
  }, [router.events]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-3 min-h-[64px]">
        <Link href="/" className="flex items-center z-50 min-w-0 shrink">
          <img src={LOGO_IMAGE} alt={SITE_NAME} className="h-11 w-auto max-w-[170px] object-contain object-left sm:h-14 sm:max-w-[210px] md:h-16 md:max-w-none" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(link => <Link key={link.name} href={link.path} className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-brand-green ${location.pathname === link.path ? 'text-brand-green font-semibold' : 'text-brand-dark'}`}>
              {link.name}
            </Link>)}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 z-50 shrink-0">
          <a href={`tel:${BUSINESS_PHONE}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green md:hidden" aria-label={contentText('Navbar', 'callAriaLabel')}>
            <Phone size={18} />
          </a>

          <div className="hidden md:flex items-center gap-2 mr-1 lg:mr-3">
            <div className="bg-brand-green/10 p-2 rounded-full text-brand-green">
              <Phone size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">{contentText('Navbar', 'callLabel')}</span>
              <a href={`tel:${BUSINESS_PHONE}`} className="font-bold text-brand-dark text-sm">
                {BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <Link href="/contact" className="hidden md:inline-flex bg-brand-green hover:bg-brand-green-light text-white px-4 lg:px-5 py-2.5 rounded-md font-semibold text-sm transition-colors">
            {contentText('Navbar', 'quoteLabel')}
          </Link>

          <button type="button" className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-brand-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={contentText('Navbar', 'menuAriaLabel')} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -12
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -12
      }} className="absolute top-full left-0 w-full max-h-[calc(100dvh-64px)] overflow-y-auto bg-white shadow-xl border-t border-gray-100 flex flex-col lg:hidden">
            {navLinks.map(link => <Link key={link.name} href={link.path} className={`px-5 py-3.5 font-medium border-b border-gray-50 text-base ${location.pathname === link.path ? 'text-brand-green bg-gray-50' : 'text-brand-dark'}`}>
                {link.name}
              </Link>)}
            <div className="px-5 pt-5 pb-6">
              <a href={`tel:${BUSINESS_PHONE}`} className="flex items-center gap-3 text-brand-dark font-bold mb-4">
                <Phone className="text-brand-green" size={20} />
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <Link href="/contact" className="flex justify-center w-full bg-brand-green text-white px-4 py-3.5 rounded-md font-semibold">
                {contentText('Navbar', 'quoteLabel')}
              </Link>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
};

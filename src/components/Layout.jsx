import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { JsonLd } from './JsonLd';
import {
  getLocalBusinessSchema,
  getWebsiteSchema,
  getOrganizationSchema,
} from '../data/structuredData';

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

function scrollToTop() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = previous;
  });
}

export const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    scrollToTop();
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <JsonLd
        data={[
          getLocalBusinessSchema(),
          getWebsiteSchema(),
          getOrganizationSchema(),
        ]}
      />
      <Navbar />
      <main className="flex-grow pt-[72px] sm:pt-[80px] md:pt-[88px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            className="overflow-x-clip"
            onAnimationComplete={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

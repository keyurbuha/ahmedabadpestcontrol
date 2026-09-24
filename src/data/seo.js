export const SITE_NAME = 'Ahmedabad Pest Control';
export const SITE_URL = 'https://ahemdabadpestcontrol.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

/** E.164 for tel: links and schema */
export const BUSINESS_PHONE = '+917984636472';
/** Digits only for wa.me */
export const WHATSAPP_NUMBER = '917984636472';
export const BUSINESS_PHONE_DISPLAY = '+91 79846 36472';
export const BUSINESS_EMAIL = 'info@ahmedabadpest.com';

export const BUSINESS_AREAS = [
  'Makarba',
  'Vasna',
  'Vejalpur',
  'Paldi',
  'Satellite',
  'Bopal',
  'Vastral',
  'Shilaj',
  'Shela',
];

export const BUSINESS_ADDRESS_LINE = `${BUSINESS_AREAS.join(', ')}, Ahmedabad`;

export const BUSINESS_ADDRESS = {
  street: BUSINESS_AREAS.join(', '),
  locality: 'Ahmedabad',
  region: 'Gujarat',
  postalCode: '',
  country: 'IN',
};

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@ahmedabad_pest_control',
  instagram: 'https://www.instagram.com/ahmedabad_pest.control',
};

export const pageSeo = {
  home: {
    title: 'Pest Control in Ahmedabad | Free Inspection & Same-Day Service',
    description:
      'Trusted pest control in Ahmedabad for termites, cockroaches, rodents, mosquitoes & bed bugs. Family-safe treatments across Makarba, Vasna, Vejalpur, Paldi, Satellite, Bopal, Vastral, Shilaj & Shela. Free inspection.',
    keywords:
      'pest control in Ahmedabad, Ahmedabad pest control, termite control Ahmedabad, cockroach control Ahmedabad, mosquito fogging Ahmedabad, best pest control Ahmedabad',
    path: '/',
  },
  about: {
    title: 'About Us | Pest Control Company in Ahmedabad Since 2008',
    description:
      'Learn about Ahmedabad Pest Control — 15+ years protecting homes and businesses across Ahmedabad with safe, certified pest management and warranty-backed treatments.',
    keywords:
      'pest control company Ahmedabad, about Ahmedabad Pest Control, trusted pest control Ahmedabad, professional pest management Gujarat',
    path: '/about',
  },
  services: {
    title: 'Pest Control Services in Ahmedabad | Termite, Cockroach & More',
    description:
      'Professional pest control services in Ahmedabad for termites, cockroaches, rodents, mosquitoes, bed bugs & lizards. Serving Makarba, Vasna, Satellite, Bopal, Shela & nearby areas. Free inspection.',
    keywords:
      'pest control services Ahmedabad, termite treatment Ahmedabad, cockroach gel treatment Ahmedabad, rodent control Ahmedabad, bed bug treatment Ahmedabad',
    path: '/services',
  },
  blog: {
    title: 'Pest Control Blog Ahmedabad | Tips for Homes & Societies',
    description:
      'Expert pest control tips for Ahmedabad homes — termite warning signs, monsoon mosquito prevention, and when to call professionals. Practical guides from local experts.',
    keywords:
      'pest control tips Ahmedabad, termite signs Ahmedabad, mosquito prevention monsoon Ahmedabad, home pest guide Gujarat',
    path: '/blog',
  },
  testimonials: {
    title: 'Customer Reviews | Pest Control in Ahmedabad',
    description:
      'Read real customer testimonials for Ahmedabad Pest Control from Makarba, Vasna, Satellite, Bopal, Shela and more. See why families trust our local pest treatments.',
    keywords:
      'pest control reviews Ahmedabad, Ahmedabad Pest Control testimonials, best pest control ratings Ahmedabad',
    path: '/testimonials',
  },
  faq: {
    title: 'Pest Control FAQs Ahmedabad | Safety, Pricing & Process',
    description:
      'Answers to common pest control questions in Ahmedabad — chemical safety for kids & pets, treatment time, warranty, and how soon we can inspect your home.',
    keywords:
      'pest control FAQ Ahmedabad, is pest control safe for pets, pest control warranty Ahmedabad, pest control cost Ahmedabad',
    path: '/faq',
  },
  contact: {
    title: 'Contact Pest Control in Ahmedabad | Free Quote on WhatsApp',
    description: `Contact Ahmedabad Pest Control for free inspection and WhatsApp quotes. Call ${BUSINESS_PHONE_DISPLAY}. Serving Makarba, Vasna, Vejalpur, Paldi, Satellite, Bopal, Vastral, Shilaj & Shela.`,
    keywords:
      'contact pest control Ahmedabad, pest control near me Ahmedabad, free pest inspection Ahmedabad, WhatsApp pest control quote',
    path: '/contact',
  },
};

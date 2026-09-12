import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
} from './seo';
import { services, serviceAreas } from './services';
import { faqs } from './faqs';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/PestControlService',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: 'Ahmedabad Pest Control Services',
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    image: DEFAULT_OG_IMAGE,
    description:
      'Professional pest control in Ahmedabad for termites, cockroaches, rodents, mosquitoes, bed bugs and lizards. Family-safe treatments for homes, societies and commercial spaces.',
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Card',
    areaServed: [
      {
        '@type': 'City',
        name: 'Ahmedabad',
        containedInPlace: {
          '@type': 'State',
          name: 'Gujarat',
        },
      },
      ...serviceAreas.map((area) => ({
        '@type': 'Place',
        name: `${area}, Ahmedabad`,
      })),
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.0225,
      longitude: 72.5714,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pest Control Services in Ahmedabad',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.h1,
          description: service.metaDescription,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Ahmedabad, Gujarat',
        },
      })),
    },
    knowsAbout: [
      'Termite control in Ahmedabad',
      'Cockroach control in Ahmedabad',
      'Rodent control in Ahmedabad',
      'Mosquito fogging in Ahmedabad',
      'Bed bug treatment in Ahmedabad',
      'Lizard control in Ahmedabad',
      'Residential pest control',
      'Commercial pest control',
      'Society mosquito management',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Ahmedabad Pest Control offers professional pest management services across Ahmedabad with free inspection and WhatsApp quotes.',
    publisher: { '@id': `${SITE_URL}/#business` },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Gujarati'],
      },
    ],
  };
}

export function getFaqSchema(faqList = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a,
      },
    })),
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

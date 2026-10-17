import { createContext, useContext, useMemo } from 'react';
import { Bug, ShieldCheck, BugOff, Skull, Zap, Home } from 'lucide-react';
import { buildSchemas } from '../data/structuredData';

const SiteContext = createContext(null);
const icons = { Bug, ShieldCheck, BugOff, Skull, Zap, Home };

export function SiteContentProvider({ content, children }) {
  const value = useMemo(() => content ? ({
    ...content.site,
    pageSeo: Object.fromEntries(Object.entries(content.seo).map(([key, page]) => [key, { ...page, description: page.description.replaceAll('{phone}', content.site.BUSINESS_PHONE_DISPLAY) }])),
    services: content.services.map(service => ({ ...service, icon: icons[service.icon] || Bug })),
    blogs: content.blogs,
    faqs: content.faqs,
    testimonials: content.testimonials,
    youtubeVideos: content.videos,
    YOUTUBE_CHANNEL_URL: content.site.SOCIAL_LINKS.youtube,
    ...buildSchemas(content),
    contentText: (group, field) => content.text[group]?.[field] ?? '',
  }) : null, [content]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(SiteContext);
  if (!content) throw new Error('Site content must be used within SiteContentProvider.');
  return content;
}

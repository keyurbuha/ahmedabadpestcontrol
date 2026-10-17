import Head from 'next/head';
import { useSiteContent } from '../content/SiteContent';
export function Seo({
  title,
  description,
  keywords,
  path = '/',
  type = 'website',
  image,
  noindex = false,
  canonical
}) {
  const {
    SITE_NAME,
    SITE_URL,
    DEFAULT_OG_IMAGE
  } = useSiteContent();
  const url = canonical || `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const imageUrl = image || DEFAULT_OG_IMAGE;
  const absoluteImage = imageUrl.startsWith('/') ? `${SITE_URL}${imageUrl}` : imageUrl;
  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} key="description" />
    {keywords && <meta name="keywords" content={keywords} key="keywords" />}
    <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} key="robots" />
    <meta name="author" content={SITE_NAME} />
    <meta name="geo.region" content="IN-GJ" /><meta name="geo.placename" content="Ahmedabad" />
    <link rel="canonical" href={url} key="canonical" />
    <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="llms.txt" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:type" content={type} /><meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={title} key="og:title" />
    <meta property="og:description" content={description} key="og:description" />
    <meta property="og:url" content={url} key="og:url" />
    <meta property="og:image" content={absoluteImage} key="og:image" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} key="twitter:title" />
    <meta name="twitter:description" content={description} key="twitter:description" />
    <meta name="twitter:image" content={absoluteImage} key="twitter:image" />
  </Head>;
}

import Head from 'next/head';
export function JsonLd({
  data
}) {
  const items = Array.isArray(data) ? data : [data];
  return <Head>{items.filter(Boolean).map((item, i) => <script key={`schema-${item['@type'] || 'item'}-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(item).replace(/</g, '\\u003c')
    }} />)}</Head>;
}

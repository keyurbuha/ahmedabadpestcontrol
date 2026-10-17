import Head from 'next/head';
import { SiteContentProvider } from '../src/content/SiteContent';
import '../src/index.css';
import '../src/admin/admin.css';

export default function Application({ Component, pageProps }) {
  return <SiteContentProvider content={pageProps.content}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="icon" href="/logo.png" />
    </Head>
    <Component {...pageProps} />
  </SiteContentProvider>;
}

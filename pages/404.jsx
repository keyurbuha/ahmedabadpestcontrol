import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
    <Head><title>Page not found | Ahmedabad Pest Control</title><meta name="robots" content="noindex" /></Head>
    <h1 className="text-4xl font-bold">Page not found</h1>
    <p>The page you requested could not be found.</p>
    <Link href="/" className="text-brand-green underline">Return to the home page</Link>
  </main>;
}

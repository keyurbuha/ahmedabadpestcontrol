import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Camera, CircleHelp, FileText, Gauge, Images, Inbox, LogOut, MessageSquareQuote, Newspaper, Settings, ShieldCheck, ExternalLink } from 'lucide-react';

export async function request(url, options = {}) {
  const headers = { ...options.headers };
  if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] ||= 'application/json';
  const response = await fetch(url, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401 && !url.endsWith('/login')) window.location.assign('/admin/login');
  if (!response.ok) throw new Error(data.error || 'Unable to complete the request.');
  return data;
}

export function AdminShell({ title, description, email, children }) {
  const router = useRouter();
  const [error, setError] = useState('');
  async function logout() {
    try { await request('/api/admin/logout', { method: 'POST' }); await router.replace('/admin/login'); }
    catch (error) { setError(error.message); }
  }
  const links = [
    ['/admin', 'Dashboard', Gauge], ['/admin/content', 'Website content', FileText],
    ['/admin/services', 'Services', ShieldCheck], ['/admin/blogs', 'Blog articles', Newspaper],
    ['/admin/faqs', 'FAQs', CircleHelp], ['/admin/reviews', 'Reviews', MessageSquareQuote],
    ['/admin/youtube', 'YouTube videos', Camera], ['/admin/inquiries', 'Inquiries', Inbox],
    ['/admin/media', 'Image library', Images], ['/admin/settings', 'Account', Settings],
  ];
  return <div className="admin-app">
    <Head><title>{title} | Website admin</title><meta name="robots" content="noindex, nofollow" key="robots" /></Head>
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand"><ShieldCheck size={30} /><span>Ahmedabad<span>Pest Control · Admin</span></span></Link>
      <nav aria-label="Admin navigation">{links.map(([href, text, Icon]) => <Link key={href} href={href} className={(href === '/admin' ? router.asPath === href : router.asPath.startsWith(href)) ? 'active' : ''}><Icon size={18} />{text}</Link>)}</nav>
      <div className="admin-sidebar-bottom"><a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink size={17} />View website</a><span className="admin-email">{email}</span><button onClick={logout}><LogOut size={17} />Sign out</button></div>
    </aside>
    <main className="admin-main">
      <header className="admin-heading"><h1>{title}</h1><p>{description}</p></header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {children}
    </main>
  </div>;
}

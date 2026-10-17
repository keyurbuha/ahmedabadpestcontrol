import Link from 'next/link';
import { ArrowRight, Camera, CircleHelp, Images, Inbox, MessageSquareQuote, Newspaper, ShieldCheck } from 'lucide-react';
import { AdminShell } from '../../src/admin/AdminShell';
import { requireAdminPage } from '../../src/server/admin-page';
import { readContent } from '../../src/server/content';
import { db } from '../../src/server/db';

const cards = [
  ['services', 'Services', '/admin/services', ShieldCheck], ['blogs', 'Blog articles', '/admin/blogs', Newspaper],
  ['faqs', 'FAQs', '/admin/faqs', CircleHelp], ['testimonials', 'Reviews', '/admin/reviews', MessageSquareQuote],
  ['videos', 'YouTube videos', '/admin/youtube', Camera], ['media', 'Uploaded images', '/admin/media', Images],
];

export default function Dashboard({ email, counts, recentInquiries }) {
  return <AdminShell title="Dashboard" description="Manage your website content and follow up with new customer inquiries." email={email}>
    <section className="admin-dashboard-grid" aria-label="Website overview">{cards.map(([key, label, href, Icon]) => <Link href={href} key={key} className="admin-stat-card"><span><Icon size={20} /></span><strong>{counts[key]}</strong><p>{label}</p><ArrowRight size={17} /></Link>)}</section>
    <section className="admin-dashboard-panel"><div className="admin-row admin-between"><div><p className="admin-kicker">Latest leads</p><h2>Recent inquiries</h2></div><Link href="/admin/inquiries" className="admin-secondary">View all <ArrowRight size={16} /></Link></div>
      {!recentInquiries.length ? <div className="admin-dashboard-empty"><Inbox size={26} /><p>No inquiries have arrived yet.</p></div> : <div className="admin-dashboard-inquiries">{recentInquiries.map(item => <article key={item.id}><div><strong>{item.name}</strong><p>{item.service} · {item.phone}</p></div><div><span className={`admin-status admin-status-${item.status}`}>{item.status}</span><time>{new Date(item.createdAt).toLocaleDateString('en-IN')}</time></div></article>)}</div>}
    </section>
  </AdminShell>;
}

export async function getServerSideProps(context) {
  const auth = await requireAdminPage(context); if (auth.redirect) return auth;
  const database = await db(); const snapshot = await readContent();
  const [media, inquiries] = await Promise.all([database.collection('media').countDocuments(), database.collection('inquiries').find({}).sort({ createdAt: -1 }).limit(5).toArray()]);
  return { props: { ...auth.props, counts: { services: snapshot.content.services.length, blogs: snapshot.content.blogs.length, faqs: snapshot.content.faqs.length, testimonials: snapshot.content.testimonials.length, videos: snapshot.content.videos.length, media }, recentInquiries: inquiries.map(({ _id, ...item }) => ({ id: String(_id), ...item })) } };
}

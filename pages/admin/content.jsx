import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Save, Check, Search } from 'lucide-react';
import { AdminShell, request } from '../../src/admin/AdminShell';
import { ContentFields } from '../../src/admin/ContentFields';
import { requireAdminPage } from '../../src/server/admin-page';
import { readContent } from '../../src/server/content';

const pages = ['Home', 'About', 'Services', 'ServiceDetail', 'Blog', 'BlogPost', 'Testimonials', 'FAQ', 'Contact'];
const names = { Home: 'Home', About: 'About us', ServiceDetail: 'Service detail pages', BlogPost: 'Blog articles', FAQ: 'Frequently asked questions', Footer: 'Footer', Navbar: 'Header', PageCta: 'Shared call to action', InquiryForm: 'Inquiry form' };

export default function Editor({ email, initialSnapshot }) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [saved, setSaved] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [section, setSection] = useState('site');
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);
  async function load() {
    setError('');
    try { setSnapshot(await request('/api/admin/content')); setDirty(false); }
    catch (error) { setError(error.message); }
  }
  useEffect(() => {
    if (!dirty) return;
    const leave = event => { event.preventDefault(); event.returnValue = ''; };
    const route = () => { if (!window.confirm('Leave without saving your changes?')) { router.events.emit('routeChangeError'); throw new Error('Navigation cancelled'); } };
    window.addEventListener('beforeunload', leave); router.events.on('routeChangeStart', route);
    return () => { window.removeEventListener('beforeunload', leave); router.events.off('routeChangeStart', route); };
  }, [dirty, router.events]);
  function change(path, value) {
    setSnapshot(current => {
      const next = structuredClone(current); let target = next.content;
      for (const key of path.slice(0, -1)) target = target[key];
      target[path.at(-1)] = value;
      if (path.join('.') === 'site.BUSINESS_PHONE') {
        const site = next.content.site;
        const previousPhone = current.content.site.BUSINESS_PHONE;
        if (site.WHATSAPP_NUMBER === previousPhone.replace(/^\+/, '')) site.WHATSAPP_NUMBER = value.replace(/^\+/, '');
        if (/^\+91\d{10}$/.test(value)) site.BUSINESS_PHONE_DISPLAY = `+91 ${value.slice(3, 8)} ${value.slice(8)}`;
        else site.BUSINESS_PHONE_DISPLAY = value;
      }
      return next;
    });
    setDirty(true); setSaved('');
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const result = await request('/api/admin/content', { method: 'PUT', body: JSON.stringify({ content: snapshot.content, version: snapshot.version }) });
      setSnapshot(current => ({ ...current, ...result })); setDirty(false); setSaved('Changes saved. Your website is updated.');
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  const content = snapshot?.content;
  const groups = content ? [
    { label: 'Business', items: [['site', 'Contact & business details']] },
    { label: 'Page content', items: pages.map(name => [`text.${name}`, names[name] || name]) },
    { label: 'Search & sharing', items: [['seo', 'Page SEO settings']] },
    { label: 'Shared content', items: Object.keys(content.text).filter(name => !pages.includes(name) && Object.keys(content.text[name]).length).map(name => [`text.${name}`, names[name] || name.replace(/([a-z])([A-Z])/g, '$1 $2')]) },
  ] : [];
  const activePath = section.split('.');
  const activeValue = activePath.reduce((value, key) => value?.[key], content);
  const activeLabel = groups.flatMap(g => g.items).find(([key]) => key === section)?.[1];
  return <AdminShell title="Website content" description="Edit the content of your existing website. Save changes to publish them." email={email}>
    {!content ? <div className="admin-empty">{error ? <><p role="alert">{error}</p><button className="admin-secondary" onClick={load}>Try again</button></> : <p>Loading website content…</p>}</div> : <form onSubmit={save}>
      <div className="admin-savebar"><span className={dirty ? 'admin-unsaved' : 'admin-muted'}>{dirty ? 'You have unsaved changes' : 'All changes saved'}</span><div className="admin-row"><button type="button" className="admin-secondary" disabled={busy} onClick={() => { if (!dirty || window.confirm('Discard unsaved changes and reload?')) load(); }}>Reload content</button><button className="admin-primary" disabled={busy || !dirty}><Save size={17} />{busy ? 'Saving…' : 'Save changes'}</button></div></div>
      {saved && <p className="admin-success" role="status"><Check size={17} />{saved}</p>}
      {error && <p className="admin-error" role="alert">{error}</p>}
      <div className="admin-mobile-sections"><label htmlFor="content-section-select">Content section</label><select id="content-section-select" value={section} onChange={e => setSection(e.target.value)}>{groups.map(group => <optgroup key={group.label} label={group.label}>{group.items.map(([key, name]) => <option key={key} value={key}>{name}</option>)}</optgroup>)}</select></div>
      <div className="admin-editor"><aside className="admin-sections"><label className="admin-section-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a section" aria-label="Find a content section" /></label>
        {groups.map(group => <div key={group.label}><h2>{group.label}</h2>{group.items.filter(([, name]) => name.toLowerCase().includes(search.toLowerCase())).map(([key, name]) => <button type="button" key={key} className={key === section ? 'selected' : ''} onClick={() => setSection(key)}>{name}</button>)}</div>)}
      </aside><section className="admin-editor-panel"><h2>{activeLabel}</h2><p className="admin-muted">{section === 'seo' ? 'Update search titles, descriptions, keywords, canonical URLs and sharing images for each page. Service and article SEO is also available inside its collection.' : 'The page layout and navigation stay fixed. Expand a group to edit its existing content.'}</p>
        <fieldset disabled={busy} className="admin-edit-fieldset"><ContentFields value={activeValue} path={activePath} onChange={change} /></fieldset>
      </section></div>
    </form>}
  </AdminShell>;
}
export async function getServerSideProps(context) {
  const result = await requireAdminPage(context);
  if (result.redirect) return result;
  return { props: { ...result.props, initialSnapshot: await readContent() } };
}

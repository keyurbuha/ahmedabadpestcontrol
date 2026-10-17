import { useCallback, useEffect, useState } from 'react';
import { Inbox, RefreshCw } from 'lucide-react';
import { AdminShell, request } from '../../src/admin/AdminShell';
import { requireAdminPage } from '../../src/server/admin-page';

export default function Inquiries({ email }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);
  const load = useCallback(async (signal) => {
    try {
      const result = await request(`/api/admin/inquiries?${new URLSearchParams({ page, search: query, status })}`, { signal });
      if (!signal?.aborted) { setData(result); setError(''); }
    }
    catch (error) { if (!signal?.aborted) setError(error.message); }
    finally { if (!signal?.aborted) setBusy(false); }
  }, [page, query, status]);
  useEffect(() => {
    const controller = new AbortController();
    // The effect fetches external data; state updates happen after the request completes.
    // oxlint-disable-next-line react/set-state-in-effect
    load(controller.signal);
    return () => controller.abort();
  }, [load]);
  async function update(id, value) {
    setError(''); setBusy(true);
    try { await request('/api/admin/inquiries', { method: 'PATCH', body: JSON.stringify({ id, status: value }) }); await load(); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <AdminShell title="Inquiries" description="Follow up on inquiries submitted through your website." email={email}>
    <div className="admin-toolbar"><form className="admin-row" onSubmit={e => { e.preventDefault(); setPage(1); setQuery(search); }}><input aria-label="Search inquiries" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone or service" /><button className="admin-secondary">Search</button></form>
      <div className="admin-row"><select aria-label="Filter inquiry status" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}><option value="">All statuses</option><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select><button className="admin-secondary" onClick={() => { setBusy(true); load(); }} disabled={busy}><RefreshCw size={16} />Refresh</button></div>
    </div>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {data && <p className="admin-muted admin-count">{data.total} matching inquiries · {data.unread} new</p>}
    {!data || !data.items.length ? <div className="admin-empty"><Inbox size={34} /><h2>{busy ? 'Loading inquiries…' : 'No inquiries to show'}</h2><p>{query || status ? 'Try another search or status.' : 'New website inquiries will appear here when visitors submit a form.'}</p></div> : <div className="admin-inquiries" aria-busy={busy}>
      {data.items.map(item => <article className="admin-inquiry" key={item.id}>
        <div className="admin-row admin-between"><div><h2>{item.name}</h2><p className="admin-muted">{new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p></div><span className={`admin-status admin-status-${item.status}`}>{item.status}</span></div>
        <dl><div><dt>Phone</dt><dd><a href={`tel:+91${item.phone}`}>{item.phone}</a></dd></div><div><dt>Service</dt><dd>{item.service}</dd></div><div><dt>Address / locality</dt><dd>{item.address || 'Not provided'}</dd></div><div><dt>Email</dt><dd>{item.email ? <a href={`mailto:${item.email}`}>{item.email}</a> : 'Not provided'}</dd></div></dl>
        {item.message && <p className="admin-inquiry-message">{item.message}</p>}
        <div className="admin-row admin-between"><span className="admin-muted">Submitted from {item.page || '/'}</span><label className="admin-row">Status<select aria-label={`Status for ${item.name}`} value={item.status} disabled={busy} onChange={e => update(item.id, e.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></label></div>
      </article>)}
    </div>}
    {data?.total > 20 && <div className="admin-pagination"><button className="admin-secondary" disabled={busy || page === 1} onClick={() => setPage(p => p - 1)}>Previous</button><span>Page {page} of {Math.ceil(data.total / 20)}</span><button className="admin-secondary" disabled={busy || page * 20 >= data.total} onClick={() => setPage(p => p + 1)}>Next</button></div>}
  </AdminShell>;
}
export const getServerSideProps = requireAdminPage;

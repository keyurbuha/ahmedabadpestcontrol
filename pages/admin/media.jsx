import { useEffect, useState } from 'react';
import { AdminShell, request } from '../../src/admin/AdminShell';
import { ImageInput } from '../../src/admin/ContentFields';
import { requireAdminPage } from '../../src/server/admin-page';

export default function Media({ email }) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    request('/api/admin/media').then(data => setItems(data.items)).catch(error => setError(error.message));
  }, [value]);
  async function copy(url) {
    try { await navigator.clipboard.writeText(url); setNotice('Image URL copied. Paste it into an image field in Website content.'); }
    catch { setNotice(`Image URL: ${url}`); }
  }
  return <AdminShell title="Image library" description="Upload images here or choose an image directly in the content editor." email={email}>
    <div className="admin-panel"><label htmlFor="library-image">Upload or choose an image</label><ImageInput id="library-image" value={value} onChange={setValue} libraryOnly /></div>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {notice && <p className="admin-success" role="status">{notice}</p>}
    <div className="admin-image-grid admin-media-grid">{items.map(item => <article key={item.id}><img src={item.url} alt={item.filename} loading="lazy" /><div><strong>{item.filename}</strong><p>{Math.round(item.size / 1024)} KB</p><button className="admin-secondary" onClick={() => copy(item.url)}>Copy image URL</button></div></article>)}</div>
    {!items.length && <div className="admin-empty"><p>Your uploaded images will appear here. Choose an image above to get started.</p></div>}
  </AdminShell>;
}
export const getServerSideProps = requireAdminPage;

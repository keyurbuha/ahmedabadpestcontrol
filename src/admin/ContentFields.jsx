import { useId, useState } from 'react';
import catalog from '../content/field-catalog.json';
import { request } from './AdminShell';

const labels = {
  SITE_NAME: 'Business name', SITE_URL: 'Website URL', DEFAULT_OG_IMAGE: 'Default social sharing image',
  BUSINESS_PHONE: 'Phone number (with +country code)', WHATSAPP_NUMBER: 'WhatsApp number (country code and digits)',
  BUSINESS_PHONE_DISPLAY: 'Phone number shown on website', BUSINESS_EMAIL: 'Business email',
  BUSINESS_AREAS: 'Main service areas', BUSINESS_ADDRESS_LINE: 'Address shown on website',
  BUSINESS_ADDRESS: 'Business address for search engines', SOCIAL_LINKS: 'Social profiles', LOGO_IMAGE: 'Website logo',
  MAP_EMBED_URL: 'Google Maps embed URL', serviceAreas: 'All service areas',
  metaTitle: 'SEO title', metaDescription: 'SEO description', metaKeywords: 'SEO keywords',
  image: 'Image', ogImage: 'Social sharing image', canonical: 'Canonical URL (optional)', noindex: 'Hide from search engines',
  h1: 'Main heading', intro: 'Introduction paragraphs', content: 'Article paragraphs',
};

function labelFor(key) { return labels[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, s => s.toUpperCase()); }
function imageField(path) {
  const key = path.at(-1);
  return ['image', 'ogImage', 'DEFAULT_OG_IMAGE', 'LOGO_IMAGE'].includes(key) || path[0] === 'text' && catalog[path[1]]?.[key]?.kind === 'image';
}
function lockedField(path) {
  return ['slug', 'path', 'icon'].includes(path.at(-1)) || path.at(-1) === 'id' && path[0] !== 'videos';
}

export function ImageInput({ id, value, onChange, libraryOnly = false }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [library, setLibrary] = useState(null);
  async function upload(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setError('');
    if (file.size > 5 * 1024 * 1024) { setError('Choose an image smaller than 5 MB.'); return; }
    setBusy(true);
    try {
      const form = new FormData(); form.append('image', file);
      const item = await request('/api/admin/media', { method: 'POST', body: form });
      onChange(item.url);
    } catch (error) { setError(error.message || 'Unable to upload image.'); }
    finally { setBusy(false); input.value = ''; }
  }
  async function openLibrary() {
    try { setLibrary((await request('/api/admin/media')).items); }
    catch (error) { setError(error.message); }
  }
  return <div className="admin-image-input">
    {value && <img src={value} alt="Current image preview" loading="lazy" />}
    <div><input id={id} value={value} onChange={e => onChange(e.target.value)} placeholder="Image URL or choose an upload" />
      <div className="admin-image-actions"><label className="admin-secondary">{busy ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={upload} /></label><button className="admin-secondary" type="button" onClick={openLibrary}>Choose from library</button></div>
      <small>JPG, PNG, WebP or AVIF · Maximum 5 MB. {libraryOnly ? 'Choose the uploaded image in Website content to publish it.' : 'Save changes to publish your selection.'}</small>
      {error && <p className="admin-error" role="alert">{error}</p>}
    </div>
    {library && <div className="admin-library-picker"><div className="admin-row"><strong>Choose an uploaded image</strong><button type="button" className="admin-secondary" onClick={() => setLibrary(null)}>Close</button></div>
      {!library.length && <p>No uploads yet. Upload an image using the button above.</p>}
      <div className="admin-image-grid">{library.map(item => <button type="button" key={item.id} onClick={() => { onChange(item.url); setLibrary(null); }}><img src={item.url} alt={item.filename} loading="lazy" /><span>{item.filename}</span></button>)}</div>
    </div>}
  </div>;
}

export function ContentFields({ value, path, onChange }) {
  const id = useId();
  if (lockedField(path)) return null;
  if (typeof value === 'object' && value !== null) {
    return <div className="admin-fields">{Object.entries(value).map(([key, child]) => {
      const childPath = [...path, key];
      if (lockedField(childPath)) return null;
      const nested = typeof child === 'object' && child !== null;
      const title = Array.isArray(value) ? child?.title || child?.name || child?.question || `Item ${Number(key) + 1}` : labelFor(key);
      return nested ? <details className="admin-field-group" key={key} open={path.length < 1}>
        <summary>{title}</summary><ContentFields value={child} path={childPath} onChange={onChange} />
      </details> : <ContentFields key={key} value={child} path={childPath} onChange={onChange} />;
    })}</div>;
  }
  const field = path[0] === 'text' ? catalog[path[1]]?.[path.at(-1)] : null;
  const label = field ? field.kind === 'image' ? `Image: ${field.label.split('/').at(-1)}` : field.label : labelFor(path.at(-1));
  const change = value => onChange(path, value);
  if (typeof value === 'boolean') return <label className="admin-checkbox"><input type="checkbox" checked={value} onChange={e => change(e.target.checked)} />{label}</label>;
  return <div className="admin-field"><label htmlFor={id}>{label}</label>
    {imageField(path) ? <ImageInput id={id} value={value} onChange={change} /> : typeof value === 'number' ? <input id={id} type="number" min="0" max="5" value={value} onChange={e => change(Number(e.target.value))} /> : value.length > 100 || /description|content|intro|review|answer|message/i.test(path.join('.')) ? <textarea id={id} rows={value.length > 300 ? 6 : 3} value={value} maxLength={20000} onChange={e => change(e.target.value)} /> : <input id={id} value={value} maxLength={20000} onChange={e => change(e.target.value)} />}
  </div>;
}

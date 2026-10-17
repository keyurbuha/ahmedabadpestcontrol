import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Edit3, ExternalLink, Plus, Search, Trash2, X } from 'lucide-react';
import { ImageInput } from './ContentFields';
import { request } from './AdminShell';
import { slugify } from './collections';

function ListField({ label, value, onChange }) {
  const items = value || [];
  return <div className="admin-field"><label>{label}</label><div className="admin-repeat-list">
    {items.map((item, index) => <div className="admin-row" key={index}><textarea rows="2" value={item} onChange={event => onChange(items.map((entry, itemIndex) => itemIndex === index ? event.target.value : entry))} /><button type="button" className="admin-icon-button admin-danger" aria-label={`Remove ${label} item ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={16} /></button></div>)}
    <button type="button" className="admin-secondary" onClick={() => onChange([...items, ''])}><Plus size={16} />Add item</button>
  </div></div>;
}

function FaqField({ value, onChange }) {
  const items = value || [];
  return <div className="admin-field"><label>Service FAQs</label><div className="admin-repeat-list">
    {items.map((item, index) => <div className="admin-nested-card" key={index}><div className="admin-row admin-between"><strong>FAQ {index + 1}</strong><button type="button" className="admin-icon-button admin-danger" aria-label={`Remove FAQ ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={16} /></button></div><input aria-label={`FAQ ${index + 1} question`} placeholder="Question" value={item.question} onChange={event => onChange(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, question: event.target.value } : entry))} /><textarea aria-label={`FAQ ${index + 1} answer`} rows="3" placeholder="Answer" value={item.answer} onChange={event => onChange(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, answer: event.target.value } : entry))} /></div>)}
    <button type="button" className="admin-secondary" onClick={() => onChange([...items, { question: '', answer: '' }])}><Plus size={16} />Add FAQ</button>
  </div></div>;
}

function ItemForm({ config, item, creating, busy, onChange, onClose, onSave }) {
  function set(name, value) {
    const next = { ...item, [name]: value };
    if (creating && name === 'title' && !item.slug) next.slug = slugify(value);
    onChange(next);
  }
  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="item-form-title">
    <header className="admin-row admin-between"><div><p className="admin-kicker">{creating ? 'Create' : 'Edit'} {config.singular}</p><h2 id="item-form-title">{creating ? `New ${config.singular}` : item[config.titleKey]}</h2></div><button type="button" className="admin-icon-button" aria-label="Close editor" onClick={onClose}><X size={20} /></button></header>
    <form onSubmit={onSave}><div className="admin-modal-body">
      {config.fields.map(([name, label, type, options]) => {
        const id = `collection-${name}`; const value = item[name];
        if (type === 'list') return <ListField key={name} label={label} value={value} onChange={next => set(name, next)} />;
        if (type === 'faqs') return <FaqField key={name} value={value} onChange={next => set(name, next)} />;
        if (type === 'image') return <div className="admin-field" key={name}><label htmlFor={id}>{label}</label><ImageInput id={id} value={value} onChange={next => set(name, next)} /></div>;
        if (type === 'checkbox') return <label className="admin-checkbox" key={name}><input type="checkbox" checked={value} onChange={event => set(name, event.target.checked)} />{label}</label>;
        return <div className="admin-field" key={name}><label htmlFor={id}>{label}</label>{type === 'textarea' ? <textarea id={id} rows="4" value={value} onChange={event => set(name, event.target.value)} /> : type === 'select' ? <select id={id} value={value} onChange={event => set(name, event.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select> : <input id={id} type={type === 'number' ? 'number' : type === 'url' ? 'url' : 'text'} min={type === 'number' ? 1 : undefined} max={type === 'number' ? 5 : undefined} value={value} onChange={event => set(name, type === 'number' ? Number(event.target.value) : event.target.value)} />}</div>;
      })}
    </div><footer className="admin-row admin-modal-actions"><button type="button" className="admin-secondary" onClick={onClose}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : `Save ${config.singular}`}</button></footer></form>
  </section></div>;
}

export function CollectionManager({ type, config, initialItems, initialVersion }) {
  const [items, setItems] = useState(initialItems); const [version, setVersion] = useState(initialVersion);
  const [query, setQuery] = useState(''); const [editing, setEditing] = useState(null); const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const visible = useMemo(() => items.filter(item => `${item[config.titleKey]} ${item[config.subtitleKey] || ''}`.toLowerCase().includes(query.toLowerCase())), [items, query, config]);
  async function reload() { const data = await request(`/api/admin/collections/${type}`); setItems(data.items); setVersion(data.version); }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const method = creating ? 'POST' : 'PATCH';
      const data = await request(`/api/admin/collections/${type}`, { method, body: JSON.stringify({ item: editing, id: editing.id, version }) });
      setItems(data.items); setVersion(data.version); setEditing(null); setNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} saved.`);
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  async function remove(item) {
    if (!window.confirm(`Delete “${item[config.titleKey]}”? This takes it off the website immediately.`)) return;
    setBusy(true); setError(''); setNotice('');
    try { const data = await request(`/api/admin/collections/${type}`, { method: 'DELETE', body: JSON.stringify({ id: item.id, version }) }); setItems(data.items); setVersion(data.version); setNotice(`${config.singular[0].toUpperCase()}${config.singular.slice(1)} deleted.`); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <>
    <div className="admin-toolbar"><label className="admin-collection-search"><Search size={17} /><input aria-label={`Search ${config.label}`} placeholder={`Search ${config.label.toLowerCase()}`} value={query} onChange={event => setQuery(event.target.value)} /></label><div className="admin-row"><button className="admin-secondary" type="button" onClick={() => reload().catch(error => setError(error.message))}>Reload</button><button className="admin-primary" type="button" onClick={() => { setCreating(true); setEditing(config.create()); setError(''); }}><Plus size={17} />Add {config.singular}</button></div></div>
    {notice && <p className="admin-success" role="status">{notice}</p>}{error && <p className="admin-error" role="alert">{error}</p>}
    <p className="admin-muted admin-count">{visible.length} of {items.length} {config.label.toLowerCase()}</p>
    {!visible.length ? <div className="admin-empty"><h2>No {config.label.toLowerCase()} found</h2><p>{query ? 'Try another search.' : `Add your first ${config.singular}.`}</p></div> : <div className="admin-collection-list">{visible.map(item => <article key={item.id}><div className="admin-collection-thumb">{item.image || item.thumbnail ? <img src={item.image || item.thumbnail} alt="" /> : <span>{String(item[config.titleKey] || '?').slice(0, 1).toUpperCase()}</span>}</div><div className="admin-collection-copy"><h2>{item[config.titleKey]}</h2><p>{item[config.subtitleKey]}</p>{item.slug && <code>/{item.slug}</code>}</div><div className="admin-row admin-card-actions">{config.publicBase && <Link href={`${config.publicBase}${item.slug}`} target="_blank" className="admin-icon-button" aria-label={`View ${item[config.titleKey]}`}><ExternalLink size={17} /></Link>}{type === 'videos' && <a href={item.url} target="_blank" rel="noopener noreferrer" className="admin-icon-button" aria-label={`View ${item.title}`}><ExternalLink size={17} /></a>}<button className="admin-icon-button" type="button" onClick={() => { setCreating(false); setEditing(structuredClone(item)); setError(''); }} aria-label={`Edit ${item[config.titleKey]}`}><Edit3 size={17} /></button><button className="admin-icon-button admin-danger" type="button" disabled={busy} onClick={() => remove(item)} aria-label={`Delete ${item[config.titleKey]}`}><Trash2 size={17} /></button></div></article>)}</div>}
    {editing && <ItemForm config={config} item={editing} creating={creating} busy={busy} onChange={setEditing} onClose={() => !busy && setEditing(null)} onSave={save} />}
  </>;
}

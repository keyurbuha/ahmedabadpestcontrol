import { randomUUID } from 'node:crypto';
import { api } from '../../../../src/server/http.js';
import { db } from '../../../../src/server/db.js';
import { collectionNames, readContent, validateCollectionItem } from '../../../../src/server/content.js';
export const config = { api: { bodyParser: { sizeLimit: '2mb' } } };
export default api(async (req, res) => {
  const type = String(req.query.type || '');
  if (!collectionNames.includes(type)) return res.status(404).json({ error: 'Collection not found.' });
  if (req.method === 'GET') { const snapshot = await readContent(); return res.json({ items: snapshot.content[type], version: snapshot.version, updatedAt: snapshot.updatedAt }); }
  const version = req.body?.version;
  if (!Number.isSafeInteger(version) || version < 1) return res.status(400).json({ error: 'Reload this page and try again.' });
  const snapshot = await readContent();
  if (snapshot.version !== version) return res.status(409).json({ error: 'Another editor changed the website. Reload before saving.' });
  const items = structuredClone(snapshot.content[type]);
  if (req.method === 'POST') {
    const item = { ...req.body.item, id: req.body.item?.id || randomUUID() };
    try { validateCollectionItem(type, item); } catch (error) { return res.status(400).json({ error: error.message }); }
    if (items.some(existing => existing.id === item.id || item.slug && existing.slug === item.slug)) return res.status(409).json({ error: 'An item with this ID or URL slug already exists.' });
    items.unshift(item);
  } else if (req.method === 'PATCH') {
    const index = items.findIndex(item => item.id === req.body.id);
    if (index < 0) return res.status(404).json({ error: 'Item not found.' });
    const item = { ...req.body.item, id: items[index].id };
    try { validateCollectionItem(type, item); } catch (error) { return res.status(400).json({ error: error.message }); }
    if (item.slug && items.some((existing, itemIndex) => itemIndex !== index && existing.slug === item.slug)) return res.status(409).json({ error: 'That URL slug is already in use.' });
    items[index] = item;
  } else {
    const index = items.findIndex(item => item.id === req.body.id);
    if (index < 0) return res.status(404).json({ error: 'Item not found.' });
    items.splice(index, 1);
  }
  const updatedAt = new Date().toISOString();
  const result = await (await db()).collection('content').updateOne({ _id: 'main', version }, { $set: { [`content.${type}`]: items, updatedAt }, $inc: { version: 1 } });
  if (!result.matchedCount) return res.status(409).json({ error: 'Another editor changed the website. Reload before saving.' });
  res.json({ items, version: version + 1, updatedAt });
}, { methods: ['GET', 'POST', 'PATCH', 'DELETE'], admin: true });

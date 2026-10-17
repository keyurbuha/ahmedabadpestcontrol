import { ObjectId } from 'mongodb';
import { api } from '../../../src/server/http.js';
import { db } from '../../../src/server/db.js';

export default api(async (req, res) => {
  const collection = (await db()).collection('inquiries');
  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (typeof id !== 'string' || !ObjectId.isValid(id) || !['new', 'contacted', 'closed'].includes(status)) return res.status(400).json({ error: 'Invalid inquiry or status.' });
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
    if (!result.matchedCount) return res.status(404).json({ error: 'Inquiry not found.' });
    return res.json({ ok: true });
  }
  const page = Math.max(1, Math.min(100000, Number.parseInt(req.query.page, 10) || 1));
  const search = String(req.query.search || '').trim().slice(0, 100);
  const status = ['new', 'contacted', 'closed'].includes(req.query.status) ? req.query.status : null;
  const filter = status ? { status } : {};
  if (search) {
    const regex = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = ['name', 'phone', 'service', 'address', 'email'].map(key => ({ [key]: { $regex: regex, $options: 'i' } }));
  }
  const [items, total, unread] = await Promise.all([
    collection.find(filter).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * 20).limit(20).toArray(),
    collection.countDocuments(filter), collection.countDocuments({ status: 'new' }),
  ]);
  res.json({ items: items.map(({ _id, ...item }) => ({ id: String(_id), ...item })), total, unread, page });
}, { methods: ['GET', 'PATCH'], admin: true });

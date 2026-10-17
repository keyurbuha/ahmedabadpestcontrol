import { api } from '../../src/server/http.js';
import { db } from '../../src/server/db.js';
import { readContent } from '../../src/server/content.js';

export default api(async (req, res) => {
  const body = req.body || {};
  if (body.website) return res.status(400).json({ error: 'Unable to submit this inquiry.' });
  const limits = { name: 120, phone: 20, service: 160, address: 500, email: 254, message: 4000, page: 500 };
  const inquiry = {};
  for (const [key, max] of Object.entries(limits)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return res.status(400).json({ error: 'Invalid inquiry details.' });
    inquiry[key] = (body[key] || '').trim();
    if (inquiry[key].length > max) return res.status(400).json({ error: `${key} is too long.` });
  }
  if (!inquiry.name || !/^\d{10}$/.test(inquiry.phone) || !inquiry.service) return res.status(400).json({ error: 'Enter your name, 10-digit phone number, and service.' });
  if (inquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return res.status(400).json({ error: 'Enter a valid email address.' });
  const { content } = await readContent();
  if (!['General Inspection', ...content.services.map(s => s.title)].includes(inquiry.service)) return res.status(400).json({ error: 'Select a service from the list.' });
  if (body.variant !== 'quick' && !inquiry.address) return res.status(400).json({ error: 'Enter your address or locality.' });
  inquiry.status = 'new';
  inquiry.createdAt = new Date().toISOString();
  const result = await (await db()).collection('inquiries').insertOne(inquiry);
  res.status(201).json({ id: String(result.insertedId), whatsappNumber: content.site.WHATSAPP_NUMBER });
}, { methods: ['POST'], rate: { key: 'inquiry', limit: 15, seconds: 600 } });

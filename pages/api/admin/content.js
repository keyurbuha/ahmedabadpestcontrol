import { api } from '../../../src/server/http.js';
import { db } from '../../../src/server/db.js';
import { readContent, validateContent } from '../../../src/server/content.js';

export const config = { api: { bodyParser: { sizeLimit: '2mb' } } };
export default api(async (req, res) => {
  if (req.method === 'GET') return res.json(await readContent());
  const { content, version } = req.body || {};
  if (!Number.isSafeInteger(version) || version < 1) return res.status(400).json({ error: 'Invalid content version.' });
  let validated;
  try { validated = validateContent(content); }
  catch (error) { return res.status(400).json({ error: error.message }); }
  const updatedAt = new Date().toISOString();
  const result = await (await db()).collection('content').updateOne({ _id: 'main', version }, {
    $set: { content: validated, updatedAt }, $inc: { version: 1 },
  });
  if (!result.matchedCount) return res.status(409).json({ error: 'Another editor saved changes. Reload the latest content before saving.' });
  res.json({ version: version + 1, updatedAt });
}, { methods: ['GET', 'PUT'], admin: true });

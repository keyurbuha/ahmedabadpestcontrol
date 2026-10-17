import { api } from '../../../src/server/http.js';
import { db } from '../../../src/server/db.js';
import { sessionCookie } from '../../../src/server/auth.js';

export default api(async (req, res) => {
  await (await db()).collection('admins').updateOne({ _id: req.admin._id }, { $inc: { sessionVersion: 1 } });
  res.setHeader('Set-Cookie', sessionCookie('', 0));
  res.json({ ok: true });
}, { methods: ['POST'], admin: true });

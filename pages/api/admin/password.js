import bcrypt from 'bcryptjs';
import { api } from '../../../src/server/http.js';
import { db } from '../../../src/server/db.js';
import { createToken, sessionCookie } from '../../../src/server/auth.js';

export default api(async (req, res) => {
  const { currentPassword, password } = req.body || {};
  if (typeof currentPassword !== 'string' || currentPassword.length > 256 || typeof password !== 'string' || password.length < 12 || Buffer.byteLength(password) > 72) {
    return res.status(400).json({ error: 'Use a new password of at least 12 characters and at most 72 bytes.' });
  }
  const database = await db();
  const admin = await database.collection('admins').findOne({ _id: req.admin._id });
  if (!await bcrypt.compare(currentPassword, admin.passwordHash)) return res.status(400).json({ error: 'Current password is incorrect.' });
  await database.collection('admins').updateOne({ _id: admin._id }, { $set: { passwordHash: await bcrypt.hash(password, 12) }, $inc: { sessionVersion: 1 } });
  admin.sessionVersion++;
  res.setHeader('Set-Cookie', sessionCookie(await createToken(admin)));
  res.json({ ok: true });
}, { methods: ['POST'], admin: true, rate: { key: 'password', limit: 10, seconds: 900 } });

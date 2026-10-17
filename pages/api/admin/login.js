import bcrypt from 'bcryptjs';
import { db } from '../../../src/server/db.js';
import { api } from '../../../src/server/http.js';
import { createToken, sessionCookie } from '../../../src/server/auth.js';

const dummyHash = bcrypt.hashSync('unused-comparison-password', 12);
export default api(async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 256) {
    return res.status(400).json({ error: 'Enter your email and password.' });
  }
  const admin = await (await db()).collection('admins').findOne({ email: email.trim().toLowerCase() });
  const valid = await bcrypt.compare(password, admin?.passwordHash || dummyHash);
  if (!admin || !valid) return res.status(401).json({ error: 'Email or password is incorrect.' });
  res.setHeader('Set-Cookie', sessionCookie(await createToken(admin)));
  res.json({ ok: true });
}, { methods: ['POST'], rate: { key: 'login', limit: 10, seconds: 900 } });

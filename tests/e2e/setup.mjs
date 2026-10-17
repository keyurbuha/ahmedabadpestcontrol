import bcrypt from 'bcryptjs';
import { db, closeDatabase } from '../../src/server/db.js';

export default async function setup() {
  if (!/^apc_e2e_\d+$/.test(process.env.MONGODB_DB)) throw new Error('Tests require an isolated database.');
  try {
    const database = await db();
    await database.collection('admins').updateOne({ email: 'admin@example.test' }, { $set: {
      passwordHash: await bcrypt.hash('Test-password-12345', 12), sessionVersion: 1,
    } }, { upsert: true });
  } finally { await closeDatabase(); }
}

import { db, closeDatabase } from '../../src/server/db.js';
import { rm } from 'node:fs/promises';
import path from 'node:path';

export default async function teardown() {
  const name = process.env.MONGODB_DB;
  if (!/^apc_e2e_\d+$/.test(name)) throw new Error('Refusing to clean a non-test database.');
  try { await (await db()).dropDatabase(); } finally { await closeDatabase(); }
  const directory = path.resolve('storage', name);
  if (path.dirname(directory) !== path.resolve('storage')) throw new Error('Invalid test upload directory.');
  await rm(directory, { recursive: true, force: true });
}

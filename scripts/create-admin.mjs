import nextEnv from '@next/env';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { randomBytes } from 'node:crypto';
import { existsSync, appendFileSync, writeFileSync } from 'node:fs';
import bcrypt from 'bcryptjs';

nextEnv.loadEnvConfig(process.cwd());
const prompt = createInterface({ input: stdin, output: stdout });
try {
  const email = (process.env.ADMIN_EMAIL || await prompt.question('Admin email: ')).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email.');
  // Generate a strong password; avoid echoing a typed password in the terminal.
  const password = process.env.ADMIN_PASSWORD || randomBytes(18).toString('base64url');
  if (password.length < 8 || Buffer.byteLength(password) > 72) throw new Error('Password must have at least 8 characters and at most 72 bytes.');
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 48) throw new Error('JWT_SECRET must have at least 48 characters.');
  if (!process.env.JWT_SECRET) {
    const entry = `\nJWT_SECRET=${randomBytes(48).toString('hex')}\n`;
    if (existsSync('.env.local')) appendFileSync('.env.local', entry);
    else writeFileSync('.env.local', `APP_ORIGIN=http://localhost:3000\nDATA_DIR=./storage\n${entry}`);
  }
  const { db } = await import('../src/server/db.js');
  const database = await db();
  if (await database.collection('admins').findOne({ email })) throw new Error('This admin already exists.');
  await database.collection('admins').insertOne({ email, passwordHash: await bcrypt.hash(password, 12), sessionVersion: 1 });
  console.log(`Admin created: ${email}`);
  if (!process.env.ADMIN_PASSWORD) console.log(`Generated password (save it now): ${password}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally {
  prompt.close();
  const { closeDatabase } = await import('../src/server/db.js');
  await closeDatabase();
}

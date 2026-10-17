import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { dataDirectory } from '../../../src/server/db.js';

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); return res.status(405).end(); }
  if (typeof req.query.id !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(req.query.id)) return res.status(404).end();
  try {
    const image = await readFile(path.join(dataDirectory(), 'uploads', `${req.query.id}.webp`));
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return req.method === 'HEAD' ? res.status(200).end() : res.status(200).send(image);
  } catch { return res.status(404).end(); }
}

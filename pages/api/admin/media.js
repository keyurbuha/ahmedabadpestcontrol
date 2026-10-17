import multer from 'multer';
import sharp from 'sharp';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { mkdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { db, dataDirectory } from '../../../src/server/db.js';
import { api } from '../../../src/server/http.js';

const temporaryDirectory = path.join(dataDirectory(), 'tmp');
mkdirSync(temporaryDirectory, { recursive: true });
const upload = multer({
  storage: multer.diskStorage({
    destination: temporaryDirectory,
    filename: (_req, _file, callback) => callback(null, `${randomUUID()}.upload`),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 },
  fileFilter: (_req, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)),
});

function receiveImage(req, res) {
  return new Promise((resolve, reject) => upload.single('image')(req, res, error => error ? reject(error) : resolve()));
}

export const config = { api: { bodyParser: false } };
export default api(async (req, res) => {
  const collection = (await db()).collection('media');
  if (req.method === 'GET') {
    const items = await collection.find({}).sort({ createdAt: -1 }).limit(100).toArray();
    return res.json({ items: items.map(({ _id, ...item }) => ({ id: _id, ...item })) });
  }

  try { await receiveImage(req, res); }
  catch (error) {
    const message = error?.code === 'LIMIT_FILE_SIZE' ? 'Choose an image smaller than 5 MB.' : 'Choose one valid JPG, PNG, WebP, or AVIF image.';
    return res.status(400).json({ error: message });
  }
  if (!req.file) return res.status(400).json({ error: 'Choose a valid JPG, PNG, WebP, or AVIF image.' });

  const id = randomUUID();
  const directory = path.join(dataDirectory(), 'uploads');
  const file = path.join(directory, `${id}.webp`);
  try {
    const image = sharp(req.file.path, { limitInputPixels: 40000000 });
    const metadata = await image.metadata();
    if (!['jpeg', 'png', 'webp', 'avif'].includes(metadata.format)) throw new Error('Unsupported format');
    await mkdir(directory, { recursive: true });
    await image.rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86 }).toFile(file);
  } catch {
    await unlink(req.file.path).catch(() => {});
    return res.status(400).json({ error: 'Upload a valid JPG, PNG, WebP, or AVIF image (up to 40 megapixels).' });
  }
  await unlink(req.file.path).catch(() => {});
  const output = await stat(file);
  const item = { filename: req.file.originalname.slice(0, 160), size: output.size, createdAt: new Date().toISOString(), url: `/api/media/${id}` };
  try { await collection.insertOne({ _id: id, ...item }); }
  catch (error) { await unlink(file).catch(() => {}); throw error; }
  return res.status(201).json({ id, ...item });
}, { methods: ['GET', 'POST'], admin: true });

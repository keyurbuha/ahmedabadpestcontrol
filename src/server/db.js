import { MongoClient } from 'mongodb';
import path from 'node:path';

export function dataDirectory() { return path.resolve(/* turbopackIgnore: true */ process.env.DATA_DIR || './storage'); }

export async function db() {
  if (!globalThis.__pestMongo) {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', {
      maxPoolSize: 10, serverSelectionTimeoutMS: 5000,
    });
    globalThis.__pestMongoClient = client;
    globalThis.__pestMongo = client.connect().then(async () => {
      const database = client.db(process.env.MONGODB_DB || 'ahmedabad_pest_control');
      await Promise.all([
        database.collection('admins').createIndex({ email: 1 }, { unique: true }),
        database.collection('inquiries').createIndex({ createdAt: -1 }),
        database.collection('rateLimits').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      ]);
      return database;
    }).catch(error => { globalThis.__pestMongo = null; throw error; });
  }
  return globalThis.__pestMongo;
}

export async function closeDatabase() {
  if (globalThis.__pestMongoClient) await globalThis.__pestMongoClient.close();
  globalThis.__pestMongo = null;
}

export async function rateLimit(key, limit, seconds) {
  const bucket = Math.floor(Date.now() / (seconds * 1000));
  const row = await (await db()).collection('rateLimits').findOneAndUpdate(
    { _id: `${key}:${bucket}` },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((bucket + 1) * seconds * 1000) } },
    { upsert: true, returnDocument: 'after' },
  );
  return row.count <= limit;
}

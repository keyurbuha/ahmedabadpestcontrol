import { readFile, rename, writeFile } from 'node:fs/promises';
import { MongoClient } from 'mongodb';

function parseEnv(source) {
  return Object.fromEntries(source.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#') && line.includes('=')).map(line => {
    const index = line.indexOf('=');
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^("|')|("|')$/g, '')];
  }));
}

const credentialsPath = process.env.ATLAS_ENV_FILE;
if (!credentialsPath) throw new Error('Set ATLAS_ENV_FILE to the Atlas credentials file.');
const [atlasEnv, localEnv] = await Promise.all([
  readFile(credentialsPath, 'utf8').then(parseEnv),
  readFile('.env.local', 'utf8').then(parseEnv),
]);
if (!atlasEnv.MONGODB_URI?.startsWith('mongodb+srv://')) throw new Error('The credentials file does not contain a complete Atlas MONGODB_URI.');
const databaseName = localEnv.MONGODB_DB || 'ahmedabad_pest_control';
const localClient = new MongoClient(localEnv.MONGODB_URI || 'mongodb://127.0.0.1:27017', { serverSelectionTimeoutMS: 10000 });
const atlasClient = new MongoClient(atlasEnv.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });

try {
  await Promise.all([localClient.connect(), atlasClient.connect()]);
  const source = localClient.db(databaseName); const target = atlasClient.db(databaseName);
  const summary = {};
  for (const name of ['content', 'admins', 'inquiries', 'media']) {
    const documents = await source.collection(name).find({}).toArray();
    if (documents.length) {
      await target.collection(name).bulkWrite(documents.map(document => ({ replaceOne: {
        filter: name === 'admins' ? { email: document.email } : { _id: document._id }, replacement: document, upsert: true,
      } })), { ordered: false });
    }
    summary[name] = documents.length;
  }
  await Promise.all([
    target.collection('admins').createIndex({ email: 1 }, { unique: true }),
    target.collection('inquiries').createIndex({ createdAt: -1 }),
    target.collection('rateLimits').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);
  const admin = await target.collection('admins').findOne({ email: localEnv.ADMIN_EMAIL || 'admin@abadpest.com' }, { projection: { _id: 1 } });
  const content = await target.collection('content').findOne({ _id: 'main' }, { projection: { version: 1, 'content.videos': 1 } });
  if (process.argv.includes('--write-env')) {
    const lines = (await readFile('.env.local', 'utf8')).split(/\r?\n/);
    const index = lines.findIndex(line => /^MONGODB_URI=/.test(line));
    const entry = `MONGODB_URI=${atlasEnv.MONGODB_URI}`;
    if (index >= 0) lines[index] = entry; else lines.push(entry);
    await writeFile('.env.local.tmp', lines.join('\n'), { encoding: 'utf8', mode: 0o600 });
    await rename('.env.local.tmp', '.env.local');
  }
  console.log(JSON.stringify({ database: databaseName, copied: summary, adminReady: Boolean(admin), contentVersion: content?.version || null, youtubeVideos: content?.content?.videos?.length || 0 }));
} finally {
  await Promise.allSettled([localClient.close(), atlasClient.close()]);
}

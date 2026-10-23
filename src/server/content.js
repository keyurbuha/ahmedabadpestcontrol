import { randomUUID } from 'node:crypto';
import defaults from '../content/defaults.json' with { type: 'json' };
import catalog from '../content/field-catalog.json' with { type: 'json' };
import { getYoutubeId } from '../utils/youtube.js';
import { db } from './db.js';

export const collectionNames = ['services', 'blogs', 'faqs', 'testimonials', 'videos'];

function mergeMissing(saved, template) {
  if (Array.isArray(template)) return Array.isArray(saved) ? saved : structuredClone(template);
  if (template && typeof template === 'object') {
    const source = saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
    return Object.fromEntries([...new Set([...Object.keys(source), ...Object.keys(template)])].map(key => [key, Object.hasOwn(template, key) ? mergeMissing(source[key], template[key]) : source[key]]));
  }
  return saved === undefined ? template : saved;
}

function normalizeContent(saved) {
  const content = mergeMissing(saved, defaults);
  delete content.instagramVideos;
  if (content.text) delete content.text.InstagramVideos;
  content.faqs = (content.faqs || []).map(item => ({ id: item.id || randomUUID(), ...item }));
  content.testimonials = (content.testimonials || []).map(item => ({ ...item, id: String(item.id || randomUUID()) }));
  content.videos = (content.videos || []).map(item => ({ ...item, url: item.url || `https://www.youtube.com/watch?v=${item.id}` }));
  return content;
}

export async function readContent() {
  const collection = (await db()).collection('content');
  await collection.updateOne({ _id: 'main' }, { $setOnInsert: { content: normalizeContent(structuredClone(defaults)), version: 1, updatedAt: new Date().toISOString() } }, { upsert: true });
  const document = await collection.findOne({ _id: 'main' });
  const content = normalizeContent(document.content);
  if (JSON.stringify(content) !== JSON.stringify(document.content)) await collection.updateOne({ _id: 'main' }, { $set: { content } });
  return { content, version: document.version, updatedAt: document.updatedAt };
}

export function safeImage(value) {
  if (typeof value !== 'string' || value.length > 2048 || value.includes('\\')) return false;
  if (/^\/(?!\/)/.test(value) && !value.split('/').includes('..')) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
export function safeHttps(value) { try { return new URL(value).protocol === 'https:'; } catch { return false; } }

function string(value, name, max = 20000, required = true) {
  if (typeof value !== 'string' || value.length > max || required && !value.trim()) throw new Error(`${name} is invalid.`);
}
function stringList(value, name, { min = 0, max = 30 } = {}) {
  if (!Array.isArray(value) || value.length < min || value.length > max) throw new Error(`${name} has an invalid number of items.`);
  value.forEach((item, index) => string(item, `${name} item ${index + 1}`, 2000));
}
function faqList(value, name, { min = 0 } = {}) {
  if (!Array.isArray(value) || value.length < min || value.length > 30) throw new Error(`${name} has an invalid number of items.`);
  value.forEach((item, index) => { string(item.question, `${name} question ${index + 1}`, 500); string(item.answer, `${name} answer ${index + 1}`, 4000); });
}
function commonSeo(item, name) {
  string(item.metaTitle, `${name} SEO title`, 300); string(item.metaDescription, `${name} SEO description`, 1000);
  string(item.metaKeywords, `${name} SEO keywords`, 2000, false); string(item.ogImage, `${name} sharing image`, 2048, false);
  if (item.ogImage && !safeImage(item.ogImage)) throw new Error(`${name} sharing image is invalid.`);
  string(item.canonical, `${name} canonical URL`, 2048, false);
  if (item.canonical && !safeHttps(item.canonical)) throw new Error(`${name} canonical URL must use HTTPS.`);
  if (typeof item.noindex !== 'boolean') throw new Error(`${name} search visibility is invalid.`);
}

export function validateCollectionItem(type, item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error('Item is invalid.');
  string(item.id, 'ID', 100);
  if (type === 'services') {
    string(item.title, 'Service title', 160); string(item.slug, 'Service URL slug', 100);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) throw new Error('Service URL slug must use lowercase letters, numbers, and hyphens.');
    string(item.description, 'Service summary', 1000); string(item.h1, 'Service page heading', 300);
    if (!['Bug', 'ShieldCheck', 'BugOff', 'Skull', 'Zap', 'Home'].includes(item.icon)) throw new Error('Choose a valid service icon.');
    if (!safeImage(item.image)) throw new Error('Choose a valid service image.');
    stringList(item.features, 'Service features', { min: 1 }); stringList(item.intro, 'Service introduction', { min: 1 });
    stringList(item.signs, 'Infestation signs', { min: 1 }); stringList(item.process, 'Treatment process', { min: 1 });
    faqList(item.faqs, 'Service FAQs'); commonSeo(item, 'Service');
  } else if (type === 'blogs') {
    string(item.title, 'Article title', 300); string(item.slug, 'Article URL slug', 140);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) throw new Error('Article URL slug must use lowercase letters, numbers, and hyphens.');
    string(item.excerpt, 'Article excerpt', 1200); stringList(item.content, 'Article paragraphs', { min: 1, max: 100 });
    string(item.author, 'Article author', 160); string(item.date, 'Article date', 100); string(item.readTime, 'Read time', 50);
    string(item.category, 'Article category', 120); if (!safeImage(item.image)) throw new Error('Choose a valid article image.'); commonSeo(item, 'Article');
  } else if (type === 'faqs') {
    string(item.question, 'Question', 500); string(item.answer, 'Answer', 4000);
  } else if (type === 'testimonials') {
    string(item.name, 'Customer name', 160); string(item.locality, 'Locality', 200); string(item.review, 'Review', 4000);
    if (!Number.isInteger(item.rating) || item.rating < 1 || item.rating > 5) throw new Error('Rating must be between 1 and 5.');
  } else if (type === 'videos') {
    string(item.title, 'YouTube video title', 300); string(item.url, 'YouTube video URL', 2048);
    if (!getYoutubeId(item.url)) throw new Error('Use a valid YouTube video, Short, live, or youtu.be URL.');
  } else throw new Error('Unknown collection.');
  return item;
}

function validateFixed(value, template, path = []) {
  const key = path.join('.');
  if (Array.isArray(template)) {
    if (!Array.isArray(value) || value.length !== template.length) throw new Error(`${key}: keep the existing items.`);
    value.forEach((item, index) => validateFixed(item, template[index], [...path, String(index)]));
  } else if (template !== null && typeof template === 'object') {
    if (!value || Array.isArray(value) || typeof value !== 'object' || Object.keys(value).length !== Object.keys(template).length || Object.keys(template).some(name => !Object.hasOwn(value, name))) throw new Error(`${key || 'Content'} has invalid fields.`);
    for (const name of Object.keys(template)) validateFixed(value[name], template[name], [...path, name]);
  } else if (typeof value !== typeof template || typeof value === 'number' && !Number.isFinite(value)) throw new Error(`${key} has an invalid value.`);
  else if (typeof value === 'string') {
    if (value.length > 20000) throw new Error(`${key} is too long.`);
    const image = /^(image|ogImage|DEFAULT_OG_IMAGE|LOGO_IMAGE)$/.test(path.at(-1)) || path[0] === 'text' && catalog[path[1]]?.[path[2]]?.kind === 'image';
    if (image && value && !safeImage(value)) throw new Error(`${key}: use a local image path or HTTPS image URL.`);
    if (path.at(-1) === 'canonical' && value && !safeHttps(value)) throw new Error(`${key}: use a full HTTPS URL.`);
  }
}

export function validateContent(input) {
  if (!input || typeof input !== 'object') throw new Error('Content is invalid.');
  if (Object.keys(input).length !== Object.keys(defaults).length || Object.keys(defaults).some(key => !Object.hasOwn(input, key))) throw new Error('Content has invalid sections.');
  const content = normalizeContent(structuredClone(input));
  for (const key of ['site', 'seo', 'text']) validateFixed(content[key], defaults[key], [key]);
  for (const type of collectionNames) {
    if (!Array.isArray(content[type]) || content[type].length > 500) throw new Error(`${type} is invalid.`);
    content[type].forEach(item => validateCollectionItem(type, item));
    if (new Set(content[type].map(item => item.id)).size !== content[type].length) throw new Error(`${type} contains duplicate IDs.`);
    if (['services', 'blogs'].includes(type) && new Set(content[type].map(item => item.slug)).size !== content[type].length) throw new Error(`${type} contains duplicate URL slugs.`);
  }
  const site = content.site;
  if (!/^\+[1-9]\d{7,14}$/.test(site.BUSINESS_PHONE)) throw new Error('Phone must include the country code, for example +917984348574.');
  if (!/^[1-9]\d{7,14}$/.test(site.WHATSAPP_NUMBER)) throw new Error('WhatsApp number must use digits with the country code.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.BUSINESS_EMAIL)) throw new Error('Enter a valid business email.');
  if (!safeHttps(site.SITE_URL) || new URL(site.SITE_URL).origin !== site.SITE_URL) throw new Error('Site URL must be an HTTPS origin without a trailing slash.');
  for (const value of Object.values(site.SOCIAL_LINKS)) if (!safeHttps(value)) throw new Error('Social links must use HTTPS.');
  try { const map = new URL(site.MAP_EMBED_URL); if (map.protocol !== 'https:' || map.hostname !== 'www.google.com' || !map.pathname.startsWith('/maps/embed')) throw new Error(); }
  catch { throw new Error('Use a Google Maps embed URL.'); }
  for (const [key, page] of Object.entries(content.seo)) {
    if (page.path !== defaults.seo[key].path) throw new Error(`${key}: page route cannot be changed.`);
    if (!page.title.trim() || !page.description.trim()) throw new Error(`${key}: SEO title and description are required.`);
  }
  return content;
}

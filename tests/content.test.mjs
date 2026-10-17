import test from 'node:test';
import assert from 'node:assert/strict';
import defaults from '../src/content/defaults.json' with { type: 'json' };
import { validateContent, safeImage } from '../src/server/content.js';
import { buildWhatsAppUrl } from '../src/utils/whatsapp.js';

test('the existing site content is valid and keeps the requested contact number', () => {
  assert.doesNotThrow(() => validateContent(structuredClone(defaults)));
  assert.equal(defaults.site.BUSINESS_PHONE, '+917984348574');
  assert.equal(defaults.site.WHATSAPP_NUMBER, '917984348574');
});
test('fixed page routes and duplicate collection identities are rejected', () => {
  for (const change of [d => d.seo.home.path = '/new-page', d => d.services.push(d.services[0]), d => d.blogs.push({ ...d.blogs[0], id: 'another-id' })]) {
    const content = structuredClone(defaults); change(content);
    assert.throws(() => validateContent(content));
  }
});
test('service, article, FAQ, review and YouTube collections support valid additions', () => {
  const content = validateContent(structuredClone(defaults));
  content.faqs.push({ id: 'new-faq', question: 'A new question?', answer: 'A useful answer.' });
  content.testimonials.push({ id: 'new-review', name: 'Customer', locality: 'Ahmedabad', rating: 5, review: 'Excellent service.' });
  content.videos.push({ id: 'new-video', title: 'Treatment video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
  assert.doesNotThrow(() => validateContent(content));
});
test('unsafe image URLs and malformed contact fields are rejected', () => {
  for (const value of ['javascript:alert(1)', 'data:image/svg+xml,<svg/>', '//evil.example/x', '/a/../b', '/\\evil.example']) assert.equal(safeImage(value), false);
  assert.equal(safeImage('/api/media/known-image'), true);
  assert.equal(safeImage('https://example.com/image.webp'), true);
  const content = structuredClone(defaults); content.site.BUSINESS_PHONE = 'invalid';
  assert.throws(() => validateContent(content), /Phone/);
});
test('only the fixed content structure is accepted and types are enforced', () => {
  for (const change of [d => d.extra = {}, d => delete d.seo, d => d.text.Home.field2 = {}, d => d.seo.home.noindex = 'false', d => d.testimonials[0].rating = 100]) {
    const content = structuredClone(defaults); change(content); assert.throws(() => validateContent(content));
  }
});
test('WhatsApp inquiries encode customer text and use the supplied current number', () => {
  const url = new URL(buildWhatsAppUrl({ name: 'A & B', phone: '9876543210', service: 'Termite', message: 'Hello? & yes' }, '917984348574'));
  assert.equal(url.hostname, 'wa.me'); assert.equal(url.pathname, '/917984348574');
  assert.match(url.searchParams.get('text'), /Name: A & B/);
  assert.match(url.searchParams.get('text'), /Message: Hello\? & yes/);
});

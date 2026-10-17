import { test, expect } from '@playwright/test';
import defaults from '../../src/content/defaults.json' with { type: 'json' };
import sharp from 'sharp';

const origin = 'http://localhost:3100';
async function login(page) {
  await page.goto('/admin/login');
  await page.getByLabel('Email address').fill('admin@example.test');
  await page.getByLabel('Password', { exact: true }).fill('Test-password-12345');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
}

test('public pages render content and SEO on the server, and unknown routes return 404', async ({ request }) => {
  const paths = ['/', '/about', '/services', '/blog', '/testimonials', '/faq', '/contact', ...defaults.services.map(s => `/services/${s.slug}`), ...defaults.blogs.map(b => `/blog/${b.slug}`)];
  for (const path of paths) {
    const response = await request.get(path); expect(response.status(), path).toBe(200);
    const html = await response.text(); expect(html).toContain('<h1'); expect(html).toContain('name="description"');
    expect(html).toContain('tel:+917984348574'); expect(html).toContain('https://wa.me/917984348574');
  }
  expect((await request.get('/services/missing')).status()).toBe(404);
  expect((await request.get('/new-page')).status()).toBe(404);
  expect((await request.get('/toString')).status()).toBe(404);
  expect(await (await request.get('/sitemap.xml')).text()).toContain('/services/termite');
  expect(await (await request.get('/llms.txt')).text()).toContain('+917984348574');
});

test('private pages redirect and unauthenticated or cross-origin writes are denied', async ({ request }) => {
  const page = await request.get('/admin', { maxRedirects: 0 }); expect(page.status()).toBe(307);
  expect((await request.get('/api/admin/content')).status()).toBe(401);
  expect((await request.post('/api/admin/login', { headers: { Origin: 'https://evil.test' }, data: { email: 'admin@example.test', password: 'Test-password-12345' } })).status()).toBe(403);
  expect((await request.post('/api/inquiries', { headers: { Origin: origin }, data: { name: 'Bad', phone: 'bad', service: 'Termite Control' } })).status()).toBe(400);
});

test('admin edits appear on public pages and uploads are validated and served', async ({ page }) => {
  await login(page);
  await page.getByRole('link', { name: 'Website content', exact: true }).click();
  await page.getByLabel('Phone number (with +country code)', { exact: true }).fill('+919876543210');
  await expect(page.getByLabel('WhatsApp number (country code and digits)', { exact: true })).toHaveValue('919876543210');
  await expect(page.getByLabel('Phone number shown on website', { exact: true })).toHaveValue('+91 98765 43210');
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Reload content' }).click();
  await expect(page.getByLabel('Phone number (with +country code)', { exact: true })).toHaveValue('+917984348574');
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await page.getByLabel('Pest-free spaces.', { exact: true }).fill('Protected homes in Ahmedabad.');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('status')).toContainText('Changes saved');
  const snapshot = await (await page.request.get('/api/admin/content')).json();
  snapshot.content.seo.home.title = 'Edited SEO title';
  snapshot.content.seo.home.description = 'Updated description from admin.';
  snapshot.content.seo.home.noindex = true;
  const save = await page.request.put('/api/admin/content', { headers: { Origin: origin }, data: snapshot });
  expect(save.status()).toBe(200);
  expect((await page.request.put('/api/admin/content', { headers: { Origin: origin }, data: snapshot })).status()).toBe(409);
  const html = await (await page.request.get('/')).text();
  expect(html).toContain('Protected homes in Ahmedabad.'); expect(html).toMatch(/<title[^>]*>Edited SEO title<\/title>/);
  expect(html).toContain('noindex, nofollow');
  const image = await sharp({ create: { width: 100, height: 100, channels: 3, background: '#267d38' } }).png().toBuffer();
  const upload = await page.request.post('/api/admin/media', { headers: { Origin: origin }, multipart: { image: { name: 'test.png', mimeType: 'image/png', buffer: image } } });
  expect(upload.status()).toBe(201); const media = await upload.json();
  const download = await page.request.get(media.url); expect(download.status()).toBe(200); expect(download.headers()['content-type']).toContain('image/webp');
  expect((await page.request.post('/api/admin/media', { headers: { Origin: origin }, multipart: { image: { name: 'bad.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') } } })).status()).toBe(400);
  await page.goto('/admin/content');
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await page.getByLabel('Image: pest-control-in-ahmedabad.jpg').fill(media.url);
  await page.getByRole('button', { name: 'Save changes' }).click(); await expect(page.getByRole('status')).toContainText('Changes saved');
  const updated = await (await page.request.get('/')).text(); expect(updated).toContain(media.url);
  await page.goto('/'); await expect(page.getByRole('heading', { level: 1 })).toContainText('Protected homes');
  await page.screenshot({ path: 'test-results/public-desktop.png', fullPage: false });
  await page.goto('/admin'); await page.screenshot({ path: 'test-results/admin-desktop.png', fullPage: false });
  await page.goto('/admin/content');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel('Content section', { exact: true }).selectOption('text.Home');
  await expect(page.getByLabel('Pest-free spaces.', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'test-results/admin-mobile.png', fullPage: false });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('admin can create, edit, and delete every managed collection', async ({ page }) => {
  await login(page);
  await page.getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Services', exact: true })).toBeVisible();
  await expect(page.locator('.admin-collection-list article')).toHaveCount(defaults.services.length);
  await page.getByRole('link', { name: 'Blog articles', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Blog articles', exact: true })).toBeVisible();
  await expect(page.locator('.admin-collection-list article')).toHaveCount(defaults.blogs.length);
  await page.getByRole('link', { name: 'FAQs', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'FAQs', exact: true })).toBeVisible();
  await expect(page.locator('.admin-collection-list article')).toHaveCount(defaults.faqs.length);
  async function mutation(type, method, payload) {
    const current = await (await page.request.get(`/api/admin/collections/${type}`)).json();
    return page.request.fetch(`/api/admin/collections/${type}`, { method, headers: { Origin: origin }, data: { ...payload, version: current.version } });
  }
  const created = [];
  const service = { ...structuredClone(defaults.services[0]), id: 'e2e-service', slug: 'e2e-pest-service', title: 'E2E Pest Service', h1: 'E2E Pest Service Ahmedabad', metaTitle: 'E2E Pest Service Ahmedabad' };
  const blog = { ...structuredClone(defaults.blogs[0]), id: 'e2e-blog', slug: 'e2e-pest-guide', title: 'E2E Pest Guide', metaTitle: 'E2E Pest Guide' };
  const faq = { id: 'e2e-faq', question: 'Does CRUD work from the admin?', answer: 'Yes, this answer is stored in MongoDB.' };
  const review = { id: 'e2e-review', name: 'CRUD Customer', locality: 'Ahmedabad', rating: 5, review: 'Created through the reviews admin API.' };
  const youtube = { id: 'e2e-youtube', title: 'E2E treatment video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' };
  for (const [type, item] of [['services', service], ['blogs', blog], ['faqs', faq], ['testimonials', review], ['videos', youtube]]) {
    const response = await mutation(type, 'POST', { item }); expect(response.status(), `${type} create`).toBe(200); created.push([type, item.id]);
  }
  expect((await page.request.get('/services/e2e-pest-service')).status()).toBe(200);
  expect((await page.request.get('/blog/e2e-pest-guide')).status()).toBe(200);
  expect(await (await page.request.get('/faq')).text()).toContain(faq.question);
  expect(await (await page.request.get('/testimonials')).text()).toContain(review.name);
  expect(await (await page.request.get('/')).text()).toContain(youtube.title);
  const revised = { ...faq, answer: 'The FAQ was edited successfully.' };
  expect((await mutation('faqs', 'PATCH', { id: faq.id, item: revised })).status()).toBe(200);
  expect(await (await page.request.get('/faq')).text()).toContain(revised.answer);
  await page.goto('/admin/services'); await expect(page.getByRole('heading', { name: 'E2E Pest Service' })).toBeVisible();
  for (const [type, id] of created) expect((await mutation(type, 'DELETE', { id })).status(), `${type} delete`).toBe(200);
  expect((await page.request.get('/services/e2e-pest-service')).status()).toBe(404);
});

test('visitor inquiries are saved, visible to admins and can be marked contacted', async ({ page, request }) => {
  await page.route('https://wa.me/**', route => route.fulfill({ contentType: 'text/html', body: 'WhatsApp opened' }));
  await page.goto('/contact');
  const form = page.locator('form');
  await form.getByLabel('Full Name').fill('Website inquiry test');
  await form.getByLabel('Phone Number').fill('9876543210');
  await form.getByLabel('Service Needed').selectOption('Termite Control');
  await form.getByLabel('Address/Locality').fill('Satellite, Ahmedabad');
  await form.getByLabel('Message', { exact: true }).fill('Please arrange an inspection.');
  await form.getByRole('button', { name: 'Send on WhatsApp' }).click();
  await expect(form.getByRole('status')).toContainText('Your inquiry has been saved');
  await login(page);
  await page.getByRole('link', { name: 'Inquiries', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Website inquiry test' })).toBeVisible();
  await page.getByLabel('Status for Website inquiry test').selectOption('contacted');
  await expect(page.locator('.admin-status')).toHaveText('contacted');
  const previousCookie = (await page.context().cookies()).find(cookie => cookie.name === 'apc_admin');
  expect(previousCookie.httpOnly).toBe(true);
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByLabel('Current password').fill('Test-password-12345');
  await page.getByLabel('New password', { exact: true }).fill('Updated-test-password-9876');
  await page.getByLabel('Confirm new password').fill('Updated-test-password-9876');
  await page.getByRole('button', { name: 'Change password', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Your password has been changed');
  expect((await request.get('/api/admin/content', { headers: { Cookie: `apc_admin=${previousCookie.value}` } })).status()).toBe(401);
  await page.getByRole('button', { name: 'Sign out' }).click(); await expect(page).toHaveURL(/\/admin\/login$/);
  expect((await page.request.get('/api/admin/inquiries')).status()).toBe(401);
});

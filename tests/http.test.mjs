import test from 'node:test';
import assert from 'node:assert/strict';
import { hasValidOrigin } from '../src/server/http.js';

test('mutations accept the configured origin and a same-host LAN origin', () => {
  process.env.APP_ORIGIN = 'http://localhost:3000';
  assert.equal(hasValidOrigin({ headers: { origin: 'http://localhost:3000', host: 'localhost:3000' } }), true);
  assert.equal(hasValidOrigin({ headers: { origin: 'http://192.168.1.20:3000', host: '192.168.1.20:3000' } }), true);
});

test('mutations reject cross-origin and malformed origins', () => {
  process.env.APP_ORIGIN = 'http://localhost:3000';
  assert.equal(hasValidOrigin({ headers: { origin: 'https://evil.test', host: '192.168.1.20:3000' } }), false);
  assert.equal(hasValidOrigin({ headers: { origin: 'not a URL', host: '192.168.1.20:3000' } }), false);
  assert.equal(hasValidOrigin({ headers: { host: '192.168.1.20:3000' } }), false);
});

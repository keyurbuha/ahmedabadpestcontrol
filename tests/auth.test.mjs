import test from 'node:test';
import assert from 'node:assert/strict';
import { jwtVerify } from 'jose';
import { createToken, getAdmin, sessionCookie } from '../src/server/auth.js';

process.env.JWT_SECRET = 'test-secret-for-unit-testing-only-'.repeat(3);
test('admin JWT contains a subject, session version, fixed audience, and expiry', async () => {
  const token = await createToken({ _id: '507f1f77bcf86cd799439011', sessionVersion: 4 });
  const { payload, protectedHeader } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), { issuer: 'ahmedabad-pest-control', audience: 'admin', algorithms: ['HS256'] });
  assert.equal(protectedHeader.alg, 'HS256'); assert.equal(payload.version, 4);
  assert.equal(payload.exp - payload.iat, 8 * 60 * 60);
  assert.equal(payload.sub, '507f1f77bcf86cd799439011');
});
test('missing, forged and malformed tokens are denied', async () => {
  for (const value of [undefined, 'not-a-token', 'eyJhbGciOiJub25lIn0.eyJzdWIiOiIxIn0.']) {
    assert.equal(await getAdmin({ cookies: { apc_admin: value } }), null);
  }
});
test('session cookies are HttpOnly and SameSite and can be expired', () => {
  assert.match(sessionCookie('token'), /HttpOnly/); assert.match(sessionCookie('token'), /SameSite=Strict/);
  assert.match(sessionCookie('', 0), /Max-Age=0/);
});

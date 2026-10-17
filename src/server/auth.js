import { SignJWT, jwtVerify } from 'jose';
import { db } from './db.js';
import { ObjectId } from 'mongodb';

export const COOKIE = 'apc_admin';
const issuer = 'ahmedabad-pest-control';

function secret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 48) {
    throw new Error('Set JWT_SECRET to a random value of at least 48 characters.');
  }
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function createToken(admin) {
  return new SignJWT({ version: admin.sessionVersion })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(String(admin._id)).setIssuer(issuer).setAudience('admin')
    .setIssuedAt().setExpirationTime('8h').sign(secret());
}

export async function getAdmin(req) {
  try {
    const token = req.cookies?.[COOKIE];
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret(), {
      algorithms: ['HS256'], issuer, audience: 'admin',
    });
    if (!ObjectId.isValid(payload.sub)) return null;
    const admin = await (await db()).collection('admins').findOne({ _id: new ObjectId(payload.sub) });
    return admin && admin.sessionVersion === payload.version ? admin : null;
  } catch { return null; }
}

export function sessionCookie(token, maxAge = 28800) {
  return `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
}

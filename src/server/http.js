import { getAdmin } from './auth.js';
import { rateLimit } from './db.js';
import { isIP } from 'node:net';

export function hasValidOrigin(req) {
  if (typeof req.headers.origin !== 'string') return false;
  let origin;
  try {
    origin = new URL(req.headers.origin);
  } catch {
    return false;
  }
  if (!['http:', 'https:'].includes(origin.protocol)) return false;

  // APP_ORIGIN remains useful when a reverse proxy changes the Host header.
  // Direct LAN access is also safe when the browser Origin matches the Host it
  // sent the request to (for example http://192.168.1.20:3000).
  const configured = (process.env.APP_ORIGIN || '').split(',').map(value => value.trim()).filter(Boolean);
  for (const value of configured) {
    try {
      if (origin.origin === new URL(value).origin) return true;
    } catch {
      // Ignore malformed entries and continue to the same-host check.
    }
  }
  return typeof req.headers.host === 'string' && origin.host.toLowerCase() === req.headers.host.trim().toLowerCase();
}

export function api(handler, { methods = ['GET'], admin = false, rate } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    if (!methods.includes(req.method)) {
      res.setHeader('Allow', methods.join(', '));
      return res.status(405).json({ error: 'Method not allowed.' });
    }
    if (!['GET', 'HEAD'].includes(req.method)) {
      if (!hasValidOrigin(req)) {
        return res.status(403).json({ error: 'Invalid request origin.' });
      }
    }
    try {
      if (admin) {
        req.admin = await getAdmin(req);
        if (!req.admin) return res.status(401).json({ error: 'Please sign in again.' });
      }
      if (rate) {
        // Use the socket address; do not trust caller-controlled forwarded headers.
        let ip = req.socket.remoteAddress || 'unknown';
        const loopback = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);
        if (process.env.TRUST_LOCAL_PROXY === 'true' && loopback && typeof req.headers['x-real-ip'] === 'string' && isIP(req.headers['x-real-ip'])) ip = req.headers['x-real-ip'];
        if (!await rateLimit(`${rate.key}:${ip}`, rate.limit, rate.seconds)) {
          res.setHeader('Retry-After', String(rate.seconds));
          return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }
      }
      return await handler(req, res);
    } catch (error) {
      console.error('API request failed:', error.message);
      return res.status(500).json({ error: 'Unable to complete the request. Please try again.' });
    }
  };
}

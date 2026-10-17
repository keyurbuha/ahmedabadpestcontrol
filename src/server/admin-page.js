import { getAdmin } from './auth.js';

export async function requireAdminPage(context) {
  context.res.setHeader('Cache-Control', 'no-store');
  context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const admin = await getAdmin(context.req);
  if (!admin) return { redirect: { destination: '/admin/login', permanent: false } };
  return { props: { email: admin.email } };
}

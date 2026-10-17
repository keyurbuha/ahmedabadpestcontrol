import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ShieldCheck } from 'lucide-react';
import { request } from '../../src/admin/AdminShell';
import { getAdmin } from '../../src/server/auth';

export default function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const data = new FormData(event.currentTarget);
    try {
      await request('/api/admin/login', { method: 'POST', body: JSON.stringify(Object.fromEntries(data)) });
      await router.replace('/admin');
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <main className="admin-login">
    <Head><title>Admin sign in | Ahmedabad Pest Control</title><meta name="robots" content="noindex, nofollow" key="robots" /></Head>
    <div className="admin-login-panel"><ShieldCheck size={38} className="admin-login-icon" /><p>Ahmedabad Pest Control</p><h1>Manage your website</h1><p className="admin-muted">Sign in to edit content and follow up on inquiries.</p>
      <form onSubmit={submit}>
        <label>Email address<input type="email" name="email" autoComplete="username" required maxLength={254} /></label>
        <label>Password<input type="password" name="password" autoComplete="current-password" required maxLength={256} /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form><a href="/">Return to website</a>
    </div>
  </main>;
}

export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'no-store');
  if (await getAdmin(req)) return { redirect: { destination: '/admin', permanent: false } };
  return { props: {} };
}

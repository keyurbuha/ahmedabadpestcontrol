import { useState } from 'react';
import { AdminShell, request } from '../../src/admin/AdminShell';
import { requireAdminPage } from '../../src/server/admin-page';

export default function Settings({ email }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  async function submit(event) {
    event.preventDefault(); const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setError(''); setSaved(false);
    if (data.password !== data.confirm) { setError('The new passwords do not match.'); return; }
    setBusy(true);
    try { await request('/api/admin/password', { method: 'POST', body: JSON.stringify(data) }); form.reset(); setSaved(true); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <AdminShell title="Account" description="Keep your admin account secure." email={email}>
    <form className="admin-panel admin-account" onSubmit={submit}><h2>Change password</h2><p className="admin-muted">Signed in as {email}. Changing your password signs out your other sessions.</p>
      <label>Current password<input type="password" name="currentPassword" autoComplete="current-password" required maxLength={256} /></label>
      <label>New password<input type="password" name="password" autoComplete="new-password" required minLength={12} maxLength={256} /></label>
      <label>Confirm new password<input type="password" name="confirm" autoComplete="new-password" required minLength={12} maxLength={256} /></label>
      <small>Use at least 12 characters.</small>
      {error && <p className="admin-error" role="alert">{error}</p>}{saved && <p className="admin-success" role="status">Your password has been changed.</p>}
      <button className="admin-primary" disabled={busy}>{busy ? 'Changing password…' : 'Change password'}</button>
    </form>
  </AdminShell>;
}
export const getServerSideProps = requireAdminPage;

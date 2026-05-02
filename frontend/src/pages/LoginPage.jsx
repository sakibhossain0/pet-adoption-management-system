import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      const loggedInUser = await login(form);
      const isAdmin = String(loggedInUser.user_type).toUpperCase() === 'ADMIN';
      const requestedPath = location.state?.from;
      const safeRequestedPath = requestedPath === '/dashboard' && !isAdmin ? '/' : requestedPath;
      navigate(safeRequestedPath || (isAdmin ? '/dashboard' : '/'), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Login failed. Check your email and password.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="section-shell py-12">
      <div className="mx-auto max-w-5xl rounded-[38px] bg-white p-8 shadow-card ring-1 ring-black/5 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] bg-gradient-to-br from-brand-pink via-brand-coral to-brand-yellow p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Welcome back</p>
            <h1 className="mt-4 text-4xl font-black">One login page for everyone.</h1>
            <p className="mt-5 leading-8 text-white/85">
              Regular users can browse and apply. Admin users are recognized by their saved admin account and are sent to the dashboard.
            </p>
          </div>
          <div>
            <SectionHeader
              eyebrow="Login"
              title="Sign in to Pawfect Match"
              description="Use the same login page for adopters, volunteers, and admins. There is no separate admin login."
            />
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                required
              />

              {error ? <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</p> : null}

              <button type="submit" className="btn-primary w-full" disabled={saving}>
                {saving ? 'Signing in...' : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              New here?{' '}
              <Link to="/register" className="font-bold text-brand-pink hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

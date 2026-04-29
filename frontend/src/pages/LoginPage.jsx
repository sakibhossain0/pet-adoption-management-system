import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [mode, setMode] = useState('adopter');

  function handleSubmit(event) {
    event.preventDefault();
    login(mode);
    navigate(location.state?.from || (mode === 'admin' ? '/dashboard' : '/'));
  }

  return (
    <div className="section-shell py-12">
      <div className="mx-auto max-w-5xl rounded-[38px] bg-white p-8 shadow-card ring-1 ring-black/5 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] bg-gradient-to-br from-brand-pink via-brand-coral to-brand-yellow p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Welcome back</p>
            <h1 className="mt-4 text-4xl font-black">Choose a demo login and explore the experience.</h1>
            <p className="mt-5 leading-8 text-white/85">
              The frontend is wired for simple demo access so you can quickly preview adopter and admin flows.
            </p>
          </div>
          <div>
            <SectionHeader
              eyebrow="Login"
              title="Enter the website"
              description="For this course project, login is presented as a simple demo role selector."
            />
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <input placeholder="Email" defaultValue={mode === 'admin' ? 'admin@pawfectmatch.com' : 'adopter@pawfectmatch.com'} />
              <input placeholder="Password" type="password" defaultValue="demo123" />
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode('adopter')}
                  className={`rounded-[24px] border px-5 py-4 text-left transition ${mode === 'adopter' ? 'border-brand-pink bg-rose-50 text-brand-pink' : 'border-slate-200 text-slate-600'}`}
                >
                  <p className="font-bold">Adopter</p>
                  <p className="mt-1 text-sm">Create account, browse pets, apply, take quiz.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('admin')}
                  className={`rounded-[24px] border px-5 py-4 text-left transition ${mode === 'admin' ? 'border-brand-pink bg-rose-50 text-brand-pink' : 'border-slate-200 text-slate-600'}`}
                >
                  <p className="font-bold">Admin</p>
                  <p className="mt-1 text-sm">Manage pets, shelters, foster parents, and records.</p>
                </button>
              </div>
              <button type="submit" className="btn-primary w-full">
                Continue as {mode === 'admin' ? 'Admin' : 'Adopter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

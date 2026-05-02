import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../contexts/AuthContext';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
  lifestyle_type: '',
  housing_type: '',
  availability: '',
  photo: null,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
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
      await register(form);
      navigate('/', { replace: true });
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      setError(firstError || err.response?.data?.message || 'Registration failed. Please check the form.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="section-shell py-12">
      <div className="mx-auto max-w-4xl rounded-[38px] bg-white p-8 shadow-card ring-1 ring-black/5 lg:p-10">
        <SectionHeader
          eyebrow="Register"
          title="Create your adopter account"
          description="Upload one profile photo, save your contact details, then browse and apply for pets."
          align="center"
        />

        <form className="mt-10 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <input placeholder="Full name" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
          <input placeholder="Phone" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
          <input className="md:col-span-2" type="email" placeholder="Email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(event) => updateField('password', event.target.value)} required minLength={6} />
          <input type="password" placeholder="Confirm password" value={form.password_confirmation} onChange={(event) => updateField('password_confirmation', event.target.value)} required minLength={6} />
          <select value={form.housing_type} onChange={(event) => updateField('housing_type', event.target.value)}>
            <option value="">Housing type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>House with yard</option>
          </select>
          <select value={form.lifestyle_type} onChange={(event) => updateField('lifestyle_type', event.target.value)}>
            <option value="">Lifestyle type</option>
            <option>Very active</option>
            <option>Balanced</option>
            <option>Mostly calm</option>
          </select>
          <input className="md:col-span-2" placeholder="Daily availability" value={form.availability} onChange={(event) => updateField('availability', event.target.value)} />
          <label className="md:col-span-2 rounded-2xl border border-dashed border-slate-300 bg-rose-50/40 p-5 text-sm font-semibold text-slate-600">
            Upload one profile picture
            <input className="mt-3 block w-full" type="file" accept="image/*" onChange={(event) => updateField('photo', event.target.files?.[0] || null)} />
          </label>

          {error ? <p className="md:col-span-2 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</p> : null}

          <button type="submit" className="btn-primary md:col-span-2" disabled={saving}>
            {saving ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-pink hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

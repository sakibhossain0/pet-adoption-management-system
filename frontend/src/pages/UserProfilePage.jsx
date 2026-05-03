import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CalendarCheck, Mail, Phone, UserRound } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../contexts/AuthContext';
import { getMyAdoptions } from '../services/contentService';
import { getMediaUrl } from '../utils/media';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  housing_type: '',
  lifestyle_type: '',
  skill_level: '',
  availability: '',
  password: '',
  photo: null,
};

export default function UserProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [adoptions, setAdoptions] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      housing_type: user.housing_type || '',
      lifestyle_type: user.lifestyle_type || '',
      skill_level: user.skill_level || '',
      availability: user.availability || '',
      password: '',
      photo: null,
    });
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) return;

    getMyAdoptions()
      .then(setAdoptions)
      .catch(() => setAdoptions([]));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: '/profile' }} />;
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      await updateProfile(form);
      setForm((current) => ({ ...current, password: '', photo: null }));
      setStatus({ type: 'success', message: 'Profile updated successfully.' });
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      setStatus({ type: 'error', message: firstError || err.response?.data?.message || 'Could not update profile.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="My profile"
        title="Manage your adopter profile and adoption history."
        description="Keep your contact details current so the shelter team can reach you quickly after an application is reviewed."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="soft-card h-fit">
          <div className="flex items-center gap-5">
            <img src={getMediaUrl(user.photo_url)} alt={user.name} className="h-24 w-24 rounded-[28px] object-cover" />
            <div>
              <h2 className="text-2xl font-black text-brand-navy">{user.name}</h2>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">{user.user_type || 'ADOPTER'}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-slate-600">
            <ProfileLine icon={Mail} label="Email" value={user.email} />
            <ProfileLine icon={Phone} label="Phone" value={user.phone || 'Not added'} />
            <ProfileLine icon={UserRound} label="Housing" value={user.housing_type || 'Not added'} />
            <ProfileLine icon={CalendarCheck} label="Availability" value={user.availability || 'Not added'} />
          </div>
        </aside>

        <section className="soft-card">
          <h2 className="text-2xl font-black text-brand-navy">Edit profile</h2>
          {status.message ? (
            <div className={`mt-5 rounded-2xl p-4 text-sm font-semibold ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
              {status.message}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input placeholder="Full name" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
            <input placeholder="Phone" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
            <input className="md:col-span-2" type="email" placeholder="Email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
            <select value={form.housing_type} onChange={(event) => updateField('housing_type', event.target.value)}>
              <option value="">Housing type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>House with yard</option>
            </select>
            <input placeholder="Lifestyle type" value={form.lifestyle_type} onChange={(event) => updateField('lifestyle_type', event.target.value)} />
            <input placeholder="Skill level" value={form.skill_level} onChange={(event) => updateField('skill_level', event.target.value)} />
            <input placeholder="Availability" value={form.availability} onChange={(event) => updateField('availability', event.target.value)} />
            <input type="password" placeholder="New password (optional)" value={form.password} onChange={(event) => updateField('password', event.target.value)} />
            <label className="md:col-span-2 text-sm font-bold text-slate-600">
              Upload new profile picture
              <input className="mt-2 w-full" type="file" accept="image/*" onChange={(event) => updateField('photo', event.target.files?.[0] || null)} />
            </label>
            <button type="submit" className="btn-primary md:col-span-2" disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </section>
      </div>

      <section className="mt-10 soft-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">Adoption history</p>
            <h2 className="mt-2 text-2xl font-black text-brand-navy">Approved adoptions</h2>
          </div>
          <Link to="/browse-pets" className="btn-secondary self-start sm:self-auto">Browse more pets</Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adoptions.length ? adoptions.map((adoption) => (
            <Link key={adoption.adoption_id} to={`/pets/${adoption.pet_id}`} className="rounded-[26px] border border-slate-100 p-4 transition hover:border-brand-pink hover:bg-rose-50">
              <div className="flex items-center gap-4">
                <img src={getMediaUrl(adoption.pet_photo_url)} alt={adoption.pet_name} className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <p className="text-lg font-black text-brand-navy">{adoption.pet_name || `Pet #${adoption.pet_id}`}</p>
                  <p className="text-sm text-slate-500">{adoption.breed || adoption.species || 'Adopted pet'}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">{adoption.adoption_date}</p>
                </div>
              </div>
            </Link>
          )) : (
            <p className="rounded-3xl bg-slate-50 p-5 text-slate-500 md:col-span-2 xl:col-span-3">
              No approved adoptions yet. When an admin approves an application, it will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function ProfileLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] bg-rose-50/70 p-4">
      <Icon className="h-5 w-5 text-brand-pink" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <p className="font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

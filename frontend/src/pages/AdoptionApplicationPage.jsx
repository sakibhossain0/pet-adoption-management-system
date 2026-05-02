import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { getPet, submitApplication } from '../services/contentService';
import { useAuth } from '../contexts/AuthContext';

const initialState = {
  name: '',
  phone: '',
  email: '',
  housingType: '',
  otherPets: '',
  dailyAvailability: '',
};

export default function AdoptionApplicationPage() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getPet(petId).then(setPet).catch(() => setPet(null));
  }, [petId]);

  useEffect(() => {
    if (user) {
      setFormData((current) => ({
        ...current,
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        housingType: user.housing_type || '',
      }));
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/apply/${petId}` } });
      return;
    }

    setSaving(true);
    setError('');

    try {
      await submitApplication({
        status: 'Pending',
        submission_date: new Date().toISOString().slice(0, 10),
        uid: user.uid,
        pet_id: Number(petId),
        applicant_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        housing_type: formData.housingType,
        other_pets: formData.otherPets,
        daily_availability: formData.dailyAvailability,
      });
      setSubmitted(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      setError(firstError || err.response?.data?.message || 'Could not submit application. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!pet) {
    return (
      <div className="section-shell py-16">
        <div className="soft-card text-center">
          <p className="text-slate-500">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="section-shell py-16">
        <div className="soft-card text-center">
          <h1 className="text-3xl font-black text-brand-navy">Login required</h1>
          <p className="mt-3 text-slate-600">Please login or register before applying to adopt {pet.name}.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login" state={{ from: `/apply/${petId}` }} className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Adoption application"
        title={`Apply to adopt ${pet.name}`}
        description="A clean, friendly form that collects the basics we need to review your application."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="soft-card space-y-8">
          <div>
            <h2 className="text-2xl font-black text-brand-navy">Personal details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Full name"
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                required
              />
              <input
                placeholder="Phone"
                value={formData.phone}
                onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                required
              />
              <input
                className="md:col-span-2"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-brand-navy">Lifestyle questions</h2>
            <div className="mt-5 grid gap-4">
              <select
                value={formData.housingType}
                onChange={(event) => setFormData((current) => ({ ...current, housingType: event.target.value }))}
                required
              >
                <option value="">Select housing type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>House with yard</option>
              </select>
              <select
                value={formData.otherPets}
                onChange={(event) => setFormData((current) => ({ ...current, otherPets: event.target.value }))}
                required
              >
                <option value="">Do you already have other pets?</option>
                <option>No</option>
                <option>Yes, one</option>
                <option>Yes, more than one</option>
              </select>
              <select
                value={formData.dailyAvailability}
                onChange={(event) => setFormData((current) => ({ ...current, dailyAvailability: event.target.value }))}
                required
              >
                <option value="">Daily availability</option>
                <option>Mostly at home</option>
                <option>Out for part of the day</option>
                <option>Out most of the day</option>
              </select>
            </div>
          </div>

          <div className="rounded-[28px] bg-rose-50 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">Applying for</p>
            <div className="mt-3 flex items-center gap-4">
              <img src={pet.photo} alt={pet.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div>
                <p className="text-2xl font-black text-brand-navy">{pet.name}</p>
                <p className="text-slate-600">{pet.species} · {pet.breed}</p>
              </div>
            </div>
          </div>

          {error ? <div className="rounded-[28px] bg-red-50 p-5 text-red-600">{error}</div> : null}

          <button type="submit" className="btn-primary w-full" disabled={saving || submitted}>
            {saving ? 'Submitting...' : submitted ? 'Application Submitted' : 'Submit Application'}
          </button>

          {submitted ? (
            <div className="rounded-[28px] bg-emerald-50 p-5 text-emerald-700">
              Your application is under review. We will contact you soon with next steps.
            </div>
          ) : null}
        </form>

        <div className="space-y-6">
          <div className="soft-card">
            <h3 className="text-2xl font-black text-brand-navy">Why families love adopting here</h3>
            <ul className="mt-5 space-y-4 text-slate-600">
              <li>• Gentle, beginner-friendly application flow.</li>
              <li>• Clear pet details with health history included.</li>
              <li>• Support from shelter teams before and after adoption.</li>
            </ul>
          </div>
          <div className="soft-card">
            <h3 className="text-2xl font-black text-brand-navy">Need more time?</h3>
            <p className="mt-4 leading-7 text-slate-600">
              You can always browse more pet profiles or take the quiz again to discover pets that better match your routine.
            </p>
            <button type="button" className="btn-secondary mt-6" onClick={() => navigate('/quiz')}>
              Back to the quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

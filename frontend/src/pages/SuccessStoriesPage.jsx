import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { createSuccessStory, getMyAdoptions, getSuccessStories } from '../services/contentService';
import { useAuth } from '../contexts/AuthContext';

const getInitialStory = () => ({
  title: '',
  story_text: '',
  date: new Date().toISOString().slice(0, 10),
  adoption_id: '',
  photo: null,
});

function adoptionLabel(adoption) {
  const petName = adoption.pet_name || `Pet #${adoption.pet_id || 'unknown'}`;
  const date = adoption.adoption_date ? ` — adopted ${adoption.adoption_date}` : '';
  return `${petName} (Adoption #${adoption.adoption_id})${date}`;
}

export default function SuccessStoriesPage() {
  const { isAuthenticated } = useAuth();
  const [stories, setStories] = useState([]);
  const [myAdoptions, setMyAdoptions] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(getInitialStory);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loadingAdoptions, setLoadingAdoptions] = useState(false);

  async function loadStories() {
    try {
      setStories(await getSuccessStories());
    } catch {
      setStories([]);
    }
  }

  async function loadMyAdoptions() {
    if (!isAuthenticated) {
      setMyAdoptions([]);
      setShowForm(false);
      setForm(getInitialStory());
      return;
    }

    setLoadingAdoptions(true);
    try {
      setMyAdoptions(await getMyAdoptions());
    } catch {
      setMyAdoptions([]);
    } finally {
      setLoadingAdoptions(false);
    }
  }

  useEffect(() => {
    loadStories();
  }, []);

  useEffect(() => {
    loadMyAdoptions();
  }, [isAuthenticated]);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!isAuthenticated) {
      setStatus({ type: 'error', message: 'Please log in before sharing a success story.' });
      return;
    }

    if (!myAdoptions.length) {
      setStatus({ type: 'error', message: 'You have not adopted any pet yet, so you cannot post a success story yet.' });
      return;
    }

    if (!form.adoption_id) {
      setStatus({ type: 'error', message: 'Please choose the adoption this success story belongs to.' });
      return;
    }

    try {
      await createSuccessStory(form);
      setForm(getInitialStory());
      setShowForm(false);
      setStatus({ type: 'success', message: 'Your success story has been shared.' });
      await loadStories();
    } catch (err) {
      const errors = err.response?.data?.errors;
      const firstError = errors ? Object.values(errors).flat()[0] : null;
      setStatus({ type: 'error', message: firstError || err.response?.data?.message || 'Could not share the story.' });
    }
  }

  const canShareStory = isAuthenticated && myAdoptions.length > 0;

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Success stories"
        title="Lives changed, families completed."
        description="Warm stories from adopters who opened their homes and found more love than they expected."
      />

      {status.message ? (
        <div className={`mt-8 rounded-3xl p-5 font-semibold ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
          {status.message}
        </div>
      ) : null}

      <div className="mt-8 text-center">
        {!isAuthenticated ? (
          <div className="mx-auto max-w-2xl rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5">
            <p className="text-slate-600">Everyone can read success stories, but you need an account and a completed adoption to post your own.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link to="/login" state={{ from: '/success-stories' }} className="btn-primary">
                Login to Share a Story
              </Link>
              <Link to="/register" className="btn-secondary">
                Create Account
              </Link>
            </div>
          </div>
        ) : loadingAdoptions ? (
          <p className="mx-auto max-w-2xl rounded-[28px] bg-white p-6 font-semibold text-slate-500 shadow-card ring-1 ring-black/5">
            Checking your adoptions...
          </p>
        ) : canShareStory ? (
          <button type="button" className="btn-primary" onClick={() => setShowForm((value) => !value)}>
            {showForm ? 'Close Story Form' : 'Share Your Story'}
          </button>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5">
            <p className="text-lg font-black text-brand-navy">You have not adopted any pet yet.</p>
            <p className="mt-2 text-slate-600">Once your adoption is completed, you will be able to post a success story linked to that adoption.</p>
            <Link to="/browse-pets" className="btn-secondary mt-5 inline-flex">
              Browse Pets
            </Link>
          </div>
        )}
      </div>

      {canShareStory && showForm ? (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-3xl rounded-[32px] bg-white p-6 shadow-card ring-1 ring-black/5">
          <h2 className="text-2xl font-black text-brand-navy">Share a success story</h2>
          <div className="mt-5 grid gap-4">
            <select
              value={form.adoption_id}
              onChange={(event) => updateField('adoption_id', event.target.value)}
              required
            >
              <option value="">Choose your adopted pet</option>
              {myAdoptions.map((adoption) => (
                <option key={adoption.adoption_id} value={adoption.adoption_id}>
                  {adoptionLabel(adoption)}
                </option>
              ))}
            </select>
            <input
              placeholder="Story title"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(event) => updateField('date', event.target.value)}
            />
            <textarea
              rows={6}
              placeholder="Write the story"
              value={form.story_text}
              onChange={(event) => updateField('story_text', event.target.value)}
              required
            />
            <label className="rounded-2xl border border-dashed border-slate-300 bg-rose-50/40 p-5 text-sm font-semibold text-slate-600">
              Upload one success story picture
              <input className="mt-3 block w-full" type="file" accept="image/*" onChange={(event) => updateField('photo', event.target.files?.[0] || null)} />
            </label>
          </div>
          <button type="submit" className="btn-primary mt-5">Submit Story</button>
        </form>
      ) : null}

      <div className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
        {stories.map((story) => (
          <div key={story.story_id} className="mb-6 break-inside-avoid">
            <SuccessStoryCard story={story} onSelect={setSelectedStory} />
          </div>
        ))}
      </div>

      {!stories.length ? (
        <p className="soft-card mt-8 text-center text-slate-500">No success stories have been shared yet.</p>
      ) : null}

      {selectedStory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[32px] bg-white p-6 shadow-2xl">
            <img src={selectedStory.image} alt={selectedStory.petName} className="h-80 w-full rounded-[28px] object-cover" />
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">{selectedStory.date}</p>
                <h2 className="mt-2 text-3xl font-black text-brand-navy">{selectedStory.title}</h2>
              </div>
              <button type="button" className="btn-secondary !px-4 !py-2" onClick={() => setSelectedStory(null)}>
                Close
              </button>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600">{selectedStory.fullText}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

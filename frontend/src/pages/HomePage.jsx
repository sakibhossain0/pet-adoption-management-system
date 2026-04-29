import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ClipboardCheck, Home, PawPrint, Search } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import PetCard from '../components/PetCard';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { getPets, getSuccessStories } from '../services/contentService';

const steps = [
  {
    title: 'Browse Pets',
    icon: Search,
    description: 'Discover pets by personality, breed, and readiness to join your family.',
  },
  {
    title: 'Apply to Adopt',
    icon: ClipboardCheck,
    description: 'Complete a simple application with your lifestyle and adoption preferences.',
  },
  {
    title: 'Take Them Home',
    icon: Home,
    description: 'Meet your match, complete the process, and welcome home your new best friend.',
  },
];

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getPets().then(setPets);
    getSuccessStories().then(setStories);
  }, []);

  const featuredPets = useMemo(() => pets.slice(0, 4), [pets]);

  return (
    <div>
      <HeroBanner />

      <section className="section-shell mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pets waiting for homes" value="124" accent="from-brand-pink to-brand-coral" />
        <StatCard label="Successful adoptions" value="1,206" accent="from-brand-yellow to-brand-coral" />
        <StatCard label="Partner shelters" value="18" accent="from-brand-blue to-brand-teal" />
        <StatCard label="Happy foster homes" value="54" accent="from-brand-teal to-brand-pink" />
      </section>

      <section className="section-shell mt-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured pets"
            title="Say hello to pets ready for cuddles, zoomies, and second chances."
            description="Each profile includes personality details, health history, and a direct path to apply."
          />
          <a href="/browse-pets" className="btn-secondary self-start lg:self-auto">
            See all pets <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {featuredPets.map((pet) => (
            <PetCard key={pet.pet_id} pet={pet} compact />
          ))}
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="rounded-[38px] bg-white p-8 shadow-card ring-1 ring-black/5 lg:p-10">
          <SectionHeader
            eyebrow="How it works"
            title="A simple, comforting adoption journey from click to cuddle."
            description="We designed the flow to feel welcoming, clear, and easy to understand for first-time adopters."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-[28px] bg-rose-50 p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-pink to-brand-coral text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Step {index + 1}</p>
                  <h3 className="mt-2 text-2xl font-black text-brand-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Success stories"
            title="Little stories of courage, comfort, and happily-ever-afters."
            description="A few heartwarming moments from families who found their perfect companion."
          />
          <a href="/success-stories" className="hidden btn-secondary lg:inline-flex">
            Explore all stories
          </a>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {stories.slice(0, 3).map((story) => (
            <SuccessStoryCard key={story.story_id} story={story} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="overflow-hidden rounded-[38px] bg-gradient-to-r from-brand-navy via-[#314c94] to-brand-blue p-10 text-white shadow-2xl">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
              <PawPrint className="h-4 w-4 text-brand-yellow" /> Ready to meet your new best friend?
            </div>
            <h2 className="text-4xl font-black leading-tight">Start your adoption journey with a profile that already feels like home.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Browse profiles, view health records, try the pet suggestion quiz, and move forward when the match feels right.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/browse-pets" className="btn-primary !bg-white !text-brand-navy hover:!bg-rose-50">Browse pets</a>
              <a href="/quiz" className="btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">Take the quiz</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

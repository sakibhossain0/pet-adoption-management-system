import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero.png';

export default function HeroBanner() {
  return (
    <section className="section-shell pt-10">
      <div className="grid items-center gap-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-rose-100 via-orange-50 to-sky-100 px-6 py-8 shadow-card lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-pink shadow-sm ring-1 ring-brand-pink/10">
            <Sparkles className="h-4 w-4" /> Warm hearts. Wagging tails. Forever homes.
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find your <span className="gradient-text">perfect pet companion</span> today.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore loving pets, learn their stories, and start an adoption journey that feels friendly, safe, and joyful from the very first click.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/browse-pets" className="btn-primary">
              Adopt a Pet
            </Link>
            <Link to="/success-stories" className="btn-secondary">
              Read Stories
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-brand-pink" /> Guided adoption support</span>
            <span className="inline-flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-brand-teal" /> Health record visibility</span>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="absolute -left-6 top-8 hidden rounded-[28px] bg-white/90 px-5 py-4 shadow-xl md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Admin managed</p>
            <p className="mt-1 text-2xl font-black text-brand-navy">Live data</p>
          </div>
          <img
            src={heroImage}
            alt="Happy family with an adopted pet"
            className="h-[420px] w-full rounded-[34px] object-cover shadow-2xl ring-1 ring-white/80"
          />
          <div className="absolute -bottom-6 right-4 rounded-[28px] bg-white px-5 py-4 shadow-xl ring-1 ring-black/5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Photo uploads</p>
            <p className="mt-1 text-lg font-black text-brand-navy">Pets, users, stories</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

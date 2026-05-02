import { Link } from 'react-router-dom';
import { Heart, Mail, MapPin, Phone, PawPrint } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-white">
      <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-brand-yellow">
              <PawPrint className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black">Pawfect Match</p>
              <p className="text-sm text-white/70">Where every wag starts a story</p>
            </div>
          </div>
          <p className="max-w-md leading-7 text-white/80">
            Built to help pets find loving families through clear information, caring design, and a gentle adoption journey.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <div className="space-y-3 text-white/80">
            <Link to="/" className="block hover:text-brand-yellow">Home</Link>
            <Link to="/browse-pets" className="block hover:text-brand-yellow">Browse Pets</Link>
            <Link to="/quiz" className="block hover:text-brand-yellow">Take the Quiz</Link>
            <Link to="/success-stories" className="block hover:text-brand-yellow">Success Stories</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Contact</h3>
          <div className="space-y-4 text-white/80">
            <p className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-brand-yellow" /> Dhanmondi, Dhaka, Bangladesh</p>
            <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-yellow" /> +880 1712 345 678</p>
            <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-brand-yellow" /> hello@pawfectmatch.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-3 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Pawfect Match. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">Made with <Heart className="h-4 w-4 text-brand-pink" /> for pets and people.</p>
        </div>
      </div>
    </footer>
  );
}

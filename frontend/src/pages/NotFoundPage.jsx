import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="section-shell py-20">
      <div className="soft-card text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">404</p>
        <h1 className="mt-4 text-4xl font-black text-brand-navy">This page wandered off.</h1>
        <p className="mt-4 text-slate-600">Try heading back home or browsing our pets again.</p>
        <Link to="/" className="btn-primary mt-8">Go Home</Link>
      </div>
    </div>
  );
}

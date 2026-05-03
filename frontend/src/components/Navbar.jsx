import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, HeartHandshake, Menu, PawPrint, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Browse Pets', to: '/browse-pets' },
  { label: 'Take the Quiz', to: '/quiz' },
  { label: 'Success Stories', to: '/success-stories' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-pink via-brand-coral to-brand-yellow text-white shadow-lg shadow-pink-200/60">
            <PawPrint className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-black text-brand-navy">Pawfect Match</p>
            <p className="text-xs font-medium text-slate-500">Adopt love, one paw at a time</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-white hover:text-brand-pink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAdmin ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-brand-pink text-white' : 'text-slate-600 hover:bg-white hover:text-brand-pink'
                }`
              }
            >
              Dashboard
            </NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-brand-navy shadow-sm ring-1 ring-black/5"
              >
                <HeartHandshake className="h-4 w-4 text-brand-pink" />
                {user.name}
                <ChevronDown className="h-4 w-4" />
              </button>
              {menuOpen ? (
                <div className="absolute right-0 mt-3 w-52 rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-black/5">
                  <div className="rounded-2xl bg-rose-50 px-4 py-3">
                    <p className="font-bold text-brand-navy">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="mt-2 block rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-rose-50 hover:text-brand-pink"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-2xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-rose-50 hover:text-brand-pink"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-navy shadow-sm ring-1 ring-black/5 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="section-shell pb-4 lg:hidden">
          <div className="glass rounded-[28px] p-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 font-semibold ${
                    isActive ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-rose-50 hover:text-brand-pink'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin ? (
              <NavLink
                to="/dashboard"
                className="block rounded-2xl px-4 py-3 font-semibold text-slate-700 hover:bg-rose-50 hover:text-brand-pink"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </NavLink>
            ) : null}
            <div className="mt-3 border-t border-slate-100 pt-3">
              {!user ? (
                <Link to="/login" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
              ) : (
                <div className="space-y-3">
                  <Link to="/profile" className="btn-secondary w-full" onClick={() => setMobileOpen(false)}>
                    Profile
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary w-full"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    Logout {user.name}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

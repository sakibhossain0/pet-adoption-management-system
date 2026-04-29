import { useEffect, useMemo, useState } from 'react';
import { Activity, HeartPulse, Home, PawPrint, ShieldCheck, Users } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { getDashboardData } from '../services/contentService';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const sections = [
  { key: 'pets', label: 'Manage Pets', icon: PawPrint },
  { key: 'shelters', label: 'Manage Shelters', icon: Home },
  { key: 'fosterParents', label: 'Manage Foster Parents', icon: Users },
  { key: 'applications', label: 'View Applications', icon: ShieldCheck },
  { key: 'medicalRecords', label: 'View Health Records', icon: HeartPulse },
  { key: 'activityLogs', label: 'View Activity Logs', icon: Activity },
];

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const [dashboard, setDashboard] = useState({ stats: [], pets: [], shelters: [], fosterParents: [], medicalRecords: [] });
  const [activeSection, setActiveSection] = useState('pets');

  useEffect(() => {
    getDashboardData().then(setDashboard);
  }, []);

  const sectionRows = useMemo(() => ({
    pets: dashboard.pets,
    shelters: dashboard.shelters,
    fosterParents: dashboard.fosterParents,
    applications: [
      { id: 1, applicant: 'Sakib Hossain', pet: 'Mochi', status: 'Pending' },
      { id: 2, applicant: 'Jerin Akter', pet: 'Pumpkin', status: 'Approved' },
    ],
    medicalRecords: dashboard.medicalRecords,
    activityLogs: [
      { id: 1, activity: 'Updated pet availability', time: '2026-04-25 09:00' },
      { id: 2, activity: 'Added new shelter profile', time: '2026-04-24 15:40' },
    ],
  }), [dashboard]);

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />;
  }

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Admin dashboard"
        title="A bright, efficient workspace for managing the adoption journey."
        description="Summary cards, quick tables, and focused actions keep admin work simple and fast."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat, index) => (
          <div key={stat.label} className="soft-card">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
            <p className="mt-3 text-4xl font-black text-brand-navy">{stat.value}</p>
            <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${index % 2 === 0 ? 'from-brand-pink to-brand-coral' : 'from-brand-blue to-brand-teal'}`} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[280px_1fr]">
        <aside className="soft-card h-fit">
          <div className="space-y-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`flex w-full items-center gap-3 rounded-[24px] px-4 py-3 text-left font-semibold transition ${
                    active ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-rose-50 hover:text-brand-pink'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="soft-card overflow-hidden">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">Current section</p>
              <h2 className="mt-2 text-3xl font-black text-brand-navy">
                {sections.find((section) => section.key === activeSection)?.label}
              </h2>
            </div>
            <button type="button" className="btn-primary">Add New</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead>
                <tr className="text-left text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  {Object.keys(sectionRows[activeSection][0] || { empty: '' }).map((key) => (
                    <th key={key} className="px-4 py-3">{formatHeading(key)}</th>
                  ))}
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {(sectionRows[activeSection] || []).map((row, index) => (
                  <tr key={row.id || row.pet_id || row.shid || row.fid || row.mid || index}>
                    {Object.values(row).map((value, valueIndex) => (
                      <td key={valueIndex} className="px-4 py-4">{String(value)}</td>
                    ))}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button type="button" className="rounded-full bg-rose-50 px-3 py-2 font-semibold text-brand-pink">Edit</button>
                        <button type="button" className="rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-600">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function formatHeading(value) {
  return value.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
}

export default function StatCard({ label, value, accent = 'from-pink-400 to-orange-300' }) {
  return (
    <div className="soft-card overflow-hidden">
      <div className={`mb-4 h-2 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-black text-brand-navy">{value}</p>
    </div>
  );
}

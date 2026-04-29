export default function SuccessStoryCard({ story, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(story)}
      className="group block w-full overflow-hidden rounded-[28px] bg-white text-left shadow-card ring-1 ring-black/5 transition hover:-translate-y-1"
    >
      <img src={story.image} alt={story.petName} className="h-64 w-full object-cover" />
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">{story.date}</p>
        <h3 className="mt-2 text-2xl font-black text-slate-900">{story.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{story.excerpt}</p>
      </div>
    </button>
  );
}

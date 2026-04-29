export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-pink shadow-sm ring-1 ring-brand-pink/10">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}

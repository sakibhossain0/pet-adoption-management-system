import { motion } from 'framer-motion';

export default function QuizCard({ question, currentIndex, total, onSelect }) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-3xl rounded-[32px] bg-white p-8 shadow-card ring-1 ring-black/5"
    >
      <div className="mb-6">
        <div className="mb-4 h-3 rounded-full bg-slate-100">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-brand-pink via-brand-coral to-brand-yellow"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          Question {currentIndex + 1} of {total}
        </p>
        <h2 className="mt-4 text-3xl font-black text-brand-navy">{question.question}</h2>
      </div>
      <div className="grid gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-left text-lg font-semibold text-slate-700 transition hover:border-brand-pink hover:bg-rose-50 hover:text-brand-pink"
            onClick={() => onSelect(question.key, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import QuizCard from '../components/QuizCard';
import PetCard from '../components/PetCard';
import { mockPets, quizQuestions } from '../data/mockData';

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const currentIndex = Object.keys(answers).length;
  const currentQuestion = quizQuestions[currentIndex];

  function handleAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  const results = useMemo(() => {
    if (currentIndex < quizQuestions.length) return [];

    return mockPets
      .map((pet) => {
        let score = 0;
        if (answers.activity === 'Very active' && pet.species === 'Dog') score += 2;
        if (answers.activity === 'Mostly calm' && pet.species === 'Cat') score += 2;
        if (answers.home === 'Apartment' && pet.species === 'Cat') score += 2;
        if (answers.home === 'House with yard' && pet.species === 'Dog') score += 2;
        if (answers.hours === 'Less than 4 hours' && String(pet.adopt_status).toLowerCase() === 'available') score += 1;
        return { ...pet, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers, currentIndex]);

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Pet suggestion quiz"
        title="Not sure which pet is right for you? Let us help."
        description="Answer a few friendly questions and we will suggest pets that match your home, routine, and energy level."
        align="center"
      />

      {!started ? (
        <div className="mx-auto mt-12 max-w-3xl rounded-[36px] bg-white p-10 text-center shadow-card ring-1 ring-black/5">
          <h2 className="text-4xl font-black text-brand-navy">Take the quiz</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Questions appear one at a time with animated transitions so the experience feels focused, easy, and fun.
          </p>
          <button type="button" className="btn-primary mt-8" onClick={() => setStarted(true)}>
            Start Quiz
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <QuizCard
              question={currentQuestion}
              currentIndex={currentIndex}
              total={quizQuestions.length}
              onSelect={handleAnswer}
            />
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-12">
          <div className="mx-auto max-w-4xl rounded-[36px] bg-white p-8 text-center shadow-card ring-1 ring-black/5">
            <h2 className="text-4xl font-black text-brand-navy">Your pawfect matches</h2>
            <p className="mt-4 text-lg text-slate-600">We picked a few pets whose needs and personalities fit your answers best.</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {results.map((pet) => (
              <div key={pet.pet_id}>
                <PetCard pet={pet} compact />
                <div className="mt-3 rounded-[24px] bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm ring-1 ring-black/5">
                  Suggested because your routine matches a {pet.species.toLowerCase()} with a {pet.temperament.toLowerCase()} personality.
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/browse-pets" className="btn-secondary">Explore all pets</Link>
          </div>
        </div>
      )}
    </div>
  );
}

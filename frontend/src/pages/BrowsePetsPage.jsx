import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FilterBar from '../components/FilterBar';
import PetCard from '../components/PetCard';
import { getPets } from '../services/contentService';
import { inAgeBucket, matchesSearch, normalizeStatus } from '../utils/petHelpers';

export default function BrowsePetsPage() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
    species: 'all',
    breed: 'all',
    age: 'all',
    status: 'all',
  });

  useEffect(() => {
    getPets().then(setPets);
  }, []);

  const breeds = useMemo(() => [...new Set(pets.map((pet) => pet.breed))], [pets]);

  const filteredPets = useMemo(
    () =>
      pets.filter((pet) => {
        const speciesMatch = filters.species === 'all' || pet.species === filters.species;
        const breedMatch = filters.breed === 'all' || pet.breed === filters.breed;
        const ageMatch = inAgeBucket(pet.age, filters.age);
        const statusMatch = filters.status === 'all' || normalizeStatus(pet.adopt_status) === normalizeStatus(filters.status);
        const searchMatch = matchesSearch(pet, filters.query);

        return speciesMatch && breedMatch && ageMatch && statusMatch && searchMatch;
      }),
    [pets, filters],
  );

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="section-shell py-12">
      <SectionHeader
        eyebrow="Browse pets"
        title="Meet playful paws, gentle whiskers, and future family members."
        description="Search by pet name, filter by species or age, and explore profiles in real time without reloading the page."
      />

      <div className="mt-10">
        <FilterBar filters={filters} breeds={breeds} onChange={updateFilter} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Showing {filteredPets.length} adorable matches
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPets.map((pet) => (
          <PetCard key={pet.pet_id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

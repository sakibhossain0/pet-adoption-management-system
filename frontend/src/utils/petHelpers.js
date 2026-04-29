export function normalizeStatus(status = '') {
  return String(status).trim().toLowerCase();
}

export function statusBadgeClass(status = '') {
  const value = normalizeStatus(status);

  if (value === 'available') return 'bg-emerald-100 text-emerald-700';
  if (value === 'pending') return 'bg-amber-100 text-amber-700';
  if (value === 'fostered') return 'bg-sky-100 text-sky-700';
  return 'bg-slate-100 text-slate-700';
}

export function matchesSearch(pet, query) {
  if (!query) return true;
  const target = `${pet.name} ${pet.breed} ${pet.species}`.toLowerCase();
  return target.includes(query.toLowerCase());
}

export function inAgeBucket(age, bucket) {
  if (!bucket || bucket === 'all') return true;
  if (bucket === 'baby') return age <= 1;
  if (bucket === 'young') return age >= 2 && age <= 4;
  if (bucket === 'adult') return age >= 5;
  return true;
}

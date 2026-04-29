export default function FilterBar({ filters, breeds, onChange }) {
  return (
    <div className="glass rounded-[30px] p-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <input
          type="text"
          placeholder="Search by pet name"
          value={filters.query}
          onChange={(event) => onChange('query', event.target.value)}
        />
        <select value={filters.species} onChange={(event) => onChange('species', event.target.value)}>
          <option value="all">All species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <select value={filters.breed} onChange={(event) => onChange('breed', event.target.value)}>
          <option value="all">All breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <select value={filters.age} onChange={(event) => onChange('age', event.target.value)}>
          <option value="all">All ages</option>
          <option value="baby">0 - 1 year</option>
          <option value="young">2 - 4 years</option>
          <option value="adult">5+ years</option>
        </select>
        <select value={filters.status} onChange={(event) => onChange('status', event.target.value)}>
          <option value="all">All statuses</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Fostered">Fostered</option>
        </select>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { statusBadgeClass } from '../utils/petHelpers';

export default function PetCard({ pet, compact = false, onEdit, onDelete }) {
  const canManage = Boolean(onEdit || onDelete);

  return (
    <article className="group relative overflow-hidden rounded-[30px] bg-white shadow-card ring-1 ring-black/5 transition hover:-translate-y-1">
      <div className="relative">
        <img src={pet.photo} alt={pet.name} className={`w-full object-cover ${compact ? 'h-56' : 'h-72'}`} />
        <div className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold ${statusBadgeClass(pet.adopt_status)}`}>
          {pet.adopt_status}
        </div>
        {canManage ? (
          <div className="absolute right-4 top-4 flex gap-2">
            {onEdit ? (
              <button type="button" className="rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:text-brand-pink" onClick={() => onEdit(pet)} aria-label={`Edit ${pet.name}`}>
                <Pencil className="h-4 w-4" />
              </button>
            ) : null}
            {onDelete ? (
              <button type="button" className="rounded-full bg-white/90 p-2 text-slate-700 shadow-sm transition hover:text-red-500" onClick={() => onDelete(pet)} aria-label={`Delete ${pet.name}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">{pet.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">{pet.breed}</p>
          </div>
          <div className="rounded-2xl bg-rose-50 px-3 py-2 text-right text-sm font-semibold text-brand-pink">
            {pet.age || 0} yrs<br />{pet.gender || 'Unknown'}
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{pet.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            {pet.species}
          </span>
          <Link to={`/pets/${pet.pet_id}`} className="btn-secondary !px-4 !py-2.5">
            {compact ? 'Meet Me' : 'View Profile'}
          </Link>
        </div>
      </div>
    </article>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HeartPulse, MapPin, PawPrint, ShieldPlus } from 'lucide-react';
import { getFosterParents, getMedicalRecordsByPetId, getPet, getPets, getShelters } from '../services/contentService';
import { statusBadgeClass } from '../utils/petHelpers';
import PetCard from '../components/PetCard';

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shelters, setShelters] = useState([]);
  const [fosterParents, setFosterParents] = useState([]);
  const [records, setRecords] = useState([]);
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPet(id), getShelters(), getFosterParents(), getMedicalRecordsByPetId(id), getPets()])
      .then(([petData, shelterData, fosterParentData, recordData, petList]) => {
        setPet(petData);
        setShelters(shelterData);
        setFosterParents(fosterParentData);
        setRecords(recordData);
        setAllPets(petList);
      })
      .catch(() => setPet(null))
      .finally(() => setLoading(false));
  }, [id]);

  const shelter = useMemo(() => shelters.find((item) => String(item.shid) === String(pet?.shid)), [pet, shelters]);
  const fosterParent = useMemo(
    () => fosterParents.find((item) => String(item.fid) === String(pet?.fid)),
    [pet, fosterParents],
  );
  const similarPets = useMemo(
    () => allPets.filter((item) => item.pet_id !== pet?.pet_id && item.species === pet?.species).slice(0, 3),
    [allPets, pet],
  );

  if (loading) {
    return (
      <div className="section-shell py-20">
        <div className="soft-card text-center text-slate-500">Loading pet profile...</div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="section-shell py-20">
        <div className="soft-card text-center">
          <h1 className="text-3xl font-black text-brand-navy">Pet profile not found</h1>
          <p className="mt-3 text-slate-600">We could not find this pet profile. Try browsing the pets page again.</p>
          <Link to="/browse-pets" className="btn-primary mt-6">Back to browse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-[36px] bg-white shadow-card ring-1 ring-black/5">
          <img src={pet.photo} alt={pet.name} className="h-full min-h-[480px] w-full object-cover" />
        </div>

        <div className="soft-card">
          <div className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${statusBadgeClass(pet.adopt_status)}`}>
            {pet.adopt_status}
          </div>
          <h1 className="mt-5 text-4xl font-black text-brand-navy">{pet.name}</h1>
          <p className="mt-2 text-lg font-semibold text-slate-500">{pet.species} · {pet.breed}</p>
          <p className="mt-5 text-base leading-8 text-slate-600">{pet.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoChip icon={PawPrint} label="Age" value={`${pet.age} years`} />
            <InfoChip icon={PawPrint} label="Gender" value={pet.gender} />
            <InfoChip icon={HeartPulse} label="Temperament" value={pet.temperament} />
            <InfoChip icon={MapPin} label="Shelter" value={shelter?.shelter_name || `Shelter #${pet.shid}`} />
          </div>

          {normalizeAvailability(pet.adopt_status) ? (
            <Link to={`/apply/${pet.pet_id}`} className="btn-primary mt-8 w-full">
              Apply to Adopt
            </Link>
          ) : (
            <div className="mt-8 rounded-[28px] bg-slate-50 p-5 text-center font-semibold text-slate-600">
              {String(pet.adopt_status).toLowerCase() === 'adopted'
                ? 'This pet has already been adopted.'
                : 'Applications are not open for this pet right now.'}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="soft-card">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-rose-50 p-3 text-brand-pink">
              <ShieldPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-brand-navy">Health Records</h2>
              <p className="text-slate-500">Vaccinations, checkups, and recent treatments for peace of mind.</p>
            </div>
          </div>
          <div className="space-y-4">
            {records.length ? (
              records.map((record) => (
                <div key={record.mid} className="rounded-[26px] border border-slate-100 bg-rose-50/60 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-brand-navy">{record.treatment}</h3>
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600">৳ {record.cost}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-brand-pink">{record.date}</p>
                  {record.note ? <p className="mt-3 text-sm leading-6 text-slate-600">{record.note}</p> : null}
                </div>
              ))
            ) : (
              <p className="rounded-3xl bg-slate-50 p-5 text-slate-500">No health records available yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {fosterParent ? (
            <div className="soft-card">
              <h2 className="text-2xl font-black text-brand-navy">Foster Parent</h2>
              <p className="mt-4 text-lg font-semibold text-slate-700">{fosterParent.name}</p>
              <p className="mt-2 text-slate-500">{fosterParent.phone}</p>
              <p className="mt-2 text-slate-500">{fosterParent.address}</p>
            </div>
          ) : null}

          <div className="soft-card">
            <h2 className="text-2xl font-black text-brand-navy">Similar Pets</h2>
            <div className="mt-5 space-y-4">
              {similarPets.map((similarPet) => (
                <Link
                  key={similarPet.pet_id}
                  to={`/pets/${similarPet.pet_id}`}
                  className="flex items-center gap-4 rounded-[24px] border border-slate-100 p-3 transition hover:border-brand-pink hover:bg-rose-50"
                >
                  <img src={similarPet.photo} alt={similarPet.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <p className="text-lg font-black text-brand-navy">{similarPet.name}</p>
                    <p className="text-sm text-slate-500">{similarPet.breed} · {similarPet.age} yrs</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-pink">More furry friends</p>
            <h2 className="mt-2 text-3xl font-black text-brand-navy">You may also love</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {similarPets.map((similarPet) => (
            <PetCard key={similarPet.pet_id} pet={similarPet} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[26px] bg-rose-50/70 p-4">
      <div className="flex items-center gap-3 text-brand-pink">
        <Icon className="h-4 w-4" />
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      </div>
      <p className="mt-3 text-lg font-semibold text-slate-700">{value}</p>
    </div>
  );
}

function normalizeAvailability(status) {
  return String(status).toLowerCase() === 'available';
}

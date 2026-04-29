import apiClient from './apiClient';
import {
  adminStatsFallback,
  mockFosterParents,
  mockMedicalRecords,
  mockPets,
  mockShelters,
  mockSuccessStories,
} from '../data/mockData';

function withFallback(request, fallback) {
  return request
    .then((response) => response.data)
    .catch(() => fallback);
}

export function getPets() {
  return withFallback(apiClient.get('/pets'), mockPets);
}

export function getPet(id) {
  return getPets().then((pets) => pets.find((pet) => String(pet.pet_id) === String(id)) || null);
}

export function getShelters() {
  return withFallback(apiClient.get('/shelters'), mockShelters);
}

export function getFosterParents() {
  return withFallback(apiClient.get('/foster-parents'), mockFosterParents);
}

export function getMedicalRecords() {
  return withFallback(apiClient.get('/medical-records'), mockMedicalRecords);
}

export function getMedicalRecordsByPetId(petId) {
  return getMedicalRecords().then((records) => records.filter((record) => String(record.pet_id) === String(petId)));
}

export function getSuccessStories() {
  return Promise.resolve(mockSuccessStories);
}

export function submitApplication(payload) {
  return apiClient.post('/applications', payload).then((response) => response.data).catch(() => ({
    message: 'Application saved locally for demo mode.',
    data: payload,
  }));
}

export async function getDashboardData() {
  const [pets, shelters, fosterParents, medicalRecords] = await Promise.all([
    getPets(),
    getShelters(),
    getFosterParents(),
    getMedicalRecords(),
  ]);

  const availablePets = pets.filter((pet) => String(pet.adopt_status).toLowerCase() === 'available').length;

  return {
    stats: [
      { label: 'Total Pets', value: pets.length || adminStatsFallback[0].value },
      { label: 'Available Pets', value: availablePets || adminStatsFallback[1].value },
      { label: 'Shelters', value: shelters.length || 2 },
      { label: 'Health Records', value: medicalRecords.length || 3 },
    ],
    pets,
    shelters,
    fosterParents,
    medicalRecords,
  };
}

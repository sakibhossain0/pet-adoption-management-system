import apiClient from './apiClient';
import { toPetView, toStoryView } from '../utils/media';

function extractData(response) {
  return response.data?.data ?? response.data;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function formDataFromObject(payload) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    formData.append(key, value);
  });
  return formData;
}

function hasFile(payload) {
  return Object.values(payload || {}).some((value) => value instanceof File);
}

export async function listResource(path) {
  const response = await apiClient.get(path);
  return asArray(extractData(response));
}

export async function createResource(path, payload) {
  const body = hasFile(payload) ? formDataFromObject(payload) : payload;
  const response = await apiClient.post(path, body);
  return extractData(response);
}

export async function updateResource(path, id, payload) {
  const body = hasFile(payload) ? formDataFromObject({ ...payload, _method: 'PUT' }) : payload;
  const response = hasFile(payload)
    ? await apiClient.post(`${path}/${id}`, body)
    : await apiClient.put(`${path}/${id}`, body);
  return extractData(response);
}

export async function deleteResource(path, id) {
  const response = await apiClient.delete(`${path}/${id}`);
  return response.data;
}

export async function getPets() {
  const pets = await listResource('/pets');
  return pets.map(toPetView);
}

export async function getPet(id) {
  const response = await apiClient.get(`/pets/${id}`);
  return toPetView(extractData(response));
}

export function getShelters() {
  return listResource('/shelters');
}

export function getFosterParents() {
  return listResource('/foster-parents');
}

export function getUsers() {
  return listResource('/users');
}

export function getApplications() {
  return listResource('/applications');
}

export function getMyAdoptions() {
  return listResource('/my-adoptions');
}

export function getMedicalRecords() {
  return listResource('/medical-records');
}

export function getActivityLogs() {
  return listResource('/activity-logs');
}

export async function getMedicalRecordsByPetId(petId) {
  const records = await getMedicalRecords();
  return records.filter((record) => String(record.pet_id) === String(petId));
}

export async function getSuccessStories() {
  const stories = await listResource('/success-stories');
  return stories.map(toStoryView);
}

export async function createSuccessStory(payload) {
  const story = await createResource('/success-stories', payload);
  return toStoryView(story);
}

export async function submitApplication(payload) {
  return createResource('/applications', payload);
}

export async function getDashboardData() {
  const [pets, shelters, fosterParents, medicalRecords, users, applications, stories, activityLogs] = await Promise.all([
    getPets(),
    getShelters(),
    getFosterParents(),
    getMedicalRecords(),
    getUsers(),
    getApplications(),
    getSuccessStories(),
    getActivityLogs(),
  ]);

  const availablePets = pets.filter((pet) => String(pet.adopt_status).toLowerCase() === 'available').length;

  return {
    stats: [
      { label: 'Total Pets', value: pets.length },
      { label: 'Available Pets', value: availablePets },
      { label: 'Users', value: users.length },
      { label: 'Applications', value: applications.length },
    ],
    pets,
    shelters,
    fosterParents,
    medicalRecords,
    users,
    applications,
    stories,
    activityLogs,
  };
}

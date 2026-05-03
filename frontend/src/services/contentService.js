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

async function safeList(promise) {
  try {
    return await promise;
  } catch {
    return [];
  }
}

export async function listResource(path) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await apiClient.get(`${path}${separator}_=${Date.now()}`);
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
  const response = await apiClient.get(`/pets/${id}?_=${Date.now()}`);
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

export function getAdoptions() {
  return listResource('/adoptions');
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
  const [pets, shelters, fosterParents, medicalRecords, users, applications, stories, activityLogs, adoptions] = await Promise.all([
    safeList(getPets()),
    safeList(getShelters()),
    safeList(getFosterParents()),
    safeList(getMedicalRecords()),
    safeList(getUsers()),
    safeList(getApplications()),
    safeList(getSuccessStories()),
    safeList(getActivityLogs()),
    safeList(getAdoptions()),
  ]);

  const availablePets = pets.filter((pet) => String(pet.adopt_status).toLowerCase() === 'available').length;
  const pendingApplications = applications.filter((application) => String(application.status).toLowerCase() === 'pending').length;

  return {
    stats: [
      { label: 'Total Pets', value: pets.length },
      { label: 'Available Pets', value: availablePets },
      { label: 'Pending Applications', value: pendingApplications },
      { label: 'Total Adoptions', value: adoptions.length },
    ],
    pets,
    shelters,
    fosterParents,
    medicalRecords,
    users,
    applications,
    stories,
    activityLogs,
    adoptions,
  };
}

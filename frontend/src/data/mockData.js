export const mockPets = [
  {
    pet_id: 1,
    name: 'Mochi',
    age: 2,
    gender: 'Female',
    breed: 'Golden Retriever',
    temperament: 'Playful, affectionate, loves kids',
    adopt_status: 'Available',
    species: 'Dog',
    shid: 1,
    fid: 1,
    photo:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Mochi is a bright and sweet dog who loves soft toys, gentle walks, and cuddle time after dinner. She settles quickly at home and enjoys meeting new friends.',
  },
  {
    pet_id: 2,
    name: 'Pumpkin',
    age: 1,
    gender: 'Male',
    breed: 'Domestic Short Hair',
    temperament: 'Curious, gentle, independent',
    adopt_status: 'Available',
    species: 'Cat',
    shid: 1,
    fid: null,
    photo:
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Pumpkin likes window naps, crunchy treats, and quiet afternoons. He would be happiest in a calm home with lots of sunny spots.',
  },
  {
    pet_id: 3,
    name: 'Biscuit',
    age: 3,
    gender: 'Male',
    breed: 'Beagle Mix',
    temperament: 'Friendly, alert, food-motivated',
    adopt_status: 'Pending',
    species: 'Dog',
    shid: 2,
    fid: null,
    photo:
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Biscuit is a happy explorer with a nose for adventures. He thrives with structure, puzzle toys, and people who enjoy outdoor walks.',
  },
  {
    pet_id: 4,
    name: 'Daisy',
    age: 4,
    gender: 'Female',
    breed: 'Persian Mix',
    temperament: 'Soft, calm, cuddly',
    adopt_status: 'Fostered',
    species: 'Cat',
    shid: 2,
    fid: 2,
    photo:
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80',
    ],
    description:
      'Daisy is a gentle soul who enjoys brushing, naps, and soft music. She is currently in foster care and adapting beautifully.',
  },
];

export const mockShelters = [
  {
    shid: 1,
    shelter_name: 'Paw Haven Center',
    contact_no: '01710000000',
    address: 'Dhanmondi, Dhaka',
    capacity: 48,
  },
  {
    shid: 2,
    shelter_name: 'Sunbeam Rescue House',
    contact_no: '01720000000',
    address: 'Banani, Dhaka',
    capacity: 36,
  },
];

export const mockFosterParents = [
  {
    fid: 1,
    name: 'Raisa Karim',
    phone: '01850000001',
    address: 'Mirpur DOHS, Dhaka',
    housing_capacity: 2,
    experience: 3,
  },
  {
    fid: 2,
    name: 'Nafis Hasan',
    phone: '01850000002',
    address: 'Uttara, Dhaka',
    housing_capacity: 1,
    experience: 2,
  },
];

export const mockMedicalRecords = [
  {
    mid: 1,
    treatment: 'Core vaccination',
    cost: 1500,
    date: '2026-04-19',
    pet_id: 1,
    note: 'Healthy response after observation.',
  },
  {
    mid: 2,
    treatment: 'General checkup',
    cost: 900,
    date: '2026-03-11',
    pet_id: 1,
    note: 'Weight and appetite normal.',
  },
  {
    mid: 3,
    treatment: 'Dental cleaning',
    cost: 1200,
    date: '2026-02-08',
    pet_id: 4,
    note: 'Follow-up recommended in six months.',
  },
];

export const mockSuccessStories = [
  {
    story_id: 1,
    title: 'From shy paws to sofa naps',
    date: '2026-02-18',
    excerpt:
      'Luna spent her first week hiding behind the curtains. Now she races to greet us every evening and sleeps beside our daughter.',
    image:
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=900&q=80',
    fullText:
      'Adopting Luna changed the rhythm of our home in the best possible way. Her confidence grew little by little, and every small milestone felt magical.',
    petName: 'Luna',
  },
  {
    story_id: 2,
    title: 'A hiking buddy named Bruno',
    date: '2026-01-05',
    excerpt:
      'Bruno was nervous in the shelter, but once he discovered the river trail near our home, his whole personality opened up.',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    fullText:
      'Bruno now leads our sunrise walks and greets every neighbor like an old friend. The adoption team helped us feel ready from day one.',
    petName: 'Bruno',
  },
  {
    story_id: 3,
    title: 'Tiny paws, huge happiness',
    date: '2025-12-12',
    excerpt:
      'Milo brought laughter into our apartment and quickly became the king of cardboard boxes and cozy blankets.',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80',
    fullText:
      'Every adoption has a story, but Milo made ours feel like a fairytale. He turned even the quietest evenings into something joyful.',
    petName: 'Milo',
  },
];

export const quizQuestions = [
  {
    id: 1,
    question: 'How active is your daily lifestyle?',
    key: 'activity',
    options: ['Very active', 'Balanced', 'Mostly calm'],
  },
  {
    id: 2,
    question: 'What kind of home do you live in?',
    key: 'home',
    options: ['Apartment', 'House with balcony', 'House with yard'],
  },
  {
    id: 3,
    question: 'How many hours are you away from home most days?',
    key: 'hours',
    options: ['Less than 4 hours', '4 to 8 hours', 'More than 8 hours'],
  },
];

export const adminStatsFallback = [
  { label: 'Total Pets', value: 24 },
  { label: 'Available Pets', value: 15 },
  { label: 'Pending Applications', value: 6 },
  { label: 'Total Adoptions', value: 42 },
];

export const adminSections = [
  'Manage Pets',
  'Manage Shelters',
  'Manage Foster Parents',
  'View Applications',
  'View Health Records',
  'View Activity Logs',
];

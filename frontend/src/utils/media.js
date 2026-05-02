import { getApiOrigin } from '../services/apiClient';

export const imagePlaceholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffe4ec"/>
          <stop offset="100%" stop-color="#dbeafe"/>
        </linearGradient>
      </defs>
      <rect width="900" height="650" fill="url(#g)"/>
      <circle cx="450" cy="280" r="90" fill="#ffffff" opacity="0.85"/>
      <circle cx="395" cy="245" r="22" fill="#ff7da9"/>
      <circle cx="505" cy="245" r="22" fill="#ff7da9"/>
      <path d="M405 320 Q450 360 495 320" stroke="#243b74" stroke-width="18" fill="none" stroke-linecap="round"/>
      <text x="450" y="470" text-anchor="middle" font-family="Arial" font-size="34" fill="#243b74" font-weight="700">No image uploaded</text>
    </svg>`);

export function getMediaUrl(path) {
  if (!path) return imagePlaceholder;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/storage')) return `${getApiOrigin()}${path}`;
  if (path.startsWith('storage/')) return `${getApiOrigin()}/${path}`;
  return path;
}

export function toStoryView(story = {}) {
  const text = story.story_text || story.fullText || '';
  return {
    ...story,
    image: getMediaUrl(story.photo_url || story.image),
    excerpt: story.excerpt || text.slice(0, 140),
    fullText: text,
    petName: story.petName || story.title || 'Success story',
  };
}

export function toPetView(pet = {}) {
  return {
    ...pet,
    photo: getMediaUrl(pet.photo_url || pet.photo),
    description: pet.description || 'No description has been added for this pet yet.',
  };
}

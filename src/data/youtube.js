import { SOCIAL_LINKS } from './seo';

export const YOUTUBE_CHANNEL_URL = SOCIAL_LINKS.youtube;
export const YOUTUBE_CHANNEL_ID = 'UCoPmuFF2V1iSoZk-79MDa7Q';

/** Recent videos from @ahmedabad_pest_control — update list when you publish new ones */
export const youtubeVideos = [
  {
    id: 'adDKxCRREiU',
    title: 'Deewar Se Udai Nikal Rahi Hai? | Professional Termite Treatment',
  },
  {
    id: 'E0-OqQhgAGI',
    title: 'Udai Ghar Ko Andar Se Kha Rahi Hai! | Termite Problem',
  },
  {
    id: 'g9oYRwpltEc',
    title: 'Red Ants Se Pareshan? | Professional Ant Treatment',
  },
  {
    id: '30huJ9BnA5k',
    title: 'Cockroach Se Pareshan? | Professional Cockroach Treatment',
  },
  {
    id: 'M9FrXuyxKEQ',
    title: 'Ghar Mein Chipkali Se Pareshan? | Lizard Control',
  },
  {
    id: 'ZxLfH-6Blsw',
    title: 'Khatmal Se Pareshan? | Bed Bug Treatment',
  },
  {
    id: 'el23Itu66zc',
    title: 'Machhar Se Savdhan! Dengue, Malaria Ka Risk',
  },
  {
    id: 'jCMdP7S1C_I',
    title: 'Kabutaron Se Pareshan? | Pigeon Problem Ka Smart Solution',
  },
];

export function getYoutubeThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function getYoutubeWatchUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function getYoutubeEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

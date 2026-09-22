export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') || 'https://perspective-photo-final.vercel.app';
export const nav = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/mur', label: 'Sur mon mur' },
  { href: '/atelier', label: 'L’atelier' },
];
export const social = {
  youtube: 'https://www.youtube.com/@joelgourlain',
  facebook: 'https://www.facebook.com/joelgourlain',
};

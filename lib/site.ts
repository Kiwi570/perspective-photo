export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') || 'https://perspective-photo-final.vercel.app';
export const nav = [
  { href: '/galerie', label: 'Galerie' },
  { href: '/mur', label: 'Sur mon mur' },
  { href: '/atelier', label: 'L’atelier' },
  { href: '/contact', label: 'Contact' },
];
/** À CONFIRMER avec Joël : délai de fabrication et politique d'expédition affichés sur les fiches. */
export const production = {
  delay: 'sous 2 à 3 semaines',
  shipping: 'Livraison offerte en France et en Europe, emballage renforcé',
};
export const legal = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/conditions-de-vente', label: 'Conditions de vente et livraison' },
  { href: '/carte-cadeau', label: 'Carte cadeau' },
];
/** À CONFIRMER avec Joël avant publication : adresse qui reçoit les demandes de sélection. */
export const contact = {
  email: 'contact@perspectivephoto.fr',
  firstName: 'Joël',
};
export const social = {
  youtube: 'https://www.youtube.com/@joelgourlain',
  facebook: 'https://www.facebook.com/joelgourlain',
};

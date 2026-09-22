import type { MetadataRoute } from 'next';
import { photos } from '@/lib/photos';
import { siteUrl } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/galerie', '/mur', '/atelier', '/contact', '/carte-cadeau', '/mentions-legales', '/conditions-de-vente', ...photos.map((photo) => `/oeuvre/${photo.slug}`)].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === '' ? 'monthly' : 'yearly',
      priority: route === '' ? 1 : route.startsWith('/oeuvre/') ? 0.8 : 0.9,
    }),
  );
}

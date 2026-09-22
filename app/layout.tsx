import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteUrl } from '@/lib/site';

import './globals.css';

const geist = localFont({ src: './fonts/geist-latin.woff2', variable: '--font-geist', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Perspective Photo — Éditions limitées', template: '%s — Perspective Photo' },
  description:
    'Photographies d’art de Joël Gourlain en édition limitée à trente exemplaires, signées et numérotées.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Perspective Photo — Une œuvre, pas un poster',
    description: 'Photographies d’art en édition limitée, signées et numérotées.',
    images: [{ url: '/media/ny-skyline.jpg', width: 1168, height: 784 }],
  },
  twitter: { card: 'summary_large_image', images: ['/media/ny-skyline.jpg'] },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { themeColor: '#090a0c', colorScheme: 'dark' };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Joël Gourlain',
  jobTitle: 'Photographe',
  address: { '@type': 'PostalAddress', addressLocality: 'Le Havre', addressCountry: 'FR' },
  brand: { '@type': 'Brand', name: 'Perspective Photo' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}

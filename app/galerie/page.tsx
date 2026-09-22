import type { Metadata } from 'next';

import { GalleryExplorer } from '@/components/gallery-explorer';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Quatorze photographies d’art en édition limitée : concerts, New York, Le Havre, Caraïbes, Cyclades et portraits.',
};

export default function GalleryPage() {
  return (
    <main id="main">
      <section className="grid-lines px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <p className="eyebrow">La galerie</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-semibold leading-[.82] tracking-[-.07em]">
            Toutes les <span className="text-acid">éditions.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/52">
            Quatorze photographies, trente exemplaires chacune. Parcourez-les en grille ou comme une
            exposition horizontale.
          </p>
        </div>
      </section>
      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <GalleryExplorer />
        </div>
      </section>
    </main>
  );
}

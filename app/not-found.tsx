import Link from 'next/link';

import { Lines } from '@/components/motion/lines';

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div className="hero-seq">
        <p className="eyebrow" style={{ animationDelay: '60ms' }}>
          Page introuvable
        </p>
        <h1 className="mt-5 text-7xl font-semibold tracking-[-.06em]">
          <Lines lines={['Cette image est hors cadre.']} />
        </h1>
        <p className="mt-5 text-white/48" style={{ animationDelay: '300ms' }}>
          Revenez à la galerie pour reprendre l’exposition.
        </p>
        <div className="mt-8" style={{ animationDelay: '420ms' }}>
          <Link href="/galerie" className="button-acid">
            Voir les œuvres
          </Link>
        </div>
      </div>
    </main>
  );
}

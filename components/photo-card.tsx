import { ArrowUpRight, Ruler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Tilt } from '@/components/motion/tilt';
import { euro, type Photo, universes } from '@/lib/photos';

export function PhotoCard({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
  return (
    <article className="group relative">
      {/* Lien rapide vers le simulateur, hors du lien principal (visible au survol, toujours visible en tactile) */}
      <Link
        href={`/mur?w=${photo.slug}`}
        className="absolute left-4 top-4 z-20 inline-flex h-9 items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-white opacity-0 backdrop-blur transition-[opacity,background-color,border-color,transform] duration-500 ease-out-expo hover:border-acid hover:bg-acid hover:text-night group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        aria-label={`Voir ${photo.title} sur mon mur`}
      >
        <Ruler className="size-3.5" /> Sur mon mur
      </Link>
      <Tilt className="relative overflow-hidden rounded-[1.25rem] bg-carbon">
        <Link
          href={`/oeuvre/${photo.slug}`}
          className={`relative block ${photo.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
        >
          <Image
            src={photo.image}
            alt={photo.title}
            fill
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.06]"
          />
          {photo.isNew ? (
            <span className="absolute right-4 top-4 rounded-full bg-acid px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-night">
              Nouveauté
            </span>
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
            <div className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[.15em] text-acid">
                {universes[photo.universe]}
              </p>
              <h3 className="mt-1 text-xl font-semibold">{photo.title}</h3>
              <p className="mt-1 text-xs text-white/56">Dès {euro(190)} · édition de 30</p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-black/30 backdrop-blur transition-all duration-500 ease-out-expo group-hover:border-acid group-hover:bg-acid group-hover:text-night">
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </Tilt>
    </article>
  );
}

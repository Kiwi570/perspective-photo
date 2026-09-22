'use client';

import { Grid3X3, Heart, Rows3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { euro, photos, universes } from '@/lib/photos';

const groups = [
  ['all', 'Tout'],
  ['concert', 'Concerts'],
  ['newyork', 'New York'],
  ['havrenuit', 'Le Havre'],
  ['voyage', 'Voyages'],
  ['creatif', 'Créatif & portraits'],
] as const;

const groupMap: Record<string, string[]> = {
  all: Object.keys(universes),
  concert: ['concert'],
  newyork: ['newyork', 'street'],
  havrenuit: ['havrenuit'],
  voyage: ['caraibes', 'cyclades', 'nature'],
  creatif: ['creatif', 'portraits'],
};

export function GalleryExplorer() {
  const [group, setGroup] = useState('all');
  const [mode, setMode] = useState<'grid' | 'rail'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const visible = useMemo(() => photos.filter((photo) => groupMap[group].includes(photo.universe)), [group]);
  function toggle(slug: string) {
    setFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-white/10 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {groups.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setGroup(key)}
              aria-pressed={group === key}
              className={`chip ${group === key ? 'is-on' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex rounded-full border border-white/14 p-1">
          <button
            type="button"
            onClick={() => setMode('grid')}
            aria-pressed={mode === 'grid'}
            aria-label="Vue en grille"
            className={`mode-button ${mode === 'grid' ? 'is-on' : ''}`}
          >
            <Grid3X3 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setMode('rail')}
            aria-pressed={mode === 'rail'}
            aria-label="Vue immersive"
            className={`mode-button ${mode === 'rail' ? 'is-on' : ''}`}
          >
            <Rows3 className="size-4" />
          </button>
        </div>
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[.15em] text-white/34">
        {visible.length} œuvre{visible.length > 1 ? 's' : ''} · {favorites.length} favori
        {favorites.length > 1 ? 's' : ''}
      </p>
      {mode === 'grid' ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((photo) => (
            <article key={photo.slug} className="group relative">
              <Link
                href={`/oeuvre/${photo.slug}`}
                className={`relative block overflow-hidden rounded-[1.25rem] bg-carbon ${photo.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[9px] uppercase tracking-[.14em] text-acid">
                    {universes[photo.universe]}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">{photo.title}</h2>
                  <p className="mt-1 text-xs text-white/52">Dès {euro(190)}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => toggle(photo.slug)}
                aria-pressed={favorites.includes(photo.slug)}
                aria-label={`${favorites.includes(photo.slug) ? 'Retirer' : 'Ajouter'} ${photo.title} des favoris`}
                className={`absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-black/60 backdrop-blur ${favorites.includes(photo.slug) ? 'text-coral' : 'text-white'}`}
              >
                <Heart className="size-5" fill={favorites.includes(photo.slug) ? 'currentColor' : 'none'} />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex snap-x gap-5 overflow-x-auto pb-5">
          {visible.map((photo) => (
            <Link
              key={photo.slug}
              href={`/oeuvre/${photo.slug}`}
              className="group relative aspect-[3/4] min-w-[78vw] snap-center overflow-hidden rounded-[1.5rem] bg-carbon sm:min-w-[45vw] lg:min-w-[30vw]"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="80vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="eyebrow">{universes[photo.universe]}</p>
                <h2 className="mt-2 text-3xl font-semibold">{photo.title}</h2>
                <p className="mt-2 font-mono text-[10px] text-white/46">{photo.place} · édition de 30</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { euro, type Photo, universes } from '@/lib/photos';

export function PhotoCard({ photo, priority = false }: { photo: Photo; priority?: boolean }) {
  return (
    <article className="group">
      <Link
        href={`/oeuvre/${photo.slug}`}
        className={`relative block overflow-hidden rounded-[1.25rem] bg-carbon ${photo.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
      >
        <Image
          src={photo.image}
          alt={photo.title}
          fill
          priority={priority}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        {photo.isNew ? (
          <span className="absolute left-4 top-4 rounded-full bg-acid px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-night">
            Nouveauté
          </span>
        ) : null}
        <span className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent opacity-75" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-acid">
              {universes[photo.universe]}
            </p>
            <h3 className="mt-1 text-xl font-semibold">{photo.title}</h3>
            <p className="mt-1 text-xs text-white/56">Dès {euro(190)} · édition de 30</p>
          </div>
          <ArrowUpRight className="size-5 shrink-0" />
        </div>
      </Link>
    </article>
  );
}

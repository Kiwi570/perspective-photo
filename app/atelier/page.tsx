import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, Camera, MapPin, Printer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { social } from '@/lib/site';

export const metadata: Metadata = {
  title: 'L’atelier',
  description:
    'Joël Gourlain, photographe au Havre : reportages, tirages Fine Art, aluminium Dibond et éditions limitées.',
};

const faq = [
  {
    q: 'Pourquoi trente exemplaires ?',
    a: 'Tous formats et supports confondus, chaque photographie est limitée à trente tirages. Une fois le dernier vendu, l’édition est close.',
  },
  {
    q: 'Quand le tirage est-il réalisé ?',
    a: 'À la commande. Il est ensuite contrôlé, signé, numéroté et accompagné de son certificat.',
  },
  {
    q: 'Papier ou aluminium ?',
    a: 'Le papier offre un rendu mat et doux, à encadrer. L’aluminium est plus contemporain, plus contrasté et arrive prêt à accrocher.',
  },
];

export default function StudioPage() {
  return (
    <main id="main">
      <section className="grid-lines px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow">L’atelier</p>
            <h1 className="mt-6 text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[.82] tracking-[-.07em]">
              Le photographe,
              <br />
              <span className="text-acid">le tirage, l’édition.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/52">
              Joël Gourlain photographie les concerts, les villes et les voyages tels qu’ils arrivent : sans
              mise en scène, avec la lumière disponible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/galerie" className="button-acid">
                Voir les œuvres
              </Link>
              <a href={social.youtube} target="_blank" rel="noreferrer" className="button-ghost">
                YouTube <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/media/portrait.jpg"
              alt="Joël Gourlain, photographe"
              fill
              priority
              sizes="(max-width:1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-fog px-5 py-20 text-night sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [Camera, 'Pris sur le vif', 'Reportage, scène et voyage sans mise en scène.'],
              [Printer, 'Tiré à la commande', 'Fine Art Hahnemühle ou aluminium Dibond.'],
              [BadgeCheck, 'Édition contrôlée', 'Signée, numérotée et close au trentième exemplaire.'],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Camera;
              return (
                <article key={title as string} className="rounded-[1.5rem] bg-white p-8">
                  <I className="size-6" />
                  <h2 className="mt-7 text-3xl font-semibold">{title as string}</h2>
                  <p className="mt-4 text-sm leading-7 text-night/52">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/media/signature-main.jpg"
              alt="Signature d’un tirage"
              width={1168}
              height={784}
              className="aspect-square rounded-[1.5rem] object-cover"
            />
            <Image
              src="/media/certificat.jpg"
              alt="Certificat d’authenticité"
              width={1168}
              height={784}
              className="mt-12 aspect-square rounded-[1.5rem] object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Le dos du tirage</p>
            <h2 className="mt-5 text-[clamp(3.5rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">
              Ce qui transforme une image en œuvre.
            </h2>
            <p className="mt-7 text-base leading-8 text-white/52">
              Le titre, le numéro sur trente, la date et la signature de l’auteur sont inscrits au dos. Le
              certificat reprend les caractéristiques du tirage.
            </p>
            <p className="mt-7 flex items-center gap-3 text-sm font-bold">
              <MapPin className="size-5 text-acid" /> Préparé et signé au Havre
            </p>
          </div>
        </div>
      </section>
      <section className="bg-carbon px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1000px]">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-[-.05em]">Ce qu’il faut savoir.</h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold">{item.q}</summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

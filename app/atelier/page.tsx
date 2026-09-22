import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, Camera, MapPin, Plus, Printer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
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

const pillars = [
  { icon: Camera, title: 'Pris sur le vif', text: 'Reportage, scène et voyage sans mise en scène.' },
  { icon: Printer, title: 'Tiré à la commande', text: 'Fine Art Hahnemühle ou aluminium Dibond.' },
  { icon: BadgeCheck, title: 'Édition contrôlée', text: 'Signée, numérotée et close au trentième exemplaire.' },
];

export default function StudioPage() {
  return (
    <main id="main">
      <Spotlight className="grid-lines overflow-clip px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="hero-seq">
            <p className="eyebrow" style={{ animationDelay: '60ms' }}>
              L’atelier
            </p>
            <h1 className="mt-6 text-[clamp(4rem,8vw,8.5rem)] font-semibold leading-[.82] tracking-[-.07em]">
              <Lines
                lines={[
                  'Le photographe,',
                  <span key="accent" className="text-acid">
                    le tirage, l’édition.
                  </span>,
                ]}
              />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/52" style={{ animationDelay: '440ms' }}>
              Joël Gourlain photographie les concerts, les villes et les voyages tels qu’ils arrivent : sans
              mise en scène, avec la lumière disponible.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animationDelay: '560ms' }}>
              <Link href="/galerie" className="button-acid">
                Voir les œuvres
              </Link>
              <a href={social.youtube} target="_blank" rel="noreferrer" className="button-ghost">
                YouTube <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="anim-scale relative aspect-[4/3] overflow-clip rounded-[2rem] bg-carbon" style={{ animationDelay: '240ms' }}>
            <Image
              src="/media/portrait.jpg"
              alt="Joël Gourlain, photographe"
              fill
              priority
              sizes="(max-width:1024px) 100vw, 55vw"
              className="parallax object-cover"
            />
          </div>
        </div>
      </Spotlight>
      <section className="bg-fog px-5 py-20 text-night sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <Reveal stagger={140} y={36} className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-[1.5rem] bg-white p-8 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(9,10,12,0.12)]"
              >
                <span className="grid size-12 place-items-center rounded-full bg-fog transition-colors duration-500 group-hover:bg-acid">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-7 text-3xl font-semibold">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-night/52">{text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-2">
          <Reveal stagger={180} y={48} className="grid grid-cols-2 gap-4">
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
          </Reveal>
          <Reveal stagger={110} delay={120}>
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
          </Reveal>
        </div>
      </section>
      <section className="bg-carbon px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1000px]">
          <Reveal stagger={110}>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-.05em]">Ce qu’il faut savoir.</h2>
          </Reveal>
          <Reveal stagger={110} y={20} className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold transition-colors duration-300 hover:text-acid">
                  {item.q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 transition-[transform,border-color,background-color] duration-500 ease-out-expo group-open:rotate-45 group-open:border-acid group-open:bg-acid group-open:text-night">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48">{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

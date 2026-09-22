import { ArrowRight, BadgeCheck, Box, Ruler, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Counter } from '@/components/motion/counter';
import { Lines } from '@/components/motion/lines';
import { Marquee } from '@/components/motion/marquee';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { PhotoCard } from '@/components/photo-card';
import { photos, universes } from '@/lib/photos';

const featured = ['judith-hill', 'skyline', 'diamant'].map((slug) =>
  photos.find((photo) => photo.slug === slug)!,
);

const proofs = [
  { icon: BadgeCheck, title: 'exemplaires', text: 'Tous formats confondus', count: 30 },
  { icon: ShieldCheck, title: 'Certificat signé', text: 'Numéroté et daté' },
  { icon: Box, title: 'Livraison offerte', text: 'France et Europe' },
  { icon: Ruler, title: 'Projection à l’échelle', text: 'Avant de choisir' },
];

export default function HomePage() {
  return (
    <main id="main">
      <Spotlight className="grid-lines relative overflow-clip px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1500px] items-center gap-10 lg:grid-cols-[.82fr_1.18fr]">
          <div className="hero-seq relative z-10">
            <p className="eyebrow" style={{ animationDelay: '60ms' }}>
              Éditions limitées · Signées · Numérotées
            </p>
            <h1 className="mt-7 text-[clamp(4rem,9vw,9.5rem)] font-semibold leading-[.79] tracking-[-.075em]">
              <Lines
                lines={[
                  'Une œuvre,',
                  <span key="accent" className="text-acid">
                    pas un poster.
                  </span>,
                ]}
              />
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/56" style={{ animationDelay: '460ms' }}>
              Des photographies prises sur le vif, éditées à trente exemplaires seulement. Choisissez l’image,
              le format et le support — puis voyez-la à l’échelle chez vous.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animationDelay: '580ms' }}>
              <Link href="/galerie" className="button-acid">
                Entrer dans la galerie <ArrowRight className="size-4" />
              </Link>
              <Link href="/mur" className="button-ghost">
                <Ruler className="size-4" /> Voir sur mon mur
              </Link>
            </div>
          </div>
          <div className="relative min-h-[420px] lg:min-h-[650px]">
            <div className="anim-scale absolute inset-0 overflow-clip rounded-[2rem] bg-carbon" style={{ animationDelay: '220ms' }}>
              <Image
                src="/media/ny-skyline.jpg"
                alt="Skyline de Manhattan depuis Brooklyn"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="parallax object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            </div>
            <div
              className="anim-rise absolute bottom-6 left-6 right-6 flex flex-col gap-4 rounded-2xl border border-white/14 bg-black/60 p-5 backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between"
              style={{ animationDelay: '820ms' }}
            >
              <div>
                <p className="eyebrow">New York</p>
                <h2 className="mt-2 text-2xl font-semibold">Skyline depuis Brooklyn</h2>
                <p className="mt-1 font-mono text-[10px] text-white/48">Édition de 30 · à partir de 190 €</p>
              </div>
              <Link href="/oeuvre/skyline" className="button-white">
                Voir l’œuvre
              </Link>
            </div>
          </div>
        </div>
      </Spotlight>

      <Marquee
        items={[...Object.values(universes), 'Édition de 30', 'Signé au dos']}
        className="border-y border-white/10 py-4 font-mono text-[10px] uppercase tracking-[.22em] text-white/60"
      />

      <section className="border-b border-white/10 bg-carbon px-5 py-7 sm:px-8 lg:px-12">
        <Reveal stagger={90} y={18} className="mx-auto grid max-w-[1500px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {proofs.map(({ icon: Icon, title, text, count }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="size-5 text-acid" />
              <p className="text-sm">
                <b className="block">
                  {count ? (
                    <>
                      <Counter to={count} /> {title}
                    </>
                  ) : (
                    title
                  )}
                </b>
                <span className="text-white/60">{text}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <Reveal stagger={140} className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <p className="eyebrow">À la une</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[.86] tracking-[-.06em]">
                Entrez par ce qui vous parle.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-8 text-white/48">
              Concerts, villes, voyages ou portraits : chaque univers garde la lumière du moment où l’image a
              été prise.
            </p>
          </Reveal>
          <Reveal stagger={130} y={40} className="mt-14 grid gap-5 md:grid-cols-3">
            {featured.map((photo, index) => (
              <PhotoCard key={photo.slug} photo={photo} priority={index === 0} />
            ))}
          </Reveal>
          <Reveal delay={200}>
            <Link href="/galerie" className="button-ghost mt-10">
              Parcourir les 14 éditions <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-fog px-5 py-20 text-night sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal scale={0.96} y={0} className="relative aspect-[16/10] overflow-clip rounded-[2rem] bg-white">
            <Image
              src="/media/chez-vous.jpg"
              alt="Tirage photographique présenté dans un intérieur"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="parallax object-cover"
            />
            <div className="absolute bottom-5 left-5 rounded-full bg-acid px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.12em]">
              Simulation à l’échelle
            </div>
          </Reveal>
          <Reveal stagger={110} delay={120}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em]">Sur mon mur</p>
            <h2 className="mt-5 text-[clamp(3.3rem,6vw,6rem)] font-semibold leading-[.86] tracking-[-.06em]">
              Décidez avec vos yeux.
            </h2>
            <p className="mt-7 text-base leading-8 text-night/58">
              Testez une œuvre, quatre formats, deux supports, plusieurs couleurs de mur et deux ambiances
              lumineuses. Vous voyez immédiatement la bonne proportion.
            </p>
            <div className="mt-8">
              <Link href="/mur" className="button-acid">
                Ouvrir le simulateur <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

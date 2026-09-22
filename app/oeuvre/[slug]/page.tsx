import type { Metadata } from 'next';
import { ArrowLeft, BadgeCheck, Box, Clock3, PenLine, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { PhotoCard } from '@/components/photo-card';
import { ProductConfigurator } from '@/components/product-configurator';
import { photoBySlug, photos, universes } from '@/lib/photos';
import { production } from '@/lib/site';

export function generateStaticParams() {
  return photos.map((photo) => ({ slug: photo.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) return {};
  return {
    title: photo.title,
    description: `${photo.story} Photographie de Joël Gourlain en édition limitée.`,
    openGraph: { type: 'website', title: photo.title, description: photo.story, images: [photo.image] },
    twitter: { card: 'summary_large_image', images: [photo.image] },
  };
}

export default async function PhotoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const photo = photoBySlug(slug);
  if (!photo) notFound();
  const related = photos
    .filter((item) => item.slug !== photo.slug && item.universe === photo.universe)
    .slice(0, 3);
  const more = related.length >= 2 ? related : photos.filter((item) => item.slug !== photo.slug).slice(0, 3);
  return (
    <main id="main">
      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <Link
            href="/galerie"
            className="anim-fade group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-white/60 transition-colors hover:text-acid"
          >
            <ArrowLeft className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />{' '}
            Retour à la galerie
          </Link>
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div
              className={`anim-scale relative overflow-hidden rounded-[1.5rem] bg-carbon ${photo.orientation === 'portrait' ? 'aspect-[4/5] lg:max-h-[820px]' : 'aspect-[4/3]'}`}
              style={{ animationDelay: '80ms' }}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
              />
              <div
                className="anim-rise absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-2 font-mono text-[9px] text-white/62 backdrop-blur"
                style={{ animationDelay: '700ms' }}
              >
                {photo.place} · Joël Gourlain
              </div>
            </div>
            <div className="hero-seq lg:sticky lg:top-28">
              <p className="eyebrow" style={{ animationDelay: '120ms' }}>
                {universes[photo.universe]}
              </p>
              <h1 className="mt-5 text-[clamp(3.6rem,6vw,6.5rem)] font-semibold leading-[.86] tracking-[-.06em]">
                <Lines lines={[photo.title]} delay={200} />
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/55" style={{ animationDelay: '420ms' }}>
                {photo.story}
              </p>
              <div
                className="mt-7 grid gap-2 rounded-xl border border-white/10 bg-carbon p-5 text-xs"
                style={{ animationDelay: '520ms' }}
              >
                <p className="flex items-center gap-3">
                  <BadgeCheck className="size-4 text-acid" /> Édition limitée à 30 exemplaires, tous formats
                  confondus
                </p>
                <p className="flex items-center gap-3">
                  <PenLine className="size-4 text-acid" /> Signée, numérotée et datée au dos
                </p>
                <p className="flex items-center gap-3">
                  <ShieldCheck className="size-4 text-acid" /> Certificat d’authenticité inclus
                </p>
                <p className="flex items-center gap-3">
                  <Clock3 className="size-4 text-acid" /> Tiré à la commande, expédié {production.delay}
                </p>
                <p className="flex items-center gap-3">
                  <Box className="size-4 text-acid" /> {production.shipping}
                </p>
              </div>
              <div className="mt-8" style={{ animationDelay: '640ms' }}>
                <ProductConfigurator photo={photo} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-fog px-5 py-20 text-night sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <Reveal stagger={160} y={40} className="grid gap-8 lg:grid-cols-2">
            <article className="group rounded-[1.5rem] bg-white p-8 transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(9,10,12,0.12)]">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/media/fineart.jpg"
                  alt="Texture du papier Fine Art"
                  width={784}
                  height={1168}
                  className="aspect-[16/8] w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <h2 className="mt-7 text-3xl font-semibold">Fine Art Hahnemühle</h2>
              <p className="mt-3 text-sm leading-7 text-night/55">
                Papier coton 308 g, mat et légèrement texturé. Profondeur douce, encres pigmentaires et marge
                blanche pour la signature.
              </p>
            </article>
            <article className="group rounded-[1.5rem] bg-night p-8 text-white transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(9,10,12,0.25)]">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/media/dibond.jpg"
                  alt="Chant d’une plaque aluminium Dibond"
                  width={784}
                  height={1168}
                  className="aspect-[16/8] w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <h2 className="mt-7 text-3xl font-semibold">Aluminium Dibond</h2>
              <p className="mt-3 text-sm leading-7 text-white/52">
                Contrecollage sur plaque composite de 3 mm. Un rendu plus contrasté, contemporain et prêt à
                accrocher.
              </p>
            </article>
          </Reveal>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <Reveal stagger={120}>
            <p className="eyebrow">Dans le même regard</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-.05em]">Continuez l’exposition.</h2>
          </Reveal>
          <Reveal stagger={130} y={40} className="mt-10 grid gap-5 md:grid-cols-3">
            {more.map((item) => (
              <PhotoCard key={item.slug} photo={item} />
            ))}
          </Reveal>
        </div>
      </section>
      <section className="border-y border-white/10 bg-carbon px-5 py-9 sm:px-8 lg:px-12">
        <Reveal
          y={16}
          className="mx-auto flex max-w-[1450px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-center gap-3 text-lg font-semibold">
            <Box className="size-5 text-acid" /> Livraison offerte · emballage renforcé
          </p>
          <Link href="/atelier" className="button-ghost">
            Comprendre le tirage
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

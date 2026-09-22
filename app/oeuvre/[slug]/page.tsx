import type { Metadata } from 'next';
import { ArrowLeft, BadgeCheck, Box, PenLine, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PhotoCard } from '@/components/photo-card';
import { ProductConfigurator } from '@/components/product-configurator';
import { photoBySlug, photos, universes } from '@/lib/photos';

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
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-white/42 hover:text-acid"
          >
            <ArrowLeft className="size-4" /> Retour à la galerie
          </Link>
          <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div
              className={`relative overflow-hidden rounded-[1.5rem] bg-carbon ${photo.orientation === 'portrait' ? 'aspect-[4/5] lg:max-h-[820px]' : 'aspect-[4/3]'}`}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-2 font-mono text-[9px] text-white/62 backdrop-blur">
                {photo.place} · Joël Gourlain
              </div>
            </div>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">{universes[photo.universe]}</p>
              <h1 className="mt-5 text-[clamp(3.6rem,6vw,6.5rem)] font-semibold leading-[.86] tracking-[-.06em]">
                {photo.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/55">{photo.story}</p>
              <div className="mt-7 grid gap-2 rounded-xl border border-white/10 bg-carbon p-5 text-xs">
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
              </div>
              <div className="mt-8">
                <ProductConfigurator photo={photo} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-fog px-5 py-20 text-night sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[1.5rem] bg-white p-8">
              <Image
                src="/media/fineart.jpg"
                alt="Texture du papier Fine Art"
                width={784}
                height={1168}
                className="aspect-[16/8] w-full rounded-xl object-cover"
              />
              <h2 className="mt-7 text-3xl font-semibold">Fine Art Hahnemühle</h2>
              <p className="mt-3 text-sm leading-7 text-night/55">
                Papier coton 308 g, mat et légèrement texturé. Profondeur douce, encres pigmentaires et marge
                blanche pour la signature.
              </p>
            </article>
            <article className="rounded-[1.5rem] bg-night p-8 text-white">
              <Image
                src="/media/dibond.jpg"
                alt="Chant d’une plaque aluminium Dibond"
                width={784}
                height={1168}
                className="aspect-[16/8] w-full rounded-xl object-cover"
              />
              <h2 className="mt-7 text-3xl font-semibold">Aluminium Dibond</h2>
              <p className="mt-3 text-sm leading-7 text-white/52">
                Contrecollage sur plaque composite de 3 mm. Un rendu plus contrasté, contemporain et prêt à
                accrocher.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <p className="eyebrow">Dans le même regard</p>
          <h2 className="mt-5 text-5xl font-semibold tracking-[-.05em]">Continuez l’exposition.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {more.map((item) => (
              <PhotoCard key={item.slug} photo={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-carbon px-5 py-9 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1450px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-lg font-semibold">
            <Box className="size-5 text-acid" /> Livraison offerte · emballage renforcé
          </p>
          <Link href="/atelier" className="button-ghost">
            Comprendre le tirage
          </Link>
        </div>
      </section>
    </main>
  );
}

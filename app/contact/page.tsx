import type { Metadata } from 'next';
import { ArrowUpRight, Heart, Mail, MapPin, Ruler } from 'lucide-react';
import Link from 'next/link';

import { ContactForm } from '@/components/contact-form';
import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { contact, social } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une œuvre, une sélection, une carte cadeau ou un projet : écrivez à Joël Gourlain, photographe au Havre.',
};

const ways = [
  {
    icon: Heart,
    title: 'Une œuvre vous plaît ?',
    text: 'Ajoutez-la à votre sélection depuis la galerie ou sa fiche : la barre en bas de page prépare la demande avec le format et le prix.',
    href: '/galerie',
    label: 'Voir la galerie',
  },
  {
    icon: Ruler,
    title: 'Un doute sur la taille ?',
    text: 'Testez l’œuvre à l’échelle dans une pièce type, ou sur la photo de votre propre mur, avant d’écrire.',
    href: '/mur',
    label: 'Ouvrir le simulateur',
  },
];

export default function ContactPage() {
  return (
    <main id="main">
      <Spotlight className="grid-lines px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="hero-seq mx-auto max-w-[1450px]">
          <p className="eyebrow" style={{ animationDelay: '60ms' }}>
            Contact
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.07em]">
            <Lines
              lines={[
                'Parlons de',
                <span key="accent" className="text-acid">
                  votre mur.
                </span>,
              ]}
            />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60" style={{ animationDelay: '420ms' }}>
            Disponibilité d’une édition, choix d’un format, carte cadeau ou projet particulier : Joël répond
            directement, depuis Le Havre.
          </p>
        </div>
      </Spotlight>
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Reveal stagger={140} y={24} className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-carbon p-6 sm:p-8">
              <p className="control-label">Direct</p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-4 flex items-center gap-3 text-xl font-semibold transition-colors hover:text-acid"
              >
                <Mail className="size-5 text-acid" /> {contact.email}
              </a>
              <p className="mt-5 flex items-center gap-3 text-sm text-white/60">
                <MapPin className="size-4 text-acid" /> Tirages préparés et signés au Havre
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={social.youtube} target="_blank" rel="noreferrer" className="button-ghost">
                  YouTube <ArrowUpRight className="size-4" />
                </a>
                <a href={social.facebook} target="_blank" rel="noreferrer" className="button-ghost">
                  Facebook <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
            {ways.map(({ icon: Icon, title, text, href, label }) => (
              <div key={title} className="rounded-[1.5rem] border border-white/10 p-6 sm:p-8">
                <Icon className="size-5 text-acid" />
                <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                <Link href={href} className="button-ghost mt-5">
                  {label}
                </Link>
              </div>
            ))}
          </Reveal>
          <Reveal scale={0.985} y={24} delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

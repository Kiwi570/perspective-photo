import type { Metadata } from 'next';
import { Gift, Mail } from 'lucide-react';
import Link from 'next/link';

import { Lines } from '@/components/motion/lines';
import { Reveal } from '@/components/motion/reveal';
import { Spotlight } from '@/components/motion/spotlight';
import { euro, formats } from '@/lib/photos';
import { contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Carte cadeau',
  description: 'Offrez une photographie d’art en édition limitée : la carte cadeau laisse le choix de l’image, du format et du support.',
};

const steps = [
  ['01', 'Choisissez un montant', 'Le prix d’un format, ou une somme libre.'],
  ['02', 'Recevez la carte', 'Envoyée par e-mail, prête à imprimer ou à transférer, avec son numéro unique.'],
  ['03', 'L’œuvre est choisie', 'Le destinataire sélectionne l’image, le format et le support ; le tirage est réalisé et signé pour lui.'],
];

export default function GiftCardPage() {
  return (
    <main id="main">
      <Spotlight className="grid-lines px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="hero-seq mx-auto max-w-[1450px]">
          <p className="eyebrow" style={{ animationDelay: '60ms' }}>
            Carte cadeau
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-semibold leading-[.84] tracking-[-.07em]">
            <Lines
              lines={[
                'Offrez le choix,',
                <span key="accent" className="text-acid">
                  pas un poster.
                </span>,
              ]}
            />
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60" style={{ animationDelay: '420ms' }}>
            La carte cadeau vaut pour n’importe quelle édition, format et support. Celui ou celle qui la
            reçoit choisit son image, et peut la voir à l’échelle sur son propre mur avant de décider.
          </p>
        </div>
      </Spotlight>
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <Reveal stagger={120} y={30} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((format) => {
              const subject = encodeURIComponent(`Carte cadeau — ${euro(format.price)}`);
              const body = encodeURIComponent(
                `Bonjour ${contact.firstName},\n\nJe souhaite offrir une carte cadeau de ${euro(format.price)} (valeur d’un tirage ${format.label} sur papier Fine Art).\n\nNom du destinataire : \nMessage à joindre : \n\nMerci de m’indiquer la marche à suivre.\n`,
              );
              return (
                <a
                  key={format.label}
                  href={`mailto:${contact.email}?subject=${subject}&body=${body}`}
                  className="group flex min-h-[240px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-carbon p-6 transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-acid hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
                >
                  <Gift className="size-5 text-acid transition-transform duration-700 ease-out-expo group-hover:-rotate-12" />
                  <div>
                    <p className="text-4xl font-semibold tracking-[-.04em]">{euro(format.price)}</p>
                    <p className="mt-2 text-sm text-white/60">Un tirage {format.label}, Fine Art</p>
                    <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-acid">
                      <Mail className="size-3.5" /> Commander par e-mail
                    </p>
                  </div>
                </a>
              );
            })}
          </Reveal>
          <Reveal y={16} delay={150} className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 p-6 text-sm leading-7 text-white/60">
            Montant libre, aluminium ou grand format : précisez-le simplement dans le message, ou{' '}
            <Link href="/contact" className="text-white underline decoration-acid underline-offset-4 transition-colors hover:text-acid">
              écrivez-nous
            </Link>
            . La carte est valable un an et n’est pas remboursable.
          </Reveal>
        </div>
      </section>
      <section className="bg-fog px-5 py-16 text-night sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1300px]">
          <Reveal stagger={150} y={26} className="grid gap-4 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article key={number} className="rounded-[1.5rem] bg-white p-7">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-night/60">{number}</p>
                <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-night/60">{text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

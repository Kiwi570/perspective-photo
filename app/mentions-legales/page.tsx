import type { Metadata } from 'next';

import { Lines } from '@/components/motion/lines';
import { contact } from '@/lib/site';

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: true } };

/* Les crochets signalent les informations à compléter avec Joël avant publication. */
const sections = [
  ['Éditeur', 'Perspective Photo — Joël Gourlain, photographe auteur. [Statut, adresse postale, numéro SIRET, numéro de TVA le cas échéant.] Directeur de la publication : Joël Gourlain.'],
  ['Hébergement', '[Nom de l’hébergeur, adresse, téléphone.] Le site est déployé sur une infrastructure située dans l’Union européenne.'],
  ['Propriété intellectuelle', 'Toutes les photographies présentées sont des œuvres originales de Joël Gourlain, protégées par le Code de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation écrite. Chaque tirage vendu reste une édition limitée à trente exemplaires, tous formats confondus.'],
  ['Données personnelles', `Le site ne collecte aucune donnée personnelle par formulaire : les demandes sont préparées dans votre messagerie et vous en gardez le contrôle. Les e-mails reçus à ${contact.email} sont conservés le temps du traitement de la demande et de la relation commerciale. Vous pouvez demander leur suppression à tout moment à cette même adresse.`],
  ['Cookies', 'Le site n’utilise aucun cookie de suivi ni outil de mesure d’audience tiers. [À mettre à jour si un outil de statistiques ou de paiement est ajouté.]'],
];

export default function LegalPage() {
  return (
    <main id="main">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <article className="hero-seq mx-auto max-w-3xl">
          <p className="eyebrow" style={{ animationDelay: '60ms' }}>
            Informations
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">
            <Lines lines={['Mentions légales.']} />
          </h1>
          <div className="mt-12 grid gap-9 text-sm leading-7 text-white/60" style={{ animationDelay: '320ms' }}>
            {sections.map(([title, text]) => (
              <section key={title}>
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
                <p className="mt-3">{text}</p>
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

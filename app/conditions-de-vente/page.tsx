import type { Metadata } from 'next';

import { Lines } from '@/components/motion/lines';
import { contact, production } from '@/lib/site';

export const metadata: Metadata = { title: 'Conditions de vente et livraison', robots: { index: false, follow: true } };

/* Les crochets signalent les points à valider avec Joël avant publication. */
const sections = [
  ['Les éditions', 'Chaque photographie est proposée en édition limitée à trente exemplaires, tous formats et supports confondus. Le tirage est signé, numéroté et daté au dos, et accompagné d’un certificat d’authenticité.'],
  ['Commande et paiement', 'La demande est faite depuis le site (sélection, carte cadeau ou message) ; le photographe confirme la disponibilité du numéro d’édition, le prix et le délai avant tout paiement. [Moyens de paiement acceptés : virement, paiement en ligne sécurisé…]'],
  ['Fabrication et délai', `Les tirages sont réalisés à la commande, sur papier Fine Art Hahnemühle ou aluminium Dibond, puis contrôlés et signés. Expédition ${production.delay} après confirmation. [Délai à confirmer.]`],
  ['Livraison', `${production.shipping}. Chaque envoi est assuré et suivi. [Transporteur, zones desservies hors Europe, délais d’acheminement.]`],
  ['Retours', 'Les tirages étant réalisés à la commande, [préciser : droit de rétractation de 14 jours pour les particuliers, conditions de retour, prise en charge des frais]. Tout tirage endommagé pendant le transport est remplacé.'],
  ['Contact', `Pour toute question sur une commande : ${contact.email}.`],
];

export default function TermsPage() {
  return (
    <main id="main">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <article className="hero-seq mx-auto max-w-3xl">
          <p className="eyebrow" style={{ animationDelay: '60ms' }}>
            Informations
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">
            <Lines lines={['Conditions de vente', 'et livraison.']} />
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

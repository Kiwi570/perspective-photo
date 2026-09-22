# Perspective Photo — Next.js

Refonte multipage en Next.js, React, TypeScript et Tailwind CSS.

## Local

```bash
npm ci
npm run dev
```

## Vérification

```bash
npm run check
```

## Vercel

Importer le dépôt avec le preset **Next.js**. La variable facultative `NEXT_PUBLIC_SITE_URL` définit le domaine utilisé par le sitemap et les métadonnées.

## Avant publication commerciale

- confirmer l’adresse e-mail qui reçoit les demandes de sélection dans `lib/site.ts` (`contact.email`, valeur provisoire) ;
- confirmer le délai de fabrication et la politique d’expédition dans `lib/site.ts` (`production`) ;
- compléter les passages entre crochets des pages Mentions légales et Conditions de vente, et les modalités de la carte cadeau ;
- remplacer tous les visuels provisoires par les photographies originales haute définition ;
- confirmer les prix, stocks et numéros d’édition avec Joël Gourlain ;
- connecter la sélection à un vrai paiement ou à une demande de disponibilité ;
- rédiger les mentions légales, CGV, politique de livraison et de retour ;
- ne pas présenter le paiement comme actif avant ce raccordement.

## Motion

Le mouvement du site repose sur un petit kit sans dépendance, dans `components/motion/` et la section « MOTION KIT » de `app/globals.css`.

| Composant | Rôle | Type |
| --- | --- | --- |
| `Lines` | Révélation ligne par ligne d'un titre (masque + montée), CSS pur | serveur |
| `Reveal` | Apparition au scroll (IntersectionObserver), cascade des enfants avec `stagger` | client |
| `Spotlight` | Section dont le halo et la grille s'éclairent autour du curseur | client |
| `Tilt` | Inclinaison 3D d'une carte vers le pointeur, avec reflet | client |
| `Marquee` | Bandeau défilant en CSS pur, pause au survol | serveur |
| `RollingNumber` | Chiffres qui roulent quand une valeur change (prix) | serveur |
| `Counter` | Nombre qui monte de 0 à sa valeur en entrant dans le viewport | client |

Classes utilitaires : `.hero-seq` (séquence d'entrée d'un hero, délais posés inline), `.anim-rise` / `.anim-scale` / `.anim-fade` (entrées au chargement), `.stagger-in` (cascade d'une grille), `.parallax` et `.rail-item` (animations pilotées par le scroll, ignorées si non supportées), `.animate-pop` / `.animate-icon-swap` (feedbacks).

Principes :

- les entrées « au chargement » sont en CSS pur et jouent avant l'hydratation ;
- les entrées « au scroll » ne masquent rien tant que la classe `.js` (posée dans `app/layout.tsx`) n'est pas là ;
- `prefers-reduced-motion` désactive parallax, bandeau, inclinaison et halo, et affiche tout immédiatement ;
- les effets liés au pointeur ne s'activent que sur `(pointer: fine)`.

Pour réutiliser le kit dans un autre projet : copier `components/motion/`, la section « MOTION KIT » de `globals.css`, les deux variables `--ease-out-expo` / `--ease-spring` du `@theme`, et la ligne `<script>` de `layout.tsx`.

# Perspective Photo — V7, cinq pages

Site statique, sans build : HTML, CSS, JS et le dossier `media/`.

- `index.html` accueil · `galerie.html` la galerie (visite du mur ou grille) · `oeuvre.html?id=…` la fiche d'une œuvre · `mur.html` le simulateur « Sur mon mur » · `atelier.html` le photographe, le tirage, l'édition, les questions
- `pp.css` et `pp.js` sont partagés. Les 14 œuvres, les formats et les prix sont dans `pp.js` (tableau `W`, `FORMATS`, `ALU`).
- Favoris et panier sont mémorisés le temps de la session. La carte cadeau est un tiroir (pied de page, menu, FAQ).
- `vercel.json` active les URLs propres : `/galerie`, `/mur`, `/atelier`, `/oeuvre?id=skyline`.

## Déployer
Pousser sur Git, importer sur Vercel, preset « Other », aucun réglage.

## Avant la mise en ligne définitive
- Trois œuvres ont maintenant une vraie photographie (Judith Hill, le Diamant, la skyline). Remplacer les 8 visuels de démonstration restants de `media/` par les vraies photographies (mêmes noms de fichiers), en 1600 px de large minimum, et ajouter une version 800 px pour un `srcset` si les fichiers dépassent 300 Ko.
- Deux œuvres pointent encore vers Wix (Audrey Hepburn, Noilleraie) : les enregistrer dans `media/`.
- Les prix (190, 290, 450, 690 €, +30 % aluminium) sont des valeurs de maquette. Les stocks d'édition ne sont volontairement pas affichés : les brancher quand ils seront réels.
- Brancher le panier sur un paiement (Stripe Checkout, Snipcart, Shopify Buy Button) : `checkout` dans `pp.js`.
- Générer les fichiers USDZ par format pour le bouton « Voir en réalité augmentée » (iPhone), page Sur mon mur.
- Mentions légales, conditions de vente, politique de retour à rédiger.

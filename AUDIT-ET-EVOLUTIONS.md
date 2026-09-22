# Audit et évolutions — Perspective Photo

## Forces conservées

- positionnement clair : une œuvre en édition limitée, pas une décoration générique ;
- photographie omniprésente et univers éditoriaux distincts ;
- simulateur « Sur mon mur », véritable avantage de conversion ;
- preuve matérielle : signature, numéro et certificat.

## Limites corrigées

- pages HTML et état global remplacés par des routes Next.js et des composants typés ;
- fiches produit indexables avec métadonnées propres ;
- navigation plus stable et interactions plus accessibles au clavier ;
- fausse validation de paiement supprimée ;
- simulateur simplifié autour de contrôles accessibles et d’un traitement local de la photo du mur ;
- meilleure hiérarchie entre inspiration, choix d’œuvre, configuration et décision.

## Points à raccorder

Le paiement, le stock des éditions, les e-mails transactionnels et les documents commerciaux nécessitent encore les données et services réels du photographe.

## Mouvement (V2)

La maquette était visuellement figée : seuls le fondu de page, le soulignement de la navigation et le léger relief des boutons bougeaient. Cette version ajoute une couche de mouvement sobre mais présente partout, sans aucune dépendance :

- hero : titre révélé ligne par ligne, cascade eyebrow → texte → boutons, image qui s'installe puis parallax léger, halo et grille qui suivent le curseur ;
- bandeau des univers qui défile sous le hero ;
- chaque section apparaît au scroll, les grilles en cascade ;
- cartes : inclinaison 3D vers le pointeur, reflet, zoom lent de l'image, flèche qui s'active ;
- galerie : filtres qui recomposent la grille en cascade, cœur qui « pop », vue immersive où l'œuvre centrée prend le focus ;
- fiche œuvre et simulateur : prix qui roule chiffre par chiffre, cadre qui glisse au lieu de sauter, feedbacks animés ;
- header : compaction au scroll, menu mobile animé avec burger qui se transforme, barre de progression de lecture ;
- FAQ : ouverture fluide des questions (progressif).

Tout respecte `prefers-reduced-motion` et reste lisible sans JavaScript.

## Corrections P1 (V2.1)

- fin de parcours : une sélection partagée entre la galerie et les fiches (cœurs et « Ajouter à ma sélection »), une barre en bas de page qui prépare un e-mail avec les œuvres, formats, supports et prix — rien n'est transmis avant l'envoi ; l'adresse (`lib/site.ts`) reste à confirmer ;
- hero mobile : image ramenée à 420 px de haut sous 1024 px ;
- lisibilité : micro-textes remontés à 60 % d'opacité, légendes de prix en 10 px.

## Corrections P2 (V2.2)

- page Contact (e-mail direct, réseaux, formulaire qui prépare un e-mail, rappel de la sélection et du simulateur) ajoutée à la navigation ;
- page Carte cadeau (montants alignés sur les formats, commande par e-mail) ;
- pages Mentions légales et Conditions de vente et livraison (passages entre crochets à compléter) ;
- délai de fabrication et politique d'expédition affichés sur chaque fiche (`lib/site.ts`, à confirmer) ; liens légaux et e-mail au footer.

## Bonus P3 (V2.3)

- « Sur mon mur » directement depuis chaque carte (galerie, accueil, fiches liées) : visible au survol, toujours visible sur écran tactile ;
- le simulateur reprend le format et le support choisis sur une fiche.

export type Photo = {
  slug: string;
  title: string;
  universe: string;
  image: string;
  orientation: 'landscape' | 'portrait';
  story: string;
  place: string;
  isNew?: boolean;
  fallback?: string;
};

export const universes: Record<string, string> = {
  concert: 'Concerts & artistes',
  newyork: 'New York',
  havrenuit: 'Le Havre la nuit',
  caraibes: 'Caraïbes',
  cyclades: 'Les Cyclades',
  street: 'Street Art',
  nature: 'Paysages & nature',
  portraits: 'Portraits de rue',
  creatif: 'Art créatif',
};

export const photos: Photo[] = [
  {
    slug: 'judith-hill',
    title: 'Judith Hill, Les Nuits Suspendues',
    universe: 'concert',
    image: '/media/concert-judith.jpg',
    orientation: 'landscape',
    isNew: true,
    story:
      'Capturée en couleur lors du festival Les Nuits Suspendues au Havre, cette photographie immortalise l’énergie et les jeux de lumière du concert de Judith Hill.',
    place: 'Le Havre, Les Nuits Suspendues',
  },
  {
    slug: 'axel-bauer',
    title: 'Axel Bauer au Havre',
    universe: 'concert',
    image: '/media/concert-rock.jpg',
    orientation: 'landscape',
    story: 'L’énergie pure du rock français, un soir sur la scène du Tetris.',
    place: 'Le Havre, le Tetris',
  },
  {
    slug: 'skyline',
    title: 'Skyline depuis Brooklyn',
    universe: 'newyork',
    image: '/media/ny-skyline.jpg',
    orientation: 'landscape',
    story: 'Manhattan à l’heure bleue, quand les fenêtres s’allument une à une.',
    place: 'New York, Brooklyn',
  },
  {
    slug: 'taxi',
    title: 'Yellow Cab, Mulberry Street',
    universe: 'newyork',
    image: '/media/ny-taxi.jpg',
    orientation: 'landscape',
    story: 'Un taxi, une rue, une lumière de fin d’après-midi : New York résumé en une image.',
    place: 'New York, Little Italy',
  },
  {
    slug: 'hepburn',
    title: 'Audrey Hepburn, Mulberry Street',
    universe: 'street',
    image: '/media/street-art.jpg',
    orientation: 'landscape',
    story: 'Une fresque de street art à Little Italy, saisie avant que le mur ne change encore.',
    place: 'New York, Mulberry Street',
  },
  {
    slug: 'havre-nuit',
    title: 'Le bassin du Commerce la nuit',
    universe: 'havrenuit',
    image: '/media/havre-nuit.jpg',
    orientation: 'landscape',
    story: 'Les reflets du Havre reconstruit, ville Perret, sur l’eau immobile du bassin.',
    place: 'Le Havre, bassin du Commerce',
  },
  {
    slug: 'anse-mabouya',
    title: 'Anse Mabouya, Sainte-Luce',
    universe: 'caraibes',
    image: '/media/caraibes-plage.jpg',
    orientation: 'landscape',
    story: 'Le sable, l’eau turquoise et un palmier penché : la Martinique en une ligne.',
    place: 'Martinique, Sainte-Luce',
  },
  {
    slug: 'diamant',
    title: 'Coucher de soleil sur le Diamant',
    universe: 'caraibes',
    image: '/media/caraibes-diamant.jpg',
    orientation: 'landscape',
    story: 'Le rocher du Diamant découpé dans un ciel de feu, depuis la plage.',
    place: 'Martinique, Le Diamant',
  },
  {
    slug: 'oia',
    title: 'Dôme bleu à Oïa',
    universe: 'cyclades',
    image: '/media/cyclades-dome.jpg',
    orientation: 'portrait',
    story: 'Le bleu et le blanc de Santorin, réduits à l’essentiel.',
    place: 'Santorin, Oïa',
  },
  {
    slug: 'firostefani',
    title: 'Les escaliers de Firostefani',
    universe: 'cyclades',
    image: '/media/cyclades-escaliers.jpg',
    orientation: 'portrait',
    story: 'Des marches blanches qui montent vers la lumière, au bord de la caldeira.',
    place: 'Santorin, Firostefani',
  },
  {
    slug: 'noilleraie',
    title: 'Noilleraie, Périgord noir',
    universe: 'nature',
    image: '/media/perigord.jpg',
    orientation: 'landscape',
    story: 'Les collines d’Aubas, en Périgord noir, dans la brume du matin.',
    place: 'Périgord, Aubas',
  },
  {
    slug: 'portrait',
    title: 'Portrait de rue, Le Havre',
    universe: 'portraits',
    image: '/media/portrait-rue.jpg',
    orientation: 'portrait',
    story: 'Un regard croisé sur le quai, une seconde avant qu’il ne se détourne.',
    place: 'Le Havre, les quais',
  },
  {
    slug: 'eiffel',
    title: 'La Tour Eiffel en noir et blanc',
    universe: 'creatif',
    image: '/media/eiffel.jpg',
    orientation: 'portrait',
    story: 'Paris réduit à une silhouette, dans un ciel d’argent.',
    place: 'Paris',
  },
  {
    slug: 'lotus',
    title: 'Lotus bleu d’Égypte',
    universe: 'creatif',
    image: '/media/lotus.jpg',
    orientation: 'landscape',
    story: 'Une fleur, un bassin, le jardin de Balata en Martinique.',
    place: 'Martinique, jardin de Balata',
  },
];

export const formats = [
  { label: '30 × 45 cm', width: 45, height: 30, price: 190 },
  { label: '40 × 60 cm', width: 60, height: 40, price: 290 },
  { label: '60 × 90 cm', width: 90, height: 60, price: 450 },
  { label: '80 × 120 cm', width: 120, height: 80, price: 690 },
] as const;

export const photoBySlug = (slug: string) => photos.find((photo) => photo.slug === slug);
export const euro = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} €`;

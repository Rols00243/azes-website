export interface Zone {
  slug: string
  name: string
  shortName: string
  location: string
  region: string
  sector: string
  sectorIcon: string
  color: string
  gradient: string
  description: string
  superficie: string
  emplois: number
  entreprises: number
  investissement: string
  advantages: string[]
  infrastructure: string[]
  contact: string
  coordinates: { x: number; y: number } // % position on DRC map SVG
}

export const zones: Zone[] = [
  {
    slug: 'zes-maluku',
    name: 'ZES de Maluku',
    shortName: 'Maluku',
    location: 'Maluku, Province de Kinshasa',
    region: 'Kinshasa',
    sector: 'Industrie manufacturière',
    sectorIcon: '🏭',
    color: '#1B4F8C',
    gradient: 'from-[#0A2342] to-[#1B4F8C]',
    description:
      "Première zone économique spéciale de la RDC, la ZES de Maluku est implantée à 80 km de Kinshasa sur la rive droite du fleuve Congo. Conçue pour accueillir des industries légères et lourdes, elle bénéficie d'une infrastructure logistique complète et d'un accès direct aux marchés de l'Afrique centrale et australe.",
    superficie: '885 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Première ZES opérationnelle de RDC, infrastructure mature',
      'Accès direct au fleuve Congo et aux axes routiers majeurs',
      'Exonération fiscale totale pendant 10 ans',
      'Énergie électrique dédiée depuis le barrage d\'Inga',
      'Zone de traitement des exportations certifiée',
    ],
    infrastructure: [
      'Parc industriel clé-en-main (350 000 m²)',
      'Centrale électrique dédiée 50 MW',
      'Port fluvial intégré',
      'Réseau routier interne bitumé',
      'Système d\'adduction d\'eau industrielle',
      'Centre administratif et douanier',
    ],
    contact: 'maluku@azes.cd',
    coordinates: { x: 28, y: 55 },
  },
  {
    slug: 'zes-kin-malebo',
    name: 'ZES de Kin-Malebo',
    shortName: 'Kin-Malebo',
    location: 'Pool Malebo, Kinshasa',
    region: 'Kinshasa',
    sector: 'Commerce & Logistique',
    sectorIcon: '🚢',
    color: '#2A7A4B',
    gradient: 'from-[#1d5535] to-[#2A7A4B]',
    description:
      "Stratégiquement positionnée sur le Pool Malebo face à Brazzaville, la ZES de Kin-Malebo est le hub commercial et logistique entre les deux Congo. Elle tire parti du trafic fluvial intense du fleuve Congo pour développer des activités d'entrepôt, de négoce international et de services logistiques à haute valeur ajoutée.",
    superficie: '450 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Position unique face à Brazzaville — gateway bilatéral',
      'Trafic fluvial Congo parmi les plus denses d\'Afrique',
      'Régime douanier simplifié pour échanges bilatéraux',
      'Accès aux marchés CEEAC et COMESA',
      'Zone franche commerciale intégrée',
    ],
    infrastructure: [
      'Terminal fluvial moderne (4 quais)',
      'Entrepôts secs et frigorifiques (120 000 m²)',
      'Centre de commerce international',
      'Bureau de change et services financiers',
      'Douane dédiée 24h/24',
      'Héliport pour cadres expatriés',
    ],
    contact: 'kinmalebo@azes.cd',
    coordinates: { x: 27, y: 54 },
  },
  {
    slug: 'zes-kinsevere',
    name: 'ZES de Kinsevere',
    shortName: 'Kinsevere',
    location: 'Kinsevere, Haut-Katanga',
    region: 'Haut-Katanga',
    sector: 'Mines & Métallurgie',
    sectorIcon: '⛏️',
    color: '#8B5E3C',
    gradient: 'from-[#5a3d25] to-[#8B5E3C]',
    description:
      "La ZES de Kinsevere s'appuie sur les immenses réserves cuprifères du Haut-Katanga pour développer une filière minière et métallurgique intégrée. Adossée à la mine de cuivre de Kinsevere, l'une des plus productives d'Afrique, la zone offre des conditions exceptionnelles pour le raffinage et la transformation des métaux non-ferreux.",
    superficie: '1 200 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Réserves de cuivre parmi les plus importantes au monde',
      'Mine de Kinsevere : production +100 000 t Cu/an',
      'Code minier révisé favorable aux investisseurs',
      'Corridor de transport vers Dar es-Salaam et Beira',
      'Expertise locale et main-d\'œuvre minière qualifiée',
    ],
    infrastructure: [
      'Fonderie et affinerie de cuivre (150 000 t/an)',
      'Centrale électrique au charbon (120 MW)',
      'Laboratoires de géologie et métallurgie',
      'Réseau ferroviaire raccordé au SNCC',
      'Logements miniers (5 000 logements)',
      'Hôpital minier et centre de formation',
    ],
    contact: 'kinsevere@azes.cd',
    coordinates: { x: 63, y: 80 },
  },
  {
    slug: 'zes-kiswishi',
    name: 'ZES de Kiswishi',
    shortName: 'Kiswishi',
    location: 'Kiswishi, Lubumbashi, Haut-Katanga',
    region: 'Haut-Katanga',
    sector: 'Industrie & Services miniers',
    sectorIcon: '🔩',
    color: '#C4894A',
    gradient: 'from-[#8B5E3C] to-[#C4894A]',
    description:
      "Implantée dans la périphérie de Lubumbashi, capitale économique du Katanga, la ZES de Kiswishi est dédiée aux industries de transformation et aux services aux entreprises minières. Elle constitue le lien entre l'extraction minière et les marchés de consommation finaux, hébergeant fonderies, ateliers mécaniques et centres de services logistiques.",
    superficie: '820 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Adjacente à Lubumbashi — accès à tous les services urbains',
      'Écosystème de sous-traitants miniers déjà établi',
      'Aéroport international de Lubumbashi à 15 km',
      'Zone de transformation à valeur ajoutée (export)',
      'Partenariats avec universités techniques du Katanga',
    ],
    infrastructure: [
      'Zone industrielle légère et lourde (200 000 m²)',
      'Centre de maintenance équipements miniers',
      'Entrepôts sécurisés pour métaux précieux',
      'Connexion directe au réseau ferroviaire SNCC',
      'Centre de formation technique industrielle',
      'Services douaniers et bancaires dédiés',
    ],
    contact: 'kiswishi@azes.cd',
    coordinates: { x: 65, y: 82 },
  },
  {
    slug: 'zes-musompo',
    name: 'ZES de Musompo',
    shortName: 'Musompo',
    location: 'Musompo, Kolwezi, Lualaba',
    region: 'Lualaba',
    sector: 'Négoce minier & Cobalt',
    sectorIcon: '💎',
    color: '#6B48A0',
    gradient: 'from-[#4a3070] to-[#6B48A0]',
    description:
      "La ZES de Musompo est au cœur du triangle cobalt-cuivre de Kolwezi, l'une des concentrations minérales les plus riches du monde. Elle régule et formalise le négoce des minerais artisanaux (cobalt, cuivre, hétérogénite) tout en attirant des investisseurs industriels pour la transformation sur place, réduisant ainsi les exportations de minerais bruts.",
    superficie: '650 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Centre mondial du cobalt — 70% des réserves mondiales proches',
      'Formalisation du négoce artisanal en circuit structuré',
      'Proximité des géants miniers : Glencore, MMG, Ivanhoe',
      'Zone de traçabilité et certification des minerais',
      'Accès au corridor vers le port de Lobito (Angola)',
    ],
    infrastructure: [
      'Marché officiel des minerais (négoce réglementé)',
      'Laboratoires d\'analyse et certification minerais',
      'Entrepôts sécurisés (30 000 m²)',
      'Corridor ferroviaire vers le port de Lobito',
      'Centre de contrôle douanier minier',
      'Système de traçabilité blockchain des minerais',
    ],
    contact: 'musompo@azes.cd',
    coordinates: { x: 56, y: 77 },
  },
  {
    slug: 'zes-nganda-jika',
    name: 'ZESTA de Nganda-Jika',
    shortName: 'ZESTA Nganda-Jika',
    location: 'Nganda-Jika, Kasaï Central',
    region: 'Kasaï Central',
    sector: 'Transformation agricole',
    sectorIcon: '🌾',
    color: '#3D8A2A',
    gradient: 'from-[#1d5515] to-[#3D8A2A]',
    description:
      "La ZES de Transformations Agricoles Nganda-Jika exploite le potentiel agricole immense du Kasaï pour développer une filière agro-industrielle moderne. Elle intègre la production, la transformation et l'exportation de produits agricoles congolais à haute valeur ajoutée : huile de palme, maïs, manioc, soja et cultures d'exportation.",
    superficie: '2 800 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Terres arables parmi les plus fertiles d\'Afrique centrale',
      'Cultures vivrières et d\'exportation à haut rendement',
      'Réduction des pertes post-récolte grâce à la transformation locale',
      'Programme gouvernemental de subvention agricole',
      'Accès aux marchés d\'Afrique australe (SADC)',
    ],
    infrastructure: [
      'Silos et entrepôts de stockage (800 000 tonnes)',
      'Unités de transformation agro-alimentaire (10 lignes)',
      'Réseau d\'irrigation moderne (2 400 km)',
      'Centre de recherche agronomique INERA',
      'Marché de gros et plateforme export',
      'Logements pour agriculteurs et techniciens',
    ],
    contact: 'ngandajika@azes.cd',
    coordinates: { x: 50, y: 65 },
  },
  {
    slug: 'zes-kalamba-mbuji',
    name: 'ZES de Kalamba-Mbuji',
    shortName: 'Kalamba-Mbuji',
    location: 'Kalamba-Mbuji, Kasaï Oriental',
    region: 'Kasaï Oriental',
    sector: 'Agro-industrie & Diamants',
    sectorIcon: '💠',
    color: '#1E7A9E',
    gradient: 'from-[#135070] to-[#1E7A9E]',
    description:
      "La ZES de Kalamba-Mbuji combine deux atouts exceptionnels du Kasaï Oriental : une agriculture riche et des gisements diamantifères de renommée mondiale. Elle offre un cadre réglementaire structuré pour la filière diamant (extraction artisanale formalisée, taille, négoce) et pour les agro-industries transformant les productions locales.",
    superficie: '1 100 ha',
    emplois: 0,
    entreprises: 0,
    investissement: '$0',
    advantages: [
      'Mbuji-Mayi : capitale mondiale du diamant artisanal',
      'Processus de Kimberley pour certification diamants',
      'Agriculture du Kasaï : maïs, manioc, arachides',
      'Formalisation de la filière diamant artisanal',
      'Accès aux marchés de l\'Afrique centrale et australe',
    ],
    infrastructure: [
      'Centre de taille et de négoce diamant certifié',
      'Laboratoires gemmologiques GIA-certifiés',
      'Unités agro-alimentaires (transformation manioc/maïs)',
      'Coffres-forts et sécurité renforcée (diamants)',
      'Aéroport de Mbuji-Mayi à 25 km',
      'École de gemmologie et formation joaillerie',
    ],
    contact: 'kalamba@azes.cd',
    coordinates: { x: 55, y: 63 },
  },
]

export function getZoneBySlug(slug: string): Zone | undefined {
  return zones.find((z) => z.slug === slug)
}

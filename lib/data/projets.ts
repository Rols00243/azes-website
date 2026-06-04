export interface Projet {
  slug: string
  titre: string
  zone: string
  zoneSlug: string
  secteur: string
  avancement: number
  statut: 'Démarrage' | 'En cours' | 'Finalisé'
  localisation: string
  partenaires: string[]
  investissement: string
  emploisCreés: number
  dateDebut: string
  dateFin: string
  dateMAJ: string
  description: string
  objectif: string
  infrastructures: string[]
  documents: { titre: string; type: string; taille: string }[]
  timeline: { date: string; titre: string; description: string; done: boolean }[]
}

export const projets: Projet[] = [
  {
    slug: 'port-sec-maluku',
    titre: 'Extension Parc Industriel Maluku — Phase 2',
    zone: 'ZES de Maluku',
    zoneSlug: 'zes-maluku',
    secteur: 'Industrie / Infrastructure',
    avancement: 65,
    statut: 'En cours',
    localisation: 'Maluku, Province de Kinshasa',
    partenaires: ['Bolloré Africa Logistics', 'Banque Mondiale', 'BDEAC', 'AFD'],
    investissement: '$240M',
    emploisCreés: 4800,
    dateDebut: '2023-03-01',
    dateFin: '2025-12-31',
    dateMAJ: '2026-05-15',
    description:
      "L'extension du Parc Industriel de Maluku vise à tripler la capacité d'accueil de la première ZES opérationnelle de RDC. La phase 2 comprend la construction de 150 nouvelles unités industrielles clé-en-main, l'extension du port fluvial et la mise en place d'une centrale électrique dédiée de 50 MW.",
    objectif:
      "Porter la capacité d'accueil de Maluku à 250 entreprises d'ici 2026, créer 5 000 emplois directs, et positionner la ZES comme le hub industriel de référence en Afrique centrale. L'objectif est de réduire les importations industrielles de la RDC de 25% en favorisant la production locale.",
    infrastructures: [
      '150 unités industrielles clé-en-main (3 000 m² chacune)',
      'Extension port fluvial (4 nouveaux quais)',
      'Centrale électrique 50 MW',
      'Réseau routier interne étendu (45 km)',
      'Centre administratif et douanier modernisé',
      'Zone verte et logements pour expatriés',
    ],
    documents: [
      { titre: 'Étude de faisabilité phase 2', type: 'PDF', taille: '8.4 MB' },
      { titre: 'Plan directeur 2023-2026', type: 'PDF', taille: '12.1 MB' },
      { titre: 'Rapport d\'avancement T1 2026', type: 'PDF', taille: '3.2 MB' },
    ],
    timeline: [
      { date: 'Mars 2023', titre: 'Lancement officiel', description: 'Signature conventions et études préparatoires', done: true },
      { date: 'Août 2023', titre: 'Terrassement', description: 'Terrassement et fondations des nouveaux bâtiments', done: true },
      { date: 'Fév. 2024', titre: 'Gros œuvre', description: 'Construction des 150 unités industrielles', done: true },
      { date: 'Oct. 2024', titre: 'Réseaux & utilities', description: 'Installation réseaux électricité, eau, fibre', done: true },
      { date: 'Juin 2025', titre: 'Finitions & équipements', description: 'Équipements techniques et aménagements finaux', done: false },
      { date: 'Déc. 2025', titre: 'Inauguration phase 2', description: 'Ouverture officielle et accueil des premières entreprises', done: false },
    ],
  },
  {
    slug: 'hub-cobalt-musompo',
    titre: 'Hub de Traçabilité Cobalt — ZES Musompo',
    zone: 'ZES de Musompo',
    zoneSlug: 'zes-musompo',
    secteur: 'Mines / Digital / Gouvernance',
    avancement: 42,
    statut: 'En cours',
    localisation: 'Musompo, Kolwezi, Lualaba',
    partenaires: ['Trafigura', 'RCS Global', 'GIZ', 'Ministère des Mines RDC'],
    investissement: '$85M',
    emploisCreés: 2200,
    dateDebut: '2024-01-15',
    dateFin: '2026-12-31',
    dateMAJ: '2026-05-20',
    description:
      "Le Hub de Traçabilité Cobalt de Musompo est un projet pionnier visant à formaliser et sécuriser la chaîne d'approvisionnement en cobalt artisanal de la région de Kolwezi. Il intègre une plateforme blockchain de traçabilité, des laboratoires d'analyse certifiés, et un marché officiel régulé pour les creuseurs artisanaux.",
    objectif:
      "Formaliser 80% du cobalt artisanal de la région d'ici 2027, garantir la conformité aux standards ESG des acheteurs internationaux (Tesla, Apple, Samsung), et doubler les revenus des creuseurs artisanaux en éliminant les intermédiaires informels.",
    infrastructures: [
      'Marché officiel minerais (5 000 m², capacité 2 000 t/jour)',
      'Laboratoires d\'analyse XRF et ICP-MS',
      'Plateforme blockchain traçabilité temps réel',
      'Entrepôts sécurisés (15 000 m²)',
      'Centre de formation aux techniques minières',
      'Bureau Processus de Kimberley dédié',
    ],
    documents: [
      { titre: 'Note conceptuelle projet', type: 'PDF', taille: '5.2 MB' },
      { titre: 'Standard traçabilité cobalt', type: 'PDF', taille: '3.8 MB' },
      { titre: 'Rapport d\'avancement Trim. 1/2026', type: 'PDF', taille: '2.1 MB' },
    ],
    timeline: [
      { date: 'Jan. 2024', titre: 'Démarrage', description: 'Études techniques et consultation communautaire', done: true },
      { date: 'Juil. 2024', titre: 'Construction débutée', description: 'Travaux de terrassement et infrastructure', done: true },
      { date: 'Janv. 2025', titre: 'Plateforme IT', description: 'Développement et test de la plateforme blockchain', done: false },
      { date: 'Juil. 2025', titre: 'Tests opérationnels', description: 'Phase pilote avec 500 creuseurs artisanaux', done: false },
      { date: 'Jan. 2026', titre: 'Montée en puissance', description: 'Extension à 5 000 creuseurs enregistrés', done: false },
      { date: 'Déc. 2026', titre: 'Pleine capacité', description: 'Opérationnalisation complète — 80% cobalt formalisé', done: false },
    ],
  },
  {
    slug: 'agropole-nganda-jika',
    titre: 'Agropole Nganda-Jika — Transformation Agricole Intégrée',
    zone: 'ZESTA de Nganda-Jika',
    zoneSlug: 'zes-nganda-jika',
    secteur: 'Agro-industrie',
    avancement: 78,
    statut: 'En cours',
    localisation: 'Nganda-Jika, Kasaï Central',
    partenaires: ['Olam International', 'FIDA', 'FAO', 'Gouvernement Kasaï Central'],
    investissement: '$145M',
    emploisCreés: 6500,
    dateDebut: '2022-06-01',
    dateFin: '2026-09-30',
    dateMAJ: '2026-05-28',
    description:
      "L'Agropole Nganda-Jika est le fer de lance de la stratégie de valorisation agricole du Kasaï Central. Elle regroupe dans un périmètre unique : production agricole intensive, transformation industrielle, conditionnement pour l'export et formation des agriculteurs locaux.",
    objectif:
      "Transformer 500 000 tonnes de produits agricoles par an d'ici 2027, générer 6 500 emplois directs, augmenter les revenus des agriculteurs de 70%, et exporter 40% de la production vers les marchés régionaux et internationaux sous la marque 'Kasaï Premium'.",
    infrastructures: [
      'Unités de transformation maïs/manioc (600 000 t/an)',
      'Raffinerie huile de palme (35 000 t/an)',
      'Silos de stockage (1 200 000 tonnes)',
      'Réseau d\'irrigation (2 400 km de canaux)',
      'École d\'agriculture et centre INERA',
      'Marché de gros et plateforme logistique export',
    ],
    documents: [
      { titre: 'Étude d\'impact environnemental', type: 'PDF', taille: '14.8 MB' },
      { titre: 'Plan de production 2024-2027', type: 'PDF', taille: '7.2 MB' },
      { titre: 'Rapport avancement 78%', type: 'PDF', taille: '4.1 MB' },
    ],
    timeline: [
      { date: 'Juin 2022', titre: 'Lancement', description: 'Études préliminaires et consultation des communautés', done: true },
      { date: 'Jan. 2023', titre: 'Construction', description: 'Terrassement et gros œuvre des unités de transformation', done: true },
      { date: 'Août 2023', titre: 'Équipements', description: 'Installation des chaînes de transformation industrielles', done: true },
      { date: 'Janv. 2024', titre: 'Phase test', description: 'Première campagne de transformation (60% capacité)', done: true },
      { date: 'Jan. 2025', titre: 'Montée charge', description: 'Fonctionnement à 80% de la capacité nominale', done: true },
      { date: 'Sept. 2026', titre: 'Pleine capacité', description: 'Atteinte de 100% de la capacité — 500 000 t/an', done: false },
    ],
  },
]

export function getProjetBySlug(slug: string): Projet | undefined {
  return projets.find((p) => p.slug === slug)
}

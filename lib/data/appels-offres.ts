export interface AppelOffre {
  slug: string
  titre: string
  type: 'AO' | 'AMI'
  statut: 'En cours' | 'Clôturé' | 'À venir'
  zone: string
  zoneSlug: string
  secteur: string
  datePublication: string
  dateLimite: string
  budget: string
  description: string
  criteres: string[]
  documents: { titre: string; type: string; taille: string }[]
  contact: string
  urgent?: boolean
}

export const appelsOffres: AppelOffre[] = [
  {
    slug: 'extension-maluku-phase2',
    titre: 'Construction Unités Industrielles Clé-en-Main — ZES Maluku Phase 2',
    type: 'AO',
    statut: 'En cours',
    zone: 'ZES de Maluku',
    zoneSlug: 'zes-maluku',
    secteur: 'BTP / Génie Civil',
    datePublication: '2026-04-01',
    dateLimite: '2026-06-30',
    budget: '$65M',
    description:
      "Appel d'offres international pour la construction de 50 unités industrielles clé-en-main dans le cadre de l'extension Phase 2 de la ZES de Maluku. Chaque unité dispose d'une superficie de 3 000 m², d'une connexion électrique dédiée, d'un accès eau et fibre optique.",
    criteres: [
      'Expérience avérée en construction de parcs industriels (3 références minimum sur 5 ans)',
      'Chiffre d\'affaires annuel supérieur à $120M sur les 3 dernières années',
      'Bureau permanent en RDC ou engagement d\'y ouvrir un bureau dans les 90 jours',
      'Certification ISO 9001:2015 ou équivalent',
      'Plan de sous-traitance locale (minimum 35% valeur des travaux)',
      'Capacité financière : ligne de crédit $30M minimum',
    ],
    documents: [
      { titre: 'Dossier d\'appel d\'offres complet', type: 'PDF', taille: '22.4 MB' },
      { titre: 'Plans architecturaux types', type: 'ZIP', taille: '58.7 MB' },
      { titre: 'Spécifications techniques détaillées', type: 'PDF', taille: '9.2 MB' },
      { titre: 'Formulaire de soumission', type: 'DOCX', taille: '1.8 MB' },
    ],
    contact: 'ao-maluku@azes.cd',
    urgent: true,
  },
  {
    slug: 'laboratoire-tracabilite-musompo',
    titre: 'Fourniture & Installation Laboratoires d\'Analyse Minerais — Hub Musompo',
    type: 'AO',
    statut: 'En cours',
    zone: 'ZES de Musompo',
    zoneSlug: 'zes-musompo',
    secteur: 'Équipements scientifiques / Mines',
    datePublication: '2026-05-15',
    dateLimite: '2026-07-31',
    budget: '$12M',
    description:
      "Appel d'offres pour la fourniture, l'installation, la mise en service et la formation à l'utilisation d'équipements de laboratoire d'analyse de minerais (XRF portable et de bureau, ICP-MS, fourneaux de fusion) pour le Hub de Traçabilité Cobalt de Musompo.",
    criteres: [
      'Fabricant ou distributeur agréé d\'équipements analytiques (XRF, ICP-MS)',
      'Certifications ISO 17025 pour les procédures d\'analyse',
      'Service après-vente en Afrique subsaharienne (techniciens certifiés)',
      'Formation du personnel local (minimum 200h de formation incluse)',
      'Garantie équipements 5 ans pièces et main-d\'œuvre',
    ],
    documents: [
      { titre: 'Cahier des charges laboratoire', type: 'PDF', taille: '7.6 MB' },
      { titre: 'Liste équipements requis', type: 'XLSX', taille: '1.2 MB' },
      { titre: 'Formulaire de candidature', type: 'DOCX', taille: '0.9 MB' },
    ],
    contact: 'ao-musompo@azes.cd',
  },
  {
    slug: 'ami-terminal-fluvial-kinmalebo',
    titre: 'Manifestation d\'Intérêt — Gestion Terminal Fluvial Kin-Malebo',
    type: 'AMI',
    statut: 'Clôturé',
    zone: 'ZES de Kin-Malebo',
    zoneSlug: 'zes-kin-malebo',
    secteur: 'Logistique / Gestion portuaire',
    datePublication: '2025-10-01',
    dateLimite: '2026-01-15',
    budget: 'PPP — concession 25 ans',
    description:
      "Manifestation d'intérêt pour la sélection d'un opérateur portuaire qualifié chargé de la gestion, de l'exploitation et du développement du terminal fluvial de la ZES Kin-Malebo dans le cadre d'un Partenariat Public-Privé sur 25 ans.",
    criteres: [
      'Opérateur portuaire ou logistique de dimension internationale',
      'Expérience en gestion de terminaux fluviaux ou maritimes (Africa +)',
      'Plan d\'investissement sur 10 ans pour développement du terminal',
      'Engagement d\'emploi local (minimum 80% du personnel opérationnel)',
    ],
    documents: [
      { titre: 'Avis de manifestation d\'intérêt', type: 'PDF', taille: '3.4 MB' },
      { titre: 'Étude de faisabilité terminal', type: 'PDF', taille: '18.2 MB' },
      { titre: 'Cadre PPP RDC 2024', type: 'PDF', taille: '6.1 MB' },
    ],
    contact: 'ami-kinmalebo@azes.cd',
  },
  {
    slug: 'parcelles-kinsevere',
    titre: 'Attribution Parcelles Industrielles — ZES Kinsevere Lot A',
    type: 'AMI',
    statut: 'À venir',
    zone: 'ZES de Kinsevere',
    zoneSlug: 'zes-kinsevere',
    secteur: 'Mines / Industrie minière',
    datePublication: '2026-07-15',
    dateLimite: '2026-10-15',
    budget: 'N/A',
    description:
      "Avis de manifestation d'intérêt pour l'attribution de 12 parcelles industrielles (5-25 ha chacune) dans la Zone A de la ZES de Kinsevere, dédiées aux activités de raffinage du cuivre, de fabrication de câbles électriques et de production d'anodes.",
    criteres: [
      'Société spécialisée en métallurgie, raffinage ou industrie minière',
      'Plan d\'investissement minimum $20M sur 5 ans par parcelle',
      'Engagement emploi local : minimum 70% de nationaux congolais',
      'Respect normes environnementales ISO 14001 et standards IFC',
      'Capacité financière démontrée par états financiers audités 3 ans',
    ],
    documents: [
      { titre: 'Avis de manifestation d\'intérêt', type: 'PDF', taille: '4.1 MB' },
      { titre: 'Plan parcelles Zone A', type: 'PDF', taille: '12.5 MB' },
      { titre: 'Cadre réglementaire ZES Kinsevere', type: 'PDF', taille: '5.8 MB' },
    ],
    contact: 'ami-kinsevere@azes.cd',
  },
]

export function getAppelOffreBySlug(slug: string): AppelOffre | undefined {
  return appelsOffres.find((a) => a.slug === slug)
}

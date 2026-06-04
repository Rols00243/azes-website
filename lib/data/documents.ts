export type DocCategory =
  | 'Lois'
  | 'Décrets'
  | 'Arrêtés'
  | 'Arrêtés interministériels'
  | "Arrêtés d'approbation"
  | 'Décisions'
  | 'Rapports'
  | 'Statuts'
  | "Appels d'offres"
  | "Offres d'emploi"
  | 'Guides investisseurs'
  | 'Formulaires'
  | 'Communiqués'

export const categoryConfig: Record<DocCategory, { color: string; icon: string; description: string }> = {
  'Lois':                     { color: '#1B4F8C', icon: '📜', description: 'Textes législatifs votés par le Parlement' },
  'Décrets':                  { color: '#0A2342', icon: '🏛️', description: 'Actes réglementaires du Président et du Premier Ministre' },
  'Arrêtés':                  { color: '#2A7A4B', icon: '📋', description: 'Actes des ministères compétents' },
  'Arrêtés interministériels':{ color: '#3D8A2A', icon: '🤝', description: 'Actes signés conjointement par plusieurs ministres' },
  "Arrêtés d'approbation":    { color: '#6B48A0', icon: '✅', description: 'Arrêtés portant approbation de statuts, conventions et plans' },
  'Décisions':                { color: '#8B5E3C', icon: '⚖️', description: 'Décisions officielles du Conseil d\'Administration de l\'AZES' },
  'Rapports':                 { color: '#C4894A', icon: '📊', description: 'Rapports annuels, trimestriels et études sectorielles' },
  'Statuts':                  { color: '#1E7A9E', icon: '📄', description: 'Statuts de l\'AZES et des ZES' },
  "Appels d'offres":          { color: '#C4894A', icon: '📢', description: 'Avis d\'appel d\'offres et manifestations d\'intérêt' },
  "Offres d'emploi":          { color: '#2A7A4B', icon: '💼', description: 'Offres d\'emploi et de stages au sein de l\'AZES' },
  'Guides investisseurs':     { color: '#1B4F8C', icon: '🗺️', description: 'Guides pratiques pour les investisseurs' },
  'Formulaires':              { color: '#374151', icon: '📝', description: 'Formulaires officiels de l\'AZES' },
  'Communiqués':              { color: '#6B7280', icon: '📰', description: 'Communiqués de presse et annonces officielles' },
}

export interface Document {
  id: string
  titre: string
  categorie: DocCategory
  zone?: string
  datePublication: string
  taille: string
  type: 'PDF' | 'DOCX' | 'ZIP' | 'XLSX'
  telechargements: number
  description: string
  reference?: string
}

export const documents: Document[] = [
  // LOIS
  {
    id: 'doc-001',
    titre: 'Loi n°23-011 portant création des Zones Économiques Spéciales',
    categorie: 'Lois',
    datePublication: '2023-06-15',
    taille: '2.4 MB',
    type: 'PDF',
    telechargements: 1842,
    reference: 'Loi n°23-011',
    description: 'Loi fondamentale régissant le cadre juridique des ZES en RDC',
  },
  {
    id: 'doc-002',
    titre: 'Ordonnance-loi n°24-003 sur les avantages fiscaux dans les ZES',
    categorie: 'Lois',
    datePublication: '2024-02-20',
    taille: '1.8 MB',
    type: 'PDF',
    telechargements: 1256,
    reference: 'OL n°24-003',
    description: 'Régime fiscal préférentiel applicable aux entreprises installées dans les ZES',
  },
  {
    id: 'doc-003',
    titre: 'Loi n°25-002 portant modification du Code des Investissements',
    categorie: 'Lois',
    datePublication: '2025-03-10',
    taille: '3.1 MB',
    type: 'PDF',
    telechargements: 987,
    reference: 'Loi n°25-002',
    description: 'Modifications du Code des Investissements intégrant le régime ZES',
  },

  // DÉCRETS
  {
    id: 'doc-010',
    titre: 'Décret n°24-058 fixant les critères d\'agrément dans les ZES',
    categorie: 'Décrets',
    datePublication: '2024-05-10',
    taille: '1.2 MB',
    type: 'PDF',
    telechargements: 1087,
    reference: 'Décret n°24-058',
    description: 'Conditions et procédures pour l\'obtention de l\'agrément ZES',
  },
  {
    id: 'doc-011',
    titre: 'Décret n°23-142 portant création de l\'AZES',
    categorie: 'Décrets',
    datePublication: '2023-09-01',
    taille: '0.9 MB',
    type: 'PDF',
    telechargements: 1543,
    reference: 'Décret n°23-142',
    description: 'Décret organique portant création et organisation de l\'Agence des ZES',
  },
  {
    id: 'doc-012',
    titre: 'Décret n°25-031 relatif au régime douanier des ZES',
    categorie: 'Décrets',
    datePublication: '2025-01-20',
    taille: '1.5 MB',
    type: 'PDF',
    telechargements: 678,
    reference: 'Décret n°25-031',
    description: 'Modalités d\'application du régime douanier préférentiel dans les ZES',
  },

  // ARRÊTÉS
  {
    id: 'doc-020',
    titre: 'Arrêté ministériel n°024/CAB/MIN-PLAN/2024 fixant les zones d\'aménagement prioritaires',
    categorie: 'Arrêtés',
    datePublication: '2024-07-15',
    taille: '1.1 MB',
    type: 'PDF',
    telechargements: 542,
    reference: 'AM n°024/2024',
    description: 'Délimitation des zones d\'aménagement prioritaire au sein des ZES',
  },
  {
    id: 'doc-021',
    titre: 'Arrêté n°025/MIN-ECO/2025 fixant les tarifs de location dans les ZES',
    categorie: 'Arrêtés',
    datePublication: '2025-02-10',
    taille: '0.7 MB',
    type: 'PDF',
    telechargements: 398,
    reference: 'AM n°025/2025',
    description: 'Barème officiel des tarifs de location des parcelles et bâtiments dans les ZES',
  },

  // ARRÊTÉS INTERMINISTÉRIELS
  {
    id: 'doc-030',
    titre: 'Arrêté interministériel n°001/MIN-PLAN/MIN-FIN/2024 sur les exonérations fiscales ZES',
    categorie: 'Arrêtés interministériels',
    datePublication: '2024-04-05',
    taille: '1.4 MB',
    type: 'PDF',
    telechargements: 712,
    reference: 'AI n°001/2024',
    description: 'Modalités d\'application des exonérations fiscales et douanières dans les ZES',
  },
  {
    id: 'doc-031',
    titre: 'Arrêté interministériel n°003/MIN-TRAVAIL/MIN-PLAN/2025 sur l\'emploi local dans les ZES',
    categorie: 'Arrêtés interministériels',
    datePublication: '2025-06-01',
    taille: '0.9 MB',
    type: 'PDF',
    telechargements: 445,
    reference: 'AI n°003/2025',
    description: 'Obligations des entreprises ZES en matière d\'emploi de nationaux congolais',
  },

  // ARRÊTÉS D'APPROBATION
  {
    id: 'doc-040',
    titre: 'Arrêté d\'approbation du Plan Directeur ZES de Maluku 2024-2030',
    categorie: "Arrêtés d'approbation",
    zone: 'ZES de Maluku',
    datePublication: '2024-01-15',
    taille: '2.8 MB',
    type: 'PDF',
    telechargements: 389,
    reference: 'AA n°012/2024',
    description: 'Approbation officielle du plan directeur de développement de la ZES de Maluku',
  },
  {
    id: 'doc-041',
    titre: 'Arrêté d\'approbation des Statuts de la ZESTA de Nganda-Jika',
    categorie: "Arrêtés d'approbation",
    zone: 'ZESTA de Nganda-Jika',
    datePublication: '2024-06-20',
    taille: '1.6 MB',
    type: 'PDF',
    telechargements: 287,
    reference: 'AA n°019/2024',
    description: 'Approbation des statuts organiques de la Zone Économique Spéciale de Transformation Agricole',
  },
  {
    id: 'doc-042',
    titre: 'Arrêté d\'approbation du Hub Cobalt — ZES de Musompo',
    categorie: "Arrêtés d'approbation",
    zone: 'ZES de Musompo',
    datePublication: '2025-03-08',
    taille: '1.2 MB',
    type: 'PDF',
    telechargements: 198,
    reference: 'AA n°005/2025',
    description: 'Approbation du projet Hub de Traçabilité Cobalt au sein de la ZES de Musompo',
  },

  // DÉCISIONS
  {
    id: 'doc-050',
    titre: 'Décision AZES n°25-001 portant règlement intérieur des ZES',
    categorie: 'Décisions',
    datePublication: '2025-01-08',
    taille: '3.1 MB',
    type: 'PDF',
    telechargements: 654,
    reference: 'Déc. n°25-001',
    description: 'Règlement intérieur applicable à toutes les zones économiques spéciales',
  },
  {
    id: 'doc-051',
    titre: 'Décision CA/AZES/2025-003 portant agrément de 12 nouvelles entreprises',
    categorie: 'Décisions',
    datePublication: '2025-05-15',
    taille: '0.8 MB',
    type: 'PDF',
    telechargements: 423,
    reference: 'CA n°2025-003',
    description: 'Décision du Conseil d\'Administration accordant l\'agrément ZES à 12 nouvelles sociétés',
  },

  // RAPPORTS
  {
    id: 'doc-060',
    titre: 'Rapport Annuel AZES 2024',
    categorie: 'Rapports',
    datePublication: '2025-04-30',
    taille: '12.4 MB',
    type: 'PDF',
    telechargements: 892,
    description: 'Bilan complet des activités de l\'AZES pour l\'année 2024',
  },
  {
    id: 'doc-061',
    titre: 'Rapport Annuel AZES 2023',
    categorie: 'Rapports',
    datePublication: '2024-05-15',
    taille: '10.8 MB',
    type: 'PDF',
    telechargements: 1124,
    description: 'Bilan des activités AZES 2023 — première année pleine',
  },
  {
    id: 'doc-062',
    titre: 'Tableau de bord statistiques ZES — T1 2026',
    categorie: 'Rapports',
    datePublication: '2026-04-30',
    taille: '3.8 MB',
    type: 'XLSX',
    telechargements: 312,
    description: 'Indicateurs clés de performance des ZES pour le premier trimestre 2026',
  },
  {
    id: 'doc-063',
    titre: 'Étude d\'impact économique des ZES — RDC 2025',
    categorie: 'Rapports',
    datePublication: '2025-11-20',
    taille: '8.2 MB',
    type: 'PDF',
    telechargements: 567,
    description: 'Analyse de l\'impact économique et social des ZES sur le développement national',
  },

  // STATUTS
  {
    id: 'doc-070',
    titre: 'Statuts de l\'Agence des Zones Économiques Spéciales (AZES)',
    categorie: 'Statuts',
    datePublication: '2023-09-15',
    taille: '2.2 MB',
    type: 'PDF',
    telechargements: 1876,
    description: 'Statuts organiques de l\'AZES définissant sa mission, organisation et attributions',
  },
  {
    id: 'doc-071',
    titre: 'Statuts de la ZES de Kinsevere',
    categorie: 'Statuts',
    zone: 'ZES de Kinsevere',
    datePublication: '2024-03-01',
    taille: '1.5 MB',
    type: 'PDF',
    telechargements: 432,
    description: 'Statuts de la Zone Économique Spéciale Minière de Kinsevere',
  },
  {
    id: 'doc-072',
    titre: 'Statuts de la ZESTA de Nganda-Jika',
    categorie: 'Statuts',
    zone: 'ZESTA de Nganda-Jika',
    datePublication: '2024-06-10',
    taille: '1.3 MB',
    type: 'PDF',
    telechargements: 298,
    description: 'Statuts de la Zone Économique Spéciale de Transformation Agricole de Nganda-Jika',
  },

  // APPELS D'OFFRES
  {
    id: 'doc-080',
    titre: 'AO — Construction Unités Industrielles Maluku Phase 2',
    categorie: "Appels d'offres",
    zone: 'ZES de Maluku',
    datePublication: '2026-04-01',
    taille: '22.4 MB',
    type: 'ZIP',
    telechargements: 1243,
    reference: 'AO/AZES/2026-001',
    description: 'Appel d\'offres international pour la construction de 50 unités industrielles — $65M',
  },
  {
    id: 'doc-081',
    titre: 'AO — Fourniture & Installation Laboratoires Musompo',
    categorie: "Appels d'offres",
    zone: 'ZES de Musompo',
    datePublication: '2026-05-15',
    taille: '7.6 MB',
    type: 'PDF',
    telechargements: 567,
    reference: 'AO/AZES/2026-002',
    description: 'Appel d\'offres pour équipements de laboratoire d\'analyse de minerais — $12M',
  },
  {
    id: 'doc-082',
    titre: 'AMI — Attribution Parcelles Industrielles Kinsevere Lot A',
    categorie: "Appels d'offres",
    zone: 'ZES de Kinsevere',
    datePublication: '2026-07-15',
    taille: '4.1 MB',
    type: 'PDF',
    telechargements: 312,
    reference: 'AMI/AZES/2026-003',
    description: 'Manifestation d\'intérêt pour l\'attribution de 12 parcelles industrielles de 5-25 ha',
  },

  // OFFRES D'EMPLOI
  {
    id: 'doc-090',
    titre: 'Offre d\'emploi — Directeur des Investissements (H/F)',
    categorie: "Offres d'emploi",
    datePublication: '2026-05-20',
    taille: '0.3 MB',
    type: 'PDF',
    telechargements: 892,
    description: 'L\'AZES recrute un(e) Directeur(trice) des Investissements — Kinshasa',
  },
  {
    id: 'doc-091',
    titre: 'Offre d\'emploi — Ingénieur Infrastructure ZES (H/F)',
    categorie: "Offres d'emploi",
    zone: 'ZES de Maluku',
    datePublication: '2026-05-25',
    taille: '0.3 MB',
    type: 'PDF',
    telechargements: 654,
    description: 'Poste d\'Ingénieur en charge des infrastructures de la ZES de Maluku',
  },
  {
    id: 'doc-092',
    titre: 'Stage — Analyste Données & Statistiques ZES',
    categorie: "Offres d'emploi",
    datePublication: '2026-06-01',
    taille: '0.2 MB',
    type: 'PDF',
    telechargements: 423,
    description: 'Stage de 6 mois au sein de la Direction des Études et Statistiques de l\'AZES',
  },

  // GUIDES & FORMULAIRES
  {
    id: 'doc-100',
    titre: "Guide de l'Investisseur — Comment s'installer dans une ZES",
    categorie: 'Guides investisseurs',
    datePublication: '2025-03-15',
    taille: '5.8 MB',
    type: 'PDF',
    telechargements: 3241,
    description: 'Guide pratique complet pour les investisseurs souhaitant s\'établir dans les ZES',
  },
  {
    id: 'doc-101',
    titre: 'Formulaire de demande d\'agrément ZES',
    categorie: 'Formulaires',
    datePublication: '2024-09-01',
    taille: '0.8 MB',
    type: 'DOCX',
    telechargements: 2156,
    description: 'Formulaire officiel pour déposer une demande d\'agrément auprès de l\'AZES',
  },
  {
    id: 'doc-102',
    titre: 'Formulaire de manifestation d\'intérêt investisseur',
    categorie: 'Formulaires',
    datePublication: '2024-09-01',
    taille: '0.6 MB',
    type: 'DOCX',
    telechargements: 1847,
    description: 'Formulaire pour manifester son intérêt auprès de l\'AZES',
  },

  // COMMUNIQUÉS
  {
    id: 'doc-110',
    titre: 'Communiqué — Ouverture officielle de la ZESTA de Nganda-Jika',
    categorie: 'Communiqués',
    zone: 'ZESTA de Nganda-Jika',
    datePublication: '2024-06-15',
    taille: '0.5 MB',
    type: 'PDF',
    telechargements: 1876,
    description: 'Communiqué officiel de l\'AZES sur l\'ouverture de la ZESTA de Nganda-Jika',
  },
  {
    id: 'doc-111',
    titre: 'Communiqué — Signature convention Hub Cobalt Musompo',
    categorie: 'Communiqués',
    zone: 'ZES de Musompo',
    datePublication: '2024-01-20',
    taille: '0.4 MB',
    type: 'PDF',
    telechargements: 2387,
    description: 'Communiqué sur la signature de la convention internationale pour le Hub Cobalt',
  },
]

export const categories = Object.keys(categoryConfig) as DocCategory[]

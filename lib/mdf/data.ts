/**
 * Genius Design Pro — atelier de fabrication de meubles en MDF.
 *
 * Toutes les données éditoriales du site vivent ici : un seul fichier à
 * modifier pour changer les prix, les délais, les coordonnées ou le catalogue.
 */

export type ArtKind =
  | 'cuisine'
  | 'dressing'
  | 'tv'
  | 'bibliotheque'
  | 'bureau'
  | 'chambre'
  | 'comptoir'
  | 'mural'

export interface Collection {
  slug: string
  nom: string
  accroche: string
  art: ArtKind
  resume: string
  description: string[]
  prix: string
  unite: string
  delai: string
  atouts: string[]
  inclus: string[]
  options: string[]
}

export const company = {
  nom: 'Genius Design Pro',
  signature: 'Atelier de meubles en MDF',
  baseline: "L'art du sur-mesure, panneau par panneau",
  telephone: '+243 812 000 450',
  telephoneHref: '+243812000450',
  whatsapp: '+243 812 000 450',
  email: 'contact@geniusdesignpro.com',
  emailDevis: 'devis@geniusdesignpro.com',
  adresse: "Atelier & showroom — 142, avenue de l'Industrie, Limete",
  ville: 'Kinshasa, République Démocratique du Congo',
  horaires: [
    { jours: 'Lundi — Vendredi', heures: '08h00 — 17h30' },
    { jours: 'Samedi', heures: '09h00 — 14h00' },
    { jours: 'Dimanche', heures: 'Sur rendez-vous' },
  ],
  fondation: 2011,
}

export const stats = [
  { valeur: '1 400+', label: 'meubles livrés', detail: 'depuis 2011' },
  { valeur: '2 800 m²', label: "d'atelier", detail: 'usinage CNC intégré' },
  { valeur: '21 j', label: 'délai moyen', detail: 'du devis à la pose' },
  { valeur: '10 ans', label: 'de garantie', detail: 'sur la structure' },
]

export const promesses = [
  {
    titre: 'Panneaux certifiés E1',
    texte:
      "MDF à faible émission de formaldéhyde, densité 720 à 780 kg/m³, sélectionné panneau par panneau à la réception.",
  },
  {
    titre: 'Usinage numérique',
    texte:
      "Découpe et perçage pilotés par commande numérique : une tolérance de ±0,2 mm sur chaque pièce, y compris en série.",
  },
  {
    titre: 'Quincaillerie à vie',
    texte:
      "Coulisses à sortie totale et charnières à amorti garanties par le fabricant, testées à 50 000 cycles d'ouverture.",
  },
  {
    titre: 'Pose par nos équipes',
    texte:
      "Aucun sous-traitant : les monteurs qui posent chez vous sont ceux qui ont assemblé le meuble à l'atelier.",
  },
]

export const collections: Collection[] = [
  {
    slug: 'cuisines',
    nom: 'Cuisines équipées',
    accroche: 'Le meuble le plus sollicité de la maison',
    art: 'cuisine',
    resume:
      "Caissons en MDF hydrofuge, façades laquées ou plaquées, plans de travail ajustés au millimètre.",
    description: [
      "Une cuisine vit sous la vapeur, les projections et les chocs quotidiens. Nous la construisons en MDF hydrofuge de 18 mm pour les caissons et de 19 mm pour les façades, avec chants ABS de 2 mm collés à chaud sur les quatre côtés — y compris les faces cachées, là où l'humidité s'infiltre en premier.",
      "L'implantation est dessinée autour de votre triangle d'activité : stockage, lavage, cuisson. Chaque tiroir est dimensionné pour ce qu'il recevra réellement, des casseroles aux épices, avec aménagements intérieurs en option.",
    ],
    prix: '480 $',
    unite: 'le mètre linéaire',
    delai: '3 à 5 semaines',
    atouts: [
      'MDF hydrofuge classe P3 sur toute la partie basse',
      'Chants ABS 2 mm collés sur les 4 faces',
      'Coulisses à amorti et sortie totale',
      'Plinthe aluminium démontable pour le nettoyage',
    ],
    inclus: [
      'Relevé de cotes à domicile',
      'Plan 3D et vues photoréalistes',
      'Caissons, façades, tiroirs et quincaillerie',
      'Découpe des passages plomberie et électricité',
      'Pose et réglage complet des façades',
    ],
    options: [
      'Plan de travail stratifié, quartz ou granit',
      'Éclairage LED sous meuble haut',
      'Rangements d\'angle pivotants',
      'Portes push-to-open sans poignée',
    ],
  },
  {
    slug: 'dressings',
    nom: 'Dressings & placards',
    accroche: 'Chaque centimètre de mur devient du rangement',
    art: 'dressing',
    resume:
      "Dressings ouverts, placards toute hauteur, portes coulissantes : conçus au profil exact de la pièce.",
    description: [
      "Les murs ne sont jamais d'équerre. Plutôt que de poser un meuble standard et de combler les jours avec des baguettes, nous relevons chaque angle et fabriquons des caissons à la cote réelle, avec joues de finition ajustées sur place.",
      "L'aménagement intérieur se décide avec vous : hauteur de penderie longue et courte, nombre de tiroirs, tablettes à chaussures inclinées, tiroirs à bijoux compartimentés.",
    ],
    prix: '360 $',
    unite: 'le mètre linéaire',
    delai: '2 à 4 semaines',
    atouts: [
      'Fabrication à la cote réelle du mur',
      'Penderies renforcées, tube acier 25 mm',
      'Portes coulissantes sur rail bas silencieux',
      'Fond apparent traité, pas de carton',
    ],
    inclus: [
      'Étude d\'aménagement intérieur',
      'Caissons, tablettes et penderies',
      'Joues de finition ajustées sur site',
      'Miroir intérieur au choix',
      'Pose et mise à niveau',
    ],
    options: [
      'Éclairage LED à détecteur d\'ouverture',
      'Portes miroir pleine hauteur',
      'Tiroirs à façade vitrée',
      'Module coiffeuse intégré',
    ],
  },
  {
    slug: 'meubles-tv',
    nom: 'Meubles TV & living',
    accroche: 'Le mur du salon, traité comme une façade',
    art: 'tv',
    resume:
      "Compositions murales suspendues ou posées, passages de câbles intégrés, niches éclairées.",
    description: [
      "Un meuble TV réussi fait disparaître la technique. Nous intégrons les passages de câbles dans l'épaisseur des panneaux, prévoyons la ventilation des appareils et positionnons les prises avant la pose pour qu'aucun fil ne soit visible.",
      "La composition peut être suspendue pour libérer le sol, ou posée sur socle en retrait pour donner l'impression qu'elle flotte. Les deux se dessinent à partir de la largeur du mur et de la hauteur d'assise de votre canapé.",
    ],
    prix: '290 $',
    unite: 'le mètre linéaire',
    delai: '2 à 3 semaines',
    atouts: [
      'Fixations murales calculées pour 80 kg/ml',
      'Passages de câbles et ventilation intégrés',
      'Niches à éclairage LED indirect',
      'Façades sans poignée, ouverture par touche',
    ],
    inclus: [
      'Étude de composition murale',
      'Caissons bas, colonnes et étagères',
      'Perçage et fixations adaptées au mur',
      'Gestion complète du câblage apparent',
      'Pose et calage de niveau',
    ],
    options: [
      'Support TV orientable encastré',
      'Cheminée électrique intégrée',
      'Vitrines à portes verre et cadre alu',
      'Bandeau LED avec variateur',
    ],
  },
  {
    slug: 'bibliotheques',
    nom: 'Bibliothèques & rangements',
    accroche: 'Des étagères qui ne fléchissent pas',
    art: 'bibliotheque',
    resume:
      "Bibliothèques toute hauteur, sous-escaliers, rangements sur mesure pour volumes lourds.",
    description: [
      "Une tablette de bibliothèque mal calculée s'affaisse en deux ans. Nous limitons la portée libre à 80 cm en 19 mm, ou renforçons par une lisse de chant collée en sous-face lorsque la travée doit être plus large.",
      "Les hauteurs de niches sont modulées selon ce que vous rangez réellement : romans, beaux livres, classeurs, objets. Une bibliothèque dont toutes les étagères sont identiques gaspille toujours du volume.",
    ],
    prix: '310 $',
    unite: 'le mètre linéaire',
    delai: '2 à 4 semaines',
    atouts: [
      'Portée maîtrisée, aucune flèche visible',
      'Hauteurs de niches modulées',
      'Fixation anti-basculement obligatoire',
      'Montants apparents à chants plaqués',
    ],
    inclus: [
      'Relevé et calcul des portées',
      'Structure, tablettes et montants',
      'Échelle de tablettes réglable en option',
      'Traitement des angles rentrants',
      'Pose et ancrage mural',
    ],
    options: [
      'Portes basses de soubassement',
      'Éclairage de niche encastré',
      'Fond peint en teinte contrastée',
      'Échelle coulissante sur rail',
    ],
  },
  {
    slug: 'bureaux',
    nom: 'Bureaux & espaces de travail',
    accroche: 'Du poste isolé au plateau complet',
    art: 'bureau',
    resume:
      "Bureaux individuels, postes en open space, banques d'accueil et rangements d'archives.",
    description: [
      "Le mobilier de bureau est d'abord une affaire de série : des dizaines de postes identiques, montés vite, démontables lors d'un déménagement. Notre usinage numérique garantit qu'un poste fabriqué en janvier sera interchangeable avec un poste fabriqué en octobre.",
      "Les plateaux reçoivent un chant ABS de 2 mm sur les arêtes exposées aux avant-bras, et les passe-câbles sont positionnés selon l'implantation électrique réelle du plateau.",
    ],
    prix: '240 $',
    unite: 'le poste de travail',
    delai: '3 à 6 semaines',
    atouts: [
      'Séries strictement interchangeables',
      'Plateaux 25 mm à chants adoucis',
      'Meubles démontables et remontables',
      'Cheminements de câbles verticaux',
    ],
    inclus: [
      'Plan d\'implantation du plateau',
      'Plateaux, piètements et caissons mobiles',
      'Passe-câbles et goulottes sous plateau',
      'Numérotation des modules pour le montage',
      'Livraison et montage sur site',
    ],
    options: [
      'Cloisonnettes acoustiques',
      'Caisson à roulettes verrouillable',
      'Banque d\'accueil avec plan surélevé',
      'Armoires à archives à portes coulissantes',
    ],
  },
  {
    slug: 'chambres',
    nom: 'Chambres & têtes de lit',
    accroche: 'Une chambre dessinée d\'un seul tenant',
    art: 'chambre',
    resume:
      "Têtes de lit capitonnées ou nervurées, chevets suspendus, coiffeuses et coffres de rangement.",
    description: [
      "La tête de lit fixe le caractère de la pièce. Nous la traitons comme une façade murale : panneaux nervurés, cannelures fraisées ou capitonnage tissu tendu sur support MDF, sur toute la largeur du mur plutôt qu'à la largeur du matelas.",
      "Les chevets suspendus libèrent le sol et facilitent le ménage. Ils s'alignent sur la hauteur du matelas, pas sur une cote standard.",
    ],
    prix: '270 $',
    unite: 'le mètre linéaire',
    delai: '2 à 4 semaines',
    atouts: [
      'Nervures et cannelures fraisées à l\'atelier',
      'Capitonnage sur support MDF rigide',
      'Chevets suspendus alignés au matelas',
      'Prises et liseuses intégrées',
    ],
    inclus: [
      'Relevé du mur et hauteur d\'assise',
      'Tête de lit toute largeur',
      'Chevets ou tablettes latérales',
      'Découpes pour prises et interrupteurs',
      'Pose et fixation renforcée',
    ],
    options: [
      'Coffre de lit à vérins',
      'Liseuses LED orientables',
      'Coiffeuse avec miroir éclairé',
      'Habillage tissu ou simili au choix',
    ],
  },
  {
    slug: 'agencement',
    nom: 'Agencement commercial',
    accroche: 'Boutiques, comptoirs, pharmacies, réception',
    art: 'comptoir',
    resume:
      "Comptoirs d'accueil, gondoles, présentoirs et arrières-caisses conçus pour un usage intensif.",
    description: [
      "Un agencement commercial encaisse en un mois ce qu'un meuble domestique subit en un an. Nous renforçons les zones de contact — nez de comptoir, angles saillants, plinthes — par des profilés aluminium ou des chants de 3 mm.",
      "Les chantiers sont planifiés pour limiter la fermeture du point de vente : préfabrication complète en atelier, pose de nuit ou sur un week-end lorsque c'est nécessaire.",
    ],
    prix: 'Sur étude',
    unite: 'selon le linéaire',
    delai: '4 à 8 semaines',
    atouts: [
      'Arêtes protégées par profilés aluminium',
      'MDF ignifuge M1 pour les ERP',
      'Préfabrication complète en atelier',
      'Pose hors horaires d\'ouverture',
    ],
    inclus: [
      'Visite technique et relevé du local',
      'Plans d\'exécution et calepinage',
      'Fabrication et pré-montage à blanc',
      'Intégration électrique et éclairage',
      'Pose, réglages et retouches',
    ],
    options: [
      'Enseigne et lettrage rétroéclairé',
      'Vitrines sécurisées à serrure',
      'Plan de caisse hauteur PMR',
      'Habillage stratifié imitation pierre',
    ],
  },
  {
    slug: 'habillage-mural',
    nom: 'Habillage mural & plafonds',
    accroche: 'Le décor qui structure le volume',
    art: 'mural',
    resume:
      "Panneaux nervurés, claustras, lambris et faux-plafonds décoratifs en MDF usiné.",
    description: [
      "Un mur habillé change la perception d'une pièce plus sûrement qu'une peinture. Les tasseaux et nervures verticales étirent la hauteur sous plafond ; les lignes horizontales élargissent un couloir étroit.",
      "Tous nos panneaux décoratifs sont usinés à l'atelier puis posés sur une ossature ventilée : aucune fixation apparente, et un démontage possible sans casse en cas d'intervention technique derrière.",
    ],
    prix: '95 $',
    unite: 'le mètre carré',
    delai: '2 à 3 semaines',
    atouts: [
      'Ossature ventilée, aucune vis apparente',
      'Nervures fraisées au pas régulier',
      'Démontage possible sans dégât',
      'Traitement des angles et retours',
    ],
    inclus: [
      'Calepinage du mur ou du plafond',
      'Ossature et panneaux usinés',
      'Découpes pour prises et luminaires',
      'Finition laquée ou plaquée',
      'Pose et joints de finition',
    ],
    options: [
      'Rétroéclairage LED entre nervures',
      'Claustra séparateur double face',
      'Intégration de portes invisibles',
      'Acoustique : panneaux perforés',
    ],
  },
]

export const etapes = [
  {
    numero: '01',
    titre: 'Rendez-vous et relevé',
    duree: '48 h',
    texte:
      "Un métreur se déplace, relève les cotes, les niveaux, les arrivées d'eau et d'électricité. Rien n'est estimé à l'œil.",
  },
  {
    numero: '02',
    titre: 'Conception et vues 3D',
    duree: '3 à 5 jours',
    texte:
      "Vous recevez un plan coté, des vues 3D réalistes et un devis détaillé poste par poste. Deux séries de modifications sont incluses.",
  },
  {
    numero: '03',
    titre: 'Choix des matières',
    duree: 'En showroom',
    texte:
      "Échantillons en main : type de MDF, finition, chants, quincaillerie. Les teintes se choisissent à la lumière du jour, jamais sur écran.",
  },
  {
    numero: '04',
    titre: 'Débit et usinage CNC',
    duree: '5 à 10 jours',
    texte:
      "Optimisation des chutes, découpe numérique, perçages de montage et fraisages décoratifs sur le même passage machine.",
  },
  {
    numero: '05',
    titre: 'Plaquage et montage à blanc',
    duree: '3 à 5 jours',
    texte:
      "Les chants sont collés à chaud, puis le meuble est intégralement monté à l'atelier et contrôlé avant d'être démonté pour le transport.",
  },
  {
    numero: '06',
    titre: 'Pose et réception',
    duree: '1 à 3 jours',
    texte:
      "Nos monteurs installent, règlent chaque façade au jeu constant, nettoient le chantier et vous font signer la réception.",
  },
]

export const materiaux = [
  {
    nom: 'MDF standard',
    code: 'Densité 720 kg/m³',
    usage: 'Façades, étagères, habillages en pièce sèche',
    couleur: '#C2A47C',
  },
  {
    nom: 'MDF hydrofuge',
    code: 'Classe P3 — teinté vert',
    usage: 'Cuisines, salles de bain, buanderies',
    couleur: '#5E7A5A',
  },
  {
    nom: 'MDF ignifuge',
    code: 'Euroclasse B-s1 — teinté rouge',
    usage: 'Établissements recevant du public',
    couleur: '#9A5245',
  },
  {
    nom: 'MDF haute densité',
    code: 'Densité 850 kg/m³',
    usage: 'Fraisages fins, cannelures, moulures',
    couleur: '#8D6E4A',
  },
]

export const finitions = [
  { nom: 'Laque mate', teinte: '#EDE7DE', note: 'Velouté, sans reflet' },
  { nom: 'Laque satinée', teinte: '#D9CFC0', note: 'Le meilleur compromis' },
  { nom: 'Laque brillante', teinte: '#F6F1E9', note: 'Effet miroir, 8 couches' },
  { nom: 'Mélaminé texturé', teinte: '#A98457', note: 'Résistant, économique' },
  { nom: 'Placage chêne', teinte: '#C08E52', note: 'Bois véritable 0,6 mm' },
  { nom: 'Placage noyer', teinte: '#6B4429', note: 'Veinage profond' },
  { nom: 'Stratifié HPL', teinte: '#3E4A44', note: 'Usage intensif' },
  { nom: 'Teinte encre', teinte: '#20262B', note: 'Contemporain, salissant' },
]

export const realisations = [
  {
    titre: 'Cuisine en U, appartement Gombe',
    categorie: 'cuisines',
    lieu: 'Gombe',
    annee: '2025',
    detail: '7,2 m linéaires — laque satinée sable',
    art: 'cuisine' as ArtKind,
  },
  {
    titre: 'Dressing d\'angle sous comble',
    categorie: 'dressings',
    lieu: 'Ma Campagne',
    annee: '2025',
    detail: '4,8 m linéaires — 9 modules à la cote',
    art: 'dressing' as ArtKind,
  },
  {
    titre: 'Mur TV suspendu, villa Binza',
    categorie: 'meubles-tv',
    lieu: 'Binza',
    annee: '2024',
    detail: '5,4 m — niches rétroéclairées',
    art: 'tv' as ArtKind,
  },
  {
    titre: 'Bibliothèque toute hauteur',
    categorie: 'bibliotheques',
    lieu: 'Limete',
    annee: '2024',
    detail: '3,6 m × 2,9 m — 42 niches modulées',
    art: 'bibliotheque' as ArtKind,
  },
  {
    titre: 'Plateau de 24 postes, siège bancaire',
    categorie: 'bureaux',
    lieu: 'Gombe',
    annee: '2025',
    detail: '24 postes identiques + 3 salles de réunion',
    art: 'bureau' as ArtKind,
  },
  {
    titre: 'Tête de lit cannelée pleine largeur',
    categorie: 'chambres',
    lieu: 'Kintambo',
    annee: '2024',
    detail: '3,8 m — cannelures au pas de 40 mm',
    art: 'chambre' as ArtKind,
  },
  {
    titre: 'Comptoir de pharmacie',
    categorie: 'agencement',
    lieu: 'Bandalungwa',
    annee: '2025',
    detail: 'MDF ignifuge — pose en un week-end',
    art: 'comptoir' as ArtKind,
  },
  {
    titre: 'Claustra de séparation, restaurant',
    categorie: 'habillage-mural',
    lieu: 'Gombe',
    annee: '2024',
    detail: '11 m² — tasseaux double face',
    art: 'mural' as ArtKind,
  },
  {
    titre: 'Arrière-caisse et gondoles, concept-store',
    categorie: 'agencement',
    lieu: 'Lingwala',
    annee: '2023',
    detail: '38 m² d\'agencement complet',
    art: 'comptoir' as ArtKind,
  },
]

export const temoignages = [
  {
    texte:
      "Le relevé a duré deux heures, ce qui m'a paru long. À la pose, pas un seul jour à combler : tout tombait juste. J'ai compris pourquoi.",
    auteur: 'Mireille K.',
    role: 'Cuisine complète, Gombe',
  },
  {
    texte:
      "Nous avons équipé 24 postes en six semaines sans interrompre l'activité. Le montage s'est fait le samedi, tout était opérationnel le lundi.",
    auteur: 'Patrick M.',
    role: 'Responsable des services généraux',
  },
  {
    texte:
      "Trois ans après, les charnières ne pendent toujours pas et les tiroirs se ferment en silence. C'est exactement ce que je cherchais.",
    auteur: 'Divine N.',
    role: 'Dressing et tête de lit, Binza',
  },
  {
    texte:
      "Le devis était détaillé ligne par ligne. Aucun supplément n'est apparu en cours de chantier, ce qui n'était jamais arrivé avant.",
    auteur: 'Joseph T.',
    role: 'Agencement de pharmacie',
  },
]

export const faq = [
  {
    question: 'Pourquoi du MDF plutôt que du bois massif ?',
    reponse:
      "Le MDF est stable : il ne travaille pas avec l'humidité et ne se fend pas, ce qui est décisif sous notre climat. Il offre aussi une surface parfaitement lisse, indispensable pour la laque, et permet des fraisages décoratifs impossibles en massif. Le bois massif reste pertinent pour les plans de travail et les pièces structurelles, que nous intégrons quand le projet le demande.",
  },
  {
    question: 'Le MDF craint-il vraiment l\'eau ?',
    reponse:
      "Le MDF standard oui, le MDF hydrofuge beaucoup moins. Sous évier, en salle de bain et sur toute partie basse de cuisine, nous utilisons systématiquement du MDF hydrofuge classe P3 avec chants collés sur les quatre faces. C'est le chant non plaqué, jamais le panneau, qui absorbe l'eau en premier.",
  },
  {
    question: 'Combien de temps entre le devis et la pose ?',
    reponse:
      "Comptez 21 jours en moyenne pour un projet domestique : 3 à 5 jours de conception, une semaine de validation et choix des matières, 10 jours de fabrication, puis la pose. Les projets d'agencement commercial demandent 4 à 8 semaines.",
  },
  {
    question: 'Le devis est-il payant ?',
    reponse:
      "Non. Le déplacement, le relevé de cotes, les vues 3D et le devis détaillé sont gratuits et sans engagement dans Kinshasa. Au-delà, un forfait de déplacement s'applique et vous est déduit si le projet se concrétise.",
  },
  {
    question: 'Quelles sont les modalités de paiement ?',
    reponse:
      "50 % à la commande pour lancer l'approvisionnement, 40 % au lancement de la fabrication, 10 % à la réception après vérification. Aucun règlement n'est demandé avant signature du devis.",
  },
  {
    question: 'Que couvre la garantie de 10 ans ?',
    reponse:
      "La structure : caissons, assemblages, tenue des fixations et intégrité des panneaux. La quincaillerie est garantie 5 ans et les finitions 2 ans contre le décollement. L'usure normale et les dégâts liés à une infiltration extérieure ne sont pas couverts.",
  },
  {
    question: 'Intervenez-vous hors de Kinshasa ?',
    reponse:
      "Oui, sur l'ensemble du territoire pour les projets d'agencement et les commandes en série. Le transport et l'hébergement des monteurs sont alors chiffrés séparément dans le devis.",
  },
  {
    question: 'Puis-je fournir mes propres plans ?',
    reponse:
      "Volontiers. Si vous travaillez avec un architecte d'intérieur, nous intervenons en simple exécutant : nous vérifions la faisabilité, adaptons les épaisseurs et les assemblages, puis fabriquons d'après ses plans.",
  },
]

export const zonesIntervention = [
  'Gombe',
  'Limete',
  'Binza',
  'Ma Campagne',
  'Kintambo',
  'Ngaliema',
  'Lingwala',
  'Bandalungwa',
  'Lemba',
  'Masina',
]

export const savoirFaire = [
  'Découpe CNC',
  'Placage de chants ABS',
  'Laquage en cabine',
  'Fraisage décoratif',
  'Cannelures et nervures',
  'Montage à blanc',
  'Perçage système 32',
  'Calibrage de panneaux',
  'Pose sur chantier',
]

/**
 * « dès 480 $ » pour un tarif chiffré, « Sur étude » tel quel : évite le
 * « dès Sur étude » des collections dont le prix dépend du relevé.
 */
export const prixLabel = (prix: string) =>
  /^\d/.test(prix) ? `dès ${prix}` : prix

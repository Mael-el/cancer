export interface CentreSante {
  id: string;
  nom: string;
  type: 'hopital' | 'dispensaire' | 'maternite' | 'clinique';
  commune: string;
  departement: 'Littoral' | 'Atlantique' | 'Ouémé' | 'Borgou' | 'Zou' | 'Atacora' | 'Mono';
  adresse: string;
  contact: string;
  horaires: string;
  services: string[];
  gratuit: boolean;
  tarifsInfo: string;
  accessibilite: string;
  lat: number;
  lng: number;
}

export const CENTRES_BENIN_LISTE: CentreSante[] = [
  {
    id: 'cnhu-cotonou',
    nom: 'Centre National Hospitalier et Universitaire Hubert K. Maga (CNHU-HKM)',
    type: 'hopital',
    commune: 'Cotonou',
    departement: 'Littoral',
    adresse: 'Avenue Jean-Paul II, Cadjèhoun, Cotonou',
    contact: '+229 21 30 01 55',
    horaires: 'Lun - Ven: 07h30 - 16h30 (Urgences 24/7)',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Oncologie médicale', 'Mammographie', 'Chirurgie gynécologique'],
    gratuit: true,
    tarifsInfo: 'Dépistage IVA et Vaccin VPH 100% gratuits (Programme National). Examens spécialisés à tarifs conventionnés.',
    accessibilite: 'Accessible en fauteuil roulant, rampe d’accès, arrêts de Zemidjan et bus SOTRACO à l’entrée.',
    lat: 6.3572,
    lng: 2.4045
  },
  {
    id: 'hz-menontin',
    nom: 'Hôpital de Zone de Ménontin',
    type: 'hopital',
    commune: 'Cotonou',
    departement: 'Littoral',
    adresse: 'Quartier Ménontin, 9ème Arrondissement, Cotonou',
    contact: '+229 21 38 12 00',
    horaires: 'Lun - Sam: 08h00 - 17h00',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Consultation prénatale & Maternité'],
    gratuit: true,
    tarifsInfo: 'Dépistage IVA gratuit chaque jeudi et vendredi matin. Vaccin VPH sans frais.',
    accessibilite: 'Rez-de-chaussée de plain-pied, parking vélos et motos accessible.',
    lat: 6.3789,
    lng: 2.3781
  },
  {
    id: 'maternite-lagune',
    nom: 'Centre Hospitalier Universitaire de la Mère et de l’Enfant (HOMEL)',
    type: 'maternite',
    commune: 'Cotonou',
    departement: 'Littoral',
    adresse: 'Bvd Lagunaire, Quartier Jonquet, Cotonou',
    contact: '+229 21 31 23 45',
    horaires: 'Lun - Ven: 08h00 - 16h00',
    services: ['Dépistage IVA Col Utérus', 'Palpation mammaire', 'Vaccination VPH', 'Suivi post-natal'],
    gratuit: true,
    tarifsInfo: 'Protocole gratuit PNLMNT pour toutes les femmes de 25 à 49 ans.',
    accessibilite: 'Accès adapté aux femmes enceintes et personnes à mobilité réduite.',
    lat: 6.3621,
    lng: 2.4285
  },
  {
    id: 'cs-calavi',
    nom: 'Centre de Santé de Référence d’Abomey-Calavi (Zone Sanitaire)',
    type: 'dispensaire',
    commune: 'Abomey-Calavi',
    departement: 'Atlantique',
    adresse: 'Face Mairie d’Abomey-Calavi, Route inter-États',
    contact: '+229 21 36 00 20',
    horaires: 'Lun - Ven: 08h00 - 16h00',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Dépistage Hépatite B', 'Conseils nutritionnels'],
    gratuit: true,
    tarifsInfo: 'IVA gratuite. Test hépatite B à tarif subventionné (1 500 FCFA).',
    accessibilite: 'Proche carrefour Kpota, accès direct taxis-motos.',
    lat: 6.4485,
    lng: 2.3551
  },
  {
    id: 'chud-oueme-porto',
    nom: 'Centre Hospitalier Universitaire Départemental (CHUD) Ouémé',
    type: 'hopital',
    commune: 'Porto-Novo',
    departement: 'Ouémé',
    adresse: 'Quartier Attakè, Boulevard Lagunaire, Porto-Novo',
    contact: '+229 20 21 23 80',
    horaires: 'Lun - Ven: 08h00 - 17h00',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Biopsie & Gynécologie', 'Dépistage Sein'],
    gratuit: true,
    tarifsInfo: 'Dépistage IVA gratuit. Palpation mammaire sans frais lors des consultations gynécologiques.',
    accessibilite: 'Grande cour pavée, accès facile depuis le pont de Porto-Novo.',
    lat: 6.4969,
    lng: 2.6288
  },
  {
    id: 'chud-borgou-parakou',
    nom: 'CHUD Borgou - Alibori (Parakou)',
    type: 'hopital',
    commune: 'Parakou',
    departement: 'Borgou',
    adresse: 'Avenue Tibona, Centre-ville, Parakou',
    contact: '+229 23 61 03 30',
    horaires: 'Lun - Ven: 08h00 - 16h30',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Hépatites virales', 'Chirurgie'],
    gratuit: true,
    tarifsInfo: 'Dépistage national gratuit du col de l’utérus et vaccination VPH pour filles de 9 à 14 ans.',
    accessibilite: 'Accessible en véhicule ou zemidjan, service d’accueil bilingue (Français, Dendi, Bariba, Fon).',
    lat: 9.3371,
    lng: 2.6303
  },
  {
    id: 'cs-bohicon',
    nom: 'Centre de Santé Communal de Bohicon',
    type: 'dispensaire',
    commune: 'Bohicon',
    departement: 'Zou',
    adresse: 'Carrefour Zakpo, Bohicon',
    contact: '+229 22 51 01 40',
    horaires: 'Lun - Ven: 08h00 - 16h00',
    services: ['Dépistage IVA Col Utérus', 'Vaccination VPH', 'Sensibilisation nutritionnelle'],
    gratuit: true,
    tarifsInfo: 'Consultation dépistage IVA gratuite sur rendez-vous le mardi et le jeudi.',
    accessibilite: 'Facile d’accès depuis la gare routière de Bohicon.',
    lat: 7.1782,
    lng: 2.0667
  },
  {
    id: 'clinique-st-jean',
    nom: 'Polyclinique Saint-Jean de Cotonou',
    type: 'clinique',
    commune: 'Cotonou',
    departement: 'Littoral',
    adresse: 'Quartier Haie Vive, Rue 380, Cotonou',
    contact: '+229 21 30 45 60',
    horaires: 'Lun - Sam: 08h00 - 19h00',
    services: ['Frottis cervico-vaginal (FCV)', 'Échographie pelvienne', 'Mammographie numérique', 'PSA Prostate'],
    gratuit: false,
    tarifsInfo: 'Établissement privé conventionné : FCV à 12 000 FCFA, PSA à 15 000 FCFA. Prise en charge assurances.',
    accessibilite: 'Parking surveillé, climatisation, accès PMR complet.',
    lat: 6.3533,
    lng: 2.3987
  }
];

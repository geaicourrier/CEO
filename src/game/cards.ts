export type Department = 'Tech' | 'HR' | 'Sales' | 'Finance' | 'Legal' | 'Conjoncture';

export interface CardImpacts {
  cash?: number;
  traction?: number;
  morale?: number;
  board?: number;
}

export interface GameCard {
  id: string;
  department: Department;
  role: string;
  text: string;
  timing: {
    year?: number;
    quarter?: 1 | 2 | 3 | 4;
    isWildCard?: boolean;
    isBlackSwan?: boolean;
  };
  leftChoice: { label: string; impacts: CardImpacts };
  rightChoice: { label: string; impacts: CardImpacts };
  /** Optional attached comic strip; runtime falls back to generated defaults. */
  comicStrip?: import('./comic').CardComicStrip;
}

/* -------------------------------- Wild Cards -------------------------------- */

export const WILD_CARDS: GameCard[] = [
  {
    id: 'wild_viral_tweet',
    department: 'Conjoncture',
    role: 'Algorithme X / Twitter',
    text: "Une influenceuse tech dénonce l'ergonomie de notre app. Le bad buzz explose et fait planter nos serveurs !",
    timing: { isWildCard: true },
    leftChoice: { label: 'Assumer avec humour', impacts: { traction: 30, cash: -15, board: -10 } },
    rightChoice: { label: 'Attaquer en justice', impacts: { traction: -20, board: 15 } },
  },
  {
    id: 'wild_predator_buyout',
    department: 'Conjoncture',
    role: 'Géant des Télécoms',
    text: 'Un conglomérat propose de racheter 40% de votre filiale R&D pour une somme colossale immédiate.',
    timing: { isWildCard: true },
    leftChoice: { label: 'Encaisser le pactole', impacts: { cash: 35, board: -20 } },
    rightChoice: { label: "Conserver l'intégrité", impacts: { cash: -10, morale: 15, board: 10 } },
  },
  {
    id: 'wild_competitor_leak',
    department: 'Conjoncture',
    role: "Lanceur d'Alerte Anonyme",
    text: "Un dev de notre principal rival nous envoie sur clé USB l'intégralité de leur base clients et code source.",
    timing: { isWildCard: true },
    leftChoice: { label: 'Piller sans scrupule', impacts: { traction: 25, board: -15 } },
    rightChoice: { label: 'Détruire la clé USB', impacts: { morale: 15, traction: -10 } },
  },
  {
    id: 'wild_poach_exec',
    department: 'Conjoncture',
    role: 'Chasseur de Têtes Élite',
    text: 'Le CTO de Google veut nous rejoindre par haine de son boss. Mais il réclame un salaire de footballeur.',
    timing: { isWildCard: true },
    leftChoice: { label: 'Recruter la star', impacts: { cash: -30, board: 25, morale: -10 } },
    rightChoice: { label: "Décliner l'offre", impacts: { cash: 10, morale: 10, board: -15 } },
  },
  {
    id: 'wild_crypto_pivot',
    department: 'Conjoncture',
    role: 'Consultant Web3 Égaré',
    text: 'Une obscure fondation suisse nous offre 1M€ de subvention si on intègre une blockchain inutile dans notre produit.',
    timing: { isWildCard: true },
    leftChoice: { label: 'Prendre les tokens', impacts: { cash: 30, morale: -15, traction: -10 } },
    rightChoice: { label: 'Rester rationnel', impacts: { morale: 10, cash: -10 } },
  },
];

/* -------------------------------- Black Swans ------------------------------- */

export const BLACK_SWANS: GameCard[] = [
  {
    id: 'swan_bank_run',
    department: 'Conjoncture',
    role: 'Directeur de Banque Startup',
    text: "Notre banque partenaire s'effondre en 48 heures. 70% de nos dépôts sont gelés par les autorités !",
    timing: { isBlackSwan: true },
    leftChoice: { label: 'Licencier 40% du staff', impacts: { cash: 20, morale: -35, traction: -15 } },
    rightChoice: { label: 'Emprunter à taux usurier', impacts: { cash: -15, board: -30 } },
  },
  {
    id: 'swan_gdpr_raid',
    department: 'Conjoncture',
    role: 'Brigade Régulation Numérique',
    text: "Perquisition surprise. Les logs démontrent que l'app revendait des données utilisateurs sans consentement.",
    timing: { isBlackSwan: true },
    leftChoice: { label: 'Plaider la négligence', impacts: { cash: -30, board: -15, traction: -20 } },
    rightChoice: { label: 'Rejeter la faute sur le DPO', impacts: { cash: -15, morale: -35, board: -10 } },
  },
  {
    id: 'swan_api_shutdown',
    department: 'Conjoncture',
    role: 'Fournisseur Cloud Central',
    text: "Le géant de l'IA dont dépend tout notre service coupe nos accès pour violation unilatérale de ses CGU.",
    timing: { isBlackSwan: true },
    leftChoice: { label: 'Hackathon commando 72h', impacts: { morale: -30, cash: -20, traction: 15 } },
    rightChoice: { label: 'Mettre le site en veille', impacts: { traction: -40, board: -25 } },
  },
  {
    id: 'swan_founder_burnout',
    department: 'Conjoncture',
    role: 'Service des Urgences',
    text: "Vous vous écroulez en pleine réunion d'investisseurs. Diagnostic : surmenage aigu, 3 semaines d'arrêt forcé.",
    timing: { isBlackSwan: true },
    leftChoice: { label: 'Signer depuis le brancard', impacts: { morale: -25, board: 20, cash: -10 } },
    rightChoice: { label: 'Déléguer aux équipes', impacts: { morale: 15, traction: -25, board: -25 } },
  },
  {
    id: 'swan_zero_day',
    department: 'Conjoncture',
    role: 'Cyber-Rançonneur',
    text: "Tout notre cloud de production est chiffré. Le hacker exige 50 Bitcoins avant minuit sous peine d'effacement.",
    timing: { isBlackSwan: true },
    leftChoice: { label: 'Payer la rançon', impacts: { cash: -40, board: -20 } },
    rightChoice: { label: 'Restaurer le backup vieux de 6 mois', impacts: { traction: -35, morale: -25 } },
  },
];

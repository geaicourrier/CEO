import { ARCHETYPES } from './archetypes';
import type { ArchetypeId } from './archetypes';
import type { GameCard, Department } from './cards';
import { WILD_CARDS, BLACK_SWANS } from './cards';
import { STRATEGY_POOL, APP_VERSION } from './constants';
import type { CardComicStrip } from './comic';
import { defaultComicStrip, DEFAULT_MASTER_STYLE } from './comic';
import { FOUNDATION_STORYBOARDS } from './foundationStoryboards';
import { YEAR1_STORYBOARDS } from './year1Storyboards';
import { YEAR2_STORYBOARDS } from './year2Storyboards';
import { YEAR3_STORYBOARDS } from './year3Storyboards';
import { YEAR4_STORYBOARDS } from './year4Storyboards';
import { YEAR5_STORYBOARDS } from './year5Storyboards';

export type { ArchetypeId, GameCard, Department };

export type Impacts = { cash?: number; traction?: number; morale?: number; board?: number };

export interface FounderProfile {
  id: string;
  name: string;
  domain: string;
  icon: string;
  tagline: string;
  stats: Impacts;
  passiveLabel: string;
  passiveDescription: string;
}

/** Founding-phase card. ID scheme: `0QV` — question 01–04, variant A/B. */
export interface FoundationCard {
  id: string; // '01A' | '01B' | ... '04B'
  question: 1 | 2 | 3 | 4;
  variant: 'A' | 'B';
  department: Department;
  role: string;
  text: string;
  leftChoice: { label: string; impacts: Impacts };
  rightChoice: { label: string; impacts: Impacts };
  comicStrip: CardComicStrip;
}

/** Operational card. ID scheme: `YQV` — year 1–5, quarter 1–4, variant A/B. */
export interface OpsCard {
  id: string; // '11A' .. '54B'
  year: 1 | 2 | 3 | 4 | 5;
  quarter: 1 | 2 | 3 | 4;
  variant: 'A' | 'B';
  department: Department;
  role: string;
  text: string;
  leftChoice: { label: string; impacts: Impacts };
  rightChoice: { label: string; impacts: Impacts };
  comicStrip: CardComicStrip;
}

/** Annual arbitration option. ID scheme: `Yslot` — year 1–5, slot 1–3. */
export interface AnnualPerk {
  id: string;
  year: 1 | 2 | 3 | 4 | 5;
  slot: 1 | 2 | 3;
  kind: 'permanent-perk' | 'temp-boost' | 'trade-off';
  title: string;
  description: string;
  impacts: Impacts;
  passiveLabel?: string;
  passiveDescription?: string;
  icon?: string;
}

export interface GameContent {
  version: string;
  masterStyleReference: string;
  founders: FounderProfile[];
  foundationCards: FoundationCard[];
  opsCards: OpsCard[];
  perks: AnnualPerk[];
}

export const DEFAULT_FOUNDERS: FounderProfile[] = (
  [
    'hacker',
    'hustler',
    'insider',
    'bootstrapper',
    'community',
    'heir',
    'deeptech',
    'veteran',
  ] as ArchetypeId[]
).map((id) => {
  const a = ARCHETYPES[id];
  return {
    id: a.id,
    name: a.name,
    domain: a.domain,
    icon: a.icon,
    tagline: a.tagline,
    stats: { ...a.stats },
    passiveLabel: a.passiveLabel,
    passiveDescription: a.passiveDescription,
  };
});

const FOUNDATION_BASE: Omit<FoundationCard, 'comicStrip'>[] = [
  {
    id: '01A',
    question: 1,
    variant: 'A',
    department: 'Legal',
    role: 'Co-fondateur Historique',
    text: "On doit signer le pacte d'associés. Tu gardes 60% et je prends 40%, ou on fait 50/50 pour la fraternité des débuts ?",
    leftChoice: { label: 'Imposer 60/40', impacts: { board: 10, morale: -15 } },
    rightChoice: { label: 'Partager 50/50', impacts: { board: -10, morale: 15 } },
  },
  {
    id: '01B',
    question: 1,
    variant: 'B',
    department: 'Finance',
    role: 'Squatteur de Domaine',
    text: 'Le .com de notre boîte est détenu par un retraité en Floride. Il en réclame 15 000 $ tout de suite.',
    leftChoice: { label: 'Acheter le .com', impacts: { cash: -20, traction: 15 } },
    rightChoice: { label: 'Prendre un .io obscur', impacts: { cash: 5, traction: -10 } },
  },
  {
    id: '02A',
    question: 2,
    variant: 'A',
    department: 'HR',
    role: 'Stagiaire Motivation Extrême',
    text: "Je peux coder 80 heures par semaine gratuitement en échange de visibilité et d'une promesse de BSPCE !",
    leftChoice: { label: 'Exploiter sans pitié', impacts: { cash: 15, morale: -15 } },
    rightChoice: { label: 'Payer un vrai salaire', impacts: { cash: -15, morale: 10 } },
  },
  {
    id: '02B',
    question: 2,
    variant: 'B',
    department: 'Tech',
    role: 'Lead Architecte Puriste',
    text: "Notre code d'amorce est une bouillie infecte. Arrêtons les ventes pendant 2 mois pour tout réécrire proprement.",
    leftChoice: { label: 'Refactoriser', impacts: { morale: 15, traction: -20 } },
    rightChoice: { label: 'Empiler les bugs', impacts: { traction: 10, morale: -10 } },
  },
  {
    id: '03A',
    question: 3,
    variant: 'A',
    department: 'Tech',
    role: 'Architecte Genèse MVP',
    text: 'Place au MVP. On assemble un no-code bancal livrable vendredi, ou on brûle 6 semaines sur une vraie architecture technique ?',
    leftChoice: { label: 'No-code vendredi', impacts: { traction: 15, morale: -10, board: -5 } },
    rightChoice: { label: 'Architecturer sérieux', impacts: { traction: -10, morale: 10, board: 10 } },
  },
  {
    id: '03B',
    question: 3,
    variant: 'B',
    department: 'Finance',
    role: "Directeur d'Accélérateur",
    text: 'Rejoignez notre incubateur hype ! En échange de 8% de votre capital, on vous offre des tables en bois brut et du café torréfié.',
    leftChoice: { label: 'Signer le deal', impacts: { board: 15, cash: -10, traction: 10 } },
    rightChoice: { label: 'Rester dans le garage', impacts: { board: -10, cash: 10 } },
  },
  {
    id: '04A',
    question: 4,
    variant: 'A',
    department: 'Sales',
    role: 'Premier Prospect Tiède',
    text: "Votre logiciel est affreux et incompréhensible. Mais si vous ajoutez un module d'export PDF en Comic Sans, je signe pour 5 000 €.",
    leftChoice: { label: 'Céder au client', impacts: { cash: 15, morale: -10 } },
    rightChoice: { label: 'Garder sa dignité', impacts: { cash: -10, morale: 10 } },
  },
  {
    id: '04B',
    question: 4,
    variant: 'B',
    department: 'Finance',
    role: 'Comptable Paniqué',
    text: "La trésorerie d'amorçage fond à vue d'œil. On gèle les recrutements ou on tente une campagne pub agressive ?",
    leftChoice: { label: 'Austérité totale', impacts: { cash: 15, traction: -15, morale: -10 } },
    rightChoice: { label: 'Tapis publicitaire', impacts: { cash: -25, traction: 25 } },
  },
];

export const DEFAULT_FOUNDATION: FoundationCard[] = FOUNDATION_BASE.map((c) => ({
  ...c,
  comicStrip: FOUNDATION_STORYBOARDS[c.id] ?? defaultComicStrip(c),
}));

const ops = (
  id: string,
  year: OpsCard['year'],
  quarter: OpsCard['quarter'],
  variant: 'A' | 'B',
  department: Department,
  role: string,
  text: string,
  leftLabel: string,
  leftImpacts: Impacts,
  rightLabel: string,
  rightImpacts: Impacts,
): OpsCard => ({
  id,
  year,
  quarter,
  variant,
  department,
  role,
  text,
  leftChoice: { label: leftLabel, impacts: leftImpacts },
  rightChoice: { label: rightLabel, impacts: rightImpacts },
  comicStrip: defaultComicStrip({
    department,
    role,
    text,
    leftChoice: { label: leftLabel, impacts: leftImpacts },
    rightChoice: { label: rightLabel, impacts: rightImpacts },
  }),
});

const OPS_BASE: OpsCard[] = [
  // --- Y1 (operational slots; the founding phase draws from the foundation deck) ---
  ops('11A', 1, 1, 'A', 'Tech', 'Dépendance Open-Source',
    "Notre stack repose sur une lib open-source maintenue par UN étudiant suédois. Il annonce une pause examens de six mois.",
    'Forker et maintenir', { morale: -10, traction: -5 },
    'Faire une donation', { cash: -5, morale: 5 }),
  ops('11B', 1, 1, 'B', 'HR', 'Recruteur Magique',
    "Un senior accepte de rejoindre l'aventure... mais exige bureau lumineux, fauteuil ergonomique premium et silence absolu.",
    'Satisfaire la diva', { cash: -10, morale: 10 },
    'Bureau standard', { morale: -5, board: 5 }),
  ops('12A', 1, 2, 'A', 'Sales', 'Prospect Fantôme',
    "Un prospect ultra-enthousiaste réclame trois démos, un POC gratuit et une étude d'impact personnalisée.",
    'Enchaîner les démos', { traction: 10, morale: -10 },
    'Couper court', { cash: 5, traction: -5 }),
  ops('12B', 1, 2, 'B', 'Finance', 'Banquier Personnel',
    "Votre banquier propose un prêt à taux préférentiel... contre une garantie hypothécaire sur votre appartement.",
    'Signer la garantie', { cash: 20, morale: -10 },
    'Rester liquide', { cash: 5, board: -5 }),
  ops('13A', 1, 3, 'A', 'Legal', 'Conflit de Marque',
    "Une PME d'Annecy porte le même nom que nous depuis douze ans. Son avocat vient d'écrire.",
    'Changer de nom', { traction: -10, cash: -5 },
    'Batailler au tribunal', { cash: -15, board: 10 }),
  ops('13B', 1, 3, 'B', 'HR', 'Manager Autoproclamé',
    "Votre premier employé s'est nommé VP de l'Innovation sur LinkedIn. Sans validation de personne.",
    'Recadrer en privé', { morale: -5, board: 5 },
    'Surfer sur le buzz', { traction: 5, board: -5 }),
  ops('14A', 1, 4, 'A', 'Sales', 'Salon Hors de Prix',
    "Un stand au salon SaaS Europe coûte 12 000 €. 400 leads qualifiés y défilent chaque année.",
    'Réserver le stand', { cash: -15, traction: 15 },
    "Prospection à l'ancienne", { morale: -10, cash: 5 }),
  ops('14B', 1, 4, 'B', 'Legal', 'Business Angel VIP',
    "Je clôture votre tour d'amorçage avec 200k€ si vous virez votre co-fondateur technique que je trouve trop mou.",
    'Éjecter le pote', { cash: 25, morale: -25, board: 15 },
    "Solidarité d'équipe", { cash: -15, morale: 20, board: -15 }),

  // --- Y2 ---
  ops('21A', 2, 1, 'A', 'Tech', 'Dette Technique Visible',
    "Le MVP tient avec du scotch et des prières. Chaque nouvelle feature casse silencieusement deux anciennes.",
    'Geler les features', { traction: -10, morale: 10 },
    "Continuer d'empiler", { traction: 10, morale: -10 }),
  ops('21B', 2, 1, 'B', 'HR', 'Guerre du Télétravail',
    "L'équipe réclame du full remote. Les investisseurs veulent vous voir au bureau, cravate et sourire.",
    'Full remote assumé', { morale: 15, board: -10 },
    'Retour au bureau 3 jours', { morale: -10, board: 10 }),
  ops('22A', 2, 2, 'A', 'Sales', 'Compte Mastodonte',
    "Un compte représenterait 40% du chiffre d'affaires... mais exige du sur-mesure et 60 jours de délai de paiement.",
    'Signer le mastodonte', { cash: -10, traction: 20, board: 5 },
    'Rester diversified', { cash: 5, traction: -5, morale: 5 }),
  ops('22B', 2, 2, 'B', 'Finance', 'Term Sheet Corrosive',
    "Un VC propose 3M€ mais avec une clause de liquidation 2x et un siège au board pour son analyste junior.",
    'Accepter les termes', { cash: 25, board: 10, morale: -10 },
    'Négocier ou mourir', { cash: -5, board: -5, morale: 10 }),
  ops('23A', 2, 3, 'A', 'Legal', 'Contrat Cadre Monstrueux',
    "Le service juridique du client renvoie 14 pages d'amendements dont une clause de propriété intellectuelle universelle.",
    'Signer pour le cash', { cash: 15, board: 5, morale: -10 },
    'Tenir la ligne', { cash: -10, morale: 10, board: 5 }),
  ops('23B', 2, 3, 'B', 'Tech', 'Framework de la Semaine',
    "Le lead dev veut tout migrer vers le framework hype du moment. Migration estimée : six semaines de productivité zéro.",
    'Migrer vers le hype', { morale: 10, traction: -10, cash: -5 },
    "Rester sur l'existant", { morale: -5, traction: 5 }),
  ops('24A', 2, 4, 'A', 'Conjoncture', 'Clone Budget x10',
    "Un concurrent sort un clone de notre produit avec un budget x10 et un marketing agressif sur tous les murs.",
    'Guerre frontale', { cash: -15, traction: 5, morale: -5 },
    'Se différencier', { traction: 10, cash: -5 }),
  ops('24B', 2, 4, 'B', 'HR', 'Premier Départ',
    "Votre meilleur ingénieur accepte une offre du concurrent avec 40% d'augmentation. Il attend une contre-proposition.",
    'Tenter une contre-offre', { cash: -10, morale: 5, board: -5 },
    'Laisser partir', { morale: -15, traction: -5 }),

  // --- Y3 ---
  ops('31A', 3, 1, 'A', 'Tech', 'La Crise de Croissance Interne',
    "Avec 35 salariés, l'équipe se disperse : réunions superflues, décisions bloquées et perte de repères. Faut-il formaliser des processus stricts quitte à bureaucratiser, ou préserver le chaos créatif ?",
    'Processus stricts et strates managériales', { traction: -10, morale: -5, board: 10 },
    "Refuser la bureaucratie, garder l'agilité", { traction: 10, morale: 5, board: -10 }),
  ops('31B', 3, 1, 'B', 'HR', 'La Campagne de Dénigrement',
    "Des vagues de faux avis négatifs et un article anonyme à charge circulent sur les réseaux, orchestrés par une agence obscure. Faut-il répliquer publiquement ou laisser passer l'orage ?",
    'Publier une tribune de riposte transparente', { traction: -5, morale: -5, board: 5 },
    'Ignorer silencieusement la tempête', { traction: -10, morale: 5 }),
  ops('32A', 3, 2, 'A', 'Sales', "L'Appel d'Offres Public",
    "Un ministère d'État sélectionne votre solution pour un contrat pluriannuel de 1,5 M€. En contrepartie : 18 mois de paperasse administrative et paiement à 120 jours.",
    "Signer l'accord-cadre avec l'État", { cash: 10, traction: 10, morale: -10 },
    'Décliner pour rester sur le privé rapide', { traction: -5, board: -5, morale: 5 }),
  ops('32B', 3, 2, 'B', 'Finance', 'La Dette Technique Critique',
    "Le code initial empilé depuis l'amorçage commence à céder : temps de build interminables, régressions à chaque commit. Le CTO réclame un mois de gel commercial total pour réécrire le coeur du produit.",
    'Accorder un sprint de refonte complète', { cash: -10, traction: -10, morale: 10 },
    'Forcer la cadence des livraisons', { traction: 10, morale: -10 }),
  ops('33A', 3, 3, 'A', 'Legal', 'La Tentative de Syndicalisation',
    "Suite aux cadences intenses, un groupe de salariés clés se syndique et demande une négociation collective sur les horaires et les salaires.",
    'Ouvrir les négociations et co-construire', { cash: -5, morale: 15, board: -10 },
    'Rester ferme, rappeler les contraintes', { morale: -15, board: 5 }),
  ops('33B', 3, 3, 'B', 'Tech', 'Le Partenariat GAFAM Asymétrique',
    "Un géant américain du cloud propose 250 000 $ de crédits d'infrastructure gratuits et une mise en avant sur leur marketplace, en échange d'une exclusivité technique totale sur leur écosystème propriétaire.",
    "Signer l'exclusivité et empocher les crédits", { cash: 20, traction: 10, morale: -5, board: -10 },
    'Rester agnostique, garder le multi-cloud', { cash: -10, morale: 10, board: 5 }),
  ops('34A', 3, 4, 'A', 'Conjoncture', 'Le Conflit d Actionnaires',
    "Les visions stratégiques entre co-fondateurs deviennent inconciliables. Votre associé historique ralentit la cadence et refuse de suivre les nouvelles orientations du conseil d'administration.",
    "Racheter ses parts pour le sortir du capital", { cash: -20, morale: -5, board: 15 },
    'Médiation et co-direction maintenue', { cash: 5, traction: -10, board: -10 }),
  ops('34B', 3, 4, 'B', 'HR', 'IPO Euronext ou Série B Privée',
    "Pour financer l'expansion internationale, deux voies s'ouvrent : une cotation sur Euronext Growth pour gagner en notoriété publique, ou un tour de table Série B auprès d'un fonds souverain étranger.",
    "Tenter l'introduction en bourse Euronext", { board: 15, cash: -5, morale: -10 },
    "Boucler une Série B auprès d'un fonds étranger", { cash: 20, board: -5, morale: -5 }),

  // --- Y4 ---
  ops('41A', 4, 1, 'A', 'Tech', "L'Automatisation par l'IA Générative",
    "Les nouveaux modèles d'IA permettent d'automatiser 60 % du support client et de la rédaction marketing. Faut-il geler les embauches et remplacer les postes juniors par des flux automatisés, ou former l'équipe existante ?",
    'Automatiser agressivement, geler les juniors', { cash: 15, morale: -15, board: 10 },
    "Former les équipes, IA en assistant", { cash: -10, morale: 10, board: -5 }),
  ops('41B', 4, 1, 'B', 'HR', "Le Scandale d'Empreinte Carbone",
    "Une ONG écologiste pointe du doigt l'empreinte carbone exponentielle de vos clusters d'entraînement et serveurs cloud. Vos clients grands comptes exigent des comptes.",
    'Acheter des crédits carbone compensatoires', { cash: -10, board: 10, morale: -5 },
    'Réduire la puissance serveur, audit vert', { cash: -5, board: 5, traction: -5, morale: 5 }),
  ops('42A', 4, 2, 'A', 'Sales', "La Fuite de Données & Rançongiciel",
    "Un groupe de cybercriminels crypte votre base de données centrale et exige 500 000 $ en cryptomonnaie sous 48 heures sous peine de diffuser l'historique financier des clients.",
    'Négocier et payer discrètement la rançon', { cash: -20, morale: -5, board: -5 },
    'Refuser de payer, restaurer les sauvegardes', { cash: -10, traction: -10, board: 10 }),
  ops('42B', 4, 2, 'B', 'Finance', "L'Enquête Fiscale Internationale",
    "L'administration fiscale conteste la structure de refacturation de votre filiale étrangère et notifie un redressement fiscal majeur de 800 000 €.",
    'Payer la transaction proposée', { cash: -15, board: 5 },
    'Engager un recours contentieux', { cash: -5, morale: -5, board: -10 }),
  ops('43A', 4, 3, 'A', 'Legal', 'Le Putsch au Conseil',
    "Les représentants du fonds VC tentent de rallier les administrateurs indépendants pour vous retirer votre mandat de directeur général et installer un dirigeant professionnel.",
    'Négocier un compromis, partager la direction', { cash: 5, morale: -5, board: 10 },
    'Activer les droits de vote double', { morale: 10, board: -15 }),
  ops('43B', 4, 3, 'B', 'Tech', "Le Burn-out des Équipes Piliers",
    "Après trois années de sprints continus, trois développeurs piliers et le responsable des ventes menacent de démissionner simultanément pour épuisement physique et mental.",
    "Instaurer la semaine de 4 jours sans perte de salaire", { cash: -15, morale: 20, traction: -5 },
    'Verser de très grosses primes exceptionnelles', { cash: -10, morale: -5, board: 5 }),
  ops('44A', 4, 4, 'A', 'Conjoncture', "L'Offre de Fusion Stratégique",
    "Votre rival direct, affaibli par les taux d'intérêt, propose une fusion entre égaux (50/50) pour créer le leader incontesté du marché européen face aux géants américains.",
    'Accepter la fusion, créer le champion', { cash: 10, board: 15, morale: -10 },
    "Rejeter l'offre, étouffer commercialement", { cash: -10, traction: 10, board: -5 }),
  ops('44B', 4, 4, 'B', 'HR', 'Le Débauchage Massif par un Géant Tech',
    "Un géant de la tech ouvre un centre de R&D à deux rues de vos bureaux et propose le double des salaires à toute votre équipe d'ingénieurs IA.",
    "S'aligner sur les salaires à tout prix", { cash: -20, morale: 10, board: -10 },
    'Laisser partir, recruter une nouvelle garde', { cash: 10, morale: -10, traction: -5 }),

  // --- Y5 ---
  ops('51A', 5, 1, 'A', 'Tech', "L'Introduction en Bourse au Nasdaq",
    "L'entreprise dépasse les 80 M€ d'ARR. Vos investisseurs de la Silicon Valley exigent une cotation directe au Nasdaq pour maximiser la valorisation, tandis que les banquiers d'affaires locaux plaident pour Euronext Paris.",
    'Filer à Wall Street sonner la cloche', { cash: 10, board: 15, morale: -10 },
    'Cotation souveraine sur Euronext Paris', { board: -5, morale: 5, cash: -5 }),
  ops('51B', 5, 1, 'B', 'HR', "L'Acquisition Hostile par un GAFAM",
    "Le leader mondial du numérique lance une OPA hostile à 450 M$ pour absorber votre plateforme et éliminer toute concurrence indépendante. Le conseil est divisé.",
    "Déclencher la pilule empoisonnée", { cash: -10, morale: -5, board: -10 },
    "Capituler et empocher le pactole", { cash: 25, board: 15, morale: -5 }),
  ops('52A', 5, 2, 'A', 'Sales', "La Bulle Sectorielle & le Crash",
    "Une hausse brutale des taux directeurs assèche la tech mondiale. Vos valorisations sont divisées par quatre en une nuit. Pour survivre 18 mois, il faut réduire les dépenses opérationnelles de 40 %.",
    "Licencier 40 % en un seul plan massif", { cash: 20, morale: -20, board: 10 },
    "Baisser tous les salaires de 20 %", { cash: 10, morale: -10, traction: -10 }),
  ops('52B', 5, 2, 'B', 'Finance', "Le Rachat d'un Champion Américain",
    "Votre principal concurrent américain est au bord de la faillite. Vous pouvez racheter ses actifs et ses 50 000 clients pour 30 M€ via un emprunt bancaire lourd (LBO), ou passer votre tour.",
    'Boucler le rachat par endettement lourd', { cash: -20, traction: 15, board: 10 },
    'Renoncer, attendre son effondrement', { cash: 5, morale: 5, board: -5 }),
  ops('53A', 5, 3, 'A', 'Legal', "L'Affaire Antitrust Européenne",
    "Détenant 65 % du marché européen, la Commission de la concurrence ouvre une procédure formelle pour verrouillage d'écosystème. Une transaction propose de publier vos protocoles en open source pour éviter une amende de 50 M€.",
    "Payer l'amende, garder les brevets", { cash: -25, board: 10 },
    'Ouvrir les protocoles en open source', { traction: -10, board: -10, morale: 5 }),
  ops('53B', 5, 3, 'B', 'Tech', "La Grève Générale des Cadres",
    "Les directeurs de pôles et ingénieurs seniors débrayent pour protester contre la cadence imposée par les fonds d'investissement. Ils réclament un droit de veto au conseil sur la feuille de route.",
    'Accorder un droit de veto consultatif', { morale: 15, board: -15 },
    'Écarter immédiatement les meneurs', { cash: -10, morale: -20, board: 10 }),
  ops('54A', 5, 4, 'A', 'Sales', 'Le Grand Remplacement Technologique',
    "Une nouvelle architecture algorithmique quantique rend votre technologie historique dix fois plus lente et trois fois plus coûteuse. Faut-il investir 80 % de votre trésorerie pour réinventer le moteur, ou maximiser les dividendes ?",
    'Investir massivement dans le quantique', { cash: -25, morale: 5, board: -10 },
    'Traire la vache à lait, distribuer le cash', { cash: 15, board: 15, traction: -10 }),
  ops('54B', 5, 4, 'B', 'HR', 'Succession ou Vente Totale',
    "Après 5 ans de crise permanente, vous avez atteint l'apogée. Vous pouvez transmettre l'entreprise aux salariés via une coopérative ouvrière (SCOP) ou vendre 100 % au plus offrant et vous retirer sur une île.",
    'Transmettre l\'entreprise aux salariés', { cash: -20, morale: 20, board: -15 },
    'Vendre 100 % au fonds souverain', { cash: 30, board: 20, morale: -10 }),
];

export const DEFAULT_OPS: OpsCard[] = OPS_BASE.map((c) => ({
  ...c,
  comicStrip:
    YEAR1_STORYBOARDS[c.id] ??
    YEAR2_STORYBOARDS[c.id] ??
    YEAR3_STORYBOARDS[c.id] ??
    YEAR4_STORYBOARDS[c.id] ??
    YEAR5_STORYBOARDS[c.id] ??
    c.comicStrip,
}));

export const DEFAULT_PERKS: AnnualPerk[] = STRATEGY_POOL.flatMap((yearPool, yi) =>
  yearPool.map((opt, si) => ({
    id: opt.id,
    year: (yi + 1) as 1 | 2 | 3 | 4,
    slot: (si + 1) as 1 | 2 | 3,
    kind: opt.kind,
    title: opt.title,
    description: opt.description,
    impacts: { ...opt.deltas },
    icon: opt.perk?.icon,
    passiveLabel: opt.perk?.label,
    passiveDescription: opt.perk?.description,
  })),
);

export const DEFAULT_CONTENT: GameContent = {
  version: APP_VERSION,
  masterStyleReference: DEFAULT_MASTER_STYLE,
  founders: DEFAULT_FOUNDERS,
  foundationCards: DEFAULT_FOUNDATION,
  opsCards: DEFAULT_OPS,
  perks: DEFAULT_PERKS,
};

/** Adapts a foundation card to the runtime GameCard shape (Y1 timing). */
export function foundationToGameCard(c: FoundationCard): GameCard {
  return {
    id: c.id,
    department: c.department,
    role: c.role,
    text: c.text,
    timing: { year: 1, quarter: c.question },
    leftChoice: c.leftChoice,
    rightChoice: c.rightChoice,
    comicStrip: c.comicStrip,
  };
}

/** Adapts an operational card to the runtime GameCard shape. */
export function opsToGameCard(c: OpsCard): GameCard {
  return {
    id: c.id,
    department: c.department,
    role: c.role,
    text: c.text,
    timing: { year: c.year, quarter: c.quarter },
    leftChoice: c.leftChoice,
    rightChoice: c.rightChoice,
    comicStrip: c.comicStrip,
  };
}

export { WILD_CARDS, BLACK_SWANS };

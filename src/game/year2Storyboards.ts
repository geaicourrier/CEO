import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the Year 2 operational cards (21A–24B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const YEAR2_STORYBOARDS: Record<string, CardComicStrip> = {
  '21A': {
    common: {
      frame1: {
        prompt:
          'A seasoned executive in an expensive tailored suit sitting across a tiny startup desk, handing over an executive resume with prestigious corporate logos. Electric blue accent on the tie.',
      },
      frame2: {
        prompt:
          "The salary expectations slide across the table: €90,000 annual package with full company perks vs the startup's razor-thin bank runway. Electric blue accent on the €90k salary figure.",
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder shaking hands with the senior executive, who immediately starts reorganizing the team with complex corporate org charts. Electric blue accent on the whiteboard org chart.',
      },
      frame4: {
        prompt:
          'Three months later, the executive demands three additional assistants while the founder sweats over depleted cash reserves. Electric blue accent on the red cash runway alert.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder handing the project lead badge to a young eager junior employee beaming with enthusiasm. Electric blue accent on the lanyard badge.',
      },
      frame4: {
        prompt:
          'The junior working 16 hours straight surrounded by energy drinks, accidentally deploying an experimental database schema to production. Electric blue accent on the smoking server monitor.',
      },
    },
  },

  '21B': {
    common: {
      frame1: {
        prompt:
          'The support dashboard exploding with 200 angry ticket notifications after a critical API outage during business hours. Electric blue accent on the exclamation badge.',
      },
      frame2: {
        prompt:
          "A phone ringing on speaker with the company's biggest corporate client yelling furiously about lost revenue. Electric blue accent on the soundwave pulses.",
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder issuing a full refund wire transfer with a humble, apologetic letter signed by hand. Electric blue accent on the refund transaction checkmark.',
      },
      frame4: {
        prompt:
          "The client accepts the apology but the finance report shows the monthly revenue dropping to zero, triggering board panic. Electric blue accent on the board's emergency meeting invite.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The engineering team pushing an emergency patch at dawn while the founder pitches free upcoming premium features on a video call. Electric blue accent on the "Patch Deployed" banner.',
      },
      frame4: {
        prompt:
          'The client begrudgingly stays, but sends a scathing, public 1-star review detailing the outage on tech review sites. Electric blue accent on the single yellow star.',
      },
    },
  },

  '22A': {
    common: {
      frame1: {
        prompt:
          'The founder presenting slide 10 of the pitch deck to an intimidating conference room full of venture capital partners taking silent notes. Electric blue accent on the pitch deck presentation clicker.',
      },
      frame2: {
        prompt:
          'Two competing term sheets on the table: a €2M check demanding 25% equity and aggressive growth vs €500k from friendly angels with zero pressure. Electric blue accent on the €2M check amount.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          "Champagne corks popping in celebration with the VC partner slapping the founder's back under glowing press cameras. Electric blue accent on the champagne bubbles.",
      },
      frame4: {
        prompt:
          'One quarter later, the VC partner pointing with an icy stare at an impossibly high monthly recurring revenue quota. Electric blue accent on the unattainable target line.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder shaking hands over coffee with two smiling retired entrepreneurs giving encouraging advice. Electric blue accent on the coffee steam.',
      },
      frame4: {
        prompt:
          'The company stays independent and peaceful, but runs completely out of marketing budget while a VC-funded competitor buys out all major ads. Electric blue accent on the competitor\'s giant billboard ad.',
      },
    },
  },

  '22B': {
    common: {
      frame1: {
        prompt:
          "A certified data privacy auditor holding a clipboard, pointing with a stern frown at the company's unregulated user database schema. Electric blue accent on the clipboard checklist.",
      },
      frame2: {
        prompt:
          'The technical estimate: two months of frozen feature development to overhaul data encryption vs adding a simple deceptive consent banner. Electric blue accent on the consent banner wireframe.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'Developers locking the code repository and rebuilding privacy-compliant database encryption tables from scratch. Electric blue accent on the database lock icon.',
      },
      frame4: {
        prompt:
          'Compliance audit passed with flying colors, but user churn hits record highs due to three months of zero new product features. Electric blue accent on the inactive product changelog.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder quickly embedding a generic, free consent popup script downloaded from GitHub in five minutes. Electric blue accent on the "Accept All" button.',
      },
      frame4: {
        prompt:
          'An official certified registered letter arrives from the data protection authority announcing a formal inquiry and potential fine. Electric blue accent on the official postal stamp.',
      },
    },
  },

  '23A': {
    common: {
      frame1: {
        prompt:
          'The founder having lunch with the lead engineer of their main rival, who discreetly hints at wanting to switch teams. Electric blue accent on the engineer\'s company badge.',
      },
      frame2: {
        prompt:
          'The recruitment proposal: offer a massive salary bump plus equity to poach the talent, or step back to avoid a retaliatory talent war. Electric blue accent on the open contract draft.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The poached engineer arriving at the office with a box of desk belongings, immediately sharing competitor roadmap insights on the whiteboard. Electric blue accent on the whiteboard diagram.',
      },
      frame4: {
        prompt:
          'A process server knocks on the door handing over a lawsuit for intellectual property infringement and non-compete breach from the rival CEO. Electric blue accent on the legal summons folder.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder politely closing the dossier and declining the hire with a respectful handshake. Electric blue accent on the handshake silhouette.',
      },
      frame4: {
        prompt:
          'The rival engineer joins a third startup instead, helping them release the exact feature you planned to build six months ahead of schedule. Electric blue accent on the rival\'s product launch notification.',
      },
    },
  },

  '23B': {
    common: {
      frame1: {
        prompt:
          'A presentation slide showing 100,000 active free users consuming massive cloud database storage with only 0.8% paying subscribers. Electric blue accent on the free user count.',
      },
      frame2: {
        prompt:
          'The pricing dilemma: cut off the free tier entirely to force payments, or keep freemium to preserve word-of-mouth growth. Electric blue accent on the "Free vs Pro" toggle switch.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder activating a hard paywall popup across the platform with credit card input fields. Electric blue accent on the lock badge on the screen.',
      },
      frame4: {
        prompt:
          'Bank revenue spikes immediately, but angry users flood social media with accusations of betrayal and cancel their accounts en masse. Electric blue accent on the trending boycott hashtag.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder adding a discreet "Support Us" tip jar button and minor cosmetic premium badges. Electric blue accent on the small heart tip icon.',
      },
      frame4: {
        prompt:
          'The community loves the platform and sings praises online, while the accounting report shows server hosting bills exceeding incoming revenues. Electric blue accent on the negative monthly cash balance.',
      },
    },
  },

  '24A': {
    common: {
      frame1: {
        prompt:
          'The founder looking at website traffic logs showing 15% of visits originating from New York and San Francisco without any localized content. Electric blue accent on the world map traffic markers.',
      },
      frame2: {
        prompt:
          'The strategic choice: burn cash to open a US sales branch and translate everything into English, or dominate the domestic home market first. Electric blue accent on the transatlantic airline route graphic.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder stepping out of a cab in front of a San Francisco office building holding a branded briefcase with high ambitions. Electric blue accent on the briefcase logo.',
      },
      frame4: {
        prompt:
          'The founder discovering the brutal reality of $400/hour legal fees, cutthroat local Silicon Valley marketing costs, and empty sales calls. Electric blue accent on the stack of dollar bills evaporating.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder shaking hands with local enterprise clients and locking down regional partnership contracts with steady enthusiasm. Electric blue accent on the contract stamp.',
      },
      frame4: {
        prompt:
          'Domestic market share reaches a plateau, while an American startup clones the concept and raises $50M to attack Europe. Electric blue accent on the cloned app\'s shiny download page.',
      },
    },
  },

  '24B': {
    common: {
      frame1: {
        prompt:
          'The CEO of an established multinational tech titan sitting in a plush top-floor restaurant, offering a dessert with an acquisition letter. Electric blue accent on the fountain pen.',
      },
      frame2: {
        prompt:
          'A buyout offer of €5M cash on the table: an immediate life-changing exit for the founders vs rolling the dice to build a standalone enterprise. Electric blue accent on the €5M buyout figure.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founders signing the acquisition agreement surrounded by champagne glasses and corporate vice presidents wearing badges. Electric blue accent on the signature line.',
      },
      frame4: {
        prompt:
          'Six months later, the tech giant quietly discontinues the product, relegating the founders to mid-level management answering email tickets. Electric blue accent on the corporate ID badge clip.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder proudly pushing the contract away, declaring they want to build the future European leader themselves. Electric blue accent on the founder\'s glasses reflection.',
      },
      frame4: {
        prompt:
          'The team cheers the decision with enthusiasm, but the rejected tech giant immediately announces a direct, free copycat product the following week. Electric blue accent on the breaking news press release.',
      },
    },
  },
};

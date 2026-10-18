import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the 8 Foundation cards (01A–04B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const FOUNDATION_STORYBOARDS: Record<string, CardComicStrip> = {
  '01A': {
    common: {
      frame1: {
        prompt:
          'Two co-founders sitting at a wobbly café table with a single laptop, smiling, clinking cheap coffee mugs in celebration. Flat minimalist 2px line art, electric blue accent on mugs.',
      },
      frame2: {
        prompt:
          'An open contract paper slides onto the table between them titled "Equity Split", both staring at each other with tense, awkward smiles. Electric blue accent on contract title.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'Both founders signing the contract together with huge relieved smiles, shaking hands enthusiastically. Electric blue accent on the shared pen.',
      },
      frame4: {
        prompt:
          'Weeks later, both founders standing face to face in deadlock, arms crossed, staring furiously at a tied 1-1 vote on a whiteboard. Electric blue accent on the tie vote tally.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The lead founder firmly signs the 60% share while the second founder looks away, slumped and slightly bitter. Electric blue accent on the 60% figure.',
      },
      frame4: {
        prompt:
          'The lead founder speaking passionately alone at the board table, noticing an empty chair and a resignation sticky note on the laptop. Electric blue accent on the sticky note.',
      },
    },
  },

  '01B': {
    common: {
      frame1: {
        prompt:
          'The Founder cramped in a tiny living room, typing on a laptop balanced on pizza boxes, surrounded by tangled power strips and laundry. Minimalist 2px line art, electric blue accent on laptop screen.',
      },
      frame2: {
        prompt:
          'An aggressive landlord pounding at the open door, waving an eviction warning notice in the air. Electric blue accent on the exclamation mark on the paper.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder walking proudly into a shiny glass open-space, holding a reusable coffee cup next to a detox water dispenser. Electric blue accent on the coffee cup.',
      },
      frame4: {
        prompt:
          'The Founder staring with bulging eyes at a massive monthly rent bill while two tech bros scream around a noisy foosball table behind. Electric blue accent on the rent total figure.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder dusting off an old wooden workbench in a dusty, dark garage, plugging in an electric space heater. Electric blue accent on the heater coil.',
      },
      frame4: {
        prompt:
          'The Founder shivering in a massive winter parka and fingerless gloves, blowing warm breath onto freezing fingers while typing. Electric blue accent on the foggy breath.',
      },
    },
  },

  '02A': {
    common: {
      frame1: {
        prompt:
          "The Founder proudly sketching the brand's minimalist startup logo on a glass dry-erase board with a black marker. Electric blue accent on the drawn logo.",
      },
      frame2: {
        prompt:
          'A laptop screen displaying a domain broker page for the ".com", showing an astronomical price tag of $25,000 held by a domain squatter. Electric blue accent on the dollar sign.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder firmly pressing a glowing "Confirm Wire Transfer" key, holding a sleek gold-embossed business card. Electric blue accent on the card edges.',
      },
      frame4: {
        prompt:
          'The Founder sitting in a dark room eating dry raw instant noodles, staring at an empty corporate bank balance of $0.00. Electric blue accent on the zero balance.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder smirking mischievously while typing a weird misspelled name with a cheap ".io" extension into a registrar. Electric blue accent on the ".io" letters.',
      },
      frame4: {
        prompt:
          'A perplexed corporate client squinting on the phone, repeatedly failing to spell the bizarre domain name on their notebook. Electric blue accent on the scribbled question marks.',
      },
    },
  },

  '02B': {
    common: {
      frame1: {
        prompt:
          'The Founder looking at a website analytics dashboard displaying a flatline of 3 active daily visitors. Electric blue accent on the flat horizontal line.',
      },
      frame2: {
        prompt:
          'Two paths on a whiteboard: a shiny button titled "Google & Meta Ads" versus a tiny bullhorn labeled "Organic Growth". Electric blue accent on the shiny ads button.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder sliding a corporate credit card into an ad campaign manager, eyes glowing with excitement. Electric blue accent on the credit card chip.',
      },
      frame4: {
        prompt:
          'A flood of 50,000 clicks shown on screen, but zero conversions and a pile of bot accounts spamming the comment section. Electric blue accent on the bot notification icons.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder late at night sending copy-pasted cold messages on LinkedIn one by one with bloodshot eyes. Electric blue accent on the "Send" button.',
      },
      frame4: {
        prompt:
          'The Founder blocked and reported as spam by 40 industry contacts, head resting face down on the keyboard in despair. Electric blue accent on the "Account Temporarily Suspended" banner.',
      },
    },
  },

  '03A': {
    common: {
      frame1: {
        prompt:
          'A whiteboard outlining an ambitious cloud software architecture with arrows pointing in every direction. Electric blue accent on the main server icon.',
      },
      frame2: {
        prompt:
          'An hourglass nearly drained of sand resting on the desk next to a calendar marked "Demo Day in 48 Hours". Electric blue accent on the circled calendar date.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder typing pristine, perfectly indented code with a confident smile, wearing big noise-cancelling headphones. Electric blue accent on the code brackets.',
      },
      frame4: {
        prompt:
          'Three months past the deadline, the code is immaculate and bug-free, but the product launches to a completely deserted, empty website. Electric blue accent on the "0 Active Users" counter.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder furiously connecting visual blocks with virtual duct tape, glue, and webhooks on a dual-monitor setup. Electric blue accent on the connecting webhook lines.',
      },
      frame4: {
        prompt:
          'One hundred real users sign up at once, causing the no-code setup to literally smoke and burst into flames with error popups everywhere. Electric blue accent on the warning alert boxes.',
      },
    },
  },

  '03B': {
    common: {
      frame1: {
        prompt:
          'The Founder browsing tech Twitter/X, reading hyped posts about the latest revolutionary JavaScript framework released this morning. Electric blue accent on the trending hashtag.',
      },
      frame2: {
        prompt:
          'A fork in the road: a glowing, complex futuristic spaceship labeled "Bleeding Edge" versus a rusty reliable bicycle labeled "Old Boring Stack". Electric blue accent on the spaceship thruster.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder installing hundreds of experimental npm packages with a euphoric grin. Electric blue accent on the terminal install bar.',
      },
      frame4: {
        prompt:
          'Screen covered in breaking change errors, deprecated library warnings, and an unresolvable dependency tree after a minor update. Electric blue accent on the red terminal errors.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder calmly coding a simple monolithic script in plain old PHP and SQLite, sipping standard black drip coffee. Electric blue accent on the coffee steam.',
      },
      frame4: {
        prompt:
          'The app runs rock-solid without any downtime, but arrogant developer candidates sneer and laugh during job interviews when seeing the repo. Electric blue accent on the laughing emojis in chat.',
      },
    },
  },

  '04A': {
    common: {
      frame1: {
        prompt:
          'The Founder holding a blank company registration form with a serious, determined executive expression. Electric blue accent on the pen in hand.',
      },
      frame2: {
        prompt:
          "The choice of legal counsel: an opulent marble law firm brochure quoting €5,000 versus a budget automated legal-tech website charging €99. Electric blue accent on the luxury firm's gold logo.",
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder sitting in a leather armchair across from an impeccably tailored lawyer reviewing a thick leather-bound dossier. Electric blue accent on the fountain pen.',
      },
      frame4: {
        prompt:
          "The legal contract is bulletproof, but the invoice consumes 60% of the company's initial runway before the company even sells a single product. Electric blue accent on the invoice subtotal.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder quickly checking terms-and-conditions boxes on a budget legal generator site and clicking "Generate PDF". Electric blue accent on the checked checkmarks.',
      },
      frame4: {
        prompt:
          'A state tax auditor pointing with a stern frown at a glaring clause loophole indicating the company accidentally registered as an offshore fishery. Electric blue accent on the auditor\'s stamp.',
      },
    },
  },

  '04B': {
    common: {
      frame1: {
        prompt:
          'The first two hired key employees looking expectantly across the desk during a compensation negotiation meeting. Electric blue accent on their notebook covers.',
      },
      frame2: {
        prompt:
          'A stock allocation pie chart on a tablet screen, showing the unallocated equity pool between 0% and 15%. Electric blue accent on the highlighted pie slice.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The Founder warmly handing signed stock-grant certificates to the cheering employees with high-fives all around. Electric blue accent on the official stock certificates.',
      },
      frame4: {
        prompt:
          "At the first board meeting, the employees team up to outvote the Founder on the company's core strategic roadmap. Electric blue accent on the raised voting hands.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The Founder sternly locking the company cap table in a physical steel safe with a firm, unyielding expression. Electric blue accent on the safe dial.',
      },
      frame4: {
        prompt:
          'The employees quietly updating their CVs and LinkedIn statuses to "Open to Work" while leaving their desks early at 5:01 PM. Electric blue accent on the glowing "Open to Work" badge.',
      },
    },
  },
};

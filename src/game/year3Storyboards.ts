import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the Year 3 operational cards (31A–34B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const YEAR3_STORYBOARDS: Record<string, CardComicStrip> = {
  '31A': {
    common: {
      frame1: {
        prompt:
          "A crowded open space buzzing with 30 employees talking over each other, post-it notes falling off overflowing walls, founder standing bewildered in the center. Electric blue accent on the founder's glasses.",
      },
      frame2: {
        prompt:
          'Two contrasting books placed on the desk: a thick corporate procedural binder titled "Standard Operating Procedures" vs a scribbled notebook labeled "Move Fast & Break Things". Electric blue accent on the procedural binder spine.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder formally introducing intermediate managers holding organizational charts, mandating daily reporting spreadsheets. Electric blue accent on the manager lanyards.',
      },
      frame4: {
        prompt:
          'Product development grinds to a halt as engineers spend six hours a day debating Jira ticket priorities in three separate review committees. Electric blue accent on the endless Jira loading bar.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder tearing down organizational hierarchies, encouraging everyone to ship code directly without managerial approval. Electric blue accent on the flying scrap paper.',
      },
      frame4: {
        prompt:
          'Two separate teams accidentally build and ship two identical, conflicting billing systems on the exact same morning. Electric blue accent on the conflicting deployment alerts.',
      },
    },
  },

  '31B': {
    common: {
      frame1: {
        prompt:
          'The founder staring at a tablet screen displaying a viral hit-piece blog article accusing the startup of shady data practices. Electric blue accent on the headline banner.',
      },
      frame2: {
        prompt:
          'The communication crisis board: a microphone for a fiery public defense vs a trash can to discard the drama in silence. Electric blue accent on the microphone grid.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder posting a detailed 10-page transparent rebuttal with screenshots and legal receipts on social media. Electric blue accent on the "Publish Thread" button.',
      },
      frame4: {
        prompt:
          'The defensive thread reignites the controversy tenfold, drawing hundreds of trolls and feeding a 48-hour online outrage cycle. Electric blue accent on the trending quote-tweet notifications.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder calmly closing the social media tab and telling the team to focus strictly on shipping product updates. Electric blue accent on the closed browser window.',
      },
      frame4: {
        prompt:
          'Prospects searching the company name on Google find the unchallenged smear article ranked #1, canceling scheduled sales demos. Electric blue accent on the top Google search result snippet.',
      },
    },
  },

  '32A': {
    common: {
      frame1: {
        prompt:
          'A government purchasing commissioner in an ornate gilded office sliding a mountain of official bureaucratic dossiers onto the desk. Electric blue accent on the official gold ministry seal.',
      },
      frame2: {
        prompt:
          'The fine print highlighted on the contract: "Payment terms: net 120 days post administrative review committee approval". Electric blue accent on the 120-day clause.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder firmly stamping the official tricolor tender agreement, envisioning a secure public landmark reference. Electric blue accent on the ink stamp.',
      },
      frame4: {
        prompt:
          'One year later, the treasury is bone-dry waiting for administrative invoice validation, while lawyers demand three duplicate paper copies of everything. Electric blue accent on the rubber stamp on an overdue invoice.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder politely declining the public tender to sign fast-moving mid-market enterprise clients instead. Electric blue accent on the digital signature pad.',
      },
      frame4: {
        prompt:
          "A well-connected legacy software dinosaur wins the public contract unopposed and locks in national monopoly status for ten years. Electric blue accent on the legacy competitor's trophy.",
      },
    },
  },

  '32B': {
    common: {
      frame1: {
        prompt:
          'The lead software engineer holding their face in their hands, staring at a spaghetti ball of legacy code tangled with countless emergency hotfixes. Electric blue accent on the tangled cable graphic.',
      },
      frame2: {
        prompt:
          'The roadmap crossroads: a wrench labeled "Complete Architectural Rewrite" vs a shiny rocket labeled "Q2 Feature Commitments". Electric blue accent on the wrench.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The entire tech squad putting on headphones, freezing all sales requests to cleanly rewrite database microservices from scratch. Electric blue accent on the terminal build checkmark.',
      },
      frame4: {
        prompt:
          'The architecture is pristine and blazing fast, but sales prospects walk away to competitors because promised features were delayed by six weeks. Electric blue accent on the lost sales deal notification.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder pushing the engineering team to pile on new features without fixing the foundational code to hit quarterly targets. Electric blue accent on the rushed feature banner.',
      },
      frame4: {
        prompt:
          'The core database crashes during a live sales demonstration with 50 enterprise prospects watching on screen. Electric blue accent on the giant red 500 server error code.',
      },
    },
  },

  '33A': {
    common: {
      frame1: {
        prompt:
          "A delegation of three respected company engineers standing politely in the founder's office, handing over a formal letter of collective demands. Electric blue accent on the petition header.",
      },
      frame2: {
        prompt:
          'The dilemma sheet: negotiating a formal works council with rigid hours vs reminding the team that startup survival requires total flexibility. Electric blue accent on the meeting agenda folder.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder sitting at a round table with employee reps, hammering out a progressive work-life balance charter over coffee. Electric blue accent on the signed employee agreement.',
      },
      frame4: {
        prompt:
          "Team morale peaks, but the lead VC partner storms into the office furious about rigid overtime limits restricting late-night release sprints. Electric blue accent on the VC's clenched fist on the table.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          "The founder delivering a stern, impassioned speech asserting that union mentality will sink the startup's competitiveness. Electric blue accent on the podium edge.",
      },
      frame4: {
        prompt:
          'A silent strike begins: key staff shut laptops precisely at 5:00 PM and confidential Glassdoor reviews decrying toxic startup culture go viral. Electric blue accent on the 1.8-star Glassdoor rating badge.',
      },
    },
  },

  '33B': {
    common: {
      frame1: {
        prompt:
          'A sleek tech conglomerate executive wearing a fleece vest handing over a massive symbolic cardboard check for $250,000 in free cloud credits. Electric blue accent on the cloud credit amount.',
      },
      frame2: {
        prompt:
          'The exclusivity clause in the agreement: the platform must rewrite its architecture to use proprietary, non-exportable cloud APIs. Electric blue accent on the vendor lock-in warning icon.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The team migrating all databases to the proprietary cloud suite, enjoying zero hosting bills and an official marketplace badge. Electric blue accent on the verified marketplace checkmark.',
      },
      frame4: {
        prompt:
          'One year later, the free credits expire and the cloud titan quadruples hosting rates, leaving the startup trapped with impossible migration costs. Electric blue accent on the astronomical bill total.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder politely turning down the credits to keep the backend deployable on open-source, vendor-neutral infrastructure. Electric blue accent on the open-source penguin sticker.',
      },
      frame4: {
        prompt:
          "The company pays full price for its independent servers every month while watching a rival startup blow past them with subsidized computing power. Electric blue accent on the competitor's speed graph.",
      },
    },
  },

  '34A': {
    common: {
      frame1: {
        prompt:
          'Two co-founders sitting at opposite ends of a long meeting table, avoiding eye contact with arms crossed while silence fills the room. Electric blue accent on their identical company mugs.',
      },
      frame2: {
        prompt:
          'A buyout valuation summary on the desk: spend €300,000 from company reserves to buy out the shares vs remaining locked in co-founder paralysis. Electric blue accent on the buyout calculation line.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder signing the buyout agreement and transfer of shares, taking sole executive control of the company steering wheel. Electric blue accent on the stock assignment deed.',
      },
      frame4: {
        prompt:
          'The company gains clear direction, but the massive equity buyout severely drains cash reserves just before a tough macroeconomic slowdown. Electric blue accent on the thin bank balance sheet.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          "Both co-founders sitting with an executive coach trying to force an awkward reconciliation compromise. Electric blue accent on the coach's whiteboard notes.",
      },
      frame4: {
        prompt:
          'Every board meeting turns into passive-aggressive trench warfare, confusing managers and leaking tension into the whole team. Electric blue accent on the divided board vote tally.',
      },
    },
  },

  '34B': {
    common: {
      frame1: {
        prompt:
          'The founder standing between two visual mockups: a traditional stock market ringing bell vs a luxury foreign investment summit stage. Electric blue accent on the brass stock bell.',
      },
      frame2: {
        prompt:
          'The liquidity decision: financial transparency and public market volatility vs taking foreign private equity with heavy board oversight. Electric blue accent on the financial comparison chart.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder ringing the Euronext opening bell under confetti, watching the ticker symbol scroll live across public finance channels. Electric blue accent on the flashing ticker symbol.',
      },
      frame4: {
        prompt:
          'A minor quarterly earnings miss causes retail market short-sellers to tank the stock price by 40% in a single trading morning. Electric blue accent on the sharp downward market candlestick chart.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder closing a private $15M round with a sovereign growth fund over formal handshakes in an embassy lounge. Electric blue accent on the gold seal on the closing binder.',
      },
      frame4: {
        prompt:
          'The sovereign fund installs two aggressive restructuring controllers who demand a seat at every product design review meeting. Electric blue accent on the controllers\' matching briefcases.',
      },
    },
  },
};

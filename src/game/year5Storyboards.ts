import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the Year 5 operational cards (51A–54B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const YEAR5_STORYBOARDS: Record<string, CardComicStrip> = {
  '51A': {
    common: {
      frame1: {
        prompt:
          "The founder dressed in a bespoke tuxedo standing between two framed stock exchange posters: Times Square Nasdaq digital tower vs the historic Palais Brongniart pillars. Electric blue accent on the founder's bowtie.",
      },
      frame2: {
        prompt:
          'The IPO roadshow binder sliding across the desk: SEC compliance fees of $8M with ruthless short-seller exposure vs lower European liquidity. Electric blue accent on the SEC filing title line.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder pressing the electronic green buzzer on the Times Square Nasdaq podium under exploding blue confetti and ticker screens. Electric blue accent on the glowing buzzer button.',
      },
      frame4: {
        prompt:
          'A viral hedge fund short report alleges inflated software metrics, shaving $300M off the market valuation within 45 minutes of market open. Electric blue accent on the steep red drop on the ticker tape.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder shaking hands with European finance ministers on the steps of the stock exchange, celebrated as a flagship sovereign tech champion. Electric blue accent on the tricolor ribbon sash.',
      },
      frame4: {
        prompt:
          'Trading volume dries up to near zero by month three, leaving early employees unable to liquidate their vested stock-options. Electric blue accent on the flat horizontal trading volume chart.',
      },
    },
  },

  '51B': {
    common: {
      frame1: {
        prompt:
          'A sleek black corporate limousine parked outside the modest startup headquarters, with two corporate lawyers delivering a hostile tender offer briefcase. Electric blue accent on the lawyer\'s gold cufflinks.',
      },
      frame2: {
        prompt:
          'The board resolution: activate a defensive "poison pill" diluting the predator at the cost of crippling debt vs signing the $450M buyout agreement. Electric blue accent on the poison bottle symbol on the agenda.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder fiercely triggering the shareholder dilution mechanism, flooding the registry with defensive poison-pill shares. Electric blue accent on the emergency dilution lever.',
      },
      frame4: {
        prompt:
          'The hostile predator retreats, but the company is left with an exhausted balance sheet and an army of disgruntled shareholders threatening lawsuits. Electric blue accent on the legal subpoena folder.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder signing the historic buyout contract with a gold fountain pen, surrounded by executives popping vintage champagne. Electric blue accent on the fountain pen reservoir.',
      },
      frame4: {
        prompt:
          'One year later, the tech giant rebrands the product as an obscure settings sub-menu before quietly pulling the plug on the servers. Electric blue accent on the "Service Discontinued" dialog box.',
      },
    },
  },

  '52A': {
    common: {
      frame1: {
        prompt:
          'The founder staring in disbelief at the morning financial paper headline: "Global Tech Index Plunges 35% — The Bubble Pops". Electric blue accent on the front-page market graph.',
      },
      frame2: {
        prompt:
          'The restructuring spreadsheet on the screen: a red column marking 80 employee layoffs vs a blanket 20% wage reduction across the board. Electric blue accent on the minus 40% cash burn line.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder delivering a somber Zoom all-hands speech while HR sends out severance agreements to 80 locked laptop accounts. Electric blue accent on the muted mic icon.',
      },
      frame4: {
        prompt:
          'The runway extends by two full years, but survivor guilt and paranoia paralyze the remaining staff, crushing all internal productivity. Electric blue accent on the empty rows of office desks.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder leading by example with a zero salary, proposing an egalitarian 20% pay cut for all team members to protect jobs. Electric blue accent on the company solidarity pledge sheet.',
      },
      frame4: {
        prompt:
          'The top 10% senior software architects resign immediately to join foreign competitors paying full market rates. Electric blue accent on the LinkedIn notification cards.',
      },
    },
  },

  '52B': {
    common: {
      frame1: {
        prompt:
          'An auction hammer resting on a stack of US bankruptcy court filings detailing the distressed assets of your San Francisco rival. Electric blue accent on the auction gavel handle.',
      },
      frame2: {
        prompt:
          'The financing contract: a 30 M€ bank loan with crushing quarterly interest repayments vs letting the competitor collapse into liquidation. Electric blue accent on the monthly interest figure.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          "The founder stamping the acquisition deed, instantly unfurling the company banner over the competitor's Silicon Valley headquarters. Electric blue accent on the hoisted rooftop banner.",
      },
      frame4: {
        prompt:
          'American clients reject the European management style and churn in droves, leaving the startup struggling to pay the crushing loan interest. Electric blue accent on the bank warning notice.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          "The founder crossing their arms and declining the auction, opting to maintain cash reserves and watch the rival fold. Electric blue accent on the founder's wristwatch dial.",
      },
      frame4: {
        prompt:
          'A private equity turnaround fund snaps up the rival for pennies, restructures their sales force, and re-launches an aggressive price war against you. Electric blue accent on the rival\'s aggressive discount ad.',
      },
    },
  },

  '53A': {
    common: {
      frame1: {
        prompt:
          'A formal European Commission hearing chamber in Brussels, with commissioners in robes reviewing market share charts above 65%. Electric blue accent on the European flag backdrop.',
      },
      frame2: {
        prompt:
          'The judicial ultimatum: pay a 50 M€ antitrust sanction to retain proprietary secret code vs releasing all integration APIs under public open-source licenses. Electric blue accent on the €50M penalty figure.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          "The founder's lead attorney wire-transferring the astronomical settlement fine to preserve complete intellectual property secrecy. Electric blue accent on the legal settlement checkbook.",
      },
      frame4: {
        prompt:
          'The proprietary algorithms remain secret, but the massive penalty wipes out two full years of accumulated company profits. Electric blue accent on the negative balance sheet bracket.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder clicking "Make Public" on the core protocol GitHub repository during an official Brussels press conference. Electric blue accent on the GitHub public release icon.',
      },
      frame4: {
        prompt:
          'Regulators drop all charges with applause, but dozens of Chinese and American startups spin up identical free clones within two weeks. Electric blue accent on the cloned GitHub forks counter.',
      },
    },
  },

  '53B': {
    common: {
      frame1: {
        prompt:
          'The executive floor deserted during business hours, with department heads gathering in the lobby holding a signed letter of collective demands. Electric blue accent on the letter\'s header seal.',
      },
      frame2: {
        prompt:
          'The executive dilemma: grant senior employees a formal seat with veto power on the board vs dismissing the rebellion leaders to restore authority. Electric blue accent on the boardroom chair diagram.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder welcoming two elected employee delegates into the boardroom, setting up seats alongside the venture capital partners. Electric blue accent on the delegate nameplates.',
      },
      frame4: {
        prompt:
          'Board meetings degenerate into 8-hour ideological debates over minor operational changes, driving investors to threaten immediate divestment. Electric blue accent on the ticking boardroom clock.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder terminating the contracts of the three ringleaders with security escorts out of the building. Electric blue accent on the deactivated access keycards.',
      },
      frame4: {
        prompt:
          'The entire core backend engineering squad walks out in solidarity, leaving production systems unmonitored during black friday traffic. Electric blue accent on the unmonitored server dashboard alert.',
      },
    },
  },

  '54A': {
    common: {
      frame1: {
        prompt:
          'A research scientist demonstrating a revolutionary quantum-resistant computational breakthrough in front of stunned company leadership. Electric blue accent on the photonic laser glow.',
      },
      frame2: {
        prompt:
          'The strategic fork on the whiteboard: an all-in R&D moonshot burning 40 M€ vs pivoting into a high-dividend legacy cash cow. Electric blue accent on the moonshot rocket sketch.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder redirecting company revenues into bleeding-edge quantum labs, hiring elite academic PhDs worldwide. Electric blue accent on the cleanroom lab coat badge.',
      },
      frame4: {
        prompt:
          'After three grueling years, the experimental research hits theoretical dead-ends, while agile new startups beat you to commercialization. Electric blue accent on the failed research milestone red cross.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder freezing experimental R&D, optimizing margins to pay out massive dividends to early founders and investors. Electric blue accent on the dividend distribution wire receipt.',
      },
      frame4: {
        prompt:
          'Shareholders enjoy two lucrative quarters before enterprise clients churn en masse toward modern platforms, making the product obsolete. Electric blue accent on the zero-traffic server meter.',
      },
    },
  },

  '54B': {
    common: {
      frame1: {
        prompt:
          'The founder sitting alone in the corner office at dusk, gazing out over the city skyline with five years of commemorative startup awards on the shelf. Electric blue accent on the anniversary trophy.',
      },
      frame2: {
        prompt:
          'The final two document folders on the mahogany desk: the employee worker-cooperative transfer deed vs a wire receipt for $100M from a sovereign wealth fund. Electric blue accent on the $100M transfer header.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder handing the master building keys to a cheering circle of employees during an emotional farewell townhall. Electric blue accent on the brass master keys.',
      },
      frame4: {
        prompt:
          'The founder walks out into the evening air with empty pockets but a light heart, leaving behind an enduring, self-governed corporate institution. Electric blue accent on the founder\'s silhouette against the sunset.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder boarding a private jet on the runway with sunglasses, holding a tropical cocktail while signing the final wire confirmation on an iPad. Electric blue accent on the private jet winglet.',
      },
      frame4: {
        prompt:
          'The founder sitting on an idyllic private beach looking at an infinite blue ocean, completely alone, scrolling startup news with lingering nostalgia. Electric blue accent on the smartphone screen glow.',
      },
    },
  },
};

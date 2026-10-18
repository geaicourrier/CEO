import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the Year 4 operational cards (41A–44B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const YEAR4_STORYBOARDS: Record<string, CardComicStrip> = {
  '41A': {
    common: {
      frame1: {
        prompt:
          'A sleek glowing robotic arm tapping on a keyboard next to a stack of employee handbooks, founder examining algorithmic efficiency graphs. Electric blue accent on the robotic arm sensor.',
      },
      frame2: {
        prompt:
          'A comparison table on a tablet: 80% customer support operational savings via automated bots vs an internal team petition warning of job insecurity. Electric blue accent on the cost savings percentage.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder replacing ten support desks with a single glowing server rack running autonomous support agents. Electric blue accent on the server status lights.',
      },
      frame4: {
        prompt:
          'The bot hallucinates a fake discount policy, promising free lifetime enterprise plans to 4 000 users overnight. Electric blue accent on the viral discount tweet.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder running internal training workshops, showing employees how to speed up drafts using AI copilot tools. Electric blue accent on the workshop projector beam.',
      },
      frame4: {
        prompt:
          'Team morale stays high, but operational payroll burns cash twice as fast as automated competitors undercutting prices by 50%. Electric blue accent on the payroll expense pie chart.',
      },
    },
  },

  '41B': {
    common: {
      frame1: {
        prompt:
          'An environmental NGO report circulating on LinkedIn, ranking your startup among the most energy-intensive cloud consumers in the tech sector. Electric blue accent on the report cover title.',
      },
      frame2: {
        prompt:
          'Two paths on the executive desk: an express package labeled "Certified Carbon Offset Credits" vs a detailed roadmap to downscale high-performance compute clusters. Electric blue accent on the carbon credit certificate badge.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder smiling in front of a giant green billboard claiming 100% net-zero carbon neutrality after purchasing wholesale forestry credits. Electric blue accent on the leaf logo.',
      },
      frame4: {
        prompt:
          'An investigative journalist reveals the purchased forestry credits belong to a fraudulent non-existent tree plantation, sparking widespread mockery. Electric blue accent on the headline banner.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The CTO manually throttling compute clusters and migrating databases to low-power green data centers. Electric blue accent on the server power gauges.',
      },
      frame4: {
        prompt:
          'The company achieves genuine eco-efficiency, but app latency increases by 300ms, causing enterprise clients to complain about sluggish dashboards. Electric blue accent on the latency warning tooltip.',
      },
    },
  },

  '42A': {
    common: {
      frame1: {
        prompt:
          'All office monitor screens locking simultaneously with an ominous skull graphic and a countdown timer demanding cryptocurrency. Electric blue accent on the digital countdown clock.',
      },
      frame2: {
        prompt:
          'The crisis table: a cold hardware wallet containing Bitcoin reserves vs an emergency IT hotline to the national cybersecurity agency. Electric blue accent on the hardware wallet screen.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder authorizing a discreet crypto transaction to unlock the decryption key and restore the live database. Electric blue accent on the crypto payment hash.',
      },
      frame4: {
        prompt:
          'The decryptor tool works partially, but the hackers return two weeks later demanding another 300 000 $, knowing the startup will pay. Electric blue accent on the second ransom email alert.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The engineering team pulling server cords from walls, locking down external ports, and starting a complete bare-metal backup restore. Electric blue accent on the backup drive light.',
      },
      frame4: {
        prompt:
          'Three full days of total service blackout cause 25% of enterprise clients to terminate contracts for unreliability. Electric blue accent on the contract termination letters.',
      },
    },
  },

  '42B': {
    common: {
      frame1: {
        prompt:
          'Two stern tax inspectors in dark suits presenting a 150-page formal tax audit notice across a conference table. Electric blue accent on the tax audit dossier header.',
      },
      frame2: {
        prompt:
          'The legal choice: sign a negotiated settlement check for 450 000 € immediately vs fight a 3-year court battle against the state revenue service. Electric blue accent on the settlement amount line.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder signing the tax settlement protocol with a weary sigh, handing over a certified bank draft. Electric blue accent on the settlement stamp.',
      },
      frame4: {
        prompt:
          'The tax litigation ends quietly, but the unexpected payout forces the company to cancel all planned year-end bonuses, tanking team morale. Electric blue accent on the zeroed-out bonus column.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'A high-profile tax litigator slamming a briefcase of counter-arguments onto the desk, ready to fight the revenue service before judges. Electric blue accent on the legal briefcase lock.',
      },
      frame4: {
        prompt:
          'The legal fight drags on for years, eating 15 000 € in monthly legal retainers while investors freeze follow-on funding rounds. Electric blue accent on the pending litigation warning footnote.',
      },
    },
  },

  '43A': {
    common: {
      frame1: {
        prompt:
          'Board members whispering in small groups in the hallway outside the boardroom, falling silent when the founder walks past. Electric blue accent on the frosted glass door frame.',
      },
      frame2: {
        prompt:
          'A confidential board agenda slip reading: "Resolution 4 — Replacement of Executive Leadership by External Turnaround CEO". Electric blue accent on Resolution 4 text.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder proposing a power-sharing compromise, accepting an external co-director while retaining product authority. Electric blue accent on the shared executive org chart.',
      },
      frame4: {
        prompt:
          'Internal governance paralyses into endless bureaucratic turf wars, as employees receive contradictory orders every morning. Electric blue accent on the conflicting memo stamps.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder invoking founder-class super-voting shares at the podium, striking down the hostile resolution with authority. Electric blue accent on the founder share certificates.',
      },
      frame4: {
        prompt:
          'The coup is stopped, but the humiliated VC partners veto every single future operational budget request in retaliation. Electric blue accent on the board vote veto stamp.',
      },
    },
  },

  '43B': {
    common: {
      frame1: {
        prompt:
          'Senior team leads staring blankly into empty coffee cups with dark circles under their eyes during an 8:00 AM emergency meeting. Electric blue accent on the steam off the coffee mug.',
      },
      frame2: {
        prompt:
          'The recovery dilemma: announce a mandatory 4-day working week to prevent resignations vs offer 20 000 € cash retention bonuses to keep the pace. Electric blue accent on the 4-day workweek calendar icon.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder locking office doors on Thursday evening, mandating complete disconnection until Monday morning. Electric blue accent on the calendar highlight.',
      },
      frame4: {
        prompt:
          'The team rests and recovers energy, but customer support tickets pile up unattended on Fridays, triggering angry client cancellations. Electric blue accent on the unanswered ticket counter.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder wiring massive retention bonuses directly to the accounts of the exhausted employees with handwritten thank-you notes. Electric blue accent on the bonus transfer notification.',
      },
      frame4: {
        prompt:
          'Two key engineers pocket the bonus and submit their resignations anyway two months later, having reached complete exhaustion. Electric blue accent on the resignation email draft.',
      },
    },
  },

  '44A': {
    common: {
      frame1: {
        prompt:
          'The founder and their historic rival CEO sitting at a restaurant booth, sketching a combined corporate empire on a paper napkin. Electric blue accent on the combined logo sketch.',
      },
      frame2: {
        prompt:
          'The term sheet balance: a combined 60 M€ turnover juggernaut with duplicate teams vs maintaining independent warfare to force the rival into bankruptcy. Electric blue accent on the 50/50 equity split chart.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'Both CEOs holding a joint press conference announcing the birth of the new unified European tech champion. Electric blue accent on the combined press backdrop.',
      },
      frame4: {
        prompt:
          'Integrating conflicting codebases and battling corporate cultures takes 18 painful months, freezing product innovation while clients churn. Electric blue accent on the delayed roadmap timeline.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          "The founder tearing up the merger proposal, doubling commercial outbound campaigns to squeeze the rival's cash reserves. Electric blue accent on the outbound campaign dashboard.",
      },
      frame4: {
        prompt:
          'The struggling rival gets acquired on the cheap by a massive US conglomerate, which injects 100 M$ to crush your pricing. Electric blue accent on the acquisition announcement headline.',
      },
    },
  },

  '44B': {
    common: {
      frame1: {
        prompt:
          "A fleet of glossy recruitment folders from a tech giant landing on every senior engineer's desk during lunchtime. Electric blue accent on the tech giant logo embossed on the folders.",
      },
      frame2: {
        prompt:
          'The financial ultimatum: match a 70% salary increase across the entire engineering department vs watching half the senior staff leave by month\'s end. Electric blue accent on the 70% compensation graph.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder breaking the company compensation grid, matching salaries to lock engineers in with golden handcuffs. Electric blue accent on the updated compensation spreadsheet.',
      },
      frame4: {
        prompt:
          'The engineering squad stays put, but the payroll cost detonates financial margins, turning the company deeply cash-flow negative. Electric blue accent on the plummeting profit margin line.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder giving a bittersweet goodbye speech to departing veterans, opening massive hiring booths at university campuses. Electric blue accent on the campus career booth sign.',
      },
      frame4: {
        prompt:
          'The new junior batch needs eight months of onboarding to understand the legacy codebase, grinding product velocity to a crawl. Electric blue accent on the endless code review queues.',
      },
    },
  },
};

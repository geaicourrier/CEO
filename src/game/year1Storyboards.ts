import type { CardComicStrip } from './comic';

/**
 * Authored storyboard prompts for the Year 1 operational cards (11A–14B).
 * Injected verbatim into the default content; each strip strictly follows
 * the CardComicStrip schema (common: 1–2, branchLeft: 3–4, branchRight: 3–4).
 */
export const YEAR1_STORYBOARDS: Record<string, CardComicStrip> = {
  '11A': {
    common: {
      frame1: {
        prompt:
          "Two new freelance recruits arriving with laptops, looking confused as they squeeze into the founder's tiny living room already full of cables. Electric blue accent on the recruits' laptop stickers.",
      },
      frame2: {
        prompt:
          'The founder looking at a map: a shiny coworking building with high rent vs a noisy public café with free intermittent Wi-Fi. Electric blue accent on the map pin.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The team happily clinking reusable cups around a sleek wooden desk in a modern glass incubator space. Electric blue accent on the shared power strip.',
      },
      frame4: {
        prompt:
          "The founder sweating profusely while opening the first month's rental invoice showing massive hidden service charges. Electric blue accent on the total price.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The team huddling around a tiny café table, shouting to hear each other over a roaring espresso machine. Electric blue accent on the steam cloud.',
      },
      frame4: {
        prompt:
          'The café barista kicking the whole team out for nursing a single cold tap water for six hours straight. Electric blue accent on the "Please Leave" sign.',
      },
    },
  },

  '11B': {
    common: {
      frame1: {
        prompt:
          'A top engineering school candidate standing across the desk, handing over a brilliant CV covered in top honors. Electric blue accent on the diploma seal.',
      },
      frame2: {
        prompt:
          'An open contract on the desk with a pen hovering over two compensation boxes: competitive salary vs polite rejection letter. Electric blue accent on the pen clip.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The intern typing at lightning speed, shipping three major production features on their very first afternoon. Electric blue accent on the terminal lines.',
      },
      frame4: {
        prompt:
          'The founder checking the cash runway chart showing a sharp downward dip, while the intern asks for a second screen. Electric blue accent on the downward cash graph line.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founders giving each other a solemn high-five, declaring the core team stays lean and self-sufficient. Electric blue accent on their wristwatches.',
      },
      frame4: {
        prompt:
          'Both founders drowned under a massive pile of basic customer support tickets and database bugs at 2 AM. Electric blue accent on the notification badge counter.',
      },
    },
  },

  '12A': {
    common: {
      frame1: {
        prompt:
          'A charismatic startup accelerator director in a blazer pitching a 3-month mentoring program with glamorous slides. Electric blue accent on the blazer pocket square.',
      },
      frame2: {
        prompt:
          'A legal term sheet sliding across the table highlighting: "Exchange 5% total company equity for coaching". Electric blue accent on the 5% figure.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder delivering a pitch on a dark auditorium stage under bright spotlights with investors in the front row. Electric blue accent on the slide deck title.',
      },
      frame4: {
        prompt:
          "The board of directors waving an updated cap table where the founder's ownership slice has visibly shrunk into a tiny sliver. Electric blue accent on the investor's pen.",
      },
    },
    branchRight: {
      frame3: {
        prompt:
          'The founder tearing up the term sheet with a defiant smile, locking the stock registry in the drawer. Electric blue accent on the drawer handle.',
      },
      frame4: {
        prompt:
          'The founder sending hundred cold emails from an empty desk, watching competing accelerated startups get featured in tech press. Electric blue accent on the empty inbox.',
      },
    },
  },

  '12B': {
    common: {
      frame1: {
        prompt:
          'A massive convention center entrance bustling with thousands of attendees holding badges under corporate banners. Electric blue accent on the main banner logo.',
      },
      frame2: {
        prompt:
          'The event brochure open at the price grid: 4 000 € for a 6m² booth vs simple visitor guest passes. Electric blue accent on the booth floor plan.',
      },
    },
    branchLeft: {
      frame3: {
        prompt:
          'The founder standing proudly behind a branded counter, giving product demonstrations to a tight crowd of prospects. Electric blue accent on the rollup banner.',
      },
      frame4: {
        prompt:
          'The founder packing up the stand alone in an empty hall, staring at an empty lead binder and a mountain of untouched swag pens. Electric blue accent on the leftover pens.',
      },
    },
    branchRight: {
      frame3: {
        prompt:
          "The founder sneaking around aisles with a visitor badge, whispering pitches and sliding business cards into executives' pockets. Electric blue accent on the business cards.",
      },
      frame4: {
        prompt:
          'Two burly event security guards escorting the founder out the side door into the rain for unauthorized guerilla canvassing. Electric blue accent on the security badge.',
      },
    },
  },
};

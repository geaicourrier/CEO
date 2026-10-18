# C.E.O. : Corporate Emergency Odyssey — Design Bible & Architecture v0.1.0

This document is the absolute source of truth for UI, UX, design system, game mechanics, and technical constraints. Every single code generation must strictly adhere to these rules.

## 1. Visual Identity & Theme ("Dark Corporate Satirical")
- Atmosphere: Startup & financial satire. A fusion between Bloomberg Terminal, high-end financial press, and sleek neo-brutalism.
- Background: Very deep slate / dark corporate navy (#0B0F17 / #111827).
- Typography:
  - Titles & Institutional press: Noble serif font (Playfair Display / Merriweather).
  - UI, gauges, buttons, cards: Clean, modern sans-serif (Inter / Geist).
- The 4 Official Gauges (FULL UNABBREVIATED LABELS MANDATORY):
  - 💰 Cash: emerald-500 (#10B981)
  - ⭐ Traction: amber-500 (#F59E0B)
  - 👥 Morale: indigo-400 (#818CF8)
  - 👔 Board: blue-500 (#3B82F6)

## 2. Radical Ergonomics & Zero Peripheral Breakdown
- Strict 100dvh Layout: `h-[100dvh] overflow-hidden`. Zero global vertical scroll, zero pinch-to-zoom (`touch-action: pan-y`). One screen = one function.
- Strict Control Parity (100% Keyboard / 100% Mouse & Touch):
  - Any on-screen action is 100% playable purely via keyboard, and 100% playable purely via mouse or touch.
  - Navigation & Modals: Directional arrows (↑/↓ or ←/→), confirmation with `Enter` or `Space`.
  - Core Decision Loop:
    - `←`: Tilts card left, highlights left choice button and pre-impact icons.
    - `→`: Tilts card right, highlights right choice button and pre-impact icons.
    - `Enter` or `Space`: Confirms and validates the active choice.
    - `Escape`: Cancels tilt and centers card back to neutral.
- Passive Perks Badges:
  - Desktop: Tooltip on hover / keyboard focus.
  - Mobile: Touch-and-hold triggers a floating tooltip positioned above or below (never obstructed by the finger).

## 3. Screen Structure: Three Vertical Tiers (In-Game Screen)
- Top Tier (~30% height): Status & Assets
  - 4 gauges with current values and complete labels (Cash, Traction, Morale, Board).
  - Active perks / passives container (compact icon + short name).
  - Subtle phase/quarter indicator (e.g. `Y1 • Q1 — Seed`).
- Middle Tier (~35% height): Decision Card
  - Fixed-height card container (prevents any layout shift or DOM reflow).
  - Card header: Department badge (Tech, HR, Finance, Legal) + character role.
  - Card core: Satirical graphic vignette + narrative dilemma pitch (2-3 sentences).
  - Two Horizontal Choice Buttons (strictly side-by-side):
    - `← [Neutral Verb]` on the left, `[Neutral Verb] →` on the right.
    - Fixed pre-impact indicators: The mini-icons of affected gauges are displayed directly on the top edge of each button.
    - Strictly NO technical prefixes (no "C1" or "C2").
- Post-Choice Resolution Sequence:
  - Smooth gauge interpolation (~600-800ms) with floating delta tags (`+5%`, `-20%`).
  - Subtle procedural Web Audio feedback (gentle register for light changes, low-frequency alert on critical drops).
- Bottom Tier (~35% height): Reserved Comic Strip Space
  - Dedicated fixed-height space reserved for the 4-panel quarterly comic strip (Q1-Q4).

## 4. Annual Strategy Screen (End of Q4 Review)
- Top Tier: Prominent phase title "ANNUAL STRATEGY COMMITTEES", gauges, and active perks remain fully visible.
- Middle Tier: Two modular strategic dossiers side-by-side (combinations of permanent perks, 2-quarter temporary boosts, or asymmetrical bonus/malus trade-offs).
- Bottom Tier: Sleek financial trend line-chart plotting the 4 gauges across Q1, Q2, Q3, and Q4 of the past year.

## 5. End of Game Conditions (8 Instant Game Overs + 1 Annual Eviction + Victory)
- Instant Sudden Deaths (any gauge hitting ≤ 0 or ≥ 100):
  - 💰 Cash ≤ 0: Bankruptcy | Cash ≥ 100: Hostile Takeover (PE Buyout)
  - ⭐ Traction ≤ 0: Ghost SaaS | Traction ≥ 100: Crash under Viral Buzz
  - 👥 Morale ≤ 0: Mass Walkout | Morale ≥ 100: Self-Managed Communaute
  - 👔 Board ≤ 0: Immediate Dismissal | Board ≥ 100: Puppet Figurehead
- Annual Underperformance Eviction (evaluated at end of Q4):
  - Arithmetic average of all 4 gauges must meet the progressive threshold:
    - Year 1: 45% | Year 2: 50% | Year 3: 55% | Year 4: 60% | Year 5: 65%.
  - Failure triggers: "Golden Eviction" (The startup flourishes, but a professional CEO replaces you).
- Final Victory: Surviving all 5 Years → Successful IPO.

## 6. Architecture & Versioning
- SemVer constant `APP_VERSION = "0.1.0"` present in root metadata and UI footer.
- Local-First: 100% client-side persistence (`localStorage`), zero server, isolated state per run UUID.
- Admin role locked via `localStorage.getItem('ludis_admin_key') === 'true'`.

## 7. Typography Imports & Styling Configuration
- **Serif (Headers & Institutional Press)**: Playfair Display or Merriweather.
- **Sans-Serif (UI, Gauges, Buttons, Cards)**: Inter or Geist.
- **Color Tokens**:
  - Background surface: `#0B0F17` (deep slate navy).
  - Card & Container surface: `#111827` (slate-900).
  - Gauge Cash: `#10B981` (emerald-500).
  - Gauge Traction: `#F59E0B` (amber-500).
  - Gauge Morale: `#818CF8` (indigo-400).
  - Gauge Board: `#3B82F6` (blue-500).


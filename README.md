# MBTIx · Live One Day in Singapore

A personality test disguised as a day out. Instead of answering a questionnaire, you pick a day and live it, and your MBTI type is worked out from what you do along the way.

| Day | Journey | What happens |
| --- | --- | --- |
| MON | **Monday Grind** 💼 | Snooze button, rush-hour East-West Line, lift small talk with the big boss, an ambush presentation, the 6pm escape |
| SAT | **Shiok Saturday** 🌴 | Kopitiam breakfast, tissue-packet chope, hawker lunch, thunderstorm, first date at Gardens by the Bay and Marina Bay |
| SUN | **Tokyo, Lah** ✈️ | Last day overseas with Singaporean habits (Milo in the suitcase, queue instincts), Shibuya, ramen, shrine, flight home to Changi |

Built with **pnpm + Vite + TypeScript**, **GSAP** for motion, and **three.js** for the 3D skyline backdrop.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build into dist/
```

## How it plays

- **12–14 moments** along a train line. The progress bar is the line itself (East-West green, North-South red, Yamanote light green), and every scene change is an MRT-door wipe ("Next station…").
- **Five interaction styles**, so it never feels like a form:
  - `cards`: pick an illustrated choice
  - `chat`: a WhatsApp-style thread types out, then you pick a reply
  - `slider`: a graded answer, so a 70/30 lean counts as 70/30
  - `drag`: drag your avatar to where you'd stand in the MRT carriage
  - `timer`: a sudden thunderstorm, decide before you're soaked (hesitating counts too)
- **Singlish glossary**: hover or tap any underlined word (*chope*, *shiok*, *belanja*…).
- **3D world**: a toon-shaded skyline. Singapore days show Marina Bay Sands, the Supertrees and the Flyer; the Tokyo day swaps in Tokyo Tower and Mt Fuji. The sky moves from dawn to night as your day goes on, and fireworks go off on the results screen.
- **Mobile**: under 640px the app becomes full-screen like a native app: a sticky top bar, edge-to-edge illustrations, single-column choices, tap lists for drag scenes, safe-area padding, haptic taps and a lighter 3D renderer. It can be added to the home screen (web app manifest).
- **Results**: your type and SG persona (e.g. *ISTJ · The Chope Guardian*), the percentage split on each axis, the choices that pushed you there, plus two **work kakis** (career matches) and two **date-able types** (partner matches).

## Project layout

```
src/
  data/
    journeys/     # monday.ts, saturday.ts, sunday.ts: scenes, story text, MBTI weights
    profiles.ts   # 16 SG personas + career/partner matches
    scoring.ts    # weights → per-axis percentages → type
    glossary.ts   # Singlish terms ({term} markup in story text)
  art/
    kit.ts        # shared cartoon primitives (person rig, HDB, Supertree, MBS…)
    scenes.ts     # Saturday painters + the painter registry
    work.ts       # Monday office painters
    overseas.ts   # Tokyo / Changi painters
  world/world.ts  # three.js backdrop + fireworks
  ui/
    interactions.ts  # cards / chat / slider / drag / timer
    result.ts        # results page
  main.ts         # flow: intro → scenes → results
```

### Tuning the test

Each choice carries weights such as `{ E: 2, T: 1 }`. Sliders split their `weight` between the two poles by position. Per axis: `leftPct = (left + 0.5) / (left + right + 1)`. To rebalance, edit weights in `data/journeys/`. Keep each axis covered by at least 3 scenes per journey. To add a new day, create a `Journey` file, add it to `journeys/index.ts`, and reuse painters (they take a `sceneId` for variants).

### Illustrations

All scene art is generated SVG from `art/kit.ts`, so every scene shares the same outline weight, palette and character rig, and your avatar's hair and outfit follow you through the day. To use stock illustrations instead (e.g. from Pixabay), drop the files in `public/illustrations/` and return an `<img>` from the matching painter in `art/scenes.ts`. Pick a single artist or set, or the style will clash between scenes. The drag zones in the MRT scene are positioned in percent, so they still line up with a different image of the same aspect ratio (480×300).

*For fun only, not a clinical assessment.*

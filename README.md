# Agri-Cycle — website rebuild

A Next.js rebuild of [agricycleenergy.com](https://www.agricycleenergy.com/), carrying over the
site's content verbatim while replacing the WordPress/Visual Composer front end with a custom
design system, motion layer and a set of genuinely interactive tools.

## Running it

```bash
npm run dev
```

Then open **http://website.localhost:3000**.

`*.localhost` resolves to `127.0.0.1` on macOS with no `/etc/hosts` entry needed, and the dev
script binds the server to that hostname so nothing is exposed on the network. `npm run dev:local`
binds plain `localhost` if you'd rather use that.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on `http://website.localhost:3000` |
| `npm run dev:local` | Dev server on `http://localhost:3000` |
| `npm run build` | Production build (73 routes: 24 pages + 49 blog posts) |
| `npm run start` | Serve the production build on `website.localhost:3000` |
| `npm run verify` | Playwright pass over every route at three viewports |
| `npm run lint` | ESLint |

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — brand tokens and custom utilities in `src/app/globals.css`
- **Motion** (`motion/react`) for scroll reveals, layout animation and the interactive widgets
- **lucide-react** icons, **Bricolage Grotesque** / **Inter** / **Instrument Serif** via `next/font`

Everything renders as static HTML except `/blog`, which reads a `?category=` search param.

## Layout

```
src/
  app/                      one directory per route, plus not-found.tsx
  components/
    layout/                 Header (mega-menu + mobile drawer), Footer, ScrollProgress, LegalPage
    sections/               Page-level blocks: Hero, CycleDiagram, StateTileMap,
                            ImpactCalculator, HowItWorks, Timeline, TeamGrid,
                            Testimonials, ServiceCards, PartnerMarquee, BeforeAfter,
                            NewsBanner, StatsStrip, CTASection
    ui/                     Primitives: Reveal, Button, Counter, TiltCard, Marquee,
                            Accordion, Parallax, PageHero, SectionHeading
    blog/                   PostCard, BlogBrowser, ReadingProgress
    forms/                  EnquiryForm
  content/
    site.ts                 All page copy, nav, services, FAQs, team, partners, state policy data
    legal.ts                Privacy policy, terms of use, SMS policy
    posts.json              49 blog posts, generated from the WordPress REST API
    categories.json         Post category counts
    posts.ts                Typed accessors, related-post scoring, date formatting
  lib/utils.ts              cn() + number formatting
scripts/verify.mjs          Playwright verification suite
public/img/                 ~120 images pulled from the original media library
```

## Interactive pieces

- **Food Full Circle wheel** (`CycleDiagram`) — seven stages on a dashed ring; auto-advances until
  you hover or tap a node, then holds. Centre readout and side panel cross-fade.
- **State policy tile map** (`StateTileMap`) — a stylised 11×8 grid of all 50 states plus DC,
  filterable by mandate type and searchable by name. Positions are deliberately schematic, and the
  page says so; the panel links out to the ReFED Policy Finder for authoritative rules.
- **Impact calculator** (`ImpactCalculator`) — a working estimator. Sliders for volume, event
  duration and round-trip landfill distance produce avoided CO₂e plus EPA equivalencies
  (car-years, homes powered, tree seedlings, gallons of gasoline). Every factor and its source is
  listed in the collapsible assumptions panel.
- **Then/now slider** (`BeforeAfter`) — pointer-, touch- and keyboard-driven comparison of the farm.
- **Blog browser** (`BlogBrowser`) — category chips and search with animated layout transitions.
- Plus: mega-menu, mobile drawer, tilt cards, scroll-linked spines on the process and timeline
  sections, animated counters, marquees, accordion FAQ, team bio modals.

All motion respects `prefers-reduced-motion`.

## Content provenance

Page copy, FAQs, team bios, partner details, the Closed Loop Partners press release and all 49 blog
posts were pulled from the live site's WordPress REST API and transcribed without rewriting the
facts. Blog HTML was cleaned up on the way in: lazy-load placeholders promoted to real `src`
attributes pointing at local images, Word-processor markup stripped, in-body `h1`s demoted to `h2`,
caption wrappers converted to `<figure>`, and internal links remapped to the new routes.

Legacy WordPress URLs redirect permanently to their new homes — see `legacyRedirects` in
`next.config.ts`.

### Two things that differ from the original

- **Forms.** The live site embeds HubSpot forms, which can't be reproduced without the account.
  `EnquiryForm` validates locally and then hands the completed enquiry to the visitor's own mail
  client via `mailto:`, and tells them that's what it's doing. Wire it to HubSpot (or an API route)
  before this goes live.
- **State policy detail.** The original hid this behind a slider of images with no machine-readable
  text. The notes in `stateTiles` were written from public sources and are summaries, not legal
  advice; the UI flags that thresholds vary and change.

## Verification

`npm run verify` drives Chromium over every route at 390 / 834 / 1440 px and checks HTTP status,
console errors, failed requests, horizontal overflow, broken images, exactly one `<h1>` per page,
and minimum text content. It also exercises the redirects, crawls every internal link, fetches all
49 post routes, and runs 13 interaction tests against the widgets above. Screenshots land in
`screenshots/{mobile,tablet,desktop}/` and a machine-readable run lands in
`screenshots/report.json`.

```bash
npm run verify              # everything
npm run verify -- --quick   # key routes only
npm run verify -- --posts=8 # widen blog-post screenshot coverage
```

The dev server must already be running.

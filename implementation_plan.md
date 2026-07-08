# 🎯 Kanav Singla — Portfolio: Enhanced Design & Build Plan

> Revised from `plan.md` · Optimized for **Stitch → Antigravity** workflow  
> Aesthetic: Vercel × Linear × Raycast — *but with a soul*

---

## Why This Plan is Better Than the Original

The original plan had strong bones but suffered from three core problems:

1. **Vague visual direction** — "Electric Blue or Violet or Lime" is not a design decision, it's a wishlist.
2. **Missing UX logic** — No interaction model, no scroll strategy, no mobile-first hierarchy.
3. **No Stitch → Antigravity handoff protocol** — The workflow was listed but not actually structured.

This revision locks every ambiguous decision, introduces a differentiated design voice, and maps every section to a Stitch screen + Antigravity component.

---

## 0. Data Architecture — You Curate, GitHub Hydrates

> **You explicitly choose which projects appear — but GitHub fills in all metadata automatically.**

### Where Every Section's Data Comes From

| Section | Source | Update method |
|---|---|---|
| Projects (which ones show) | `src/data/projects.ts` — explicit curated list | Add/remove one line |
| Projects (metadata) | GitHub API (fetched per listed repo) | Automatic — live from GitHub |
| GitHub Heatmap / Stats | GitHub GraphQL API (via proxy) | Automatic — live data |
| Bio / About / Contact | `src/data/profile.ts` | Fill once, rarely edited |
| Skills | `src/data/skills.ts` | Edit once per new skill |
| Resume Timeline | `src/data/resume.ts` | Edit once per career event |

### `src/data/projects.ts` — The Curated Allowlist

This single file controls exactly what appears. You list repos as `owner/repo` strings — this means **you can include repos you contributed to but don't own** (orgs, other accounts) just as easily as your own:

```ts
export const projects = [
  // Owned repos
  { repo: "KanavSingla28/PDFTalk",            featured: true,  order: 1 },
  { repo: "KanavSingla28/aws-cicd-pipeline",  featured: true,  order: 2 },
  { repo: "KanavSingla28/analytics-dashboard", featured: false, order: 3 },

  // External repos you contributed to
  {
    repo: "some-org/some-project",
    featured: false,
    order: 4,
    contribution: {
      role: "Core Contributor",
      highlights: ["Built authentication module", "Reduced CI time 40%"],
      prLinks: ["https://github.com/some-org/some-project/pull/42"],
    },
  },
] as const;
```

- `featured: true` → large bento hero card
- `featured: false` → regular grid card
- `order` → explicit display sequence, no guessing
- `contribution` field → shows **`Contributor` badge** on card; contribution layout on detail page (role + PRs + highlights), sourced entirely from `projects.ts` — no write access to the external repo needed

**What you never do:** no topic tagging, no pinning, no touching the codebase to add a project — just edit one line in `projects.ts`.

### Per-Repo `portfolio.json` — Optional Enrichment

For richer case study pages, drop a `portfolio.json` in the repo root. The proxy fetches it automatically. For **external repos** where you have no write access, put the same content in the `contribution` field of `projects.ts` — identical result.

Without `portfolio.json`, the proxy falls back to GitHub's native fields: `description` → tagline, `topics` → chips, `homepageUrl` → demo link, `openGraphImageUrl` → thumbnail. Every listed repo gets a working page automatically.

### Static Personal Data Files (fill once in Phase 0)

```
src/data/
  profile.ts    ← name, bio, email, links, availability toggle, quick stats
  projects.ts   ← curated list of repos (owned + contributed)
  skills.ts     ← skills grouped by category
  resume.ts     ← education, experience, certifications, achievements
```

`profile.availability = true/false` toggles the hero badge. `profile.stats` drives the count-up numbers in About.

### Frontend Data Fetching

- All external calls go through **Vercel API Routes** — no token in client bundle
- API proxy reads `projects.ts` server-side, fetches GitHub GraphQL for each `owner/repo`, merges `contribution` metadata, returns typed + ordered response
- **`useSWR`** handles client-side fetching with deduplication and revalidation
- **Skeleton loaders** on all API-dependent sections — CLS = 0
- **Graceful fallbacks** — site never hard-crashes if API is down

### Project Detail Pages — Route: `/projects/:owner/:repo`

Supports any owner. Three rendering modes, resolved in order:
1. **`portfolio.json` exists** → full case study layout
2. **`contribution` field in `projects.ts`** → contribution layout (role, PRs, highlights)
3. **Neither** → auto-generated page from GitHub metadata

---

## 1. Design Direction — Locked & Differentiated

### Visual Identity

| Attribute | Original | ✅ Revised |
|---|---|---|
| Style | "Vercel/Linear/Raycast inspired" | **Vercel × Linear DNA with editorial typographic moments** |
| Accent | Pick one of 3 | **`#7C3AED` Violet — single source of truth** |
| Background | `#0a0a0a` or `#0d0d10` | **`#09090b` (Zinc-950 equivalent) — consistency** |
| Surface | Not defined | **`#111113` for cards/panels, `#1a1a1d` for hover** |
| Border | Not defined | **`rgba(255,255,255,0.06)` — whisper borders** |
| Text Primary | Off-white | **`#fafafa`** |
| Text Secondary | Not defined | **`#a1a1aa` (Zinc-400)** |
| Text Muted | Not defined | **`#52525b` (Zinc-600)** |
| Accent Glow | Not defined | **`#7C3AED` at 20% opacity for subtle glows** |

**Why Violet?** It sits between "technical blue" and "creative purple" — signals both engineering depth and design taste. It reads premium on dark backgrounds without the overused cyan/green of most dev portfolios.

---

### Typography — Precision Scale

| Role | Font | Weight | Size |
|---|---|---|---|
| Hero Name | **Geist** | 700 | `clamp(3.5rem, 8vw, 6.5rem)` |
| Hero Tagline | **Geist** | 400 | `clamp(1rem, 2.5vw, 1.35rem)` |
| Section Headings | **Geist** | 600 | `2rem` |
| Body | **Inter** | 400 | `1rem / 1.7` |
| Code / Tags / Labels | **JetBrains Mono** | 400 | `0.8rem` |
| Stat Numbers | **Geist** | 700 | `3rem` |

> `clamp()` values = fluid type — no breakpoint hacks needed.

**Improvement over original:** Original said "Inter or Geist" — this plan uses **both** strategically: Geist for brand moments (name, headings, numbers), Inter for readability (body, descriptions).

---

### Motion System — Intentional, Not Decorative

| Trigger | Animation | Duration | Easing | Reduced-motion fallback |
|---|---|---|---|---|
| Page load (hero) | Stagger fade-up (name → tagline → CTAs) | 600ms stagger | `ease-out` | Instant appear, no stagger |
| Scroll into view | Fade-up + slight Y translate | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant appear |
| Card hover | Lift (`translateY -4px`) + border brightens | 200ms | `ease` | Border brighten only (no lift) |
| Card hover glow | CSS custom property (`--mouse-x/y`) drives a `radial-gradient` mask via `transform`; no `background-position` repaint | 300ms | `ease` | Static border brighten only |
| Nav link hover | Underline slides from left (`scaleX` transform) | 150ms | `ease` | Static underline |
| Section transition | Opacity + blur-out (0→1, blur 4px→0) | 400ms | `ease` | Opacity only, no blur |
| Terminal open | Scale 0.95→1 + blur backdrop | 250ms | Spring | Instant appear |

**Implementation note — card hover glow:** The mouse-tracking effect is implemented entirely with `transform`-based masking driven by CSS custom properties (`--mouse-x`, `--mouse-y`) updated via a single `mousemove` listener on the card container. This avoids triggering background-paint on every frame. If profiling shows jank, downgrade to static border-brighten + lift — which is still visually strong and has zero performance risk.

**Accessibility — `prefers-reduced-motion`:** All stagger delays, blur transitions, and the card glow are wrapped in:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .card-glow { display: none; }
}
```
Framer Motion's `useReducedMotion()` hook is used for JS-driven animations. This applies to hero stagger, scroll-reveals, and terminal transitions.

---

### Color Palette — Extended Token System

```css
:root {
  /* Backgrounds */
  --bg-base:      #09090b;
  --bg-surface:   #111113;
  --bg-elevated:  #1a1a1d;
  --bg-overlay:   rgba(9, 9, 11, 0.85); /* terminal / modal */

  /* Borders */
  --border:       rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.12);

  /* Text */
  --text-primary:   #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted:     #52525b;

  /* Accent */
  --accent:       #7C3AED;
  --accent-light: #a78bfa;
  --accent-glow:  rgba(124, 58, 237, 0.20);
  --accent-bg:    rgba(124, 58, 237, 0.08);

  /* Functional */
  --success: #22c55e;
  --danger:  #ef4444;
}
```

---

## 2. Site Structure — Redesigned with UX Intent

### Navigation

**Fixed top nav** (not sticky sidebar — Linear uses top nav on their site):
- Left: `KS` monogram logo (animated on hover — rotates 10deg or glows)
- Right: `About · Projects · Skills · GitHub · Contact` + **`[>_]` terminal trigger**
- On scroll: nav gains `backdrop-blur` + subtle border-bottom
- Mobile: hamburger → slide-down menu (not a sidebar — less disruptive)

> **Original gap:** No nav strategy was defined. This matters enormously for UX.

---

### Hero Section — Redesigned

**Layout:** Full viewport height. Centered content with a noise-texture overlay.

**Elements (top to bottom):**
1. `[Available for opportunities]` — small pill badge, breathing pulse animation
2. **Name** — Large, fluid type
3. **Positioning statement** — single sentence, precise
4. **Role tags** — monospace chips: `Software Engineer` · `Cloud & DevOps` · `Full-Stack`
5. **CTA row:** `[View Projects →]` (filled, violet) · `[Download Resume]` (ghost) · `[Contact]` (ghost)
6. **Scroll indicator** — small animated chevron, fades after 2 seconds

**Background treatment:**
- Faint grid pattern (CSS grid lines, not image)
- One large violet radial gradient behind the name — `opacity: 0.15`
- Optional: Animated floating orb (pure CSS, no canvas)

> **Improvement:** Original had name + tagline + 3 CTAs with no hierarchy. This version sequences intent: availability → identity → role → action. Recruiters read in that order.

---

### About Section — Reframed

**Not a bio. A value proposition.**

Layout: Two columns on desktop. Single on mobile.
- Left: Short, punchy paragraphs (max 3 sentences each, max 2 blocks)
- Right: Quick-stat cards

**Quick Stats** (animated count-up on scroll-into-view):
- `X+` Projects Built
- `X+` Technologies Used
- `X` Years Coding
- One meaningful metric (e.g., `99.9%` uptime on a project)

> **Original gap:** About was too generic. Recruiters skim — stats create instant credibility.

---

### Projects Section — Elevated

**Layout:** Bento-style grid (not uniform card grid)
- 1 featured project: large card, full-width or 2/3 width
- 3–4 smaller cards below in a 2-col or 3-col grid
- Tags visually differentiated: `[Personal]` `[Team]` `[Open Source]`

**Card anatomy:**
```
┌─────────────────────────────────────────┐
│  [Category Tag]              [↗ GitHub] │
│                                         │
│  Project Title                          │
│  One-line impact statement              │
│                                         │
│  [React] [Node.js] [AWS] [PostgreSQL]  │
│                                         │
│  [View Case Study →]                    │
└─────────────────────────────────────────┘
```

**Hover state:** Border brightens (`--border-hover`), title shifts subtly (`translateY -2px`), and a CSS-custom-property-driven radial mask creates the violet glow — no background-paint repaint on mousemove.

**Project Detail Pages:**
Each page follows a **structured case study format:**
1. Header: Title + tags + links
2. TL;DR (1 sentence — for scanners)
3. The Problem
4. My Solution & Architecture (with diagram if possible)
5. Key Challenges & How I Solved Them
6. Results / Metrics
7. Screenshots / `.webm` or `.mp4` loop (not `.gif` — see Performance note below)
8. Tech Stack breakdown
9. `[← Back to Projects]` · `[View Live →]` · `[View Code →]`

> **Improvement over original:** Original listed sections but had no reading flow. This follows the "Problem → Solution → Impact" narrative that resonates with technical hiring managers.

---

### Skills Section — Redesigned

**Kill the icon wall.** Original said "group skills" — this plan shows *how*.

**Layout:** Horizontal scrolling category tabs + skill grid

```
[Languages] [Frontend] [Backend] [Cloud & DevOps] [Databases] [Tools]
    ↑ active tab underlined with violet

Below: Animated grid of skill pills with icon + name
Each pill: subtle hover lift, tooltip with "proficiency level" or context
```

> **Improvement:** Tabbed filter makes it interactive and scannable. Avoids the overwhelming "dump everything" approach.

---

### GitHub Activity Section — Redesigned

**Don't use the GitHub stats image service.** Those are static PNGs that look dated and can't be themed.

**Instead:**
- Fetch contribution data via **GitHub GraphQL API** — but *not* directly from the browser
- A **Vercel API Route** (serverless function) holds the `GITHUB_TOKEN` environment variable server-side and proxies the GraphQL request. The token never touches the client bundle.
- The frontend calls `/api/github-stats` — a plain authenticated fetch from the server to `api.github.com/graphql`
- The API route sets **`Cache-Control: s-maxage=3600, stale-while-revalidate`** — responses are cached at Vercel's edge for 1 hour. This prevents rate-limit exhaustion during traffic spikes (e.g. shared on LinkedIn) without staling the data meaningfully.
- Render a **custom contribution heatmap** with violet shades for activity levels
- Display: Contributions this year · Longest streak · Most used languages (donut chart)

> **Architecture note:** Calling GitHub GraphQL directly from the browser requires embedding a personal access token in client-side code — a credential leak. The serverless proxy with edge caching is the correct solution: cheap (free tier), secure, and rate-limit-safe.

> **Secrets management:** `GITHUB_TOKEN` lives in `.env.local` during development (already gitignored by Vite's default `.gitignore`). For production, set it in the **Vercel dashboard → Project Settings → Environment Variables**. It is never committed to the repository under any circumstances.

---

### Resume Section — Rethought

**Drop the inline PDF preview.** PDF iframes are slow, have CORS issues, and look dated on mobile.

**Instead:**
- Interactive **vertical timeline** with alternating left/right cards on desktop
- Categories: `Education` · `Experience` · `Achievements` · `Certifications`
- Each card: org logo placeholder + role + dates + 2–3 bullet points
- Sticky "Download PDF" button on the right sidebar (desktop) or fixed bottom bar (mobile)

> **Improvement:** Timeline is far more readable, works on all devices, and is visually engaging without being gimmicky.

---

### Contact Section — Elevated

**Layout:** Dark panel, centered content.
- Headline: `Let's Build Something.` (bold, large)
- Subtext: 1 line with your email displayed prominently
- Social links: Large icon buttons with hover labels
- Optional: Contact form with minimal fields (Name · Email · Message · Send)

**Functional detail:** `mailto:` links with pre-filled subject lines for common intents (`[Opportunity]`, `[Collaboration]`, `[Question]`)

---

### Developer Console — Upgraded

**Trigger:** `>_` nav button OR keyboard shortcut `Ctrl + K` (familiar from Linear/VSCode)

**Upgraded commands:**
```bash
whoami          → displays bio in formatted output
projects        → lists projects with clickable links
skills          → shows skills by category  
contact         → shows contact info
resume          → opens resume download
sudo hire kanav → Easter egg: confetti + success message
clear           → clears terminal
help            → lists all commands
```

**UX Detail:**
- Command history (↑↓ arrows)
- Tab autocomplete
- Typewriter effect on output
- Blinking cursor
- `Esc` to close

> **Improvement over original:** Added keyboard shortcut (Cmd+K), tab autocomplete, command history, and proper Easter egg handling. These are the details that make engineers smile.

---

## 3. Stitch Design Workflow — Structured Handoff

### Screens to Design in Stitch (in order):

8 screens — collapsed from 13 to eliminate process theater on a solo project. Design Tokens and Components share one screen; low-complexity pages are grouped.

| # | Screen | What it covers |
|---|---|---|
| 1 | **Tokens + Component Library** | Colors, type scale, spacing, border-radius, shadows; button variants, chip, card, badge, tooltip — all in one reference frame |
| 2 | **Nav** | Default state · scrolled state (blur + border) · mobile hamburger open |
| 3 | **Hero** | Desktop + mobile; all element states (badge pulse, CTA hover) |
| 4 | **About + Skills** | Two-col about with stat cards; tabbed skills grid with pill states |
| 5 | **Projects Grid + Card States** | Bento layout; card default, hover, focused |
| 6 | **Project Detail Page** | Full case study layout desktop + mobile |
| 7 | **GitHub Activity + Resume Timeline** | Custom heatmap; vertical timeline desktop + mobile |
| 8 | **Contact + Developer Console** | Contact section; terminal open/typing/output states |

**Before handing off to Antigravity:**
- Export design tokens as CSS variables (maps 1:1 to `:root` block in code)
- Document all hover/active/focus-visible states per component
- Annotate animations with duration + easing + reduced-motion fallback
- Mark responsive breakpoints on Hero, Projects, Resume, and Contact screens

---

## 4. Tech Stack — Refined

| Layer | Choice | Reason | Change from Original |
|---|---|---|---|
| Framework | **React + Vite + TypeScript** | Fast, modern, type-safe | ✅ Same |
| Styling | **CSS Modules + CSS Variables** | Stitch outputs raw CSS; modules map 1:1 to component files without a utility-class translation layer | ⚠️ Changed from Tailwind |
| Animations | **Framer Motion + CSS transitions** | Motion for complex JS-driven animations; CSS for simple hover states | ✅ Same |
| Content | **TypeScript data files** | Typed, autocomplete, no extra parser | ⚠️ Changed from JSON/MDX |
| GitHub Stats | **GitHub GraphQL API** | Themed, reliable, live — via server proxy | ⚠️ Upgraded from image service |
| **GitHub Proxy** | **Vercel API Route** | Serverless function holds `GITHUB_TOKEN` env var; prevents credential leak in client bundle | 🆕 Added |
| Terminal | **Custom parser** | Full control over UX | ✅ Same |
| Routing | **React Router v6** | Needed for project detail pages | 🆕 Added |
| Hosting | **Vercel** | Perfect DX | ✅ Same |
| Analytics | **Vercel Analytics** (zero config) | See who visits without slowing site | 🆕 Added |
| SEO | **React Helmet Async** | Per-page meta tags | 🆕 Added |

> **Why CSS Modules over Tailwind?** The real reason is workflow fit: Stitch exports CSS with named selectors and custom properties. CSS Modules let those exported styles map directly into component files without translating them into Tailwind utility classes — which adds a manual step and risks drift between design and implementation. Tailwind v3+ with `theme.extend.colors` reading CSS vars is a legitimate alternative; CSS Modules is the choice here purely because it matches the Stitch handoff format more naturally, not because of any Tailwind technical limitation.

> **Accessibility note:** All interactive elements (cards, buttons, nav links, terminal input) must have visible `:focus-visible` outlines using `--accent-light`. Keyboard navigation must be fully functional before launch — especially the `Cmd+K` terminal, which is keyboard-first by design.

---

## 5. Performance Strategy

| Target | Method |
|---|---|
| Lighthouse 95+ | Code splitting per route, lazy-load images |
| LCP < 1.5s | Preload hero font, no render-blocking resources |
| CLS = 0 | Explicit image dimensions, skeleton loaders |
| No layout shift on load | Reserve space for GitHub stats while loading (skeleton) |
| Mobile 60fps | Use `transform` and `opacity` only for animations (GPU-accelerated) |
| Font loading | Three separate strategies — see below |

**Font Loading — Three Sources, Three Strategies:**

| Font | Source | Strategy |
|---|---|---|
| **Geist** | `npm install geist` (Vercel's package) or self-hosted `.woff2` | Import directly in CSS — no external request; `font-display: swap` |
| **Inter** | Google Fonts | `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` |
| **JetBrains Mono** | Google Fonts | Same preconnect as Inter — both resolved via the same Google Fonts CDN |

> Geist is **not on Google Fonts** — it's Vercel's proprietary typeface distributed as an npm package (`geist`) or downloadable `.woff2` files. A single `preconnect to Google Fonts` line in the old plan would have silently skipped it. Self-hosting Geist also eliminates one network dependency entirely.

**Avoid:**
- Heavy canvas animations on load
- Lottie files (too large)
- Animated `.gif` files for demos — use `.webm` / `.mp4` loops instead (same motion, 10–20× smaller, hardware-decoded). If a demo is long, use a static screenshot with a `[Watch Demo →]` link to a hosted video rather than autoplaying inline media.

---

## 6. Build Phases — Tightened

| Phase | Name | Deliverable |
|---|---|---|
| 0 | **Content Prep** | All copy, project write-ups, resume PDF, metrics finalized |
| 1 | **Stitch Design** | All 8 screens designed and approved |
| 2 | **Project Setup** | Vite + React + TS + CSS Modules + Vercel CI/CD live |
| 3 | **Design System** | All CSS tokens, components coded, no real content |
| 4 | **Core Sections** | Hero → About → Projects → Skills (desktop first) |
| 5 | **Secondary Sections** | Resume → GitHub (+ serverless proxy) → Contact → Footer |
| 6 | **Project Pages** | All case studies built + routing |
| 7 | **Developer Console** | Terminal overlay built and connected |
| 8 | **Responsive** | Mobile-first pass across all sections |
| 9 | **Accessibility + Performance QA** | `prefers-reduced-motion` audit, focus states, Lighthouse 95+, a11y check |
| 10 | **Launch** | Custom domain, SSL, Vercel Analytics enabled, share |

> **Key change:** Phase 0 (content prep) is now **before** design. You cannot design the hero without knowing your positioning statement. You cannot build project cards without knowing the projects. Phase 9 now explicitly calls out accessibility alongside performance — they are tested together, not as afterthoughts.

---

## 7. SEO & Discoverability

- `og:image` generated card with your name + title (1200×630)
- Canonical URLs for all project pages
- `sitemap.xml` auto-generated via Vite plugin
- `robots.txt`
- Structured data (`Person` schema + `WebSite` schema)
- Page title pattern: `Project Name — Kanav Singla`

---

## 8. Domain & Deployment

Same as original — **`kanavsingla.fyi`** → Vercel → HTTPS via Let's Encrypt. No changes needed here.

---

## 9. Content Checklist (Must Have Before Phase 1)

- [ ] Positioning statement (1 sentence, what you do + who for + why it matters)
- [ ] Short bio (2–3 sentences, no fluff)
- [ ] Quick stats (years coding, projects, key metric)
- [ ] For each project: Problem · Role · Stack · Challenges · Results · Links
- [ ] Resume PDF (up to date)
- [ ] Education + Experience + Certifications timeline data
- [ ] Skills list grouped by category
- [ ] Email, LinkedIn, GitHub URLs
- [ ] Portfolio domain name confirmed

---

## Final Goal (Sharpened)

Build a portfolio that **a senior engineer at Vercel or Linear would respect** — one that's fast, intentional, and shows taste through its restraint. Not a feature-demo. A *statement*.

> The best portfolios don't scream. They whisper with confidence.


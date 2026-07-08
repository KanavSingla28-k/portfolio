# 📋 Portfolio Build Workflow — Kanav Singla
### Stitch → Antigravity → Vercel · Complete End-to-End Guide

---

## The Core Philosophy: You Curate, GitHub Hydrates

> **You explicitly choose which projects appear — but GitHub fills in all the metadata automatically.**  
> Add a repo to `projects.ts` once, and the portfolio handles the rest forever.

This model gives you **full control** over what's shown (including repos you didn't create but contributed to heavily), while still pulling live data (stars, description, language, demo URL) from GitHub automatically.

Every section of this portfolio has one canonical data source:

| Section | Source of Truth | How it updates |
|---|---|---|
| Projects (which ones) | **`src/data/projects.ts`** — your explicit curated list | Add/remove one line |
| Projects (metadata) | **GitHub API** (fetched per listed repo) | Automatic — live from GitHub |
| GitHub Stats / Heatmap | **GitHub GraphQL API** (via proxy) | Automatic — live data |
| Personal Bio / About | `src/data/profile.ts` | One-time setup, rarely edited |
| Skills | `src/data/skills.ts` | Edit once, reflects everywhere |
| Resume Timeline | `src/data/resume.ts` | Edit once per career event |
| Contact Links | `src/data/profile.ts` | One-time setup |

---

## Part 1 — Data Architecture

### 1.1 Curated Project List — `src/data/projects.ts`

This is the **single file** that controls what appears in your portfolio projects section. You list repos by `owner/repo` — meaning you can include repos you don't own (orgs, other users you contributed to) just as easily as your own.

```ts
// src/data/projects.ts
export const projects = [

  // ── Your own repos ──────────────────────────────────────────
  {
    repo: "KanavSingla28/PDFTalk",
    featured: true,            // goes in the bento hero / large card spot
    order: 1,                  // controls display order
  },
  {
    repo: "KanavSingla28/aws-cicd-pipeline",
    featured: true,
    order: 2,
  },
  {
    repo: "KanavSingla28/analytics-dashboard",
    featured: false,           // appears in the regular grid, not hero
    order: 3,
  },

  // ── Repos you contributed to but don't own ──────────────────
  {
    repo: "some-org/some-project",
    featured: false,
    order: 4,
    contribution: {
      role: "Core Contributor",
      highlights: [
        "Built the authentication module from scratch",
        "Reduced CI pipeline time by 40% via caching strategy",
      ],
      prLinks: [
        "https://github.com/some-org/some-project/pull/42",
        "https://github.com/some-org/some-project/pull/67",
      ],
    },
  },

] as const;
```

**How it works:**
- The API proxy takes this list, fetches GitHub metadata for **each `owner/repo` entry** — regardless of who owns the repo
- `featured: true` → large bento card at the top of the grid
- `featured: false` → regular card in the grid below
- `order` → explicit display order, no guessing
- `contribution` → if present, the card shows a **`Contributor`** badge instead of owner indicators, and the detail page surfaces your specific PRs and role

**What you never have to do:**
- ✗ No topic tagging on GitHub
- ✗ No pinning repos just for the portfolio
- ✗ No touching the portfolio codebase when you want to add/remove a project
- ✓ Just edit `projects.ts` — one line add or remove

---

### 1.2 Per-Repo `portfolio.json` — Optional Case Study Enrichment

For repos you want a rich case study page on, create a `portfolio.json` in the repo root:

```json
{
  "tagline": "AI-powered PDF Q&A using RAG and LangChain",
  "category": "Personal",
  "metrics": "500+ documents processed · 95% answer accuracy",
  "demoUrl": "https://pdftalk.demo.com",
  "thumbnail": "https://raw.githubusercontent.com/KanavSingla28/pdftalk/main/assets/thumb.png",
  "caseStudy": {
    "problem": "Searching through large PDFs is slow and non-intuitive.",
    "solution": "RAG pipeline with LangChain + OpenAI embeddings stored in Pinecone.",
    "challenges": ["Chunking strategy for preserving context", "Cost optimization for embeddings"],
    "architecture": "https://raw.githubusercontent.com/.../arch-diagram.png"
  }
}
```

> For **external/contributed repos** where you can't commit a `portfolio.json`, put the case study data directly in the `contribution` field of `projects.ts` instead — it achieves the same result without needing write access to the other repo.

**What happens without `portfolio.json`:**
The proxy falls back to GitHub's native fields automatically:
- `description` → tagline
- `topics` → tech stack chips
- `stargazerCount`, `forkCount` → metrics
- `homepageUrl` → live demo link
- `primaryLanguage` → language badge
- `openGraphImageUrl` → thumbnail (GitHub's auto-generated card)

Every listed repo gets a working detail page. `portfolio.json` only adds depth.

---

### 1.3 The Serverless Data Layer — API Routes

All external API calls route through Vercel API Routes (serverless functions). The frontend never calls any external API directly.

```
src/
  api/                          ← Vercel API Routes (serverless)
    github/
      projects.ts               ← Reads projects.ts list → fetches each repo's metadata
      stats.ts                  ← Fetches contribution heatmap + streak data
      repo/[owner]/[repo].ts    ← Fetches portfolio.json for a specific repo
```

**`/api/github/projects`** — How it works:
1. Imports the `projects` array from `src/data/projects.ts` (build-time available server-side)
2. For each entry, fires a GitHub GraphQL query for that specific `owner/repo`
3. Merges GitHub metadata with the `contribution` field (if present)
4. Returns a typed, ordered response

```ts
// Response shape
{
  featured: EnrichedProject[],   // featured: true, sorted by order
  grid: EnrichedProject[],       // featured: false, sorted by order
}

// EnrichedProject shape
{
  repo: string                   // "KanavSingla28/PDFTalk"
  name: string                   // formatted repo name
  description: string            // from portfolio.json tagline or GitHub description
  topics: string[]               // tech stack chips
  stars: number
  language: string
  githubUrl: string
  demoUrl: string | null
  thumbnail: string | null
  isContribution: boolean        // true if owner !== KanavSingla28
  contribution?: ContributionMeta
}
```

**Cache strategy per route:**
| Route | Cache-Control | Rationale |
|---|---|---|
| `/api/github/projects` | `s-maxage=3600, stale-while-revalidate` | Live metadata, 1hr freshness is fine |
| `/api/github/stats` | `s-maxage=3600, stale-while-revalidate` | Heatmap resolution doesn't need sub-hour |
| `/api/github/repo/[owner]/[repo]` | `s-maxage=86400, stale-while-revalidate` | `portfolio.json` rarely changes |

**Frontend data fetching:**
- `useSWR` for client-side fetching with deduplication and revalidation
- Skeleton loaders for all API-dependent sections (no layout shift)
- Graceful fallbacks if API fails — cards show last cached data or a static error state

---

### 1.3 Static Personal Data Files — One-Time Setup

These files are filled out **once** (Phase 0) and rarely touched again.

#### `src/data/profile.ts`
```ts
export const profile = {
  name: "Kanav Singla",
  handle: "KanavSingla28",
  tagline: "Software Engineer building scalable web applications and cloud-native systems.",
  bio: [
    "I build full-stack applications and cloud infrastructure that scales.",
    "Currently focused on AI-integrated systems, DevOps pipelines, and developer tooling."
  ],
  availability: true,                    // toggles the "Available for opportunities" badge
  location: "India",
  email: "your@email.com",
  links: {
    github: "https://github.com/KanavSingla28",
    linkedin: "https://linkedin.com/in/kanavsingla",
    twitter: "",                         // leave empty to hide
    resume: "/resume.pdf",              // served from /public
  },
  stats: {
    yearsOfCoding: 3,
    projectsBuilt: 10,                  // auto-increments from GitHub count too
    technologiesUsed: 20,
    keyMetric: { label: "Uptime maintained", value: "99.9%" },
  },
} as const;
```

#### `src/data/skills.ts`
```ts
export const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Go", "Bash"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vite", "CSS Modules", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "Express", "GraphQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "GitHub Actions", "Vercel", "Terraform"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Pinecone"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Postman", "Linear"],
  },
] as const;
```

#### `src/data/resume.ts`
```ts
export const resume = {
  education: [
    {
      institution: "Your University",
      degree: "B.Tech Computer Science",
      period: "2022 – 2026",
      highlights: ["Relevant coursework", "GPA or achievement"],
    },
  ],
  experience: [
    {
      company: "Company Name",
      role: "Role Title",
      period: "Month Year – Present",
      highlights: [
        "Bullet 1: impact-first statement",
        "Bullet 2: metric-backed result",
      ],
      logo: "/logos/company.svg",       // place in /public/logos/
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: 2024,
      url: "https://...",
    },
  ],
  achievements: [
    {
      title: "Achievement name",
      description: "One line description",
      year: 2024,
    },
  ],
};
```

---

### 1.4 Project Detail Pages — Dynamic + Static Hybrid

**Route pattern:** `/projects/[owner]/[repo]` (supports any owner, not just yours)

**How it works:**
1. User clicks a project card
2. Frontend navigates to `/projects/KanavSingla28/pdftalk`
3. Page fetches `/api/github/repo/KanavSingla28/pdftalk`
4. Proxy fetches `portfolio.json` from the raw GitHub URL + repo metadata
5. **If `portfolio.json` exists** → render full case study layout
6. **If it's a contribution entry** → render contribution layout (your role, PRs, highlights) sourced from `projects.ts`
7. **If neither** → render auto-generated page from GitHub metadata (description, topics, languages, README link)

**Contribution repo detail page layout:**
```
[Contributor Badge]  some-org / some-project
Tagline from GitHub description

My Contribution
  Role: Core Contributor
  • Built the authentication module from scratch
  • Reduced CI pipeline time by 40%

  Pull Requests: [PR #42 ↗]  [PR #67 ↗]

[Tech Stack chips]  [View Repository ↗]
```

**Result:** Every repo in `projects.ts` gets a working detail page. No manual work needed beyond the initial list entry.

---

## Part 2 — Project File Structure

```
kanav-portfolio/
├── public/
│   ├── resume.pdf              ← your resume (drag and drop to update)
│   ├── og-image.png            ← 1200×630 open graph card
│   ├── favicon.ico
│   └── logos/                  ← company/org logos for resume timeline
│       └── company.svg
│
├── src/
│   ├── api/                    ← Vercel serverless functions
│   │   └── github/
│   │       ├── projects.ts
│   │       ├── stats.ts
│   │       └── repo/[owner]/[repo].ts
│   │
│   ├── data/                   ← static personal data (fill once)
│   │   ├── profile.ts          ← bio, links, availability, stats
│   │   ├── projects.ts         ← curated list of repos to show (owned + contributed)
│   │   ├── skills.ts           ← skills grouped by category
│   │   └── resume.ts           ← education, experience, certifications
│   │
│   ├── components/             ← reusable UI components
│   │   ├── ui/                 ← design system primitives
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   ├── Card/
│   │   │   └── Chip/
│   │   ├── Nav/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Projects/
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectCardSkeleton.tsx
│   │   ├── Skills/
│   │   ├── GitHubActivity/
│   │   │   ├── Heatmap.tsx
│   │   │   └── HeatmapSkeleton.tsx
│   │   ├── Resume/
│   │   ├── Contact/
│   │   └── Terminal/
│   │
│   ├── pages/                  ← route-level components
│   │   ├── Home.tsx
│   │   └── ProjectDetail.tsx   ← /projects/:repoName
│   │
│   ├── hooks/
│   │   ├── useGitHubProjects.ts
│   │   ├── useGitHubStats.ts
│   │   └── useReducedMotion.ts
│   │
│   ├── styles/
│   │   ├── globals.css         ← :root tokens, resets, base styles
│   │   └── tokens.css          ← CSS custom properties (from Stitch export)
│   │
│   ├── types/
│   │   └── github.ts           ← TypeScript types for API responses
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.local                  ← GITHUB_TOKEN (gitignored — never commit)
├── .env.example                ← template with variable names, no values
├── .gitignore
├── vercel.json                 ← rewrites, headers, edge config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Part 3 — DevOps & Deployment Pipeline

### 3.1 Repository Setup

```bash
# 1. Create repo on GitHub
# Name: portfolio (or kanav-portfolio)
# Visibility: Public (so others can see the code — it's a portfolio)
# Initialize with README

# 2. Clone locally
git clone https://github.com/KanavSingla28/portfolio.git
cd portfolio

# 3. Initialize with Vite
npx create-vite@latest . -- --template react-ts

# 4. Install dependencies
npm install framer-motion react-router-dom swr react-helmet-async geist

# 5. Set up local env
cp .env.example .env.local
# Then add: GITHUB_TOKEN=ghp_your_token_here
```

### 3.2 Branch Strategy

```
main ──────────────────────────────────────────► Production (kanavsingla.fyi)
  │
  ├── develop ────────────────────────────────► Staging preview (Vercel auto-URL)
  │     │
  │     ├── feature/hero-section
  │     ├── feature/projects-grid
  │     ├── feature/github-proxy
  │     └── fix/card-glow-jank
  │
  └── (hotfix branches merge directly to main)
```

**Rules:**
- `main` is always deployable and represents production
- `develop` is the integration branch — all features merge here first
- Feature branches are named `feature/<section>` or `fix/<issue>`
- Never push directly to `main`
- All merges to `main` go through a PR (even if you're solo — it forces a review moment)

### 3.3 Vercel CI/CD Configuration

**Automatic setup after connecting GitHub repo to Vercel:**

| Event | Vercel Action |
|---|---|
| Push to `main` | Deploy to Production (`kanavsingla.fyi`) |
| Push to `develop` | Deploy to Staging preview URL |
| Open a PR (any branch) | Deploy to unique preview URL (shareable) |
| PR merged | Preview URL deleted automatically |

**`vercel.json` — project configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=3600, stale-while-revalidate" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### 3.4 Environment Variables — The Complete Picture

**Local development:**
```bash
# .env.local (gitignored by default in Vite projects)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_GITHUB_USERNAME=KanavSingla28
```

**`.env.example` (committed to repo — no secret values):**
```bash
# GitHub personal access token (read:user, read:org scopes only)
# Generate at: https://github.com/settings/tokens
# Set in Vercel dashboard for production
GITHUB_TOKEN=

# Your GitHub username (used to construct API queries)
VITE_GITHUB_USERNAME=
```

**GitHub Token Scopes Required (minimum):**
- `read:user` — profile and pinned repos
- `public_repo` — read public repository data
- `read:org` — if any repos are under an organization

**Vercel Dashboard setup:**
```
Vercel → Your Project → Settings → Environment Variables

Name: GITHUB_TOKEN
Value: ghp_xxxx...
Environment: Production ✓  Preview ✓  Development ✗
```

> **Why not Development?** Local development uses `.env.local`. Vercel's Development environment is for `vercel dev` CLI usage — you won't need it.

### 3.5 GitHub Actions — Optional Quality Gate

Add this workflow to run type checks and linting on every PR before Vercel deploys:

**`.github/workflows/ci.yml`:**
```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run type-check      # tsc --noEmit
      - run: npm run lint            # eslint
```

**`package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives"
  }
}
```

---

## Part 4 — Custom Domain & DNS Setup

### 4.1 Domain Purchase
- Domain: `kanavsingla.fyi` (or `.dev`, `.me`, `.io`)
- Registrar recommendation: Namecheap or Cloudflare Registrar (cheapest renewal costs)

### 4.2 Vercel Domain Connection
```
Vercel Dashboard → Project → Settings → Domains
→ Add domain: kanavsingla.fyi
→ Vercel gives you DNS records to add
```

### 4.3 DNS Configuration
Go to your registrar's DNS settings and add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` (Vercel IP) | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | Auto |

**Or** — if using Cloudflare as DNS (recommended for free DDoS protection):
- Add the same A/CNAME records in Cloudflare
- Set SSL/TLS to "Full (Strict)"
- Enable "Always Use HTTPS"

### 4.4 SSL / HTTPS
Vercel provisions a Let's Encrypt certificate automatically within minutes of DNS propagation. No manual steps needed.

### 4.5 DNS Propagation
- Typically takes **15 minutes to 2 hours**
- Check at: `https://dnschecker.org`
- Your site will be live at `https://kanavsingla.fyi` once propagated

---

## Part 5 — Complete Phase Checklist

### Phase 0 — Content Prep *(before anything else)*
- [ ] Write positioning statement (1 sentence)
- [ ] Write bio (2–3 sentences)
- [ ] Fill quick stats (years coding, projects count, key metric)
- [ ] Fill `profile.ts` with all personal data, links, email
- [ ] Fill `skills.ts` grouped by category
- [ ] Fill `resume.ts` with education, experience, certifications
- [ ] Export resume as `resume.pdf` → place in `/public/resume.pdf`
- [ ] Place company logos in `/public/logos/`
- [ ] **Populate `projects.ts`:**
  - [ ] List all repos you want to show (owned + contributed) as `owner/repo` strings
  - [ ] Mark `featured: true` on up to 3–4 projects (bento hero cards)
  - [ ] Set `order` for intentional display sequence
  - [ ] For external repos: fill in the `contribution` field (role, highlights, PR links)
- [ ] **For each repo listed in `projects.ts`:**
  - [ ] Write a clear repo description on GitHub (this becomes the card tagline fallback)
  - [ ] Set `homepageUrl` in repo settings if it has a live demo
  - [ ] (Optional) Create `portfolio.json` in root for rich case study content
  - [ ] *(External repos you contributed to: skip the above — use `contribution` in `projects.ts` instead)*
- [ ] Generate GitHub token with `read:user`, `public_repo` scopes

### Phase 1 — Stitch Design *(8 screens)*
- [ ] Screen 1: Tokens + Component Library
- [ ] Screen 2: Nav (3 states)
- [ ] Screen 3: Hero (desktop + mobile)
- [ ] Screen 4: About + Skills
- [ ] Screen 5: Projects Grid + Card States
- [ ] Screen 6: Project Detail Page
- [ ] Screen 7: GitHub Activity + Resume Timeline
- [ ] Screen 8: Contact + Developer Console
- [ ] Export design tokens as CSS custom properties
- [ ] Annotate all interactive states + animations + reduced-motion fallbacks

### Phase 2 — Project Setup
- [ ] Create GitHub repo (`portfolio`)
- [ ] Initialize Vite + React + TypeScript
- [ ] Connect repo to Vercel (auto-deploy on push)
- [ ] Add `GITHUB_TOKEN` to Vercel Environment Variables
- [ ] Set up branch strategy (`main` + `develop`)
- [ ] Add GitHub Actions CI workflow
- [ ] Verify blank deploy reaches Vercel URL
- [ ] Add custom domain + configure DNS
- [ ] Verify HTTPS and SSL certificate active
- [ ] Install dependencies: `framer-motion`, `swr`, `react-router-dom`, `react-helmet-async`, `geist`
- [ ] Set up `globals.css` with CSS tokens from Stitch export

### Phase 3 — Design System (components only, no real content)
- [ ] `Button` component (filled, ghost, icon variants)
- [ ] `Badge` / `Chip` component
- [ ] `Card` component with hover state + glow
- [ ] `Tooltip` component
- [ ] `SkeletonLoader` component
- [ ] Nav component (all 3 states)
- [ ] `prefers-reduced-motion` media query in globals.css

### Phase 4 — Core Sections
- [ ] Hero section (with availability badge, stagger animation)
- [ ] About section (bio + quick stats count-up)
- [ ] Projects grid (bento layout, cards with skeleton loading)
- [ ] Skills section (tabbed categories, pill grid)

### Phase 5 — Secondary Sections
- [ ] Resume timeline (vertical, alternating, download button)
- [ ] GitHub Activity (heatmap, streak, languages — all via `/api/github/stats`)
- [ ] GitHub Projects fetch (pinned + tagged — via `/api/github/projects`)
- [ ] Contact section (email, social links, mailto with pre-filled subjects)
- [ ] Footer

### Phase 6 — Project Detail Pages
- [ ] `/projects/:repoName` route with React Router
- [ ] Dynamic fetch from `/api/github/repo/:owner/:repo`
- [ ] Full case study layout (if `portfolio.json` exists)
- [ ] Auto-generated fallback layout (if no `portfolio.json`)
- [ ] Back navigation

### Phase 7 — Developer Console
- [ ] Terminal overlay component
- [ ] `Cmd+K` / `Ctrl+K` keyboard shortcut
- [ ] Command parser (whoami, projects, skills, contact, resume, sudo hire, clear, help)
- [ ] Command history (↑↓ arrows)
- [ ] Tab autocomplete
- [ ] Typewriter output effect
- [ ] `Esc` to close
- [ ] Easter egg: `sudo hire kanav` → confetti

### Phase 8 — Responsive Pass
- [ ] Mobile nav (hamburger → slide-down)
- [ ] Hero: stack vertically, adjust type scale
- [ ] Projects: single column on mobile
- [ ] About: single column, stats row
- [ ] Resume: single-column timeline on mobile
- [ ] Contact: stacked layout
- [ ] Terminal: full-screen on mobile

### Phase 9 — Accessibility + Performance QA
- [ ] All interactive elements have `:focus-visible` outlines
- [ ] Keyboard navigation works end-to-end (Tab, Enter, Escape)
- [ ] `prefers-reduced-motion` verified — all animations disabled
- [ ] All images have `alt` text
- [ ] Color contrast ≥ 4.5:1 for body text
- [ ] Run Lighthouse: target **95+** on all four metrics
- [ ] Test on real mobile device (not just DevTools)
- [ ] Check GitHub API error states (what happens if API is down)
- [ ] Validate all `portfolio.json` files parse correctly

### Phase 10 — Launch
- [ ] Final Lighthouse audit on production URL
- [ ] Verify custom domain + HTTPS
- [ ] Verify Vercel Analytics is recording visits
- [ ] Check `og:image` renders correctly (use `opengraph.xyz` to preview)
- [ ] Submit URL to Google Search Console
- [ ] Share on LinkedIn, Twitter/X, GitHub profile README

---

## Part 6 — Post-Launch: Keeping It Current (Zero Effort)

### Adding a new project in the future:
1. Build the project and push to GitHub as usual
2. Add the `portfolio` topic to the repo on GitHub
3. Set the `homepageUrl` in repo settings (if it has a live demo)
4. Write a good repo description
5. *(Optional)* Add `portfolio.json` for a rich case study
6. **Done — it appears on your portfolio automatically within 1 hour** (cache TTL)

### Updating your resume:
1. Open `src/data/resume.ts`
2. Add the new entry
3. Push to `main`
4. Vercel redeploys in ~30 seconds

### Updating the resume PDF:
1. Export new PDF
2. Replace `/public/resume.pdf`
3. Push to `main`
4. Done — same URL, new file

### Changing availability status:
1. Open `src/data/profile.ts`
2. Toggle `availability: true/false`
3. Push — badge appears/disappears on hero

---

## Summary: What "Zero Manual Work" Looks Like

```
You create a new project on GitHub
         ↓
Add topic: portfolio
Set repo description + homepageUrl
         ↓
GitHub API proxy fetches it (cached 1hr)
         ↓
Project card appears automatically in portfolio
         ↓
/projects/repo-name route works automatically
         ↓
(Optional) Add portfolio.json for rich case study
```

> The only time you touch the portfolio codebase for content is `resume.ts`, `profile.ts`, and `skills.ts` — and those rarely change.

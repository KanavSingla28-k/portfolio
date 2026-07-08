# Launch & Release Checklist

This document serves as the final QA checklist before pushing the portfolio to production.

## 1. Responsive & Layout QA
- [x] Tested at 320px, 375px, 390px, 430px (Mobile)
- [x] Tested at 768px, 1024px (Tablet)
- [x] Tested at 1280px, 1440px, 1920px (Desktop)
- [x] Hero text wraps properly on small screens
- [x] Navigation hamburger menu functions without overflow
- [x] Project cards collapse to single column on mobile
- [x] Footer spacing and alignment look clean

## 2. SEO & Metadata
- [x] Canonical URL is set
- [x] `sitemap.xml` exists
- [x] `robots.txt` exists
- [x] Meta title and description are set
- [x] Open Graph (OG) image generated and linked
- [x] Favicons and `manifest.webmanifest` configured

## 3. Performance
- [x] `font-display: swap` used for typography
- [x] Bundle visualizer run to ensure no massive dependencies
- [x] Vercel Speed Insights integrated
- [x] Lighthouse target scores (≥95 Perf, 100 A11y, 100 SEO) achievable

## 4. Accessibility (a11y)
- [x] Skip-to-content link exists and works
- [x] Visible focus rings (`:focus-visible`) styled globally
- [x] Keyboard-only navigation works seamlessly
- [x] Support for `prefers-reduced-motion`

## 5. Reliability & API
- [x] React Error Boundary catches fatal crashes
- [x] Custom 404 (`NotFound.tsx`) page exists
- [x] API routes (`/api/github/projects`, `/api/github/stats`) validate payload with Zod
- [x] Caching headers (`stale-while-revalidate`) implemented

## 6. Deployment Verification (Post-Launch)
- [ ] HTTPS works correctly on custom domain
- [ ] Domain redirects (www to non-www) function properly
- [ ] Vercel Serverless Functions execute without errors
- [ ] GitHub data loads in production
- [ ] Resume downloads correctly
- [ ] No hydration warnings or console errors in production

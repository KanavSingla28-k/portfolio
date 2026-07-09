---
name: Obsidian Precision
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#cebdff'
  on-secondary: '#381385'
  secondary-container: '#4f319c'
  on-secondary-container: '#bea8ff'
  tertiary: '#ffb784'
  on-tertiary: '#4f2500'
  tertiary-container: '#a15100'
  on-tertiary-container: '#ffe0cd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#21005e'
  on-secondary-fixed-variant: '#4f319c'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
  bg-surface: '#111113'
  bg-elevated: '#1a1a1d'
  bg-overlay: rgba(9, 9, 11, 0.85)
  text-primary: '#fafafa'
  text-secondary: '#a1a1aa'
  text-muted: '#7d7d87'
  border-whisper: rgba(255, 255, 255, 0.06)
  border-hover: rgba(255, 255, 255, 0.12)
  accent-glow: rgba(124, 58, 237, 0.20)
  accent-bg: rgba(124, 58, 237, 0.08)
  success: '#22c55e'
  danger: '#ef4444'
typography:
  hero-heading:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  hero-heading-mobile:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  section-heading:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  card-title:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
  stat-display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1'
  body-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.6'
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.7'
  label-mono:
    fontFamily: Geist Mono
    fontSize: 11.5px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  max-width: 1200px
---

## Brand & Style

The design system embodies a **Technical and Obsessive** personality, prioritizing "proof of craft" through meticulous detail and a developer-centric aesthetic. It targets a sophisticated technical audience, evoking feelings of high-end performance, precision, and architectural rigor—reminiscent of professional tools like Linear or Vercel.

The visual style is a fusion of **Minimalism** and **Modern Corporate**, utilizing heavy whitespace and a strictly controlled dark-mode palette. It relies on "whisper borders" (ultra-low opacity) and tonal layering rather than traditional drop shadows to create depth. Visual interest is generated through negative space, high-density metadata, and subtle interactive glows that reward user exploration without distracting from the content.

## Colors

This design system operates exclusively in **dark mode**. The palette is built on a 3-tier architectural stack:
- **Base (#09090b):** Used for the primary page background.
- **Surface (#111113):** Used for primary containers and project cards.
- **Elevated (#1a1a1d):** Used for interactive states and metadata backgrounds.

The **Violet (#7C3AED)** accent is applied with restraint to highlight key actions and technical badges. A subtle "accent-glow" (20% opacity) is reserved for radial gradients on hover. Accessibility is maintained through high-contrast text tokens, ensuring all content meets AA/AAA standards against the obsidian backgrounds.

## Typography

The system utilizes a tri-font strategy to separate intent:
1. **Geist (Display):** Used for all structural headings and data visualizations. It features a tight letter-spacing for a modern, compressed look.
2. **Inter (Body):** Used for all long-form reading and descriptive text, providing high legibility at 16px with a generous 1.7 line height.
3. **Geist Mono (Technical):** Used for metadata, badges, and terminal-style interactions.

**Fluid Scaling:** Hero headings use a fluid calculation `clamp(3rem, 8vw, 5rem)` to adapt seamlessly between mobile and large displays. Secondary body text also scales fluidly to maintain visual balance.

## Layout & Spacing

This design system is built on a **4px base grid**. Layouts follow a fluid-responsive model within a **1200px max-width** container.

- **Horizontal Gutter:** Uses `clamp(16px, 5vw, 48px)` to ensure safe margins across all device sizes.
- **Grid Strategy:** Stats and skill sections utilize `auto-fit` CSS grids to naturally reflow based on screen width without explicit breakpoints. 
- **Vertical Rhythm:** Sections are separated by 64px (mobile) to 96px (desktop) vertical padding.
- **Card Padding:** Project cards use a standard 32px (xl) internal padding to maintain high-density information without feeling cluttered.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Whisper Borders**. Shadows are avoided in their traditional heavy form, replaced by sophisticated light-based interactions:

- **Surface Tiers:** Backgrounds transition from Base (#09090b) to Surface (#111113) for containers.
- **Whisper Borders:** 1px solid lines with `rgba(255, 255, 255, 0.06)` define boundaries. These borders double in opacity to `0.12` during hover states.
- **Radial Glow:** Interactive elements (cards) utilize a `::before` pseudo-element with a radial gradient of `rgba(124, 58, 237, 0.20)` that follows the cursor or centers on hover.
- **Glassmorphism:** Navigation and overlays use the `bg-overlay` token paired with a `16px backdrop-filter` blur to maintain context.
- **Performance Shadows:** For critical elevation, a static `0 4px 24px rgba(0, 0, 0, 0.4)` shadow is applied to an `::after` layer with opacity transitions.

## Shapes

The shape language is structured to differentiate between functional roles:
- **Project Cards & Section Containers (14px):** Soft enough to feel modern but structured enough to feel professional.
- **Buttons & Input Fields (10px):** Distinctive enough to identify as interactive.
- **Badges & Small Indicators (6px):** Sharp and technical.
- **Availability Pills (Full/9999px):** Used exclusively for status indicators like "Available for Hire."

Borders are strictly 1px. No heavy strokes are permitted.

## Components

### Buttons
- **Primary:** Background `primary_color_hex` (#7C3AED), text `text-primary`. 10px radius.
- **Ghost:** No background, `border-whisper` stroke, `text-secondary`. On hover, border becomes `border-hover` and text becomes `text-primary`.

### Cards (Project Cards)
- **Background:** `bg-surface` (#111113).
- **Border:** `border-whisper`.
- **Interaction:** On hover, apply `accent-glow` radial gradient and trigger the **RippleReveal** clip-path animation (scaling from 0% to 150%).
- **Aspect Ratio:** All project media must maintain a 16:9 ratio.

### Tech Badges
- **Background:** `accent-bg` (8% opacity violet).
- **Text:** `label-mono` typography in `text-secondary`.
- **Radius:** 6px.

### Inputs & Terminal
- **Fields:** 10px radius, `bg-surface` background, `border-whisper`.
- **Terminal (Cmd+K):** Uses `bg-overlay` with a 16px blur, `z-index: 90`, and `Geist Mono` typography for all input and results.

### Motion
All transitions must use `--motion-ease` (`cubic-bezier(0.16, 1, 0.3, 1)`):
- **Fast (150ms):** Hover states, checkbox toggles.
- **Normal (250ms):** Modal transitions, tab switching.
- **Slow (400ms):** Page entry, hero section stagger (0.15s delay).
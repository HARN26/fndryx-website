# FNDRYx — Technical Reference

## Site Overview
Next.js marketing site for FNDRYx.io — "The capital-readiness exchange" for founders and capital providers. Migrated from Squarespace and live in production at https://fndryx.io as of April 24, 2026.

## Technical Details
- **Stack:** Next.js 16 + Tailwind CSS v4 + TypeScript
- **GitHub repo:** HARN26/fndryx-website
- **Local path:** `C:\Users\Kevin\OneDrive\Desktop\fndryx-website`
- **Hosting:** Vercel (auto-deploys on git push to main)
- **Production URL:** https://fndryx.io (canonical)
- **Vercel preview:** https://fndryx-website-brpv.vercel.app
- **Vercel project name:** `fndryx-website-brpv` (the `fndryx-website` project in Vercel is empty/unused — safe to delete)
- **Node version:** 20+
- **Package manager:** npm

## External Services

### Formspree (form submission storage + notification emails to Kevin)
- **Dashboard:** https://formspree.io/forms
- **Form name:** "Founder Forge Access Request"
- **Endpoint env var:** `FORMSPREE_ENDPOINT` (server-only, no `NEXT_PUBLIC_` prefix)
- Receives forwarded submissions from `/api/founder-forge` server-side

### Resend (transactional emails to submitters)
- **Dashboard:** https://resend.com
- **Verified domain:** fndryx.io
- **API key env var:** `RESEND_API_KEY`
- **Sender:** `FNDRYx <forge@fndryx.io>` with Reply-To `forge@fndryx.io`
- Sends role-specific confirmation emails (Founder vs Capital Provider templates)

### Vercel (hosting)
- **Project name:** fndryx-website-brpv
- **Production domain:** fndryx.io (canonical) — www.fndryx.io 307s to apex
- **Preview URL:** fndryx-website-brpv.vercel.app
- **DNS records at Squarespace registrar:**
  - A `@` → `216.150.1.1`
  - CNAME `www` → `3333cb27a330f94e.vercel-dns-016.com`
- **Records to never touch at Squarespace:** Resend DKIM (`resend._domainkey`), Resend SPF (`send` TXT), Resend bounce MX (`send` MX), `_dmarc`, Google Workspace MX, Google site verification, vercel-dns-017.com CNAMEs (other Vercel apps)

### GitHub (version control)
- **Repo:** https://github.com/HARN26/fndryx-website
- **Default branch:** main

## Site Map

### Pages and API routes (src/app/)
```
src/app/
├── page.tsx                              # Homepage
├── layout.tsx                            # Root layout, font variables, global metadata, JSON-LD, RSS discovery, skip link
├── globals.css                           # Tailwind v4 @theme tokens + brand defaults
├── not-found.tsx                         # "Signal lost." 404 page
├── opengraph-image.tsx                   # Site-wide OG image (1200×630, ImageResponse)
├── twitter-image.tsx                     # Re-exports the OG image for Twitter cards
├── icon.tsx                              # 32×32 favicon (italic Playfair x on steel-900)
├── apple-icon.tsx                        # 180×180 Apple touch icon (full FNDRYx logo)
├── sitemap.ts                            # Dynamic sitemap (homepage + /blog + per-post URLs)
├── robots.ts                             # robots.txt
├── api/
│   └── founder-forge/
│       └── route.ts                      # POST: validate → Formspree forward → Resend email
├── feed.xml/
│   └── route.ts                          # RSS 2.0 feed (revalidate 3600s)
├── blog/
│   ├── page.tsx                          # Journal listing with cards + Subscribe via RSS link
│   └── [slug]/
│       ├── page.tsx                      # Individual post with brand-styled MDX prose
│       └── opengraph-image.tsx           # Per-post OG image (1200×630)
└── _fonts/                               # (Internal — fontsource WOFFs are in node_modules; this dir is reserved for any future bundled fonts)
```

### Content (src/content/)
```
src/content/
└── blog/
    └── [slug].mdx          # Blog posts as MDX files with frontmatter
```

### Components (src/components/)
- `Logo.tsx` — Reusable styled logo. Props: `size` (sm/md/lg/xl OR responsive object `{ base, md?, lg? }`), `variant` (dark/light)
- `Button.tsx` — Brand-spec button. Variants: primary (fire gradient + glow), secondary (steel-700), outline, ghost. **Default `type="button"`** (must opt into submit explicitly)
- `Nav.tsx` — Sticky nav with scroll-aware backdrop, Journal link (md+ only), responsive CTA label
- `Footer.tsx` — Centered logo + tagline + Journal link + fndryx.io link + LinkedIn icon link (inline SVG, not lucide) + copyright
- `Hero.tsx` — Client component (extracted from page.tsx during Phase 5). Homepage hero with CTA scroll handler
- `Problem.tsx` — Section with italic-orange "filters" treatment, body copy, pull-quote with fire-400 left border, "See the solution" link
- `HowItWorks.tsx` — 3-card grid (Assess / Profile / Route) with `aria-hidden` decorative numerals and badge labels
- `Audiences.tsx` — 2-card grid (For Founders / For Capital Providers) with `aria-hidden` decorative typography backgrounds
- `FounderForgeForm.tsx` — Client component, conditional Stage/Type fields based on role, POSTs to `/api/founder-forge`, success state with CheckCircle2 icon, `aria-live` on error and success states
- `blog/MdxComponents.tsx` — Component map for `MDXRemote` covering h2/h3, p, a (with focus ring; external link auto-handling — any href starting with `http://` or `https://` auto-applies `target="_blank"` and `rel="noopener noreferrer"`; internal links stay same-tab), strong, em, lists, blockquote (fire-400 border + italic Playfair), inline code, pre, hr, img

### Shared Libraries (src/lib/)
- `design-tokens.ts` — Colors, fonts, spacing, type scales
- `blog.ts` — MDX reading / parsing utilities

### Public Assets (public/)
```
public/
├── images/
│   ├── blog/               # Blog post cover images
│   └── [other site images]
├── favicon.ico
└── logo.svg
```

## Design Tokens

All tokens live in **two places** that stay in sync:

1. **`src/app/globals.css`** — Tailwind v4 `@theme` directive defines the tokens as CSS custom properties and generates the utility classes (`bg-steel-900`, `text-fire-400`, `font-display`, etc.). This is the source of truth for Tailwind utilities.
2. **`src/lib/design-tokens.ts`** — JS-side export of the same values for use in TypeScript/React when you need the raw hex (e.g., inline styles, dynamic CSS variables, charting libraries).

Tailwind v4 has no `tailwind.config.ts` — all theme configuration is in `globals.css` via `@theme`. When adding new tokens, update both files.

The **FNDRYx Brand System guide** HTML file is the canonical visual source — consult it when extending tokens.

### Colors

#### Steel (Forge Steel) — dominant foundation
| Token | Hex |
|-------|-----|
| steel-900 | `#0f172a` (main bg) |
| steel-800 | `#1e293b` (elevated surfaces) |
| steel-700 | `#334155` (borders, secondary buttons) |
| steel-600 | `#475569` |
| steel-500 | `#64748b` |
| steel-400 | `#94a3b8` (muted text) |
| steel-300 | `#cbd5e1` |
| steel-200 | `#e2e8f0` (body text) |
| steel-100 | `#f1f5f9` (headings) |

#### Fire (Forge Fire) — accent only
| Token | Hex |
|-------|-----|
| fire-500 | `#ea580c` |
| fire-400 | `#f97316` |
| fire-300 | `#fb923c` |
| fire-glow | `rgba(249, 115, 22, 0.4)` |

#### Brass (Foundry Brass) — premium moments only
| Token | Hex |
|-------|-----|
| brass-500 | `#b45309` |
| brass-400 | `#d97706` |
| brass-300 | `#fbbf24` |
| brass-glow | `rgba(251, 191, 36, 0.3)` |

#### Semantic
- success `#059669`
- warning `#d97706`
- error `#dc2626`

### Typography
All three fonts loaded via `next/font/google`:

- **Syne** (display) — weights 400, 500, 600, 700, 800. CSS var `--font-display`.
- **DM Sans** (body) — weights 400, 500, 600, 700. CSS var `--font-body`.
- **Playfair Display** (accent italic) — weights 400, 600 italic. CSS var `--font-serif`.

### Type Scale
| Level | Size | Weight |
|-------|------|--------|
| Display | 48px | 800 |
| H1 | 36px | 700 |
| H2 | 28px | 700 |
| H3 | 20px | 600 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Caption | 12px | 500 (uppercase, tracking-wide) |

### Spacing
Tailwind defaults unless a custom scale becomes necessary.

## Environment Variables

### Local (`.env.local` — gitignored)
```
FORMSPREE_ENDPOINT=https://formspree.io/f/[your-form-id]
RESEND_API_KEY=re_xxxxxxxx
```

### Vercel (set in dashboard)
Same vars as `.env.local`. Set under Vercel project → Settings → Environment Variables → all three (Production + Preview + Development).

**Important:** Vercel marks both vars as "Sensitive" — values are write-only. Don't open and re-save without re-entering the value, or you'll overwrite it with empty. After adding/updating env vars, you must redeploy (Deployments tab → topmost → ⋯ → Redeploy with "Use existing Build Cache" unchecked) for changes to apply.

## Deployment Flow
```powershell
cd C:\Users\Kevin\OneDrive\Desktop\fndryx-website
git add .
git commit -m "description"
git push
```
Vercel auto-deploys within ~1 minute.

## Form Submission Pipeline

```
[Browser]
  → POST /api/founder-forge (JSON body: role, fullName, email, company, stage?, type?)
       ↓
[Vercel Serverless Function: src/app/api/founder-forge/route.ts]
  ├─ Validate env vars (FORMSPREE_ENDPOINT, RESEND_API_KEY) → 500 if missing
  ├─ Validate body (required fields, email format, role enum) → 400 if invalid
  ├─ Forward to Formspree (best-effort, logs error but doesn't block)
  └─ Send Resend email with role-specific template
       ↓
[Submitter inbox]  ← receives confirmation email
[Kevin inbox]      ← receives Formspree notification
[Formspree dash]   ← receives submission record
```

If `delivered@resend.dev` is used as the test recipient, Resend treats it as a confirmed delivery without actually sending — useful for end-to-end pipeline verification without inbox spam.

## Blog Pipeline (live)

**Library:** `next-mdx-remote/rsc` + `gray-matter`

**Posts:** `src/content/blog/[slug].mdx` with YAML frontmatter:
```yaml
---
title: "Post Title"
slug: "post-slug"          # must match filename
date: "2026-04-25"
author: "FNDRYx"
excerpt: "1-2 sentence summary."
coverImage: "/images/blog/cover.jpg"  # optional
tags: ["tag1", "tag2"]                # optional
draft: false
---
```

**Author convention:** All FNDRYx-authored posts use `author: "FNDRYx"` — the post template detects this exact string and renders the inline brand wordmark treatment in the byline. Any other author value falls back to plain text (reserved for future guest authors).

**`src/lib/blog.ts`** exports three server-side functions, all wrapped in React's `cache()`:
- `getAllPosts()` — reads all `.mdx` files, parses frontmatter, filters drafts, sorts by date desc
- `getPostBySlug(slug)` — returns one post or null
- `getAllSlugs()` — used by `generateStaticParams`

**Per-post OG image:** `src/app/blog/[slug]/opengraph-image.tsx` generates a 1200×630 PNG per post at build time. Layout differs from the root OG: left-aligned vertical stack with "FNDRYx — Journal" wordmark up top, post title in Syne 800 (auto-shrinks from 64px → 48px when title > 60 chars), date at bottom in DM Sans tracked-wide.

**Fonts in OG images:** loaded from `node_modules/@fontsource/{syne,playfair-display,dm-sans}/files/*.woff` via `new URL(..., import.meta.url)` so Turbopack can statically analyze the path (no `process.cwd()` NFT warning).

**RSS feed:** `src/app/feed.xml/route.ts` — RSS 2.0 with atom self-link, `revalidate = 3600` (1-hour cache). Auto-discovery via `<link rel="alternate" type="application/rss+xml">` in root layout.

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
- **Vercel project name:** `fndryx-website-brpv` — the only Vercel project deploying this repo; serves fndryx.io and www.fndryx.io. A duplicate `fndryx-website` project (also git-connected, building every push to `.vercel.app` only) was deleted 2026-10-07. Do not rename `-brpv`: renaming changes its `.vercel.app` URL.
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
- **Sender:** `FNDRYx <forge@fndryx.io>` with Reply-To `kevin@fndryx.io` (moved off `forge@` in Nov 2026 until it is confirmed that replies to `forge@` reach someone)
- Sends one of three role-specific confirmation emails: Founder ("You're on the FNDRYx founder list"), Program and Capital (both "Your FNDRYx inquiry")

### Vercel (hosting)
- **Project name:** fndryx-website-brpv
- **Production domain:** fndryx.io (canonical) — www.fndryx.io 307s to apex
- **Preview URL:** fndryx-website-brpv.vercel.app
- **DNS records at Squarespace registrar:**
  - A `@` → `216.150.1.1`
  - CNAME `www` → `3333cb27a330f94e.vercel-dns-016.com`
- **Records to never touch at Squarespace:** Resend DKIM (`resend._domainkey`), Resend SPF (`send` TXT), Resend bounce MX (`send` MX), `_dmarc`, Google Workspace MX, Google site verification, vercel-dns-017.com CNAMEs (other Vercel apps)

### Vercel Web Analytics (page views)
- **Added:** Nov 2, 2026 (PR 7c, approved by Kevin). Package `@vercel/analytics`, mounted once in `src/app/layout.tsx` through `src/components/SiteAnalytics.tsx`.
- **Turn on / view:** Vercel → project `fndryx-website-brpv` → Analytics. Until it's enabled there, the script is requested but nothing is recorded.
- **No cookies.** Covered by the existing Privacy Policy wording (automatic collection of pages viewed and referrers by service providers, including analytics; Vercel is listed). No policy change needed.
- **Privacy guard (`beforeSend`):** `/unsubscribe` pages are never sent (their URLs carry a personal token), and every other URL is sent without its query string or `#fragment`. Keep this if the component changes.
- Records nothing in local development.

### GitHub (version control)
- **Repo:** https://github.com/HARN26/fndryx-website
- **Default branch:** main

## Site Map

### Pages and API routes (src/app/)
```
src/app/
├── page.tsx                              # Homepage: Hero, FactsRow, Gap, Problem, HowItWorks, WhyItHolds, GrandRapids, WhoItsFor, FounderForgeForm
├── layout.tsx                            # Root layout, font variables, global metadata, JSON-LD, RSS discovery, skip link
├── globals.css                           # Tailwind v4 @theme tokens + brand defaults
├── not-found.tsx                         # "Signal lost." 404 page (new style, Nov 2026)
├── opengraph-image.tsx                   # Site-wide share image: official wordmark SVG + "The readiness record for early-stage capital." on navy, Milwaukee pour photo on the right (src/lib/og/)
├── apple-icon.tsx                        # 180×180 home-screen icon and structured-data logo: official wordmark SVG, fitted
├── icon.tsx                              # 32×32 favicon: Playfair italic x (font from @fontsource)
├── twitter-image.tsx                     # Re-exports the OG image for Twitter cards
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
│       ├── page.tsx                      # Individual post — coverImage as visual title (sr-only H1 fallback) when present, else accented text H1; brand-styled MDX prose
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
- `Logo.tsx` — Reusable styled logo. Props: `size` (sm/md/lg/xl OR responsive object `{ base, md?, lg? }`), `variant` (dark/light), `sizeClassName` (font-size classes that override `size`; used for the nav 32px, hero 48–72px and footer 48px wordmarks)
- `Button.tsx` — Brand-spec button. Variants: primary (solid fire-400, steel-900 text, 6px radius, lighter on hover; the `btn-primary` utility), secondary (plain text link, underlined on hover; `text-link`), ghost. Default padding `px-6 py-3.5` unless the caller passes padding. **Default `type="button"`** (must opt into submit explicitly). Links styled as buttons use `className="btn-primary px-… py-…"` directly
- `Nav.tsx` — Server component. Sticky, solid steel-900 background (no scroll listener). Wordmark 32px (28px under 380px wide). From `lg` up: How it works, Grand Rapids, Who it's for, Journal and a "Join the founder list" button. Below `lg`: a short "Join" button plus a `<details>` "Menu" that works without JavaScript and closes on tap. Links live in `NAV_LINKS`. Team removed Nov 2, 2026 (back when the advisors are added)
- `Footer.tsx` — Server component on steel-950. Left: 48px wordmark and "The readiness record for early-stage capital." at 20px; links (How it works, Grand Rapids, Journal, Privacy Policy, LinkedIn with inline SVG mark); contact (kevin@fndryx.io, privacy@fndryx.io). Bottom row: broker-dealer disclaimer, © 2026 FNDRYx, Inc. and the Covington address. The Midwest House "Partner" mark and the Team link were removed Nov 2, 2026
- `Hero.tsx` — Server component. Large FNDRYx wordmark (48px phones, 60px from 640px, 72px from `lg`; `role="img"`, label "FNDRYx") left-aligned above the H1 (Kevin, Nov 2, 2026), then H1 "The readiness record for early-stage capital.", subhead, "Join the founder list" button and a text link. From `lg` up the foundry photo bleeds off the right edge with a navy fade; below `lg` it is a band under the text. Art-directed `<picture>` built with `getImageProps`: the tall `hero-foundry-pour.jpg` for desktop, the wide crop `hero-foundry-pour-wide.jpg` for the phone/tablet band (the band is the phone LCP element, so it must stay light). `fetchPriority="high"`, eager
- `FactsRow.tsx` — One line under the hero between hairlines: the stacked gray Midwest House logo (32px), a thin divider and "Live now with the Midwest House Grand Rapids Summit" linking to the event page (cleared by Ted, Nov 2, 2026). The other two facts were removed Nov 2, 2026. Past tense after the Summit (PR 8)
- `Gap.tsx` — "The gap": 16% / 9% figures, the 28-state line, the US map (`public/images/home/us-map-midwest.svg`) with legend, and the sources footnote
- `SignalTimeline.tsx` — G1 graphic, inline SVG with real text and a screen-reader description. Seven markers and speckles from `lg` up; four markers, no speckles below
- `Problem.tsx` — "The problem" on steel-950: heading, body and the G1 signal timeline
- `HowItWorks.tsx` — "Three steps, then a record." Assess / Report / Check in in three open columns joined by a thin line, then the G2 record strip: 17 bars (one per 21-day check-in), height 38% to 100%, color steel-700 to fire-400 eased by t^0.8
- `GrandRapids.tsx` — "Live now" section (id `grand-rapids`). Photo: The Theater at Bamboo (the Summit venue) with the event details on the projection screen. From `xl` (1280px) the full photo fills the section with a navy fade on the left; below `xl` a closer crop of the stage is a band above the text so the screen stays readable (`<picture>` built with `getImageProps`, lazy). Text contrast over the photo checked at 1280/1440/1920: body ≥5.1:1, headline ≥4.2:1. Attendee note with kevin@fndryx.io. Past tense after the Summit (PR 8), including a past-tense screen
- `SiteAnalytics.tsx` — Client component wrapping Vercel `<Analytics />` with the privacy guard (see External Services)
- `WhoItsFor.tsx` — "One record, three audiences." Founders / Programs and regions / Capital partners in open columns split by hairlines. Program and capital links reload with `?role=` so the form opens on that role. Counsel-cleared data lines (Jake, Nov 2, 2026), with the "groups of five" wording removed by Kevin the same day
- `WhyItHolds.tsx` — "Software can be copied. Time, consent, and discipline can't." On steel-950, right after How it works (it took the removed founder report's place, Nov 2, 2026). Three columns with inline-SVG diagrams: G3 (two rows of 17 ticks), G4 (one founder connected only to the organizations they opted in to), G5 (three stepped bars). Consent line: "Founders decide who sees their record. Nothing with their name on it is shared until they opt in, and they can always see who's following." (matches the Privacy Policy: named sharing is opt-in, founders can see who follows them). "What FNDRYx doesn't do" was removed
- `Team.tsx` — **Not on the site** (removed from the page Nov 2, 2026 until the two advisors are added). Kevin and Patrick (bio approved by Patrick, Nov 2, 2026), square photos at 144px (`public/images/team/`), "Based in Covington, Kentucky." To bring it back: import it in `src/app/page.tsx` and re-add the `/#team` links in Nav and Footer
- `FounderForgeForm.tsx` — Client component for the interest list. Join layout: "Get on the list." and the promise on the left, the form in a panel on the right; no icon library (inline chevron SVG). Section id `join`, with an empty `#founder-forge` anchor kept for old links. Roles: Founder / Program, university or event organizer / Investor or capital partner (values `founder` / `operator` / `capital_provider`, unchanged so `?role=` links still work). Conditional Stage / Organization type / Capital type field by role. Validates on the page first (shared rules in `src/lib/join-form.ts`), focuses the first bad field, shows only plain error messages. Submit label and success message vary by role
- `blog/MdxComponents.tsx` — Component map for `MDXRemote` covering h2/h3, p, a (with focus ring; external link auto-handling — any href starting with `http://` or `https://` auto-applies `target="_blank"` and `rel="noopener noreferrer"`; internal links stay same-tab), strong, em, lists, blockquote (fire-400 border + italic Playfair), inline code, pre, hr, img

### Shared Libraries (src/lib/)
- `design-tokens.ts` — Colors, fonts, spacing, type scales
- `blog.ts` — MDX reading / parsing utilities
- `join-form.ts` — Role list, Stage / Organization type / Capital type lists, `validateJoin()` and the generic error message. Used by both the join form and `/api/founder-forge`, so the page and server check the same rules
- `title-utils.ts` — Parses and strips the orange italic accent syntax in post titles. Exports `parseTitleAccents(title)` (returns ordered segments with `accent` flags for rendering) and `stripTitleAccents(title)` (returns plain text for tab titles, RSS, OG metadata, sr-only H1, and image alt). Authors wrap accent words in single asterisks in the frontmatter `title` field — e.g., `"The Most *Inefficient* Market in America"`.

### Public Assets (public/)
```
public/
├── images/
│   ├── blog/               # Journal cover images
│   ├── campaigns/          # Founder Signal images (kept off the homepage)
│   ├── home/               # Homepage photos, map, Midwest House logo
│   └── team/               # Headshots
```
The Next.js starter SVGs (file, globe, next, vercel, window) were removed in Nov 2026.

### Redirects (next.config.ts)
- `/capital-partners`, `/accelerators` → `/` (307). Their page code was removed in Nov 2026.
- `/raise-right` → `/` (308).
- `/grand-rapids` → `/#grand-rapids` (307), the short link for slides and QR codes. After the Summit (Dec 3, 2026), point it at `/` (PR 8).

## Design System (Nov 2026)

Defined in `src/app/globals.css`; mirrored for reference in `src/lib/design-tokens.ts`.

- **Base styles are in `@layer base`.** Before Nov 2026 the heading rule sat outside any layer and overrode every heading color class (that is why "Assess" rendered white though its code said orange). Now a utility class on a heading wins.
- **New color:** `steel-950` `#0B1222`, the second background for alternating sections and the footer.
- **Type scale utilities:** `text-h1` clamp(2.75rem, 6vw, 5.25rem); `text-h2` clamp(1.875rem, 3.6vw, 3rem); `text-h3` 1.25rem; `text-body` 18px / 1.6; `text-label` 12px; `text-footnote` 13px. Headlines are Syne 700, left-aligned, sentence case. Syne 800 is for the wordmark only.
- **Content width:** `max-w-content` (1200px), 12-column grid.
- **`section-label`:** DM Sans 700, 12px, uppercase, 0.16em tracking, fire-400. Never a label that repeats its heading.
- **`btn-primary`:** solid fire-400, steel-900 text (6.4:1 contrast), 6px radius, hover to fire-300. No gradient, glow, lift or white text.
- **`text-link`:** secondary actions. Steel-100, underlined on hover.
- **Placeholders:** steel-400 (steel-500 fails contrast on navy).
- **Reduced motion:** smooth scrolling turns off when the visitor asks for reduced motion.
- **Tilde:** Syne draws "~" as a dot. Write "About 40", never "~40".

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
Self-hosted with `next/font/local` from the @fontsource packages (the same Google Fonts files), so builds never fetch from Google. Since Nov 2026 (PR 7):

- **Syne** (display) — variable font `@fontsource-variable/syne`, one file covering 400–800. CSS var `--font-display`. Homepage uses 700 and 800 (800 is the wordmark only); the Journal also uses 400 and 600.
- **DM Sans** (body) — variable font `@fontsource-variable/dm-sans` (weight axis). CSS var `--font-body`. Uses 400, 500, 600 (Journal), 700.
- **Playfair Display** (accent) — 400 italic only, `@fontsource/playfair-display`. CSS var `--font-serif`. The wordmark "x" and Journal title accents.
- All three are preloaded: three files, about 92KB. Not preloading caused a 0.12 layout shift when fonts swapped in, and 13 static files had cost about 215KB.
- The static `@fontsource/syne`, `dm-sans` and `playfair-display` packages stay installed because the share images and icons (`ImageResponse`) need .woff files. Nothing fetches fonts from Google any more.
- **Wordmark in generated images:** use `src/lib/og/fndryx-wordmark-dark.svg` (the official asset-pack SVG with FNDRY recolored to steel-100 for dark backgrounds). Rebuilding the mark from fonts in `ImageResponse` let the x collide with the Y.

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

## Image Sources

| File | Source | License |
|---|---|---|
| `public/images/home/hero-foundry-pour.jpg` | "Molten Metal Pouring at Milwaukee Foundry" by Quang Vuong, Pexels, https://www.pexels.com/photo/molten-metal-pouring-at-milwaukee-foundry-29442931/ . Shot Nov 16, 2024 in Milwaukee (Nikon Z 7). Chosen by Kevin Nov 2, 2026. File is 1717×2236: Pexels' 1717×2576 download with the caution tape and bucket cropped off the bottom | Pexels License: free for commercial use, no credit required. The photographer's page lists Topaz Photo AI as editing software (enhancement, not generation) |
| `public/images/home/hero-foundry-pour-wide.jpg` (1717×1060), `src/lib/og/foundry-pour-og.jpg` (520×630) | Crops of the same Pexels photo: the phone/tablet hero band and the share image's photo panel | Same Pexels License |
| `public/images/home/us-map-midwest.svg` | FNDRYx asset pack, Nov 2026 | Our own |
| `public/images/home/grand-rapids-theater.jpg` (1700×860), `grand-rapids-theater-stage.jpg` (800×475 crop) | The Theater at Bamboo, Grand Rapids, supplied by Kevin, Nov 2, 2026. FNDRYx placed a slide on the projection screen (perspective-matched): "Grand Rapids · Dec 2–3 / Midwest House Summit / Founder Track / Powered by FNDRYx". Cropped to remove the stairway and side door; a sliver of stair handrail was retouched out. Replaced the Midwest road photo (deleted) | Cleared by Kevin, Nov 2, 2026; no credit needed |
| `public/images/home/midwest-house-logo-gray.png` | Midwest House logo supplied by Kevin, Nov 2, 2026; recolored to one-color steel-400 (#94A3B8), trimmed, 480×221 | Use cleared by Kevin with Midwest House, Nov 2, 2026. Keep it small (32px tall) and never dominant. Shown in the facts row under the hero and the Grand Rapids section only (removed from the Summit bar, which is gone, and the footer on Nov 2, 2026). The one-line version made in PR 6b was retired in PR 7b |
| `public/images/team/kevin-harnist.jpg` (280px), `patrick-tiettmeyer.jpg` (220px) | FNDRYx asset pack, cropped headshots | Our own. Not shown while Team is off the site; was shown at 144px; send larger files to reach the plan's 160px |

## Automated Checks (GitHub Actions)

Added Nov 2026 (PR 2 of the website plan). Both workflows live in `.github/workflows/`.

### CI (`ci.yml`): every pull request and every push to `main`
1. `npm run lint`
2. `npm run claim-check` (`scripts/claim-check.mjs`)
3. `npm run build`

If any step fails, the pull request shows a red X. Read the failing step's log for the file and line.

### Claim check (`scripts/claim-check.mjs`)
- Scans the homepage, join form, API route and emails, shared Nav/Footer/Button/Logo, metadata and icons. Skips the Journal (`src/components/blog`, `src/app/blog`, `src/content`), Privacy Policy and unsubscribe files.
- Fails on banned words and phrases (free, Forged, Tempering, Hot Iron, quadrant, BR, IR, deterministic, two scores, visible to capital, capital access, twenty-six, validated, proven, predicts, guarantee, marketplace, capital routing, placement) and on never-publish patterns (dollar amounts, 149, Raise Right, roadshow, TAM/SAM/SOM, valuation).
- Allowed exact sentences (the "What FNDRYx doesn't do" lines, "not a placement service", and the founder revenue bands on the form) are listed in `ALLOWED` at the top of the script. Add to it only for wording Kevin approved.
- **Never-name list is private.** The repo is public, so the names are not in the code. CI reads them from the GitHub Actions secret `CLAIM_CHECK_PRIVATE_TERMS` (one term per line) and reports matches as "private term #N", never by name. If the secret is missing, CI still passes and the log says the list wasn't checked.
- Run locally: `npm run claim-check`. To include the private list locally, set the same variable in your shell first.

### Lighthouse (`lighthouse.yml`): every pull request
- Waits for Vercel's preview deployment of the pull request (up to 15 minutes), then runs Lighthouse 13.5.0 on the preview homepage: 3 mobile runs and 1 desktop run (`scripts/lighthouse-report.mjs`).
- Scores and the mobile median appear on the run's Summary page. Full HTML reports are attached as the `lighthouse-reports` artifact (kept 30 days).
- Report only. It never blocks a merge. Score targets apply to the live site.
- **Previews are currently behind Vercel login**, so until the bypass secret below is added, the run is skipped with a warning. The check follows redirects and compares the final address, because Vercel's login page answers HTTP 200 and would otherwise be scored instead of the site. Fix: Vercel → Project → Settings → Deployment Protection → Protection Bypass for Automation → create a secret, then save it in GitHub as `VERCEL_AUTOMATION_BYPASS_SECRET`.

## Form Submission Pipeline

```
[Browser]
  → validateJoin() on the page (src/lib/join-form.ts); stops here with a plain message if anything is missing
  → POST /api/founder-forge (JSON body: role, fullName, email, company, stage? | operatorType? | type?)
       ↓
[Vercel Serverless Function: src/app/api/founder-forge/route.ts]
  ├─ Validate env vars (FORMSPREE_ENDPOINT, RESEND_API_KEY) → 500 + generic message if missing (detail logged only)
  ├─ validateJoin() again: required fields, email format, role, and stage / organization type / capital type against the lists → 400 + plain message and field name
  ├─ Forward to Formspree (best-effort, logs error but doesn't block)
  └─ Send Resend email with role-specific template (Reply-To kevin@fndryx.io). Any failure → 500 + generic message; technical detail goes to the Vercel function log only
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
title: "Post Title with *Accent* Word"          # wrap word(s) in single asterisks for orange italic accent
slug: "post-slug"          # must match filename
date: "2026-04-25"
author: "FNDRYx"
excerpt: "1-2 sentence summary."
coverImage: "/images/blog/cover.jpg"  # optional
tags: ["tag1", "tag2"]                # optional
draft: false
---
```

**Title accent convention:** Every post title should have at least one accent word wrapped in single asterisks (e.g., `"The Most *Inefficient* Market in America"`). The `parseTitleAccents` utility in `src/lib/title-utils.ts` renders wrapped segments in Playfair Display Italic 400 + `fire-400`, matching the FNDRYx brand "x" treatment. Asterisks are stripped from any plain-text context (browser tab title, RSS feed, OG metadata, image alt, sr-only H1) via `stripTitleAccents`. Wired into the post page H1, `/blog` listing cards, per-post OG image (Satori inline styles), `feed.xml`, and `generateMetadata`. Multi-word accents and multiple separate accents per title are both supported.

**Cover-as-title convention:** When a post's frontmatter includes a `coverImage`, `src/app/blog/[slug]/page.tsx` renders that image as the visual title (with `next/image` priority, `border border-steel-700`, `rounded-lg`) and emits an `<h1 className="sr-only">{stripTitleAccents(title)}</h1>` for SEO and screen reader navigation. Posts without a `coverImage` (e.g., the Welcome post) fall back to a visible text H1 using the accent render. On the `/blog` listing, cards without a `coverImage` get `text-center` applied to their description paragraph; cards with one keep left-aligned descriptions.

**Author convention:** All FNDRYx-authored posts use `author: "FNDRYx"` — the post template detects this exact string and renders the inline brand wordmark treatment in the byline. Any other author value falls back to plain text (reserved for future guest authors).

**`src/lib/blog.ts`** exports three server-side functions, all wrapped in React's `cache()`:
- `getAllPosts()` — reads all `.mdx` files, parses frontmatter, filters drafts, sorts by date desc
- `getPostBySlug(slug)` — returns one post or null
- `getAllSlugs()` — used by `generateStaticParams`

**Per-post OG image:** `src/app/blog/[slug]/opengraph-image.tsx` generates a 1200×630 PNG per post at build time. Layout differs from the root OG: left-aligned vertical stack with "FNDRYx — Journal" wordmark up top, post title in Syne 800 (auto-shrinks from 64px → 48px when title > 60 chars), date at bottom in DM Sans tracked-wide. Title segments wrapped in `*...*` render via `parseTitleAccents` with Satori-friendly inline styles (`fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 400, color: '#f97316'`); the italic Playfair WOFF is loaded explicitly via `@fontsource/playfair-display/files` using `new URL(..., import.meta.url)` for Turbopack-safe resolution. **Layout (fixed Nov 2, 2026, PR 7d):** the title is laid out word by word (any run without a space is one word, so "FNDRY" + accent "x" never splits); laying out whole segments let Satori drop the spaces beside accent words and wrap the x alone. "≠" isn't in Syne or DM Sans, so it's drawn as an SVG shape (`NotEqualSign`); any other symbol a title uses must be checked against the fonts. The top label is "FNDRY" + Playfair italic "x" + "— JOURNAL" (no longer uppercased into a sans-serif X).

**Fonts in OG images:** loaded from `node_modules/@fontsource/{syne,playfair-display,dm-sans}/files/*.woff` via `new URL(..., import.meta.url)` so Turbopack can statically analyze the path (no `process.cwd()` NFT warning).

**RSS feed:** `src/app/feed.xml/route.ts` — RSS 2.0 with atom self-link, `revalidate = 3600` (1-hour cache). Auto-discovery via `<link rel="alternate" type="application/rss+xml">` in root layout.

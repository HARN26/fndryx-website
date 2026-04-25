# FNDRYx Website Update History

## Migration from Squarespace → Next.js + Vercel

**Started:** April 24, 2026
**Production cutover completed:** April 24, 2026
**Status:** Live at https://fndryx.io

### Phase 1: Repo + Scaffold ✅
- [x] Created GitHub repo `HARN26/fndryx-website`
- [x] Scaffolded Next.js 16 + TypeScript + Tailwind v4 project locally at `C:\Users\Kevin\OneDrive\Desktop\fndryx-website`
- [x] Initial git commit and push to GitHub
- [x] Connected Vercel project `fndryx-website-brpv` to repo for auto-deploys
- [x] Verified preview URL at `fndryx-website-brpv.vercel.app`

### Phase 2: Form Service Setup ✅
- [x] Formspree account, "Founder Forge Access Request" form created
- [x] Resend account, fndryx.io domain verified, API key generated
- [x] Both `FORMSPREE_ENDPOINT` and `RESEND_API_KEY` set in `.env.local` and Vercel (all three environments)
- [x] Confirmation emails configured for both `Founder` and `Capital Provider` roles

### Phase 3: Brand System + Layout Shell ✅
- [x] Loaded Syne (display), DM Sans (body), Playfair Display (italic accent) via `next/font/google`
- [x] Defined Steel / Fire / Brass color palettes per FNDRYx Brand System v2.0
- [x] Set up Tailwind v4 `@theme` tokens in `globals.css`
- [x] Built Logo, Button, Nav, Footer components
- [x] Built Hero section
- Phase 3.5–3.7: spacing polish, headline sizing, footer logo scaling

### Phase 4: Page Build + Form Wiring ✅
- [x] Problem section with italic-orange "filters" treatment and pull-quote
- [x] How It Works 3-card grid with oversized faded numerals
- [x] Audiences 2-card grid with decorative typography
- [x] Founder Forge form with conditional Stage/Type fields by role
- [x] **Phase 4C migration:** moved from direct-to-Formspree to a Vercel serverless function at `/api/founder-forge` that forwards to Formspree AND sends role-specific Resend confirmation emails

### Phase 5: QA, SEO, A11y, Performance ✅
- [x] **5.1:** Metadata API (title template, descriptions, OG, Twitter cards), site-wide OG image route via ImageResponse, branded favicons (icon.tsx + apple-icon.tsx), removed default `favicon.ico` so branded icon wins
- [x] **5.1.5:** OG fonts loaded as static WOFFs from `@fontsource/*` packages (variable fonts crashed Satori; static per-weight WOFFs render reliably). Description tightened to 131 chars.
- [x] **5.2:** Dynamic sitemap, robots.txt, JSON-LD Organization + WebSite schema with verified LinkedIn URL
- [x] **5.3:** Custom 404 page (`not-found.tsx`) with brand-styled "Signal lost." treatment, reuses Nav + Footer
- [x] **5.4:** Mobile responsiveness pass — Hero logo responsive sizing, Nav button responsive label, Problem H2 mobile sizing, badge tilde fix
- [x] **5.5:** Accessibility — focus rings on all 14 interactive elements, aria-live on form error/success, skip-to-content link, contrast bumps (steel-600 → steel-400 on footer copyright, steel-500 → steel-400 on form subtext), Hero CTA wired with onClick (was broken — no handler), Button defaults to `type="button"`, decorative numerals `aria-hidden`, form inputs got proper focus-visible rings
- [x] **5.6:** Build verification (660KB / 210KB gzipped, no warnings, Lighthouse Mobile 92/96/100/100, Desktop 100/96/100/100), Turbopack NFT warning fixed via `new URL(..., import.meta.url)`, `/blog` removed from sitemap until Phase 6 ships

### Phase 6: MDX Blog Infrastructure ✅
- [x] **6.1:** `src/lib/blog.ts` with `getAllPosts`, `getPostBySlug`, `getAllSlugs` (all React-cached). Seed post `welcome-to-the-fndryx-journal.mdx`
- [x] **6.2:** `/blog` listing page with brand-card grid, empty state, dynamic sitemap re-includes `/blog` + per-post URLs
- [x] **6.3:** `/blog/[slug]` post page with `generateStaticParams`, `generateMetadata` (article OG type with publishedTime + authors), MDX prose styling for h2/h3/p/a/strong/em/lists/blockquote/code/pre/hr/img with brand tokens
- [x] **6.4:** Journal link in Nav (md+ only) and Footer

### Phase 6.5: Per-post OG + RSS ✅
- [x] Per-post OG image route at `src/app/blog/[slug]/opengraph-image.tsx` — left-aligned brand-distinct treatment (FNDRYx — Journal wordmark + Syne title + DM Sans date)
- [x] RSS 2.0 feed at `/feed.xml` with atom self-link, CDATA-wrapped excerpts, RFC 822 dates, 1-hour revalidate
- [x] `<link rel="alternate" type="application/rss+xml">` discovery in root layout
- [x] "Subscribe via RSS →" inline link on `/blog` hero with Rss icon

### Phase 7: DNS Cutover from Squarespace ✅
- [x] Domains added in Vercel project (`fndryx.io` canonical, `www` 307→apex)
- [x] Squarespace Defaults preset deleted at registrar
- [x] New DNS records added at Squarespace:
  - A `@` → `216.150.1.1`
  - CNAME `www` → `3333cb27a330f94e.vercel-dns-016.com`
- [x] Critical TXT/MX records preserved: Resend DKIM (`resend._domainkey`), Resend SPF (`send` TXT), Resend bounce MX (`send` MX), `_dmarc`, Google Workspace MX, Google site verification, vercel-dns-017.com CNAMEs (other Vercel apps)
- [x] SSL provisioned automatically by Vercel
- [x] Verified production at https://fndryx.io: homepage, /blog, /blog/welcome-to-the-fndryx-journal, /feed.xml, www → apex redirect

---

## Post-Launch Punch List

- [ ] Submit `https://fndryx.io/sitemap.xml` to Google Search Console (verify ownership via DNS TXT record at Squarespace)
- [ ] Update LinkedIn FNDRYx company page → website URL = `https://fndryx.io`
- [ ] After 24–48hrs of stability, cancel Squarespace **hosting** subscription (registration stays — Squarespace remains the registrar)
- [ ] Delete the lingering empty `fndryx-website` (non-brpv) Vercel project to avoid future confusion

## Deferred Items (intentional)

- [ ] **White-on-orange button contrast** (Phase 5 item 7) — fails WCAG AA (~2.80:1–3.56:1). Brand-level decision pending. Lighthouse doesn't flag it (gradient backgrounds aren't reliably auditable). Three viable fixes when revisited: darken gradient, add subtle text-shadow, or bump weight/size to qualify as "large text" at 3:1.
- [ ] **Decorative-text axe false positives** (Lighthouse a11y 96 instead of 100) — the oversized `text-steel-700` "01"/"02"/"03" numerals and "FNDRY"/"x" backgrounds in Audiences cards are `aria-hidden` but axe-core doesn't exempt them from contrast checks. Real-world a11y impact is zero. Future cleanup: move decoration to CSS `::before` content or SVG.
- [ ] **Mobile Performance LCP 3.2s** (Lighthouse Mobile 92) — dominated by CPU-throttled font loading. Fine for a marketing site. Self-hosting Syne/DM Sans/Playfair locally would push it toward 100 if ever desired.
- [ ] **Tag index pages** (`/blog/tag/[tag]`) — only worth building once 5+ posts exist
- [ ] **Reading time / word count** on post cards and headers — small UX polish
- [ ] **Code-block syntax highlighting** via `@shikijs/rehype` — only if technical posts start being published
- [ ] **Per-post analytics** (Plausible/Umami, not GA) — punted until launch dust settles
- [ ] **Draft preview route** for sharing in-progress posts with reviewers
- [ ] **`lucide-react` version pin** — currently on unusual `^1.x` line (historical packages live on `0.x`). Worth pinning to a known-good version at next dep audit.

---

## Key Decisions and Lessons Learned

**Tailwind v4 has no `tailwind.config.ts`** — theme tokens live in CSS via `@theme` in `globals.css`. The original Phase 3 prompt assumed v3 config; Claude Code caught and adapted.

**Form architecture pivoted mid-build.** Initially direct-to-Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`). Migrated to a serverless API route + Resend confirmation emails to (a) keep Formspree URL server-side, (b) send role-specific transactional emails on a verified domain, and (c) future-proof for Apollo CRM integration.

**Vercel "Sensitive" env vars are write-only.** Opening an env var in the dashboard shows a placeholder, not the saved value. Saving on top of the placeholder overwrites the real value with empty. Don't reopen sensitive vars unless re-entering the value. After adding/updating, redeploy with "Use existing Build Cache" unchecked.

**ImageResponse needs static-weight WOFFs, not variable fonts.** Variable-font TTFs crash Satori with `Cannot read properties of undefined (reading '261')`. Static per-weight WOFFs from `@fontsource/*` packages render reliably.

**Turbopack NFT warning** on `process.cwd()` — fixed by switching to `new URL(..., import.meta.url)` for static path resolution. Now the canonical pattern for any server-side asset reads.

**Path depth in OG image routes matters.** Root OG at `src/app/opengraph-image.tsx` uses `../../node_modules/...`. Per-post OG at `src/app/blog/[slug]/opengraph-image.tsx` is one level deeper, so `../../../../node_modules/...`. Easy to copy-paste wrong.

**`lucide-react@^1.x` is unusual.** Package historically published on `0.x`. The `1.x` install resolved and rendered fine, but worth pinning at next dep audit.

**Always commit + push at the end of each phase.** Phase 6.5 was reported as "verified locally" but never pushed for ~30 minutes — production was serving Phase 6 while local had 6.5. Caught when `/feed.xml` and `/blog/.../opengraph-image` 404'd in production.

**Local DNS cache survives even incognito.** After flipping fndryx.io DNS at Squarespace, Windows held the Squarespace IP in `dnscache` and incognito kept hitting it. `ipconfig /flushdns` from Admin Command Prompt resolved instantly.

**Vercel canonical domain matters across the build.** `fndryx.io` is canonical (Production), `www.fndryx.io` 307s to apex. The sitemap, JSON-LD, and OG metadata all reference the apex form. Never reverse this without updating those files.

**Squarespace registrar quirks.** DNS Settings groups records into "presets" that can only be deleted as a unit (no individual row deletion). Squarespace Defaults bundle = 4 A records + www CNAME + HTTPS — replace as one. Custom records beneath are per-row editable.

---

## Ongoing Updates

_New entries added here as updates ship after migration, most recent first._

### April 25, 2026 — Journal rebrand + LinkedIn integration

**Journal rebranded to FNDRYx authorship.**
- All blog posts now author as "FNDRYx" instead of "Kevin." Welcome post body fully rewritten to reflect the broader content mix (long-form essays, field notes, announcements, guest pieces) instead of the original "short notes" framing.
- Blog index H1 ("The FNDRYx Journal") now renders the FNDRYx wordmark inline with the brand logo treatment — FNDRY in Syne 800 + italic Playfair x in fire-400 — instead of plain text.
- Blog index tagline updated from "Short notes from the FNDRYx team..." to "Articles, announcements, and field notes from the FNDRYx team..." to match the broader content mix.
- Post template byline (`/blog/[slug]`) updated so when `author === "FNDRYx"`, the byline renders "by " + the inline FNDRYx wordmark treatment. Plain-text fallback retained for any future guest authors.

**LinkedIn URL added site-wide.**
- Canonical URL: `https://www.linkedin.com/company/109594033`
- Added LinkedIn icon link in `Footer.tsx` alongside Journal / fndryx.io, with `text-steel-400` → `hover:text-fire-400` transition and full a11y (`aria-label`, `target="_blank"`, `rel="noopener noreferrer"`, focus-visible ring).
- Welcome post body links: "subscribe via RSS" → `/feed.xml` (internal, same-tab), "follow us on LinkedIn" → company URL (external, new tab).
- `MdxComponents.tsx` updated so any `a` href starting with `http://` or `https://` auto-applies `target="_blank"` and `rel="noopener noreferrer"`. Internal links stay same-tab.
- JSON-LD Organization `sameAs` in `src/app/layout.tsx` corrected from stale `/company/fndryx` slug → canonical `/company/109594033`. Important for entity verification by search engines.

**Lessons / notes:**
- `lucide-react@1.11.0` does not export brand icons (LinkedIn isn't in the package). Used an inline SVG in `Footer.tsx` with `currentColor` so the hover color transition works identically to a lucide icon. Reinforces the existing punch-list item to pin lucide to a known-good version at next dep audit.
- When extending the FNDRYx logo treatment beyond the `<Logo />` component (e.g., inline in headings or bylines), use Tailwind utilities directly: `font-display font-extrabold tracking-[-0.03em]` for FNDRY and `font-serif italic font-normal text-fire-400 -ml-[0.05em] relative top-[0.05em] inline-block` for the x. The `top` offset (0.05em) is tuned for the wordmark; if it ever looks optically off at very large or very small sizes, that's the value to nudge.

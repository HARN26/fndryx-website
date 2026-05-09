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
- [ ] **Per-post OG image ≠ glyph fallback** — the per-post OG image route at `src/app/blog/[slug]/opengraph-image.tsx` loads only Syne via `@fontsource`, which lacks U+2260 (≠). Posts with ≠ in their titles (currently just `building-ready-vs-investor-ready`) render the glyph as a tofu box on social-share previews. Fix: load DejaVu Sans or another fallback font with broad Unicode coverage in the OG route, ordered after Syne. ~10 lines of change.

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

### May 8, 2026 — Essay #03 published + full-bleed figure utility + cover render script

**Published "Build Ready ≠ Investor Ready."**
- New post at `/blog/building-ready-vs-investor-ready` — essay distinguishing build readiness from investor readiness, introducing the four-quadrant Forged / Tempering / Hot Iron / Ore framework. Author: FNDRYx.
- Cover graphic: `public/images/blog/building-ready-vs-investor-ready-cover.png` (2400×1260, brand-styled following the Common Sense for Founders editorial template — left-aligned title, top-left FNDRYx + "AN ESSAY" subtitle, decorative italic Playfair "x" watermark on the right, italic description + orange separator + fire-400 italic pull-quote, bottom-right FNDRYX.IO).
- Inline figure: `public/images/blog/readiness-quadrants-2026-05-08.svg` — four-quadrant 2×2 matrix with brand-styled labels, axes, and quadrant cards. Rendered full-bleed inside the post body.
- Tags: `readiness`, `capital-readiness`, `founders`, `build-readiness`.
- Closing CTA: "Take the Capital Readiness Assessment →" links to `https://assess.fndryx.io/` (external, new tab), brand-styled with fire-400 text and a border-bottom underline.

**Body terminology canonicalization: "Building Readiness" → "Build Readiness."**
- Original draft used "Building Readiness" throughout; title rendered as "Build Ready ≠ Investor Ready" for editorial punch.
- Resolved by canonicalizing body on "Build Readiness" — full sweep of `Building Readiness`, `Building-readiness`, `Building Ready`, `building readiness`, `building-ready` across the MDX post and the inline SVG labels (subtitle, y-axis label, quadrant card titles).
- Slug retained as `building-ready-vs-investor-ready` — deliberate accept, slugs are forever and the URL stem isn't surfaced in any UI.

**New CSS utility: `.full-bleed-figure`.**
- Added to `src/app/globals.css` inside `@layer utilities`. Lets inline figures escape the `max-w-3xl` post container constraint and render up to 1400px wide on desktop, viewport-wide on mobile, centered relative to the article.
- Pattern: `width: min(1400px, calc(100vw - 2rem)); position: relative; left: 50%; transform: translateX(-50%)`. The transform-based centering anchors to the parent container's center (correct for prose) rather than viewport center (which would shift on layouts with scrollbars).
- Reusable for any future post that needs a wide visual. Apply via `<img className="full-bleed-figure rounded-xl" />` (the `rounded-xl` must be re-included since `MdxComponents.tsx` `<img>` props spread order means MDX className REPLACES the component default rather than merging).

**Cover render script.**
- Python + Pillow script produces the brand-styled 2400×1260 PNG cover from a configurable template. Pulls Syne 800, DM Sans 400, and Playfair Italic 400 fonts via `@fontsource/*` npm packages, converts WOFF→TTF for Pillow compatibility, and renders all editorial elements (wordmark, subtitle, multi-line title with orange-Syne or italic-Playfair accents, description, pull-quote, footer URL).
- `≠` (U+2260) is drawn as primitive shapes (rounded rectangles + rotated slash) because none of the brand fonts include the glyph. The `draw_neq_block(cx, cy, scale, color)` helper renders a typographic-quality ≠ at any scale.
- Future journal cover graphics can reuse this script as a template. Kept on disk locally; not in the repo.

**Polish passes during publish:**
- Removed decorative tagline "MEASUREMENT INFRASTRUCTURE BETWEEN FOUNDERS AND CAPITAL" from the quadrant SVG (was competing visually with the `INVESTOR READINESS →` axis label).
- Recolored both axis labels (`BUILD READINESS ↑`, `INVESTOR READINESS →`) from steel-500 to fire-400.
- Standardized all four quadrant title labels (TEMPERING, FORGED, ORE, HOT IRON) to fire-400 — were previously inconsistent (amber, orange, grey, dark amber).
- Inline-styled the four bucket names in the numbered list (Forged, Tempering, Hot Iron, Ore) to fire-400 via `<span className="text-fire-400">`, matching the SVG.
- Closing italic outro paragraph rewritten as raw `<p>` JSX so the leading "FNDRYx" wordmark renders with proper logo treatment (FNDRY in Syne 800, x in Playfair italic fire-400). Markdown `*...*` italic wraps the entire paragraph in `<em>`, which prevents granular per-word styling — the JSX `<p>` with conditional `not-italic` inner spans is the workaround.

**Lessons / notes:**
- **MDX inline `style={{...}}` doesn't reliably reach the rendered element when used inside post content.** Three iterations of an inline-style breakout pattern silently failed — DevTools showed `element.style { }` empty on the rendered `<img>`. The component override at `src/components/blog/MdxComponents.tsx:99` does spread `{...props}` to the underlying `<img>` correctly, but `next-mdx-remote/rsc` parses JSX-style style objects differently than standard React JSX, and the attribute is dropped or stringified somewhere in the pipeline. Working pattern: define styles as a CSS class in `globals.css` and apply via `className`. `className` passes through reliably; `style` does not.
- **Tailwind v4 strips custom CSS rules emitted outside any `@layer` directive.** The `.full-bleed-figure` rule appended to the end of `globals.css` was syntactically valid but didn't appear in DevTools at all — the rule was being tree-shaken by the v4 build pipeline. Wrapping in `@layer utilities { ... }` made it emit. v4 docs reference this as an escape hatch for custom CSS; in practice it's a hard requirement, not a stylistic choice.
- **Full-bleed inside `mx-auto max-w-3xl` works with transform-based centering, not negative-margin viewport math.** First attempt used `margin-left: calc(50% - 50vw + 1rem)` (canonical CSS-Tricks pattern), which centers on the viewport. The article is `mx-auto`, so its center follows the viewport on a normal page — but viewport center shifts when scrollbars appear, and the figure offsets relative to the prose. `transform: translateX(-50%)` anchored to the parent stays aligned with the article regardless.
- **`{...props}` spread order replaces, doesn't merge, the className.** `<img className="rounded-xl my-8" {...props} />` means `props.className` REPLACES the literal "rounded-xl my-8" — adjacent JSX className attributes with the same name aren't merged by React. To preserve component defaults when supplying a custom className from MDX, include them explicitly (e.g., `className="full-bleed-figure rounded-xl"`).
- **None of the brand fonts include `≠` (U+2260).** Syne, DM Sans, and Playfair Display Italic all lack the glyph. Browser HTML rendering substitutes from system fonts automatically (fine for post H1, listing card, RSS title, browser tab title), but Satori (used by `ImageResponse` for OG images) has no system font fallback — the auto-generated 1200×630 social-share preview for this post likely renders ≠ as a tofu box. Added to deferred list.
- **Two valid cover-graphic accent treatments coexist in the journal.** "The Most Inefficient Market in America" uses Playfair italic for accents (matches the asterisk-accent system in `title-utils.ts`). "Common Sense for Founders" and this post use orange Syne. The asterisk system always renders Playfair italic — so the post-page H1, listing card, RSS title, and OG image render "Build" and "Investor" in Playfair italic, while the cover graphic shows them in orange Syne. Known design-system fork; not blocking. Future cleanup: pick one convention and standardize across covers.

### April 25, 2026 — First essay published + title accent system + cover-as-title layout

**Published "The Most Inefficient Market in America."**
- New post at `/blog/the-most-inefficient-market-in-america` — long-form essay on why startup capital is the most inefficient capital market in America, the four conditions for an efficient market, and how the FNDRYx exchange addresses the diagnosis.
- Cover graphic: `public/images/blog/the-most-inefficient-market-in-america-cover.png` (2400×1260, brand-styled title card on steel-900 with italic-orange "Inefficient" treatment).
- Tags: `markets`, `capital-readiness`, `exchange`, `capital`, `founders`, `efficiency`.
- Internal cross-links to `/blog/the-cincinnati-blueprint` and `/blog/common-sense-for-founders` in the closing section.
- Closing CTA links to `/` (homepage) — chose internal homepage link over self-referencing `[fndryx.io](http://fndryx.io)` URL since this is on the same domain.

**Title accent system (reusable, all posts going forward).**
- New utility at `src/lib/title-utils.ts` exports `parseTitleAccents(title)` and `stripTitleAccents(title)`.
- Authors mark accent words by wrapping them in single asterisks in the frontmatter `title` field — e.g., `title: "The Most *Inefficient* Market in America"`.
- Wrapped portions render in Playfair Display Italic 400 + `fire-400`, matching the FNDRYx brand accent treatment used for the logo "x". Plain segments stay in Syne 800.
- Wired into 5 places so asterisks never leak as literal text: post page H1 (when visible), `/blog` listing cards, per-post OG image (Satori inline styles since Tailwind isn't supported), `feed.xml` RSS, and `generateMetadata` for browser tabs / social previews.
- Convention: every post should have at least one accent word in its title. Multi-word accents (e.g., `*Capital Markets*`) and multiple separate accents in a single title both supported.

**Cover-as-title layout for post pages.**
- `src/app/blog/[slug]/page.tsx` now renders the `coverImage` as the visual title above byline + tags when one exists. Visible text H1 is replaced; an `<h1 className="sr-only">{stripTitleAccents(title)}</h1>` is retained for SEO + screen reader navigation.
- Posts WITHOUT a `coverImage` fall back to the existing visible text H1 with the accent render (Welcome post uses this path).
- Cover image rendered with `next/image` priority, `border border-steel-700`, `rounded-lg`.

**Welcome card centering.**
- `/blog` listing cards without a `coverImage` get `text-center` on their description paragraph.
- Currently affects only the Welcome card. Future bare-cover posts inherit the same treatment automatically.

**Retrofitted existing post titles to the accent convention.**
- `welcome-to-the-fndryx-journal.mdx`: `"Welcome to the FNDRY*x* Journal"` (orange "x" matches the brand wordmark).
- `the-cincinnati-blueprint.mdx`: `"The *Cincinnati* Blueprint: How a Regional Exchange Reinvented Capital Markets"`.
- `common-sense-for-founders.mdx`: `"Common Sense for *Founders*"`.

**Lessons / notes:**
- Satori (used by `ImageResponse` for OG images) doesn't support Tailwind classes — accent segments in OG images need inline styles: `{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 400, color: '#f97316' }`. The italic Playfair WOFF must be loaded explicitly via `@fontsource/playfair-display/files` using the `new URL(..., import.meta.url)` pattern (Turbopack-safe).
- Strip vs parse: `stripTitleAccents` is for any plain-text context (HTML tab title, OG metadata `title`, RSS `<title>`, image `alt`, sr-only H1). `parseTitleAccents` is for any rendered context (post H1, card titles, OG image render). Mixing these wrong leaks asterisks into browser tabs or social previews.
- The `*x*` wrapping in card titles renders the "x" in Playfair italic + fire-400 but doesn't reproduce the tight-tucked spacing (`margin-left: -0.05em`, `top: 0.05em`) of the full brand wordmark treatment. At card-title scale the slight gap isn't visually jarring, but if it ever needs to match the brand mark exactly (e.g., on a future hero-scale render), the accent system would need a special case for single-character "x" preceded by "FNDRY".
- Cover-as-title pattern reduces duplication (text title + identical title graphic was redundant) and lets the brand-styled cover graphic carry visual weight on the post page. SEO/a11y preserved via `sr-only` H1.
- Editorial convention going forward: every post gets a cover graphic in the same brand template (steel-900 background, italic-orange accent on a single word, FNDRYx — Journal wordmark, essay number + category, date footer). The frontmatter `title` mirrors the accent word from the cover graphic so card and cover stay consistent.

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

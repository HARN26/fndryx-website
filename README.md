# fndryx.io

The FNDRYx website: the homepage and the join form. The Journal is down until the outlet launches (Nov 4, 2026); its posts stay in `src/content/blog` as drafts and `/blog` redirects to the homepage.

- **Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript. Hosted on Vercel; every push to `main` deploys, every pull request gets a preview.
- **Run locally:** `npm install`, then `npm run dev` and open http://localhost:3000.
- **Before pushing:** `npm run lint`, `npm run claim-check` and `npm run build`. GitHub runs the same checks on every pull request, plus Lighthouse on the Vercel preview.
- **Docs:** `fndryx-technical-reference.md` (how the site is built, image sources, design system, checks) and `fndryx-update-history.md` (what changed and when).
- **Rules for agents:** see `AGENTS.md` and `CLAUDE.md`.

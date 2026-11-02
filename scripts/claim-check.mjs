#!/usr/bin/env node
// Claim check: fails if the homepage, join form, confirmation emails or site
// metadata say something FNDRYx has ruled out. Journal, Privacy Policy and
// unsubscribe files are deliberately not scanned.
//
// Run: npm run claim-check
//
// Rules come from the Nov 2026 website plan ("Claim rules"):
//   1. Banned words and phrases (below).
//   2. Never name certain people and organizations. That list is private, so it
//      is NOT in this public repo. CI reads it from the GitHub Actions secret
//      CLAIM_CHECK_PRIVATE_TERMS (one term per line). Matches are reported by
//      number, never by the term itself, so the log doesn't leak it either.
//   3. Never publish prices, revenue, raise or market-size figures, the buyer
//      list, Raise Right results or roadshow stops (patterns below).
//
// Text is normalized before checking (JSX entities decoded, line breaks and
// {" "} joined), so a sentence split across source lines is still one sentence.
// ALLOWED sentences are removed first; add to it only for lines Kevin approved.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();

// What gets scanned. Paths are relative to the repo root.
const INCLUDE = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
  "src/app/icon.tsx",
  "src/app/apple-icon.tsx",
  "src/app/api/founder-forge",
  "src/components",
  "src/lib/join-form.ts",
  "src/lib/shared-metadata.ts",
];

// Never scanned, even if under an included folder.
const EXCLUDE = [
  "src/components/blog", // Journal
  "src/components/UnsubscribeForm.tsx", // unsubscribe flow, out of scope
];

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs"];

// Rule 1: banned on the homepage, form, emails and metadata.
const BANNED = [
  { label: "free", re: /\bfree\b/i },
  { label: "Forged", re: /\bforged\b/i },
  { label: "Tempering", re: /\btempering\b/i },
  { label: "Hot Iron", re: /\bhot\s+iron\b/i },
  { label: "quadrant", re: /\bquadrants?\b/i },
  // Score abbreviations: case-sensitive so <br /> and words like "bring" pass.
  { label: "BR (score)", re: /\bBR\b/ },
  { label: "IR (score)", re: /\bIR\b/ },
  { label: "deterministic", re: /\bdeterministic(ally)?\b/i },
  { label: "two scores", re: /\btwo\s+scores\b/i },
  { label: "visible to capital", re: /\bvisible\s+to\s+capital\b/i },
  { label: "capital access", re: /\bcapital\s+access\b/i },
  { label: "twenty-six / 26 questions", re: /\btwenty[\s-]six\b|\b26\s+questions\b/i },
  { label: "validated", re: /\bvalidated\b/i },
  { label: "proven", re: /\bproven\b/i },
  { label: "predicts", re: /\bpredicts\b/i },
  { label: "guarantee", re: /\bguarantee(s|d)?\b/i },
  { label: "marketplace", re: /\bmarketplaces?\b/i },
  { label: "capital routing", re: /\bcapital\s+routing\b/i },
  { label: "placement", re: /\bplacements?\b/i },
];

// Rule 3: figures that must never be published.
const NEVER_PUBLISH = [
  { label: "dollar amount", re: /\$\s?\d/ },
  { label: "149 (buyer list)", re: /\b149\b/ },
  { label: "Raise Right", re: /\braise\s*right\b/i },
  { label: "roadshow", re: /\broad\s?shows?\b/i },
  { label: "market size (TAM/SAM/SOM)", re: /\b(TAM|SAM|SOM)\b/ },
  { label: "valuation", re: /\b(pre|post)-money\b|\bvaluations?\b/i },
];

// Exact sentences that may contain a banned word. Compared after normalizing.
const ALLOWED = [
  // "What FNDRYx doesn't do" (plan, sections 8 and PR 1)
  "We don't guarantee meetings, introductions or capital.",
  "We don't rank founders or predict outcomes.",
  "We don't rank founders.",
  "We're not a broker-dealer or investment adviser, and we don't arrange investments.",
  "not a placement service",
  // Founder stage options on the join form (the founder's revenue band,
  // not FNDRYx figures)
  "Revenue <$100K",
  "Revenue $100K–$1M",
  "Revenue $1M+",
];

function normalize(text) {
  return text
    .replace(/&apos;|&#39;|&rsquo;|[‘’]/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;|[“”]/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\{\s*["'`] ["'`]\s*\}/g, " ") // JSX {" "}
    .replace(/\s+/g, " ");
}

function walk(path, out) {
  const abs = join(ROOT, path);
  let st;
  try {
    st = statSync(abs);
  } catch {
    return; // listed file no longer exists; nothing to scan
  }
  if (EXCLUDE.some((x) => path === x || path.startsWith(x + "/"))) return;
  if (st.isDirectory()) {
    for (const name of readdirSync(abs)) walk(`${path}/${name}`, out);
  } else if (EXTENSIONS.some((e) => path.endsWith(e))) {
    out.push(path);
  }
}

function findLine(raw, re) {
  const flags = re.flags.replace("g", "");
  const lineRe = new RegExp(re.source, flags);
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lineRe.test(normalize(lines[i]))) return i + 1;
  }
  return null; // match spans lines
}

function privateTerms() {
  const raw = process.env.CLAIM_CHECK_PRIVATE_TERMS ?? "";
  return raw
    .split(/[\n,]/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t, i) => ({
      label: `private term #${i + 1}`,
      re: new RegExp(
        `\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+")}\\b`,
        "i",
      ),
    }));
}

const files = [];
for (const p of INCLUDE) walk(p, files);
files.sort();

const NEVER_NAME = privateTerms();
const groups = [
  ["Banned", BANNED],
  ["Never publish", NEVER_PUBLISH],
  ["Never name", NEVER_NAME],
];

const problems = [];
for (const file of files) {
  const raw = readFileSync(join(ROOT, file), "utf8");
  let text = normalize(raw);
  for (const ok of ALLOWED) text = text.split(normalize(ok)).join(" ");
  for (const [group, rules] of groups) {
    for (const rule of rules) {
      if (rule.re.test(text)) {
        problems.push({ file, group, label: rule.label, line: findLine(raw, rule.re) });
      }
    }
  }
}

const rel = (f) => relative(ROOT, join(ROOT, f)).split(sep).join("/");
console.log(`Claim check: ${files.length} files scanned.`);
if (NEVER_NAME.length === 0) {
  console.log(
    "Note: CLAIM_CHECK_PRIVATE_TERMS is not set, so the never-name list was not checked.",
  );
} else {
  console.log(`Never-name list: ${NEVER_NAME.length} private terms checked.`);
}

if (problems.length === 0) {
  console.log("No banned claims found.");
  process.exit(0);
}

console.log(`\n${problems.length} problem(s):`);
for (const p of problems) {
  const where = p.line ? `${rel(p.file)}:${p.line}` : rel(p.file);
  console.log(`  ${where}  [${p.group}] ${p.label}`);
  if (process.env.GITHUB_ACTIONS) {
    const lineArg = p.line ? `,line=${p.line}` : "";
    console.log(`::error file=${rel(p.file)}${lineArg}::${p.group}: ${p.label}`);
  }
}
console.log(
  "\nFix the wording, or if Kevin approved the exact sentence, add it to ALLOWED in scripts/claim-check.mjs.",
);
process.exit(1);

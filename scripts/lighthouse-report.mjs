#!/usr/bin/env node
// Runs Lighthouse against one URL (3 mobile runs, 1 desktop run) and prints a
// Markdown table of scores. Used by .github/workflows/lighthouse.yml on each
// Vercel preview; also works locally:
//   node scripts/lighthouse-report.mjs https://example.vercel.app/ ./lighthouse-reports
//
// Optional env: LIGHTHOUSE_HEADERS_FILE = path to a JSON file of extra request
// headers (used for the Vercel protection bypass header on previews).
//
// Report only: it never fails on low scores. Score targets are enforced on the
// live site in PR 7 of the website plan.

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const LIGHTHOUSE = "lighthouse@13.5.0";
const MOBILE_RUNS = 3;

const [url, outDir = "lighthouse-reports"] = process.argv.slice(2);
if (!url) {
  console.error("Usage: node scripts/lighthouse-report.mjs <url> [outDir]");
  process.exit(2);
}
mkdirSync(outDir, { recursive: true });

const CATEGORIES = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["best-practices", "Best Practices"],
  ["seo", "SEO"],
];

function run(name, extraArgs) {
  const base = join(outDir, name);
  const args = [
    "--yes",
    LIGHTHOUSE,
    url,
    "--quiet",
    "--output=json",
    "--output=html",
    `--output-path=${base}`,
    "--only-categories=performance,accessibility,best-practices,seo",
    "--chrome-flags=--headless=new --no-sandbox",
    ...extraArgs,
  ];
  if (process.env.LIGHTHOUSE_HEADERS_FILE) {
    args.push(`--extra-headers=${process.env.LIGHTHOUSE_HEADERS_FILE}`);
  }
  execFileSync("npx", args, { stdio: ["ignore", "ignore", "inherit"] });
  const lhr = JSON.parse(readFileSync(`${base}.report.json`, "utf8"));
  const scores = Object.fromEntries(
    CATEGORIES.map(([id]) => [id, Math.round((lhr.categories[id]?.score ?? 0) * 100)]),
  );
  const audit = (id) => lhr.audits[id]?.numericValue;
  return {
    name,
    scores,
    cls: audit("cumulative-layout-shift"),
    lcp: audit("largest-contentful-paint"),
    finalUrl: lhr.finalDisplayedUrl ?? lhr.finalUrl,
  };
}

const results = [];
for (let i = 1; i <= MOBILE_RUNS; i++) results.push(run(`mobile-${i}`, []));
results.push(run("desktop", ["--preset=desktop"]));

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const mobile = results.filter((r) => r.name.startsWith("mobile"));
const desktop = results.find((r) => r.name === "desktop");

const lines = [];
lines.push(`### Lighthouse: ${url}`);
lines.push("");
lines.push(`| | ${CATEGORIES.map(([, l]) => l).join(" | ")} | Layout shift | Largest paint |`);
lines.push(`|---|${CATEGORIES.map(() => "---").join("|")}|---|---|`);
const row = (label, r) =>
  `| ${label} | ${CATEGORIES.map(([id]) => r.scores[id]).join(" | ")} | ${r.cls?.toFixed(3) ?? "?"} | ${r.lcp ? (r.lcp / 1000).toFixed(1) + "s" : "?"} |`;
for (const r of mobile) lines.push(row(`Mobile run ${r.name.split("-")[1]}`, r));
lines.push(
  `| **Mobile median** | ${CATEGORIES.map(([id]) => `**${median(mobile.map((r) => r.scores[id]))}**`).join(" | ")} | | |`,
);
lines.push(row("**Desktop**", desktop));
lines.push("");
lines.push(
  "Report only, on a preview build. The full HTML reports are attached to this run as the `lighthouse-reports` artifact.",
);
const md = lines.join("\n");
console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");

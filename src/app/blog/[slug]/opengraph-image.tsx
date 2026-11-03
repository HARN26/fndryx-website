import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import {
  parseTitleAccents,
  stripTitleAccents,
  type TitleSegment,
} from "@/lib/title-utils";

export const alt = "FNDRYx Journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

const FONT_URLS = {
  syne: new URL(
    "../../../../node_modules/@fontsource/syne/files/syne-latin-800-normal.woff",
    import.meta.url,
  ),
  dmSans: new URL(
    "../../../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff",
    import.meta.url,
  ),
  playfairItalic: new URL(
    "../../../../node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff",
    import.meta.url,
  ),
} as const;

async function loadFont(label: string, fileUrl: URL): Promise<ArrayBuffer | null> {
  try {
    const buffer = await readFile(fileUrl);
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
    console.log(
      `[blog/opengraph-image] Loaded ${label} (${arrayBuffer.byteLength} bytes)`,
    );
    return arrayBuffer;
  } catch (err) {
    console.error(
      `[blog/opengraph-image] Failed to read ${label} from ${fileUrl}:`,
      err,
    );
    return null;
  }
}

// Titles are laid out word by word. Satori (the engine behind ImageResponse)
// wraps between flex items and trims the spaces at their edges, so laying out
// whole accent segments dropped the spaces next to orange words ("BusinessReady")
// and let "FNDRY" and its "x" break onto separate lines. A "word" here is any
// run without a space, so "FNDRY" + "x" stays together.
type WordPiece = TitleSegment;

function splitIntoWords(segments: TitleSegment[]): WordPiece[][] {
  const words: WordPiece[][] = [];
  let current: WordPiece[] = [];
  for (const { text, accent } of segments) {
    for (const part of text.split(/(\s+)/)) {
      if (part === "") continue;
      if (/^\s+$/.test(part)) {
        if (current.length) words.push(current);
        current = [];
      } else {
        current.push({ text: part, accent });
      }
    }
  }
  if (current.length) words.push(current);
  return words;
}

// None of the bundled fonts has "≠", so it's drawn as a shape instead of a
// missing-glyph box. Sized in em so it follows the title size.
function NotEqualSign({ size, color }: { size: number; color: string }) {
  const w = Math.round(size * 0.62);
  const h = Math.round(size * 0.7);
  const t = Math.max(3, Math.round(size * 0.1));
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ marginTop: Math.round(size * 0.12) }}>
      <rect x={0} y={h * 0.3 - t / 2} width={w} height={t} fill={color} />
      <rect x={0} y={h * 0.62 - t / 2} width={w} height={t} fill={color} />
      <line x1={w * 0.72} y1={0} x2={w * 0.28} y2={h} stroke={color} strokeWidth={t} />
    </svg>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [syne, dmSans, playfairItalic] = await Promise.all([
    loadFont("Syne 800", FONT_URLS.syne),
    loadFont("DM Sans 600", FONT_URLS.dmSans),
    loadFont("Playfair Display 400 Italic", FONT_URLS.playfairItalic),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600 | 800;
    style: "normal" | "italic";
  }[] = [];
  if (syne) fonts.push({ name: "Syne", data: syne, weight: 800, style: "normal" });
  if (dmSans)
    fonts.push({ name: "DM Sans", data: dmSans, weight: 600, style: "normal" });
  if (playfairItalic)
    fonts.push({
      name: "Playfair Display",
      data: playfairItalic,
      weight: 400,
      style: "italic",
    });

  const plainTitle = stripTitleAccents(post.frontmatter.title);
  const titleWords = splitIntoWords(parseTitleAccents(post.frontmatter.title));
  const titleSize = plainTitle.length > 60 ? 48 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#f97316",
          }}
        />

        {/* "FNDRY" + italic Playfair "x" (the x is never a sans-serif capital), then JOURNAL */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "DM Sans",
            fontWeight: 600,
            fontSize: 22,
            color: "#f97316",
            letterSpacing: "0.25em",
          }}
        >
          <span>FNDRY</span>
          <span
            style={{
              fontFamily: "Playfair Display",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              letterSpacing: 0,
              marginLeft: -4,
              marginRight: 10,
            }}
          >
            x
          </span>
          <span>— JOURNAL</span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: titleSize,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            {titleWords.map((word, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginRight: i < titleWords.length - 1 ? "0.3em" : 0,
                }}
              >
                {word.map((piece, j) =>
                  piece.text === "≠" ? (
                    <NotEqualSign key={j} size={titleSize} color="#f1f5f9" />
                  ) : piece.accent ? (
                    <span
                      key={j}
                      style={{
                        fontFamily: "Playfair Display",
                        fontStyle: "italic",
                        fontWeight: 400,
                        color: "#f97316",
                      }}
                    >
                      {piece.text}
                    </span>
                  ) : (
                    <span key={j}>{piece.text}</span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "DM Sans",
            fontWeight: 600,
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {formatDate(post.frontmatter.date)}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}

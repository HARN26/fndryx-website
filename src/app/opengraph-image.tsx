import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

// Site-wide share image (link previews on LinkedIn, iMessage, Slack...):
// the wordmark and the title line on navy, with the Milwaukee pour photo on
// the right. The Journal posts have their own share images and are untouched.
// The wordmark is the official FNDRYx SVG (asset pack), recolored for dark
// backgrounds: FNDRY in steel-100, x in fire-400. Rebuilding it from fonts let
// the x collide with the Y, so don't.
export const alt = "FNDRYx — The readiness record for early-stage capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FILES = {
  syne700: new URL(
    "../../node_modules/@fontsource/syne/files/syne-latin-700-normal.woff",
    import.meta.url,
  ),
  wordmark: new URL("../lib/og/fndryx-wordmark-dark.svg", import.meta.url),
  photo: new URL("../lib/og/foundry-pour-og.jpg", import.meta.url),
} as const;

async function load(label: string, fileUrl: URL): Promise<Buffer | null> {
  try {
    return await readFile(fileUrl);
  } catch (err) {
    console.error(`[opengraph-image] Failed to read ${label}:`, err);
    return null;
  }
}

const toArrayBuffer = (b: Buffer) =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

export default async function Image() {
  const [syne700, wordmark, photo] = await Promise.all([
    load("Syne 700", FILES.syne700),
    load("wordmark", FILES.wordmark),
    load("photo", FILES.photo),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 700;
    style: "normal";
  }[] = [];
  if (syne700)
    fonts.push({ name: "Syne", data: toArrayBuffer(syne700), weight: 700, style: "normal" });

  const wordmarkSrc = wordmark
    ? `data:image/svg+xml;base64,${wordmark.toString("base64")}`
    : null;

  const photoSrc = photo
    ? `data:image/jpeg;base64,${photo.toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0f172a",
          position: "relative",
        }}
      >
        {photoSrc && (
          <img
            src={photoSrc}
            alt=""
            width={520}
            height={630}
            style={{ position: "absolute", top: 0, right: 0, width: 520, height: 630 }}
          />
        )}
        {/* Navy fade over the photo's left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 340,
            width: 180,
            height: 630,
            background: "linear-gradient(90deg, #0f172a 0%, rgba(15,23,42,0) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 680,
            height: "100%",
            paddingLeft: 80,
            paddingRight: 40,
          }}
        >
          {wordmarkSrc && (
            // The SVG has built-in side margins; -22px lines its F up with the text below.
            <img
              src={wordmarkSrc}
              alt="FNDRYx"
              width={520}
              height={97}
              style={{ width: 520, height: 97, marginLeft: -22 }}
            />
          )}
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: 46,
              lineHeight: 1.15,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            The readiness record for early-stage capital.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              width: 72,
              height: 4,
              background: "#f97316",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}

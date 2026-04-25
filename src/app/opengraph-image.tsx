import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "FNDRYx — The Capital-Readiness Exchange";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_PATHS = {
  syne: "node_modules/@fontsource/syne/files/syne-latin-800-normal.woff",
  playfairItalic:
    "node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff",
  dmSans:
    "node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff",
} as const;

async function loadFont(
  label: string,
  relPath: string,
): Promise<ArrayBuffer | null> {
  const absPath = join(process.cwd(), relPath);
  try {
    const buffer = await readFile(absPath);
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ) as ArrayBuffer;
    console.log(
      `[opengraph-image] Loaded ${label} (${arrayBuffer.byteLength} bytes)`,
    );
    return arrayBuffer;
  } catch (err) {
    console.error(
      `[opengraph-image] Failed to read ${label} from ${absPath}:`,
      err,
    );
    return null;
  }
}

export default async function Image() {
  const [syne, playfairItalic, dmSans] = await Promise.all([
    loadFont("Syne 800", FONT_PATHS.syne),
    loadFont("Playfair Display Italic 400", FONT_PATHS.playfairItalic),
    loadFont("DM Sans 600", FONT_PATHS.dmSans),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600 | 800;
    style: "normal" | "italic";
  }[] = [];
  if (syne)
    fonts.push({ name: "Syne", data: syne, weight: 800, style: "normal" });
  if (playfairItalic)
    fonts.push({
      name: "Playfair",
      data: playfairItalic,
      weight: 400,
      style: "italic",
    });
  if (dmSans)
    fonts.push({ name: "DM Sans", data: dmSans, weight: 600, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: 160,
              color: "#f1f5f9",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            FNDRY
          </span>
          <span
            style={{
              fontFamily: "Playfair",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 180,
              color: "#f97316",
              marginLeft: "-0.05em",
              lineHeight: 1,
            }}
          >
            x
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            fontFamily: "DM Sans",
            fontWeight: 600,
            fontSize: 32,
            color: "#94a3b8",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          The Capital-Readiness Exchange
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}

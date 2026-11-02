import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Playfair Display italic from @fontsource (same Google Fonts file), so the
// favicon never depends on reaching Google at build time.
const PLAYFAIR_ITALIC = new URL(
  "../../node_modules/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff",
  import.meta.url,
);

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const b = await readFile(PLAYFAIR_ITALIC);
    return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
  } catch (err) {
    console.error("[icon] Failed to read font:", err);
    return null;
  }
}

export default async function Icon() {
  const playfairItalic = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Playfair",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 32,
          color: "#f97316",
          lineHeight: 1,
        }}
      >
        x
      </div>
    ),
    {
      ...size,
      fonts: playfairItalic
        ? [
            {
              name: "Playfair",
              data: playfairItalic,
              weight: 400,
              style: "italic",
            },
          ]
        : undefined,
    },
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

// Home-screen icon (180×180), also the logo in the site's structured data.
// Uses the official FNDRYx wordmark SVG (dark-background colors) scaled to
// fit with margins. The previous version set FNDRY in Syne at 56px, which is
// wider than the icon and was cut off at both edges.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const WORDMARK = new URL("../lib/og/fndryx-wordmark-dark.svg", import.meta.url);

// The SVG's own viewBox is 6813.58 × 1274.38 (includes side margins).
const WIDTH = 176;
const HEIGHT = Math.round((WIDTH * 1274.38) / 6813.58);

export default async function AppleIcon() {
  let src: string | null = null;
  try {
    const svg = await readFile(WORDMARK);
    src = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  } catch (err) {
    console.error("[apple-icon] Failed to read wordmark:", err);
  }

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
        }}
      >
        {src && (
          <img
            src={src}
            alt="FNDRYx"
            width={WIDTH}
            height={HEIGHT}
            style={{ width: WIDTH, height: HEIGHT }}
          />
        )}
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadGoogleFont(): Promise<ArrayBuffer | null> {
  const url =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap";
  try {
    const css = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
      },
    }).then((r) => r.text());
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\(['"]?(truetype|opentype|woff)['"]?\)/,
    );
    if (!match) return null;
    return await fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Icon() {
  const playfairItalic = await loadGoogleFont();

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

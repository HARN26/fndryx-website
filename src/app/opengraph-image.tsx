import { ImageResponse } from "next/og";

export const alt = "FNDRYx — The Capital-Readiness Exchange";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  family: string,
  weight: number,
  style: "normal" | "italic" = "normal",
): Promise<ArrayBuffer | null> {
  const familyParam = family.replace(/ /g, "+");
  const axisPrefix = style === "italic" ? "ital,wght@1," : "wght@";
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:${axisPrefix}${weight}&display=swap`;
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

export default async function Image() {
  const [syne800, playfairItalic, dmSans500] = await Promise.all([
    loadGoogleFont("Syne", 800),
    loadGoogleFont("Playfair Display", 400, "italic"),
    loadGoogleFont("DM Sans", 500),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 500 | 800;
    style: "normal" | "italic";
  }[] = [];
  if (syne800)
    fonts.push({ name: "Syne", data: syne800, weight: 800, style: "normal" });
  if (playfairItalic)
    fonts.push({
      name: "Playfair",
      data: playfairItalic,
      weight: 400,
      style: "italic",
    });
  if (dmSans500)
    fonts.push({ name: "DM Sans", data: dmSans500, weight: 500, style: "normal" });

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
              fontSize: 220,
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
              fontSize: 240,
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
            fontWeight: 500,
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

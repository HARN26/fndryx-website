export type TitleSegment = { text: string; accent: boolean };

const ACCENT_PATTERN = /\*([^*]+)\*/g;

export function parseTitleAccents(title: string): TitleSegment[] {
  const segments: TitleSegment[] = [];
  let lastIndex = 0;

  for (const match of title.matchAll(ACCENT_PATTERN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      segments.push({ text: title.slice(lastIndex, start), accent: false });
    }
    segments.push({ text: match[1], accent: true });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < title.length) {
    segments.push({ text: title.slice(lastIndex), accent: false });
  }

  return segments;
}

export function stripTitleAccents(title: string): string {
  return title.replace(ACCENT_PATTERN, "$1");
}

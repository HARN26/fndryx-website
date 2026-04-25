import { getAllPosts } from "@/lib/blog";
import { stripTitleAccents } from "@/lib/title-utils";

export const revalidate = 3600;

const SITE_URL = "https://fndryx.io";
const FEED_URL = `${SITE_URL}/feed.xml`;
const BLOG_URL = `${SITE_URL}/blog`;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return date.toUTCString();
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(stripTitleAccents(post.frontmatter.title))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.frontmatter.date)}</pubDate>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <author>noreply@fndryx.io (${escapeXml(post.frontmatter.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FNDRYx Journal</title>
    <link>${BLOG_URL}</link>
    <description>Short notes from the FNDRYx team on capital-readiness, founder signals, and exchange infrastructure.</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getAllSlugs();

  return [
    {
      url: "https://fndryx.io/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://fndryx.io/blog",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://fndryx.io/capital-partners",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://fndryx.io/accelerators",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...slugs.map((slug) => ({
      url: `https://fndryx.io/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

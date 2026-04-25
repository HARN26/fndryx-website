import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
  ];
}

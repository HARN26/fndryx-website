import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

async function readPostFromFile(filename: string): Promise<Post | null> {
  if (!filename.endsWith(".mdx")) return null;
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(BLOG_DIR, filename);
  const raw = await readFile(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (frontmatter.slug && frontmatter.slug !== slug) {
    console.warn(
      `[blog] frontmatter.slug "${frontmatter.slug}" does not match filename "${slug}" in ${filename}`,
    );
  }

  return {
    slug,
    frontmatter: { ...frontmatter, slug },
    content,
  };
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  let entries: string[];
  try {
    entries = await readdir(BLOG_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  const posts = (
    await Promise.all(entries.map((name) => readPostFromFile(name)))
  ).filter((p): p is Post => p !== null && p.frontmatter.draft !== true);

  posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );

  return posts;
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const post = await readPostFromFile(`${slug}.mdx`).catch((err) => {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw err;
    });
    if (!post) return null;
    if (post.frontmatter.draft === true) return null;
    return post;
  },
);

export const getAllSlugs = cache(async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
});

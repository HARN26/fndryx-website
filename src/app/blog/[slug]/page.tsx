import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <Link
            href="/blog"
            className="inline-block mb-12 font-body text-sm text-fire-400 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            ← Back to journal
          </Link>

          <header>
            <p className="font-body text-xs uppercase tracking-wider text-steel-400">
              {formatDate(post.frontmatter.date)}
            </p>
            <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-steel-100 leading-tight">
              {post.frontmatter.title}
            </h1>
            <p className="mt-6 text-sm text-steel-400">
              by {post.frontmatter.author}
            </p>

            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-fire-500/10 px-2 py-1 font-display font-semibold text-xs uppercase tracking-wider text-fire-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.frontmatter.coverImage && (
              <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={post.frontmatter.coverImage}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          <div className="mt-12">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <hr className="border-steel-700 my-16" />

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
            >
              Read more posts →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

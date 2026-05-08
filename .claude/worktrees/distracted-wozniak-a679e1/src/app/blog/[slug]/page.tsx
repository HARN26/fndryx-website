import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { parseTitleAccents, stripTitleAccents } from "@/lib/title-utils";

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

  const plainTitle = stripTitleAccents(post.frontmatter.title);

  return {
    title: plainTitle,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: plainTitle,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: "summary_large_image",
      title: plainTitle,
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
            {post.frontmatter.coverImage ? (
              <>
                <Image
                  src={post.frontmatter.coverImage}
                  alt={stripTitleAccents(post.frontmatter.title)}
                  width={2400}
                  height={1260}
                  sizes="(min-width: 768px) 768px, 100vw"
                  priority
                  className="mt-4 w-full h-auto rounded-lg border border-steel-700"
                />
                <h1 className="sr-only">
                  {stripTitleAccents(post.frontmatter.title)}
                </h1>
              </>
            ) : (
              <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-steel-100 leading-tight">
                {parseTitleAccents(post.frontmatter.title).map((segment, i) =>
                  segment.accent ? (
                    <span
                      key={i}
                      className="font-serif italic font-normal text-fire-400"
                    >
                      {segment.text}
                    </span>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  ),
                )}
              </h1>
            )}
            {post.frontmatter.author === "FNDRYx" ? (
              <p className="mt-6 text-sm text-steel-400">
                by{" "}
                <span className="inline-flex items-baseline">
                  <span className="font-display font-extrabold tracking-[-0.03em]">
                    FNDRY
                  </span>
                  <span className="font-serif italic font-normal text-fire-400 -ml-[0.05em] relative top-[0.05em] inline-block">
                    x
                  </span>
                </span>
              </p>
            ) : (
              <p className="mt-6 text-sm text-steel-400">
                by {post.frontmatter.author}
              </p>
            )}

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

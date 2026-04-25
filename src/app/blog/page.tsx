import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Rss } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Short notes from the FNDRYx team on capital-readiness, founder signals, and exchange infrastructure.",
};

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

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="mb-4 font-display font-semibold text-xs uppercase tracking-[0.2em] text-fire-400">
            Journal
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-steel-100 leading-tight">
            The FNDRYx Journal
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-400">
            Short notes from the FNDRYx team on capital-readiness, founder
            signals, and exchange infrastructure.
          </p>

          <a
            href="/feed.xml"
            className="mt-6 inline-flex items-center gap-2 text-sm text-fire-400 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
          >
            <Rss size={16} aria-hidden="true" />
            Subscribe via RSS →
          </a>

          {posts.length === 0 ? (
            <p className="mt-16 text-center text-steel-400">
              No posts yet. The first one is coming soon.
            </p>
          ) : (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
                >
                  <article className="flex h-full flex-col rounded-2xl border border-steel-700 bg-steel-800 p-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-fire-400">
                    {post.frontmatter.coverImage && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <Image
                          src={post.frontmatter.coverImage}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <p
                      className={`font-body text-xs uppercase tracking-wider text-steel-400 ${post.frontmatter.coverImage ? "mt-4" : ""}`}
                    >
                      {formatDate(post.frontmatter.date)}
                    </p>

                    <h2 className="mt-3 font-display font-bold text-xl text-steel-100 leading-tight">
                      {post.frontmatter.title}
                    </h2>

                    <p className="mt-2 text-sm text-steel-300 line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>

                    {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

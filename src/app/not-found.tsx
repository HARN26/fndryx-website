import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Signal lost.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-steel-900">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent)",
            }}
          />

          <div className="relative flex min-h-[80vh] items-center justify-center px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-6 font-display font-extrabold text-8xl md:text-9xl leading-none text-fire-400">
                404
              </p>
              <h1 className="mb-6 font-display font-extrabold text-4xl md:text-5xl text-steel-100">
                Signal lost.
              </h1>
              <p className="mx-auto mb-10 max-w-md text-base md:text-lg leading-relaxed text-steel-400">
                The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to capital-readiness.
              </p>
              <Link href="/" className="inline-block">
                <Button variant="primary" className="px-10 py-4 text-base">
                  Back to FNDRYx
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

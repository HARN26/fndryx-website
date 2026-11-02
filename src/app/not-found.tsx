import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Signal lost.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <section className="bg-steel-900 py-24 md:py-36">
          <div className="mx-auto max-w-content px-4 md:px-6">
            <p className="section-label">404</p>
            <h1 className="mt-4 font-display text-h1 font-bold text-steel-100">
              Signal lost.
            </h1>
            <p className="mt-6 max-w-xl font-body text-body text-steel-300">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <Link href="/" className="btn-primary mt-10 px-6 py-3.5 text-base">
              Back to FNDRYx
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

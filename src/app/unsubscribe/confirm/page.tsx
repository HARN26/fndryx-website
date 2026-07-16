import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UnsubscribeForm from "@/components/UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe · FNDRYx",
};

export default async function UnsubscribeConfirm({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { t } = await searchParams;
  const token = typeof t === "string" ? t : null;

  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
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
              <UnsubscribeForm token={token} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

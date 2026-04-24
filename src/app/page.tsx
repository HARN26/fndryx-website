import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-steel-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.15), transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-28 text-center">
        <Logo size="xl" variant="dark" />

        <p className="mx-auto mt-6 max-w-2xl font-body text-sm uppercase tracking-widest text-steel-400">
          The capital-readiness exchange — where every founder signal compounds over time.
        </p>

        <h1 className="mx-auto mt-12 max-w-5xl font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-steel-100">
          The problem isn&apos;t a lack of <span className="text-fire-400">money.</span>{" "}
          It&apos;s a lack of <span className="text-fire-400">infrastructure.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-body text-lg text-steel-400">
          FNDRYx is building the exchange layer that turns founder signals into{" "}
          <span className="text-fire-400">compounding capital-readiness records</span> —
          connecting <span className="text-fire-400">qualified founders</span> to{" "}
          <span className="text-fire-400">aligned capital</span>, systematically.
        </p>

        <div className="mt-10">
          <Button variant="primary" className="px-10 py-4 text-base">
            Request Access
          </Button>
        </div>

        <a
          href="#problem"
          className="mt-8 text-sm text-fire-400 hover:text-fire-300"
        >
          Here&apos;s why ↓
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

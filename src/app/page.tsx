import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Audiences from "@/components/Audiences";
import AntiClaim from "@/components/AntiClaim";
import FounderForgeForm from "@/components/FounderForgeForm";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Problem />
        <HowItWorks />
        <Audiences />
        <AntiClaim />
        <FounderForgeForm />
      </main>
      <Footer />
    </>
  );
}

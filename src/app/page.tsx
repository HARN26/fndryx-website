import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FactsRow from "@/components/FactsRow";
import Gap from "@/components/Gap";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import FounderReport from "@/components/FounderReport";
import GrandRapids from "@/components/GrandRapids";
import AntiClaim from "@/components/AntiClaim";
import FounderForgeForm from "@/components/FounderForgeForm";
import { baseOpenGraph, rssAlternateTypes } from "@/lib/shared-metadata";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: rssAlternateTypes,
  },
  openGraph: {
    ...baseOpenGraph,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FactsRow />
        <Gap />
        <Problem />
        <HowItWorks />
        <FounderReport />
        <GrandRapids />
        <AntiClaim />
        <FounderForgeForm />
      </main>
      <Footer />
    </>
  );
}

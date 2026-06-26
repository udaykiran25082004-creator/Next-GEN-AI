import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { BentoAccordion } from "@/components/landing/BentoAccordion";
import { PricingMatrix } from "@/components/landing/PricingMatrix";
import { SocialProof } from "@/components/landing/SocialProof";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { Loader } from "@/components/landing/Loader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexgrid — AI-native data automation for modern teams" },
      {
        name: "description",
        content:
          "Nexgrid turns event streams into governed, query-ready data with self-healing AI agents, column-level lineage, and sub-50ms ingest. Start free.",
      },
      { property: "og:title", content: "Nexgrid — AI-native data automation" },
      {
        property: "og:description",
        content:
          "Self-healing pipelines, living lineage, and an AI copilot trained on your schema. Built for data teams that ship.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nexgrid — AI-native data automation" },
      {
        name: "twitter:description",
        content: "AI agents that build, govern, and repair your data pipelines.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Nexgrid",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "0",
            highPrice: "299",
          },
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <BentoAccordion />
        <PricingMatrix />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

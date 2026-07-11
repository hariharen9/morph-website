import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/lib/use-lenis";
import { Aurora, CommandMarquee, Hero, Nav } from "@/components/site/Hero";
import { Architecture, CTA, Footer } from "@/components/site/Outro";
import {
  BatchShowcase,
  FeatureBento,
  FormatGraph,
  TerminalDemo,
  WhyMorph,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morph — Convert anything to anything, from the CLI." },
      {
        name: "description",
        content:
          "One command. 66 formats. 1,000+ multi-hop routes. Morph orchestrates ffmpeg, pandoc, Pillow and more behind a single, predictable interface — local-first, no API keys.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Aurora />
      <Nav />
      <main>
        <Hero />
        <CommandMarquee />
        <WhyMorph />
        <FeatureBento />
        <TerminalDemo />
        <FormatGraph />
        <BatchShowcase />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

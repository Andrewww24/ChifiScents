import { Hero } from "@/components/hero/hero";
import { MarqueeBand } from "@/components/marquee-band";
import { GuiaSection } from "@/components/guia-section";
import { Quiz } from "@/components/quiz/quiz";
import { Collection } from "@/components/collection/collection";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBand />
      <GuiaSection />
      <Quiz />
      <Collection />
    </main>
  );
}

import { DesignTheme } from "@/components/ds/theme";
import { Forest } from "@/components/site/Forest";
import { Hero } from "@/components/site/Hero";
import { SectionBreak } from "@/components/site/motifs";
import { TinyDesk } from "@/components/site/TinyDesk";
import { Tour } from "@/components/site/Tour";
import { Tracklist } from "@/components/site/Tracklist";
import { jungle } from "@/lib/design-systems/jungle";

export const metadata = {
  title: "The World Meets Los Mirlos",
  description: "A tribute to the new album by Los Mirlos: psychedelic cumbia from the Amazon.",
};

export default function SitePage() {
  return (
    <DesignTheme system={jungle} className="min-h-screen">
      <main>
        <Hero />
        <SectionBreak variant="fret" />
        <TinyDesk />
        <SectionBreak variant="chakana" />
        <Tracklist />
        <SectionBreak variant="fret" />
        <Forest />
        <SectionBreak variant="chakana" />
        <Tour />
        <SectionBreak variant="fret" />
      </main>
    </DesignTheme>
  );
}

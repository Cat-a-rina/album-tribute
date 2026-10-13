import { Forest } from "@/components/site/Forest";
import { Hero } from "@/components/site/Hero";
import { SectionBreak } from "@/components/site/motifs";
import { Reveal } from "@/components/site/Reveal";
import { SiteShell } from "@/components/site/SiteShell";
import { TinyDesk } from "@/components/site/TinyDesk";
import { Tour } from "@/components/site/Tour";
import { Tracklist } from "@/components/site/Tracklist";

export const metadata = {
  title: "The World Meets Los Mirlos",
  description: "A tribute to the new album by Los Mirlos: psychedelic cumbia from the Amazon.",
};

export default function SitePage() {
  return (
    <SiteShell>
      <main>
        <Hero />
        <SectionBreak variant="fret" />
        <Reveal>
          <TinyDesk />
        </Reveal>
        <SectionBreak variant="chakana" />
        <Reveal>
          <Tracklist />
        </Reveal>
        <SectionBreak variant="fret" />
        <Reveal>
          <Forest />
        </Reveal>
        <SectionBreak variant="chakana" />
        <Reveal>
          <Tour />
        </Reveal>
        <SectionBreak variant="fret" />
      </main>
    </SiteShell>
  );
}

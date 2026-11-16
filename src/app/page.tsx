import { SiteHeader } from "@/components/layout/SiteHeader";
import { IntroSequence } from "@/components/effects/IntroSequence";
import { ScrollAtmosphere } from "@/components/effects/ScrollAtmosphere";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Arsenal } from "@/components/sections/Arsenal";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";
import { ChapterRail } from "@/components/layout/ChapterRail";

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <IntroSequence />
    <ScrollProgress />
    <SiteHeader />
    <ChapterRail />
    <main id="main-content" tabIndex={-1}><Hero/><About/><Arsenal/><Projects/><Journey/><Contact/></main>
    <ScrollAtmosphere />
  </>;
}

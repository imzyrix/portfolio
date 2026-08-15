import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TickerLink from "@/components/TickerLink";
import News from "@/components/News";
import Work from "@/components/Work";
import Studio from "@/components/Studio";
import Vision from "@/components/Vision";
import Platform from "@/components/Platform";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <TickerLink />
      <News />
      <Work />
      <Studio />
      <Vision />
      <Platform />
      <Services />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
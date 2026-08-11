import Header from "../../components/shared/Header";
import Hero from "../../components/sections/Hero";
import TrustBar from "../../components/sections/TrustBar";
import Services from "../../components/sections/Services";
import AIAddons from "@/src/components/sections/AIAddons";
import ImpactBanner from "../../components/sections/ImpactBanner";
import WhyUs from "../../components/sections/WhyUs";
import Work from "../../components/sections/Work";
import Process from "../../components/sections/Process";
import Testimonials from "../../components/sections/Testimonials";
import Contact from "../../components/sections/Contact";
import Footer from "../../components/shared/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <AIAddons />
        <ImpactBanner />
        <WhyUs />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
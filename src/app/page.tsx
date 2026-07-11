import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

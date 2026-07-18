import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import { MapPin, Users, Target, Briefcase, Award, Coffee, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        {/* Hero Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">About us</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#000000] leading-[1.05] tracking-tight max-w-[16ch] mb-6">
                Built for businesses that
                <br />
                <em className="italic-em text-[#000000]">deserve better.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[48ch]">
                The Lateef & Co. is a boutique web studio based in Mumbai, working with
                ambitious businesses across India and internationally. We're small enough
                to care deeply, experienced enough to deliver.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <Reveal>
                <div>
                  <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-medium text-[#000000] leading-tight mb-6">
                    Why "Lateef"?
                  </h2>
                  <p className="body-text text-[0.9375rem] leading-[1.8] text-[#000000] mb-4">
                    Lateef (لطیف) means "gentle" or "kind" in Arabic - a reminder that
                    good design doesn't shout; it invites. We believe the best websites
                    feel effortless, even when there's deep strategy underneath.
                  </p>
                  <p className="body-text text-[0.9375rem] leading-[1.8] text-[#000000]">
                    That's our ethos: thoughtful, precise, and built around people -
                    not just pixels and code.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-medium text-[#000000] leading-tight mb-6">
                    Our approach
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "We start with business outcomes, not design trends",
                      "We work transparently - no hidden costs, no jargon",
                      "We build to last - clean code, scalable architecture",
                      "We stay available - before, during, and after launch",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#000000] mt-2.5 shrink-0" />
                        <span className="text-[0.9375rem] text-[#4A4A4A] font-light leading-[1.6]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 py-20 md:py-32">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <Reveal>
                <div className="relative aspect-square md:aspect-[4/5] rounded-[16px] overflow-hidden bg-[#E8E8EC]">
                  {/* We can use a placeholder or image if available. For now, a clean dark placeholder with text or initial */}
                  <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center">
                    <span className="font-serif text-[6rem] text-[#FFFFFF] opacity-20">L</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <div className="hairline pt-6 mb-8 md:mb-12">
                    <span className="label">The Founder</span>
                  </div>
                  <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-medium text-[#000000] leading-tight mb-2">
                    Lateef Shaikh
                  </h2>
                  <p className="label text-[#8A8A8A] mb-8">Lead Designer & Developer</p>
                  
                  <div className="space-y-6">
                    <p className="body-text text-[0.9375rem] leading-[1.8] text-[#4A4A4A]">
                      With a deep passion for clean aesthetics and functional design, Lateef founded The Lateef & Co. to bridge the gap between beautiful design and business growth.
                    </p>
                    <p className="body-text text-[0.9375rem] leading-[1.8] text-[#4A4A4A]">
                      Having worked with diverse clients globally, he brings a unique perspective to every project - ensuring that each website is not just a digital brochure, but a strategic asset that captures leads and drives revenue.
                    </p>
                    <p className="body-text text-[0.9375rem] leading-[1.8] text-[#4A4A4A]">
                      When he's not crafting web experiences, you'll find him exploring the latest in AI automation and constantly finding new ways to refine the digital landscape.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        {/* Values Section */}
        <section className="px-6 md:px-10 lg:px-16 py-20 md:py-32">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">What we believe</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Heart,
                  title: "Built with care",
                  description:
                    "Every project gets our full attention. No shortcuts, no generic templates - just thoughtful work that's made to last.",
                },
                {
                  icon: Target,
                  title: "Built for results",
                  description:
                    "A beautiful website that doesn't generate enquiries is an expensive art project. We design for outcomes, not just aesthetics.",
                },
                {
                  icon: Coffee,
                  title: "Built with you",
                  description:
                    "We work collaboratively, not in isolation. Your input matters at every stage - it's how we build something you're proud of.",
                },
              ].map((value, i) => {
                const Icon = value.icon;
                return (
                  <Reveal key={value.title} delay={i * 0.08}>
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#000000]" />
                        </div>
                      </div>
                      <h3 className="font-serif text-[1.25rem] font-medium text-[#000000] mb-3">
                        {value.title}
                      </h3>
                      <p className="text-[0.875rem] text-[#4A4A4A] font-light leading-[1.7] max-w-[32ch] mx-auto">
                        {value.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#F5F5F7] py-20 md:py-28 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-medium text-[#000000] leading-[1.1] tracking-tight mb-4">
                  Ready to build something
                  <br />
                  <em className="italic-em text-[#000000]">worth remembering?</em>
                </h2>
                <p className="text-[0.9375rem] text-[#4A4A4A] font-light leading-[1.7] mb-8">
                  Let's talk about your project and see how we can help you stand out.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-8 py-3.5 rounded-[7px] transition-colors duration-300 ease-out bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] cursor-pointer no-underline"
                >
                  Start a conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
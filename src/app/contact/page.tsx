import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import ContactForm from "../../components/forms/ContactForm";
import Reveal from "../../components/animations/Reveal";
import { WHATSAPP_URL, EMAIL } from "../../lib/constants";
import { Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        {/* Hero Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">Get in touch</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#000000] leading-[1.05] tracking-tight max-w-[14ch] mb-6">
                Let's build something
                <br />
                <em className="italic-em text-[#000000]">worth remembering.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[42ch]">
                No sales calls, no proposal decks - just a direct conversation
                about what your business actually needs.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-6 md:px-10 lg:px-16 pb-28 md:pb-36">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Left Column - Contact Info */}
              <div>
                <Reveal>
                  <h2 className="font-serif text-[1.75rem] font-medium text-[#000000] mb-8">
                    Find Out How
                  </h2>
                </Reveal>

                <div className="space-y-6">
                  <Reveal delay={0.05}>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <div className="label text-[#8A8A8A] text-[0.55rem]">
                          WhatsApp
                        </div>
                        <div className="text-[#000000] font-light group-hover:opacity-60 transition-opacity">
                          +91 97692 12600
                        </div>
                      </div>
                    </a>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Mail className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <div className="label text-[#8A8A8A] text-[0.55rem]">
                          Email
                        </div>
                        <div className="text-[#000000] font-light group-hover:opacity-60 transition-opacity">
                          {EMAIL}
                        </div>
                      </div>
                    </a>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <div className="label text-[#8A8A8A] text-[0.55rem]">
                          Based in
                        </div>
                        <div className="text-[#000000] font-light">
                          Mumbai, Maharashtra, India
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <div className="label text-[#8A8A8A] text-[0.55rem]">
                          Working hours
                        </div>
                        <div className="text-[#000000] font-light">
                          Mon-Fri, 10:00 AM - 7:00 PM IST
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.25}>
                  <div className="mt-12 pt-8 hairline">
                    <p className="text-[0.8125rem] text-[#8A8A8A] font-light leading-[1.6]">
                      We typically respond to all inquiries within
                      <br />
                      one business day.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Right Column - Contact Form */}
              <Reveal delay={0.15}>
                <div>
                  <p className="label text-[#8A8A8A] mb-8">Or drop us a note</p>
                  <ContactForm source="website" page="contact" />
                </div>
              </Reveal>
            </div>

            {/* Bottom CTA */}
            <Reveal delay={0.3}>
              <div className="mt-20 pt-8 hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-[1.25rem] font-medium text-[#000000]">
                    Ready to work together?
                  </p>
                  <p className="text-[0.875rem] text-[#4A4A4A] font-light">
                    Let's talk about your project and see how we can help.
                  </p>
                </div>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[7px] transition-colors duration-300 ease-out bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] cursor-pointer no-underline shrink-0"
                >
                  Message us on WhatsApp
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
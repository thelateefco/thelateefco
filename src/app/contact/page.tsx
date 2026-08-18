import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import ContactForm from "../../components/forms/ContactForm";
import Reveal from "../../components/animations/Reveal";
import { WHATSAPP_URL, EMAIL } from "../../lib/constants";
import { Mail, MapPin, Clock, MessageCircle, ArrowRight, ShieldCheck, Zap, UserCheck } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        {/* Hero Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-16">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12 flex items-center justify-between">
                <span className="label">Get in touch</span>
                <span className="text-[0.75rem] font-mono text-[#8A8A8A]">DIRECT CONTACT</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#000000] leading-[1.05] tracking-tight max-w-[16ch] mb-6">
                Let's build something
                <br />
                <em className="italic font-sans font-bold text-[#000000]">worth remembering.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[48ch]">
                No pushy sales calls, no bloated proposal decks — just a direct, honest conversation about what your business actually needs.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Main Contact Content */}
        <section className="px-6 md:px-10 lg:px-16 pb-28 md:pb-36">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column - Contact Info & Guarantees (5 cols on lg) */}
              <div className="md:col-span-5 space-y-10">
                <div>
                  <Reveal>
                    <span className="text-[0.6875rem] font-sans font-semibold tracking-[0.18em] uppercase text-[#8A8A8A] block mb-2">
                      DIRECT CONNECT
                    </span>
                    <h2 className="font-sans text-[1.75rem] md:text-[2rem] font-bold text-[#000000] tracking-tight mb-6">
                      Prefer instant messaging?
                    </h2>
                  </Reveal>

                  {/* Direct Contact Cards */}
                  <div className="space-y-4">
                    <Reveal delay={0.05}>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 rounded-2xl bg-[#F9F9FB] border border-[#E0E0E4] hover:border-[#140f0a]/30 hover:shadow-sm transition-all duration-300 no-underline"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#140f0a] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[0.875rem] font-bold text-[#140f0a]">WhatsApp Direct</span>
                            </div>
                            <div className="text-[0.8125rem] text-[#4A4A4A] font-light">
                              +91 97692 12600
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#140f0a] transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-[#F9F9FB] border border-[#E0E0E4] hover:border-[#140f0a]/30 hover:shadow-sm transition-all duration-300 no-underline"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#140f0a] text-white flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[0.875rem] font-bold text-[#140f0a]">Email Us</span>
                            <div className="text-[0.8125rem] text-[#4A4A4A] font-light">
                              {EMAIL}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#140f0a] transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#1A1A1A]/5">
                          <div className="flex items-center gap-2 text-[#8A8A8A] text-[0.7rem] uppercase font-semibold mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Location</span>
                          </div>
                          <div className="text-[0.8125rem] text-[#140f0a] font-medium">
                            Mumbai, India
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#F5F5F7] border border-[#1A1A1A]/5">
                          <div className="flex items-center gap-2 text-[#8A8A8A] text-[0.7rem] uppercase font-semibold mb-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Hours</span>
                          </div>
                          <div className="text-[0.8125rem] text-[#140f0a] font-medium">
                            Mon-Fri (IST)
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* Why Work With Us Box */}
                <Reveal delay={0.2}>
                  <div className="bg-[#140f0a] text-white rounded-2xl p-6 space-y-4">
                    <span className="text-[0.7rem] font-mono tracking-widest uppercase text-[#8A8A8A] block">
                      WHY WORK WITH US
                    </span>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <UserCheck className="w-4 h-4 text-white shrink-0 mt-1" />
                        <div>
                          <h3 className="text-[0.875rem] font-bold text-white!">Direct Founder Communication</h3>
                          <p className="text-[0.78rem] text-[#A0A0A0] font-light">Speak directly to the lead engineer who builds your product.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-white shrink-0 mt-1" />
                        <div>
                          <h3 className="text-[0.875rem] font-bold text-white!">Rapid 4-6 Week Launch</h3>
                          <p className="text-[0.78rem] text-[#A0A0A0] font-light">Efficient milestone sprints without unnecessary delays.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-1" />
                        <div>
                          <h3 className="text-[0.875rem] font-bold text-white!">30 Days Post-Launch Support</h3>
                          <p className="text-[0.78rem] text-[#A0A0A0] font-light">Included free maintenance and technical peace of mind.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column - Interactive Contact Form (7 cols on lg) */}
              <div className="md:col-span-7">
                <Reveal delay={0.1}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[0.6875rem] font-sans font-semibold tracking-[0.18em] uppercase text-[#8A8A8A] block mb-1">
                        QUICK PROJECT INQUIRY
                      </span>
                      <h2 className="font-sans text-[1.75rem] md:text-[2rem] font-bold text-[#000000] tracking-tight">
                        Tell us about your project
                      </h2>
                    </div>

                    {/* Interactive Form Component */}
                    <ContactForm source="website" page="contact" />
                  </div>
                </Reveal>
              </div>

            </div>

            {/* Bottom Callout Bar */}
            <Reveal delay={0.25}>
              <div className="mt-20 pt-8 border-t border-[#E0E0E4] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-sans text-[1.25rem] font-bold text-[#000000]">
                    Need a custom timeline or quote?
                  </h3>
                  <p className="text-[0.875rem] text-[#4A4A4A] font-light">
                    Send a quick WhatsApp message to get an estimated estimate within 1 hour.
                  </p>
                </div>

                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#140f0a] text-white font-sans text-[0.8125rem] font-semibold tracking-wide hover:bg-[#1A1A1A] transition-all duration-300 no-underline cursor-pointer shrink-0 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
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
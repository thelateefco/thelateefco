import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import Link from "next/link";
import { ArrowRight, Globe, Code, Bot, Sparkles, Zap, Shield } from "lucide-react";

const services = [
  {
    id: "business-automation",
    number: "01",
    title: "Business Automation",
    icon: Zap,
    description:
      "Eliminate manual busywork by automating your lead capture, follow-ups, and internal operations end-to-end. From CRM sync to email automation, we build systems that run themselves.",
    features: [
      "Lead Capture & CRM Sync",
      "Email & DM Automation",
      "Process & Ops Automation",
      "Workflow Optimization",
    ],
  },
  {
    id: "web-dev-engineering",
    number: "02",
    title: "Web Dev & Engineering",
    icon: Code,
    description:
      "Fast, scalable, production-grade websites and web apps built on modern frameworks like Next.js and React. No bloated templates - just clean, performant code that's secure and easy to grow.",
    features: [
      "Next.js & React Builds",
      "Performance Optimization",
      "CMS & Backend Integration",
      "TypeScript & Type Safety",
    ],
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    icon: Bot,
    description:
      "Embed AI directly into your business - from smart chat agents to content and workflow tools your customers actually use. We turn ambiguous AI ideas into production features your users trust.",
    features: [
      "AI Chat & Support Agents",
      "Custom AI Features",
      "Workflow Automation with AI",
      "Content Generation Pipelines",
    ],
  },
  {
    id: "brand-strategy",
    number: "04",
    title: "Brand Strategy",
    icon: Sparkles,
    description:
      "Before we write a single line of code, we define who you are, who you're speaking to, and what you want them to feel. A clear brand strategy ensures your website doesn't just look good - it connects.",
    features: [
      "Strategy & Positioning",
      "Audience Definition",
      "Storytelling & Messaging",
      "Visual Identity",
    ],
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects take 4-6 weeks from kickoff to launch. We start with a discovery week, then 2-3 weeks of design and development, followed by a launch week. Timelines vary based on project scope.",
  },
  {
    question: "What does your process look like?",
    answer:
      "We follow a structured 4-phase process: Discovery (understand your business), Design (create in the browser), Build (develop in parallel with design), and Launch (deploy and support).",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. We provide 30 days of free post-launch support. For ongoing needs, we offer monthly retainer packages for maintenance, updates, and continuous improvement.",
  },
  {
    question: "What's the investment range?",
    answer:
      "Projects typically start from ₹1.5L for a comprehensive website. Complex projects with AI integrations or custom applications start from ₹3L. We'll provide a detailed quote after discovery.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        {/* Hero Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">What we do</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#000000] leading-[1.05] tracking-tight max-w-[14ch] mb-6">
                Services that
                <br />
                <em className="italic-em text-[#000000]">actually deliver.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[42ch]">
                We don't just build websites - we build digital assets that grow your business.
                Here's what we specialize in.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services List */}
        <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
          <div className="max-w-[1280px] mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.id} delay={i * 0.08}>
                  <div className="grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10 py-12 md:py-16 hairline group">
                    {/* Number */}
                    <div className="flex items-start gap-4">
                      <span className="label text-[#8A8A8A]">{service.number}</span>
                      <Icon className="w-5 h-5 text-[#000000] md:hidden" />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-5 h-5 text-[#000000] hidden md:block" />
                        <h2 className="font-serif text-[2rem] md:text-[2.5rem] font-medium text-[#000000] leading-tight">
                          {service.title}
                        </h2>
                      </div>
                      <p className="body-text text-[0.9375rem] leading-[1.8] max-w-[44ch]">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-[0.875rem] text-[#4A4A4A] font-light">
                            <span className="w-1 h-1 rounded-full bg-[#000000]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <div className="hairline" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#F5F5F7] py-20 md:py-32 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12 md:mb-16">
                <span className="label">Questions? We've got answers.</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.08}>
                  <div>
                    <h3 className="font-serif text-[1.25rem] font-medium text-[#000000] mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-[#4A4A4A] text-[0.9375rem] font-light leading-[1.8]">
                      {faq.answer}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-16 pt-8 hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[#4A4A4A] text-[0.9375rem] font-light">
                  Ready to discuss your project?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] cursor-pointer no-underline"
                >
                  Get in touch
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
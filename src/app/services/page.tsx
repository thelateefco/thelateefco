import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Bot,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Check,
} from "lucide-react";

const services = [
  {
    id: "business-automation",
    number: "01",
    title: "Business Automation",
    icon: Zap,
    description:
      "Eliminate manual busywork by automating your lead capture, follow-ups, and internal operations end-to-end. From CRM sync to automated email/WhatsApp sequences, I build custom systems that run themselves.",
    howItHelps:
      "Saves 15+ hours of manual labor every week, eliminates human error, and ensures zero missed inquiries — converting leads into paying clients instantly even while you sleep.",
    impactBadge: "15+ Hrs/Week Saved",
    features: [
      {
        name: "Lead Capture & CRM Sync",
        whatItDoes: "Captures form & chat submissions instantly and pushes them directly into your CRM (HubSpot, Notion, Airtable, or custom DB).",
        benefit: "No lost leads, instant team notifications, and centralized customer data.",
      },
      {
        name: "Email & WhatsApp Sequences",
        whatItDoes: "Triggers personalized multi-step follow-up sequences immediately after a lead expresses interest.",
        benefit: "3x faster response time and dramatically higher conversion rates.",
      },
      {
        name: "Process & Ops Automation",
        whatItDoes: "Automates repetitive back-office tasks like invoice generation, client onboarding, and file routing.",
        benefit: "Frees up your time to focus on business growth instead of admin tasks.",
      },
      {
        name: "Workflow Optimization",
        whatItDoes: "Connects your disparate tools (Stripe, WhatsApp, Gmail, Slack, Google Sheets) into one unified system.",
        benefit: "Seamless operations without paying for expensive enterprise software.",
      },
    ],
  },
  {
    id: "web-dev-engineering",
    number: "02",
    title: "Web Dev & Engineering",
    icon: Code,
    description:
      "Fast, scalable, production-grade websites and web apps built on modern frameworks like Next.js 15, React, and Tailwind CSS. No bloated templates or slow WordPress plugins — just clean, secure, performant code.",
    howItHelps:
      "Sub-second page loading dramatically improves Google SEO rankings, lowers bounce rates, and turns twice as many site visitors into paying clients.",
    impactBadge: "Sub-Second Page Load",
    features: [
      {
        name: "Next.js & React Builds",
        whatItDoes: "Custom web applications engineered with modern server-side rendering and static generation.",
        benefit: "Lightning-fast speed, maximum security, and infinite scalability.",
      },
      {
        name: "Performance & SEO Optimization",
        whatItDoes: "Obsessive optimization for Core Web Vitals, mobile responsiveness, and technical SEO structure.",
        benefit: "Higher Google rankings and instant site load times across all devices.",
      },
      {
        name: "CMS & Backend Integration",
        whatItDoes: "Headless CMS integration so your team can edit content easily without touching code.",
        benefit: "Complete control over website content with zero technical debt.",
      },
      {
        name: "TypeScript & Production Safety",
        whatItDoes: "Built with strict type checking and modern architecture standards.",
        benefit: "Bulletproof stability, zero unexpected crashes, and easy future feature expansion.",
      },
    ],
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    icon: Bot,
    description:
      "Embed practical AI directly into your business — from custom trained 24/7 support chatbots to automated lead scoring and content generation engines tailored specifically to your company.",
    howItHelps:
      "Engages site visitors 24/7, pre-qualifies high-ticket leads before they hit your calendar, and automates content production without increasing team headcount.",
    impactBadge: "24/7 Lead Capture & Support",
    features: [
      {
        name: "AI Chat & Support Agents",
        whatItDoes: "Custom RAG AI chatbots trained directly on your business documents, FAQs, and service details.",
        benefit: "Answers customer queries accurately in seconds without human intervention.",
      },
      {
        name: "Intelligent Lead Scoring",
        whatItDoes: "Analyzes lead responses and behavior to automatically score and highlight your highest-value prospects.",
        benefit: "Your sales team focuses only on deals most likely to close.",
      },
      {
        name: "AI Workflow Automation",
        whatItDoes: "Connects LLMs into your daily workflows to summarize inquiries, generate quotes, or process data automatically.",
        benefit: "Reduces client response times from hours to seconds.",
      },
      {
        name: "Content Generation Pipelines",
        whatItDoes: "Automated pipelines for blog posts, social snippets, and email copy crafted in your exact brand voice.",
        benefit: "Consistent marketing output with minimal effort.",
      },
    ],
  },
  {
    id: "brand-strategy",
    number: "04",
    title: "Brand Strategy",
    icon: Sparkles,
    description:
      "Before writing a single line of code, we define your core value proposition, target customer persona, and brand voice. Clear strategy ensures your website doesn't just look pretty — it persuades and converts.",
    howItHelps:
      "Positions your business as the premier leader in your industry, builds instant market trust, and justifies higher pricing than your competitors.",
    impactBadge: "Premium Market Positioning",
    features: [
      {
        name: "Strategy & Market Positioning",
        whatItDoes: "Deep dive into your competitive landscape to find your unique advantage and messaging angle.",
        benefit: "Stand out immediately in crowded markets.",
      },
      {
        name: "Target Audience Mapping",
        whatItDoes: "Pinpoint customer pain points, desires, and buying triggers.",
        benefit: "Website messaging directly addresses what your ideal clients care about.",
      },
      {
        name: "Copywriting & Storytelling",
        whatItDoes: "High-converting sales copy written specifically to guide visitors toward booking or buying.",
        benefit: "Higher conversion rates and lower customer acquisition costs.",
      },
      {
        name: "Visual Identity & Design System",
        whatItDoes: "Clean typography, bespoke color palette, and UI components tailored to your brand archetype.",
        benefit: "A cohesive, high-end digital presence across all customer touchpoints.",
      },
    ],
  },
];

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects take 4-6 weeks from kickoff to launch. I start with a discovery week, then 2-3 weeks of design and development, followed by a launch week. Timelines vary based on project scope.",
  },
  {
    question: "What does your process look like?",
    answer:
      "I follow a structured 4-phase process: Discovery (understand your business), Design (create in the browser), Build (develop in parallel with design), and Launch (deploy and support).",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. I provide 30 days of free post-launch support. For ongoing needs, I offer monthly retainer packages for maintenance, updates, and continuous improvement.",
  },
  {
    question: "What's the investment range?",
    answer:
      "Projects typically start from ₹25k for a focused 3-4 page site. AI automations and integrations start from ₹40k, and custom applications or advanced AI agent work start from ₹80k. I'll provide a detailed quote after discovery.",
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
              <div className="hairline pt-6 mb-12 flex items-center justify-between">
                <span className="label">What I do</span>
                <span className="text-[0.75rem] font-mono text-[#8A8A8A]">4 CORE DISCIPLINES</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#000000] leading-[1.05] tracking-tight max-w-[16ch] mb-6">
                Services that
                <br />
                <em className="italic font-sans font-bold text-[#000000]">actually deliver.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[48ch]">
                I don't just build websites — I build high-performing digital assets that automate operations, capture leads, and grow your revenue. Here is exactly what I build and how it helps your business.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Detailed Services Breakdown */}
        <section className="px-6 md:px-10 lg:px-16 pb-20 md:pb-32">
          <div className="max-w-[1280px] mx-auto space-y-16 md:space-y-24">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.id} delay={i * 0.05}>
                  <div
                    id={service.id}
                    className="scroll-mt-32 border border-[#E0E0E4] rounded-[24px] p-6 sm:p-10 md:p-12 bg-[#FFFFFF] shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.05)] hover:border-[#140f0a]/20"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EAEAEF]">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[1.125rem] font-semibold text-[#8A8A8A]">
                          {service.number}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] border border-[#1A1A1A]/10 flex items-center justify-center text-[#140f0a]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h2 className="font-sans text-[1.75rem] md:text-[2.25rem] font-bold text-[#000000] tracking-tight">
                          {service.title}
                        </h2>
                      </div>

                      <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-[#140f0a]/5 border border-[#140f0a]/15 text-[#140f0a] text-[0.75rem] font-sans font-semibold tracking-wide">
                        {service.impactBadge}
                      </span>
                    </div>

                    {/* What it is & How it helps Grid */}
                    <div className="grid md:grid-cols-12 gap-8 mb-10">
                      {/* Left: What it is */}
                      <div className="md:col-span-6 space-y-3">
                        <span className="text-[0.6875rem] font-sans font-semibold tracking-[0.15em] uppercase text-[#8A8A8A] block">
                          WHAT IT IS
                        </span>
                        <p className="text-[0.95rem] md:text-[1.03rem] text-[#2C2C2C] font-light leading-[1.7]">
                          {service.description}
                        </p>
                      </div>

                      {/* Right: How it helps your business */}
                      <div className="md:col-span-6 bg-[#F9F9FB] rounded-[16px] p-6 border border-[#EAEAEF] space-y-3">
                        <div className="flex items-center gap-2 text-[#140f0a]">
                          <TrendingUp className="w-4 h-4 text-[#140f0a]" />
                          <span className="text-[0.6875rem] font-sans font-semibold tracking-[0.15em] uppercase">
                            HOW IT HELPS YOUR BUSINESS
                          </span>
                        </div>
                        <p className="text-[0.9375rem] text-[#140f0a] font-medium leading-[1.65]">
                          {service.howItHelps}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Features List */}
                    <div className="pt-8 border-t border-[#EAEAEF]">
                      <span className="text-[0.6875rem] font-sans font-semibold tracking-[0.15em] uppercase text-[#8A8A8A] block mb-6">
                        KEY DELIVERABLES & FEATURES
                      </span>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {service.features.map((feat) => (
                          <div
                            key={feat.name}
                            className="bg-[#F5F5F7]/60 rounded-[14px] p-5 border border-[#1A1A1A]/5 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-[#140f0a] shrink-0" />
                                <h3 className="font-sans text-[0.9375rem] font-bold text-[#140f0a]">
                                  {feat.name}
                                </h3>
                              </div>
                              <p className="text-[0.8125rem] text-[#4A4A4A] font-light leading-[1.6] mb-3">
                                {feat.whatItDoes}
                              </p>
                            </div>

                            <div className="pt-2.5 border-t border-[#1A1A1A]/6 flex items-start gap-1.5 text-[0.78rem] text-[#140f0a] font-medium">
                              <span className="text-[#140f0a] font-bold">✓ Impact:</span>
                              <span>{feat.benefit}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-6 border-t border-[#EAEAEF] flex justify-end">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#140f0a] text-white font-sans text-[0.8125rem] font-semibold tracking-wide hover:bg-[#1A1A1A] transition-all duration-300 no-underline cursor-pointer"
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#F5F5F7] py-20 md:py-32 px-6 md:px-10 lg:px-16 border-t border-[#E0E0E4]">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12 md:mb-16">
                <span className="label">Questions? I've got answers.</span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.08}>
                  <div>
                    <h3 className="font-sans text-[1.25rem] font-bold text-[#000000] mb-3">
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
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-3.5 rounded-[7px] transition-colors duration-300 ease-out bg-[#140f0a] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] cursor-pointer no-underline"
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
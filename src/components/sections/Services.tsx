"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap, Code2, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Reveal from "../animations/Reveal";

const services = [
  {
    id: "business-automation",
    number: "01",
    title: "Business Automation",
    icon: Zap,
    badgeColor: "from-amber-500/20 to-orange-500/20 text-amber-600 border-amber-500/30",
    glowColor: "group-hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)]",
    accentBorder: "group-hover:border-amber-500/40",
    description:
      "Eliminate manual busywork by automating your lead capture, follow-ups, and internal operations end-to-end. From CRM sync to email automation, I build systems that run themselves.",
    tags: ["Lead Capture", "CRM Sync", "Email Automation", "Operations"],
    highlights: ["24/7 Automated Lead Ingestion", "Instant Multi-channel CRM Sync", "Zero-effort Email Workflows"],
    image: "/images/services/businessauto.jpg",
    imageAlt: "Business Automation Process",
  },
  {
    id: "web-dev-engineering",
    number: "02",
    title: "Web Dev & Engineering",
    icon: Code2,
    badgeColor: "from-blue-500/20 to-cyan-500/20 text-blue-600 border-blue-500/30",
    glowColor: "group-hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]",
    accentBorder: "group-hover:border-blue-500/40",
    description:
      "Fast, scalable, production-grade websites and web apps built on modern frameworks like Next.js and React. No bloated templates - just clean, performant code that's secure and easy to grow.",
    tags: ["Next.js", "React", "TypeScript", "Performance", "AI", "Design"],
    highlights: ["Sub-second Page Load Speeds", "Modern Next.js 15+ Architecture", "SEO & Conversion Optimized"],
    image: "/images/services/webdeveng.jpg",
    imageAlt: "Web Development Process",
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    icon: Sparkles,
    badgeColor: "from-purple-500/20 to-pink-500/20 text-purple-600 border-purple-500/30",
    glowColor: "group-hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)]",
    accentBorder: "group-hover:border-purple-500/40",
    description:
      "Embed AI directly into your business - from smart chat agents to content and workflow tools your customers actually use. I turn ambiguous AI ideas into production features your users trust.",
    tags: ["AI Chat", "Custom AI", "Workflow Automation", "Smart Agents"],
    highlights: ["Custom RAG & Knowledge Bots", "Intelligent Lead Scoring", "Automated Content Pipelines"],
    image: "/images/services/aiintegrate.jpg",
    imageAlt: "AI Integration Process",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#F5F5F7] px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden relative"
      style={{ 
        paddingTop: "clamp(3rem, 8vh, 6rem)", 
        paddingBottom: "clamp(4rem, 10vh, 8rem)" 
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md bg-[#140f0a]/5 border border-[#140f0a]/10 text-[#140f0a] text-[0.75rem] font-mono tracking-wider uppercase">
                What I do
              </span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <Reveal delay={0.05}>
                <h2 className="font-sans text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-[#140f0a] leading-[1.1] tracking-tight">
                  I don&apos;t just build websites — <br className="hidden sm:inline" />
                  <em className="italic font-sans font-light text-[#555]">I build digital assets that grow your business.</em>
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-4">
              <Reveal delay={0.1}>
                <p className="text-[0.95rem] md:text-[1rem] text-[#4A4A4A] font-light leading-[1.65]">
                  End-to-end engineering, intelligent automations, and bespoke AI solutions designed for high performance and revenue impact.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* 3-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative"
              >
                <div
                  className={`
                    h-full flex flex-col justify-between bg-white rounded-[20px] 
                    p-6 sm:p-7 border border-[#E0E0E4] 
                    transition-all duration-500 hover:-translate-y-2
                    shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                    ${service.glowColor} ${service.accentBorder}
                    relative overflow-hidden
                  `}
                >
                  {/* Top Image Preview Card */}
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-[14px] overflow-hidden mb-6 bg-[#140f0a]">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a]/80 via-[#140f0a]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Number Badge Top-Left */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/20 text-white font-mono text-[0.75rem] font-medium tracking-wider">
                          {service.number}
                        </span>
                      </div>

                      {/* Icon Badge Top-Right */}
                      <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-md bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-sans text-[1.35rem] sm:text-[1.45rem] font-bold text-[#140f0a] tracking-tight transition-colors duration-300 group-hover:text-[#000]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[0.875rem] text-[#4A4A4A] font-light leading-[1.65] mb-5">
                      {service.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      {service.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-[0.8125rem] text-[#2C2C2C] font-normal">
                          <CheckCircle2 className="w-4 h-4 text-[#140f0a] shrink-0 opacity-80" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Footer: Tags & Action */}
                  <div className="pt-5 border-t border-[#EAEAEF]">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#F0F0F4] text-[#4A4A4A] text-[0.6875rem] font-medium tracking-wide uppercase transition-colors duration-300 group-hover:bg-[#140f0a] group-hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Link CTA */}
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#140f0a] hover:opacity-80 transition-opacity"
                    >
                      <span>Explore service details</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
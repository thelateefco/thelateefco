"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Reveal from "../animations/Reveal";

const services = [
  {
    id: "business-automation",
    number: "01",
    title: "Business Automation",
    description:
      "Eliminate manual busywork by automating your lead capture, follow-ups, and internal operations end-to-end. From CRM sync to email automation, we build systems that run themselves.",
    tags: ["Lead Capture", "CRM Sync", "Email Automation", "Operations"],
    image: "/images/services/businessauto.jpg",
    imageAlt: "Business Automation Process",
  },
  {
    id: "web-dev-engineering",
    number: "02",
    title: "Web Dev & Engineering",
    description:
      "Fast, scalable, production-grade websites and web apps built on modern frameworks like Next.js and React. No bloated templates — just clean, performant code that's secure and easy to grow.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    image: "/images/services/webdeveng.jpg",
    imageAlt: "Web Development Process",
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    description:
      "Embed AI directly into your business — from smart chat agents to content and workflow tools your customers actually use. We turn ambiguous AI ideas into production features your users trust.",
    tags: ["AI Chat", "Custom AI", "Workflow Automation", "Smart Agents"],
    image: "/images/services/aiintegrate.jpg",
    imageAlt: "AI Integration Process",
  }
  // {
  //   id: "brand-strategy",
  //   number: "04",
  //   title: "Brand Strategy",
  //   description:
  //     "Before we write a single line of code, we define who you are, who you're speaking to, and what you want them to feel. A clear brand strategy ensures your website doesn't just look good — it connects.",
  //   tags: ["Strategy", "Positioning", "Audience", "Storytelling"],
  //   image: "/images/services/brand-strategy.jpg",
  //   imageAlt: "Brand Strategy Process",
  // },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Auto-change every 6 seconds
  useEffect(() => {
    if (!isAutoRotating) return;
    
    timerRef.current = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (activeIndex + 1) % services.length;
        handleToggle(nextIndex);
      }
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAutoRotating, activeIndex, isTransitioning]);

  const handleToggle = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 10000);
  };

  const activeService = services[activeIndex];

  return (
    <section
      id="services"
      className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 overflow-hidden"
      style={{ 
        paddingTop: "clamp(4rem, 12vh, 7rem)", 
        paddingBottom: "clamp(6rem, 16vh, 10rem)" 
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-6 mb-12 md:mb-16 hairline pt-6">
            <span className="label">What we do</span>
          </div>
        </Reveal>

        <div className="relative w-full" style={{ minHeight: "600px" }}>
          <div className="grid md:grid-cols-2 gap-10 md:gap-30">
            {/* Left Column - Heading + Accordion */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              {/* Heading */}
              <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                <p className="text-[0.9375rem] text-[#4A4A4A] font-light leading-[1.7] max-w-[38ch]">
                  We don't just build websites — we build digital assets that grow your business.
                </p>
              </motion.div>

              {/* Accordion Items - FIXED HEIGHT CONTAINER */}
              <div className="flex flex-col gap-3">
                {services.map((service, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <motion.div
                      key={service.id}
                      variants={itemVariants}
                      className="relative"
                      style={{
                        height: "auto",
                        minHeight: "80px",
                      }}
                    >
                      <motion.button
                        onClick={() => handleToggle(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`w-full text-left p-5 md:p-6 rounded-[12px] transition-all duration-700 ease-in-out ${
                          isActive
                            ? "bg-[#1A1A1A] text-[#F5F5F7] shadow-[0_4px_24px_rgba(26,26,26,0.15)]"
                            : "bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F7] hover:shadow-[0_2px_12px_rgba(26,26,26,0.04)] border border-[#E8E8EC]"
                        }`}
                        style={{
                          transform: isActive ? "scale(1)" : "scale(1)",
                        }}
                      >
                        {/* Header - ALWAYS VISIBLE, DOESN'T MOVE */}
                        <div className="flex items-center justify-between gap-4">
                          <span
                            className={`font-serif text-[1.1rem] md:text-[1.25rem] font-medium transition-all duration-700 ease-in-out ${
                              isActive ? "text-[#F5F5F7]" : "text-[#000000]"
                            }`}
                          >
                            {service.title}
                          </span>
                          <span
                            className={`font-serif text-[1.1rem] md:text-[1.25rem] font-medium transition-all duration-700 ease-in-out ${
                              isActive ? "text-[#FFFFFF]" : "text-[#8A8A8A]"
                            }`}
                          >
                            {service.number}
                          </span>
                        </div>

                        {/* Content - ANIMATES INSIDE WITHOUT MOVING HEADER */}
                        <div className="overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0,
                              height: isActive ? "auto" : 0,
                              marginTop: isActive ? 16 : 0,
                              transition: {
                                duration: 0.6,
                                ease: [0.25, 0.1, 0.25, 1],
                                opacity: {
                                  duration: 0.5,
                                  delay: isActive ? 0.1 : 0,
                                },
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-1">
                              <p className="text-[0.875rem] leading-[1.7] text-[#D0D0D5] font-light line-clamp-3">
                                {service.description}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {service.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-1 bg-[#2A2A2A] text-[#F5F5F7] rounded-full text-[0.5rem] font-medium tracking-[0.06em] uppercase"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative order-first md:order-last"
            >
              <div className="sticky top-32 md:top-50">
                <div className="relative aspect-[3/2] w-full rounded-[12px] overflow-hidden bg-[#D0D0D5]/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute inset-0"
                      transition={{
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {activeService?.image ? (
                        <Image
                          src={activeService.image}
                          alt={activeService.imageAlt || activeService.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8A8A8A] text-sm font-light">
                          Image coming soon
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 to-transparent pointer-events-none" />

                  {/* Number overlay */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <span className="font-serif text-[3rem] md:text-[4.5rem] font-medium text-[#FFFFFF]/10">
                      {activeService?.number}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
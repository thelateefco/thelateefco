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
      "Fast, scalable, production-grade websites and web apps built on modern frameworks like Next.js and React. No bloated templates - just clean, performant code that's secure and easy to grow.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    image: "/images/services/webdeveng.jpg",
    imageAlt: "Web Development Process",
  },
  {
    id: "ai-integration",
    number: "03",
    title: "AI Integration",
    description:
      "Embed AI directly into your business - from smart chat agents to content and workflow tools your customers actually use. We turn ambiguous AI ideas into production features your users trust.",
    tags: ["AI Chat", "Custom AI", "Workflow Automation", "Smart Agents"],
    image: "/images/services/aiintegrate.jpg",
    imageAlt: "AI Integration Process",
  },
];

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

const imageFadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeService = services[activeIndex];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoRotating) return;
    
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isAutoRotating]);

  const handleCardClick = (index: number) => {
    setIsAutoRotating(false);
    setActiveIndex(index);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 8000);
  };

  return (
    <section
      id="services"
      className="bg-[#F5F5F7] px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
      style={{ 
        paddingTop: "clamp(3rem, 10vh, 7rem)", 
        paddingBottom: "clamp(4rem, 12vh, 10rem)" 
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-between gap-6 mb-8 md:mb-14 hairline pt-6">
            <span className="label">What we do</span>
          </div>
        </Reveal>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {/* Left Column - Desktop Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden md:block order-1"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-[0.9375rem] text-[#4A4A4A] font-light leading-[1.7] max-w-[38ch]">
                We don't just build websites - we build digital assets that grow your business.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-[#D0D0D5]/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={imageFadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.imageAlt || activeService.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                  <span className="font-serif text-[3rem] md:text-[4.5rem] font-medium text-[#FFFFFF]/10">
                    {activeService.number}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Cards with Section Background */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            {/* Mobile: Mini Image with overlay */}
            <motion.div variants={itemVariants} className="md:hidden mb-6">
              <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#D0D0D5]/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={imageFadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={activeService.imageAlt || activeService.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-[#000000]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[#FFFFFF] font-serif text-lg font-medium">
                    {activeService.title}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="font-serif text-[2rem] font-medium text-[#FFFFFF]/20">
                    {activeService.number}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4 md:gap-5">
              {services.map((service, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    onClick={() => handleCardClick(index)}
                    className={`
                      w-full text-left p-4 sm:p-5 md:p-6 rounded-[14px] 
                      transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? "bg-[#140f0a] text-[#F5F5F7] border  shadow-[0_4px_24px_rgba(26,26,26,0.15)]" 
                        : "bg-[#F5F5F7] text-[#000000]  shadow-[8px_8px_16px_#e0e0e4,_-8px_-8px_16px_#ffffff] hover:shadow-[6px_6px_12px_#e0e0e4,_-6px_-6px_12px_#ffffff] hover:border-[#D0D0D5]"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-serif text-[1rem] sm:text-[1.1rem] md:text-[1.25rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#F5F5F7]" : "text-[#000000]"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span
                        className={`font-serif text-[1rem] sm:text-[1.1rem] md:text-[1.25rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#FFFFFF]" : "text-[#8A8A8A]"
                        }`}
                      >
                        {service.number}
                      </span>
                    </div>

                    <div className="mt-1.5 md:mt-2">
                      <p className={`text-[0.8125rem] sm:text-[0.875rem] leading-[1.6] transition-colors duration-300 ${
                        isActive ? "text-[#D0D0D5]" : "text-[#4A4A4A]"
                      }`}>
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {service.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-full text-[0.45rem] sm:text-[0.5rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300 ${
                              isActive 
                                ? "bg-[#2A2A2A] text-[#F5F5F7]" 
                                : "bg-[#E8E8EC] text-[#4A4A4A] shadow-[inset_2px_2px_4px_#d0d0d4"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile indicator dots */}
            <div className="flex justify-center gap-2 mt-5 md:hidden">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-[#1f0f0a] w-5"
                      : "bg-[#D0D0D5] hover:bg-[#8A8A8A]"
                  }`}
                  aria-label={`Show ${services[index].title}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
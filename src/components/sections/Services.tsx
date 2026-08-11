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
      "Eliminate manual busywork by automating your lead capture, follow-ups, and internal operations end-to-end. From CRM sync to email automation, I build systems that run themselves.",
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
      "Embed AI directly into your business - from smart chat agents to content and workflow tools your customers actually use. I turn ambiguous AI ideas into production features your users trust.",
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
            <span className="label">What I do</span>
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
                I don't just build websites - I build digital assets that grow your business.
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
            <div className="flex flex-col gap-4 md:gap-5">
              {services.map((service, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    onClick={() => handleCardClick(index)}
                    className={`
                      w-full text-left p-5 md:p-6 rounded-[16px] 
                      transition-all duration-300 cursor-pointer overflow-hidden
                      ${isActive 
                        ? "bg-[#140f0a] text-[#F5F5F7] shadow-[0_8px_30px_rgba(20,15,10,0.25)] border border-[#2A241F]" 
                        : "bg-[#F5F5F7] text-[#000000] shadow-[8px_8px_18px_#e0e0e4,_-8px_-8px_18px_#ffffff] hover:shadow-[6px_6px_14px_#e0e0e4,_-6px_-6px_14px_#ffffff] border border-transparent"
                      }
                    `}
                  >
                    {/* Header: Title & Number */}
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-serif text-[1.125rem] md:text-[1.25rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#F5F5F7]" : "text-[#000000]"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span
                        className={`font-serif text-[1.125rem] md:text-[1.25rem] font-medium transition-colors duration-300 ${
                          isActive ? "text-[#FFFFFF]" : "text-[#8A8A8A]"
                        }`}
                      >
                        {service.number}
                      </span>
                    </div>

                    {/* Mobile Image preview directly inside active card */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="md:hidden mt-3.5 mb-1 overflow-hidden"
                        >
                          <div className="relative w-full aspect-[16/9] rounded-[10px] overflow-hidden shadow-inner">
                            <Image
                              src={service.image}
                              alt={service.imageAlt || service.title}
                              fill
                              className="object-cover"
                              sizes="100vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Description & Tags */}
                    <div className="mt-2.5">
                      <p className={`text-[0.85rem] md:text-[0.875rem] leading-[1.65] transition-colors duration-300 ${
                        isActive ? "text-[#D0D0D5]" : "text-[#4A4A4A]"
                      }`}>
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-full text-[0.5rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300 ${
                              isActive 
                                ? "bg-[#28211A] text-[#F5F5F7] border border-white/10" 
                                : "bg-[#E8E8EC] text-[#4A4A4A]"
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
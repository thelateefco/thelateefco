// components/sections/AIAddons.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Bot,
  TrendingUp,
  Search,
  FileText,
  Sparkles,
  Mic,
} from "lucide-react";

const addons = [
  {
    id: 1,
    name: "AI Chatbot",
    description: "Answers customer questions and captures leads 24/7.",
    solves: "Never miss a lead - even when you're asleep.",
    icon: Bot,
    tag: "01",
  },
  {
    id: 2,
    name: "Lead Scoring",
    description: "Automatically ranks and prioritises your hottest leads.",
    solves: "Focus on the deals most likely to close.",
    icon: TrendingUp,
    tag: "02",
  },
  {
    id: 3,
    name: "Smart Search",
    description: "Delivers relevant results instantly - no more dead ends.",
    solves: "Helps visitors find what they need in seconds.",
    icon: Search,
    tag: "03",
  },
  {
    id: 4,
    name: "Automated Reports",
    description: "Weekly insights delivered to your inbox without lifting a finger.",
    solves: "Know exactly what's working - without manual effort.",
    icon: FileText,
    tag: "04",
  },
  {
    id: 5,
    name: "Content Generator",
    description: "Drafts blog posts and copy that sounds like you, faster.",
    solves: "Never stare at a blank page again.",
    icon: Sparkles,
    tag: "05",
  },
  {
    id: 6,
    name: "Voice Assistant",
    description: "Lets your customers speak to your site - literally.",
    solves: "Makes your website accessible to everyone.",
    icon: Mic,
    tag: "06",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function AIAddons() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % addons.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + addons.length) % addons.length);
  }, []);

  const handleUserInteract = (action: () => void) => {
    setIsPaused(true);
    action();
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToSlide = (index: number) => {
    handleUserInteract(() => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    });
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, nextSlide]);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % addons.length;
      cards.push({ ...addons[index], index });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 py-20 md:py-28 border-t border-[#E0E0E4] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="label text-[#8A8A8A] block mb-2">POWER UP YOUR SITE</span>
            <h2 className="font-sans text-[2.2rem] md:text-[3.2rem] font-bold text-[#1A1A1A] leading-[1.1] tracking-tight">
              AI Add-Ons
            </h2>
            <p className="text-[1rem] md:text-[1.125rem] text-[#4A4A4A] font-light mt-2">
              Enhance any package with these intelligent, revenue-driving features.
            </p>
          </div>

          {/* Controls - Top right on desktop */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => handleUserInteract(prevSlide)}
              className="w-11 h-11 rounded-full bg-white border border-[#1A1A1A]/10 text-[#4A4A4A] flex items-center justify-center transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleUserInteract(nextSlide)}
              className="w-11 h-11 rounded-full bg-white border border-[#1A1A1A]/10 text-[#4A4A4A] flex items-center justify-center transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            {/* Desktop: 3 cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {visibleCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={`${card.id}-${currentIndex}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 * (card.index % 3) }}
                    className="bg-[#FFFFFF] border border-[#1A1A1A]/8 rounded-[14px] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] border border-[#1A1A1A]/6 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[0.75rem] font-sans font-medium tracking-wider text-[#1A1A1A]/40 uppercase">
                          {card.tag}
                        </span>
                      </div>

                      <h3 className="font-sans text-[1.25rem] font-bold text-[#1A1A1A] tracking-tight">
                        {card.name}
                      </h3>
                      <p className="text-[0.90rem] font-light text-[#4A4A4A] leading-[1.65] mt-2">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#1A1A1A]/6">
                      <p className="text-[0.78rem] italic text-[#1A1A1A]/70 font-light flex items-start gap-1.5">
                        <span className="text-[#1A1A1A] font-semibold not-italic">✓</span> {card.solves}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: Single card with slide animations */}
            <div className="md:hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-[#FFFFFF] border border-[#1A1A1A]/8 rounded-[14px] p-7"
                >
                  {(() => {
                    const currentCard = addons[currentIndex];
                    const IconComponent = currentCard.icon;
                    return (
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] border border-[#1A1A1A]/6 flex items-center justify-center text-[#1A1A1A]">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="text-[0.75rem] font-sans font-medium tracking-wider text-[#1A1A1A]/40">
                              {currentCard.tag} / 0{addons.length}
                            </span>
                          </div>

                          <h3 className="font-sans text-[1.25rem] font-bold text-[#1A1A1A]">
                            {currentCard.name}
                          </h3>
                          <p className="text-[0.875rem] font-light text-[#4A4A4A] leading-[1.6] mt-2">
                            {currentCard.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#1A1A1A]/6">
                          <p className="text-[0.78rem] italic text-[#1A1A1A]/70 font-light flex items-start gap-1.5">
                            <span className="text-[#1A1A1A] font-semibold not-italic">✓</span> {currentCard.solves}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {addons.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  index === currentIndex
                    ? "w-8 h-2 bg-[#1A1A1A]"
                    : "w-2 h-2 bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-[0.75rem] italic text-[#8A8A8A] font-light mt-8">
          Add-ons available on Starter and Business tiers. Included free in Premium.
        </p>
      </div>
    </section>
  );
}
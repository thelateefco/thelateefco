// components/sections/AIAddons.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const addons = [
  {
    id: 1,
    name: "AI Chatbot",
    description: "Answers customer questions and captures leads 24/7.",
    solves: "Never miss a lead - even when you're asleep.",
  },
  {
    id: 2,
    name: "Lead Scoring",
    description: "Automatically ranks and prioritises your hottest leads.",
    solves: "Focus on the deals most likely to close.",
  },
  {
    id: 3,
    name: "Smart Search",
    description: "Delivers relevant results instantly - no more dead ends.",
    solves: "Helps visitors find what they need in seconds.",
  },
  {
    id: 4,
    name: "Automated Reports",
    description: "Weekly insights delivered to your inbox without lifting a finger.",
    solves: "Know exactly what's working - without the manual work.",
  },
  {
    id: 5,
    name: "Content Generator",
    description: "Drafts blog posts and copy that sounds like you, faster.",
    solves: "Never stare at a blank page again.",
  },
  {
    id: 6,
    name: "Voice Assistant",
    description: "Lets your customers speak to your site - literally.",
    solves: "Makes your website accessible to everyone, any way they prefer.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.6,
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

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
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
    <section className="bg-[#F7F4F0] px-6 md:px-10 lg:px-16 py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-[2.5rem] md:text-[3.2rem] font-medium text-[#1A1A1A] leading-[1.1] tracking-tight">
            AI Add-Ons
          </h2>
          <p className="font-serif text-[1rem] md:text-[1.125rem] text-[#4A4A4A] font-light mt-2">
            Enhance any package with these AI-powered features.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12 md:mt-16">
          <div className="overflow-hidden">
            {/* Desktop: 3 cards */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {visibleCards.map((card) => (
                <motion.div
                  key={`${card.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (card.index % 3) }}
                  className="bg-[#FFFFFF] border border-[#1A1A1A]/8 rounded-[12px] p-8 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(26,26,26,0.05)]"
                >
                  <div className="flex flex-col h-full">
                    <h3 className="font-serif text-[1.25rem] font-medium text-[#1A1A1A]">
                      {card.name}
                    </h3>
                    <p className="text-[0.875rem] font-light text-[#4A4A4A] leading-[1.6] mt-2">
                      {card.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#1A1A1A]/6">
                      <p className="text-[0.75rem] italic text-[#1A1A1A]/60 font-light">
                        {card.solves}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile: Single card */}
            <div className="md:hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-[#FFFFFF] border border-[#1A1A1A]/8 rounded-[12px] p-8"
                >
                  <div className="flex flex-col h-full">
                    <h3 className="font-serif text-[1.25rem] font-medium text-[#1A1A1A]">
                      {addons[currentIndex].name}
                    </h3>
                    <p className="text-[0.875rem] font-light text-[#4A4A4A] leading-[1.6] mt-2">
                      {addons[currentIndex].description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#1A1A1A]/6">
                      <p className="text-[0.75rem] italic text-[#1A1A1A]/60 font-light">
                        {addons[currentIndex].solves}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {addons.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-[#1A1A1A]"
                    : "w-2 h-2 bg-[#1A1A1A]/25 hover:bg-[#1A1A1A]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-[0.75rem] italic text-[#4A4A4A] font-light mt-6">
          Add-ons available on Starter and Business tiers. Included free in Premium.
        </p>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";

const STEPS = [
  { label: "A vague idea.", delay: 0 },
  { label: "Becomes a strategy.", delay: 0.25 },
  { label: "Becomes a website that works.", delay: 0.5 },
];

export default function ScrollAnimationWithFallback() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []); // ✅ Empty dependency array - runs only once

  // Show fallback for reduced motion or server-side
  if (!isClient || prefersReducedMotion) {
    return (
      <section className="bg-[#E8E8EC] py-24 md:py-32 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <p className="label text-[#8A8A8A] text-center mb-6 md:mb-8">
            FROM IDEA TO IMPACT
          </p>

          <div className="max-w-4xl mx-auto aspect-[16/10] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-[#ECE6DF] font-serif text-2xl md:text-3xl font-medium px-8 text-center">
              {STEPS.map((step, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="mb-4 last:mb-0"
                >
                  {step.label}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-8 text-center space-y-1.5 md:space-y-2">
            {STEPS.map((step, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="font-serif text-[1.125rem] md:text-[1.5rem] text-[#000000] font-medium"
              >
                {step.label}
              </motion.p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show the actual scroll animation
  return <ScrollAnimation />;
}
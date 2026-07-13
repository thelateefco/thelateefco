"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const STEPS = [
  { label: "A vague idea.", delay: 0 },
  { label: "Becomes a strategy.", delay: 0.25 },
  { label: "Becomes a website that works.", delay: 0.5 },
];

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for better feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values based on scroll progress
  const browserScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 1]);
  const browserOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1]);
  const browserY = useTransform(smoothProgress, [0, 0.3, 1], [40, 0, 0]);

  // Wireframe to design transition
  const wireframeOpacity = useTransform(smoothProgress, [0, 0.2, 0.5], [1, 1, 0]);
  const designOpacity = useTransform(smoothProgress, [0.3, 0.6, 1], [0, 0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[140vh] md:h-[160vh] bg-[#ECE6DF]"
      aria-label="Scroll-triggered animation showing our process"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Label */}
          <motion.p
            className="label text-[#8A8A8A] text-center mb-6 md:mb-8"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1]),
              y: useTransform(smoothProgress, [0, 0.15, 1], [10, 0, 0]),
            }}
          >
            FROM IDEA TO IMPACT
          </motion.p>

          {/* Browser Window */}
          <motion.div
            className="relative mx-auto w-full max-w-4xl aspect-[16/10] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl"
            style={{
              scale: browserScale,
              opacity: browserOpacity,
              y: browserY,
            }}
          >
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#2A2A2A] flex items-center px-4 gap-2 z-20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-4 bg-[#3A3A3A] rounded-md max-w-[200px] mx-auto" />
              </div>
            </div>

            {/* Browser Content - Wireframe */}
            <motion.div
              className="absolute inset-0 top-8 bg-[#1A1A1A] p-8 flex flex-col gap-4"
              style={{ opacity: wireframeOpacity }}
            >
              {/* Wireframe elements */}
              <div className="h-8 w-32 bg-[#2A2A2A] rounded" />
              <div className="flex gap-6 flex-1">
                <div className="w-1/3 bg-[#2A2A2A] rounded flex flex-col gap-3 p-4">
                  <div className="h-4 w-20 bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-full bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-3/4 bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-full bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-1/2 bg-[#3A3A3A] rounded" />
                </div>
                <div className="flex-1 bg-[#2A2A2A] rounded flex flex-col gap-3 p-4">
                  <div className="h-4 w-32 bg-[#3A3A3A] rounded" />
                  <div className="h-20 w-full bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-full bg-[#3A3A3A] rounded" />
                  <div className="h-3 w-2/3 bg-[#3A3A3A] rounded" />
                </div>
              </div>
              <div className="h-12 w-32 bg-[#2A2A2A] rounded self-end" />
            </motion.div>

            {/* Browser Content - Finished Design */}
            <motion.div
              className="absolute inset-0 top-8 bg-[#ECE6DF] p-8 flex flex-col gap-4"
              style={{ opacity: designOpacity }}
            >
              {/* Finished design elements */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#1A1A1A] rounded-full" />
                  <div>
                    <div className="h-3 w-24 bg-[#1A1A1A] rounded" />
                    <div className="h-2 w-16 bg-[#8A8A8A] rounded mt-1" />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-2 w-12 bg-[#8A8A8A] rounded" />
                  <div className="h-2 w-12 bg-[#8A8A8A] rounded" />
                  <div className="h-2 w-12 bg-[#1A1A1A] rounded" />
                  <div className="h-8 w-20 bg-[#1A1A1A] rounded" />
                </div>
              </div>

              <div className="flex gap-8 flex-1 mt-4">
                <div className="w-1/3 flex flex-col gap-4">
                  <div className="font-serif text-[#1A1A1A] text-2xl font-medium">
                    Your Brand
                  </div>
                  <p className="text-[#4A4A4A] text-sm font-light leading-relaxed">
                    We build websites that bring in customers — not just ones
                    that sit there looking pretty.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <div className="h-6 w-16 border border-[#D0C9C1] rounded" />
                    <div className="h-6 w-16 border border-[#D0C9C1] rounded" />
                  </div>
                </div>
                <div className="flex-1 bg-[#D0C9C1]/30 rounded-lg flex items-center justify-center">
                  <div className="text-[#8A8A8A] text-sm font-light">
                    ✦ Project Showcase
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <div className="h-10 w-32 bg-[#1A1A1A] rounded flex items-center justify-center">
                  <span className="text-[#ECE6DF] text-xs font-medium tracking-wider uppercase">
                    View Project
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Subtle glow/shadow overlay during transition */}
            <motion.div
              className="absolute inset-0 top-8 pointer-events-none"
              style={{
                background: useTransform(
                  smoothProgress,
                  [0.2, 0.5, 0.8],
                  [
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                    "radial-gradient(circle at center, rgba(26,26,26,0.1) 0%, transparent 70%)",
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                  ]
                ),
              }}
            />
          </motion.div>

          {/* Step Text Reveal */}
          <div className="mt-6 md:mt-8 text-center space-y-1.5 md:space-y-2">
            {STEPS.map((step, index) => {
              const stepStart = 0.3 + index * 0.15;
              const stepEnd = stepStart + 0.15;
              const opacity = useTransform(
                smoothProgress,
                [stepStart, stepEnd],
                [0, 1]
              );
              const y = useTransform(
                smoothProgress,
                [stepStart, stepEnd],
                [12, 0]
              );

              return (
                <motion.p
                  key={index}
                  className="font-serif text-[1.125rem] md:text-[1.5rem] text-[#1A1A1A] font-medium"
                  style={{
                    opacity,
                    y,
                    transition: "none",
                  }}
                >
                  {step.label}
                </motion.p>
              );
            })}
          </div>

          {/* Progress Indicator - more subtle */}
          <motion.div
            className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            style={{ opacity: useTransform(smoothProgress, [0.7, 0.95], [0.3, 0]) }}
          >
            <span className="label text-[0.45rem] md:text-[0.5rem] tracking-[0.25em] text-[#8A8A8A]">
              Scroll
            </span>
            <motion.div
              className="w-px h-5 bg-[#8A8A8A]"
              style={{
                height: useTransform(smoothProgress, [0, 1], [4, 20]),
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
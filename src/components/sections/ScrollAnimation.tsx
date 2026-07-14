"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const STEPS = [
  { label: "A vague idea.", delay: 0 },
  { label: "Becomes a strategy.", delay: 0.25 },
  { label: "Becomes a website that works.", delay: 0.5 },
];

// Update these with your actual image paths
const IMAGES = {
  wireframe: "/images/projects/projectaimagixbefore.png",
  design: "/images/projects/projectaimagixafter.png",
};

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const [imageErrors, setImageErrors] = useState({ wireframe: false, design: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Slower spring for more gradual animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  // Browser transforms - slower and more gradual
  const browserScale = useTransform(smoothProgress, [0, 0.5, 0.8], [0.92, 1, 1]);
  const browserOpacity = useTransform(smoothProgress, [0, 0.1, 0.3], [0, 1, 1]);
  const browserY = useTransform(smoothProgress, [0, 0.3, 0.8], [50, 0, 0]);

  // Image transition - design fully shows by 70% scroll
  const wireframeOpacity = useTransform(smoothProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const designOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 0, 1]);

  // Image zoom - smoother
  const wireframeScale = useTransform(smoothProgress, [0, 0.45], [1, 1.1]);
  const designScale = useTransform(smoothProgress, [0.5, 0.8], [0.92, 1]);

  const handleImageError = (type: "wireframe" | "design") => {
    setImageErrors((prev) => ({ ...prev, [type]: true }));
  };

  // Step text - reveals after design is fully visible
  const stepOpacity = useTransform(smoothProgress, [0.5, 0.9], [0, 1]);

  return (
    <section
      ref={containerRef}
      // Extra height so design stays visible while scrolling through
      className="relative h-[220vh] md:h-[250vh] bg-[#E8E8EC]"
      aria-label="Scroll-triggered animation showing our process"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto w-full">
          <motion.p
            className="label text-[#8A8A8A] text-center mb-6 md:mb-8"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.12, 1], [0, 1, 1]),
              y: useTransform(smoothProgress, [0, 0.15, 1], [15, 0, 0]),
            }}
          >
            FROM IDEA TO IMPACT
          </motion.p>

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

            {/* Browser Content - Wireframe Image */}
            <motion.div
              className="absolute inset-0 top-8"
              style={{ opacity: wireframeOpacity }}
            >
              {!imageErrors.wireframe && IMAGES.wireframe ? (
                <div className="relative w-full h-full">
                  <motion.div
                    className="relative w-full h-full"
                    style={{ scale: wireframeScale }}
                  >
                    <Image
                      src={IMAGES.wireframe}
                      alt="Website wireframe / early design"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      onError={() => handleImageError("wireframe")}
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A1A1A] p-8">
                  <div className="text-[#8A8A8A] text-sm font-light mb-2">📐</div>
                  <div className="text-[#8A8A8A] text-sm font-light">Wireframe</div>
                  <div className="text-[#5A5A5A] text-xs font-light mt-1">Add your wireframe image</div>
                </div>
              )}
            </motion.div>

            {/* Browser Content - Finished Design Image */}
            <motion.div
              className="absolute inset-0 top-8"
              style={{ opacity: designOpacity }}
            >
              {!imageErrors.design && IMAGES.design ? (
                <div className="relative w-full h-full">
                  <motion.div
                    className="relative w-full h-full"
                    style={{ scale: designScale }}
                  >
                    <Image
                      src={IMAGES.design}
                      alt="Final website design"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      onError={() => handleImageError("design")}
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] p-8">
                  <div className="text-[#8A8A8A] text-sm font-light mb-2">🎨</div>
                  <div className="text-[#8A8A8A] text-sm font-light">Final Design</div>
                  <div className="text-[#5A5A5A] text-xs font-light mt-1">Add your design image</div>
                </div>
              )}
            </motion.div>

            {/* Subtle glow/shadow overlay during transition */}
            <motion.div
              className="absolute inset-0 top-8 pointer-events-none z-10"
              style={{
                background: useTransform(
                  smoothProgress,
                  [0.2, 0.5, 0.8],
                  [
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                    "radial-gradient(circle at center, rgba(26,26,26,0.15) 0%, transparent 70%)",
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                  ]
                ),
              }}
            />
          </motion.div>

          {/* Step Text Reveal - Shows after design appears */}
          <div className="mt-6 md:mt-8 text-center space-y-1.5 md:space-y-2">
            {STEPS.map((step, index) => {
              const stepStart = 0.45 + index * 0.15;
              const stepEnd = stepStart + 0.2;
              const opacity = useTransform(
                smoothProgress,
                [stepStart, stepEnd],
                [0, 1]
              );
              const y = useTransform(
                smoothProgress,
                [stepStart, stepEnd],
                [15, 0]
              );

              return (
                <motion.p
                  key={index}
                  className="font-serif text-[1.125rem] md:text-[1.5rem] text-[#000000] font-medium"
                  style={{ opacity, y }}
                >
                  {step.label}
                </motion.p>
              );
            })}
          </div>

          {/* Progress Indicator - Shows at the very end */}
          <motion.div
            className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            style={{ opacity: useTransform(smoothProgress, [0.8, 0.95], [0.3, 0]) }}
          >
            <span className="label text-[0.45rem] md:text-[0.5rem] tracking-[0.25em] text-[#8A8A8A]">
              Scroll
            </span>
            <motion.div
              className="w-px h-5 bg-[#8A8A8A]"
              style={{ height: useTransform(smoothProgress, [0, 1], [4, 24]) }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
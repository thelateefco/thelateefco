"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const STEPS = [
  { label: "A vague idea.", delay: 0 },
  { label: "Becomes a strategy.", delay: 0.25 },
  { label: "Becomes a website that works.", delay: 0.5 },
];

const IMAGES = {
  wireframe: "/images/projects/projectaimagixbefore.png",
  design: "/images/projects/projectaimagixafter.png",
};

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const [imageErrors, setImageErrors] = useState({ wireframe: false, design: false });
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
    restSpeed: 0.001,
  });

  // Browser transforms - starts visible
  const browserScale = useTransform(smoothProgress, [0, 0.3, 0.7], [0.92, 1, 1]);
  const browserOpacity = useTransform(smoothProgress, [0, 0.02, 0.15], [0.6, 1, 1]);
  const browserY = useTransform(smoothProgress, [0, 0.15, 0.7], [20, 0, 0]);

  const wireframeOpacity = useTransform(smoothProgress, [0, 0.1, 0.4], [1, 1, 0]);
  const designOpacity = useTransform(smoothProgress, [0.25, 0.45, 0.7], [0, 0, 1]);

  const wireframeScale = useTransform(smoothProgress, [0, 0.4], [1, 1.08]);
  const designScale = useTransform(smoothProgress, [0.45, 0.75], [0.95, 1]);

  const handleImageError = (type: "wireframe" | "design") => {
    setImageErrors((prev) => ({ ...prev, [type]: true }));
  };

  // Manual scroll tracking as fallback
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    let rafId: number;

    const updateProgress = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = container.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const start = sectionTop;
      const end = sectionTop + sectionHeight - windowHeight;
      const rawProgress = (scrollTop - start) / (end - start);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    const handleResize = () => {
      updateProgress();
    };

    setTimeout(updateProgress, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          updateProgress();
        }
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );

    observer.observe(container);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Use manual progress as fallback
  const activeProgress = progress > 0.001 ? progress : scrollYProgress;

  return (
    <section
      ref={containerRef}
      className="relative h-[220vh] md:h-[250vh] bg-[#FFFFFF]"
      aria-label="Scroll-triggered animation showing our process"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Heading - Always visible */}
          <div className="text-center mb-4 md:mb-6">
            <h2 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-medium text-[#000000] leading-[1.1] tracking-tight">
              From Idea to Impact
            </h2>
            <p className="text-[1rem] text-[#4A4A4A] font-light mt-2 max-w-[38ch] mx-auto">
              Scroll to see how we transform concepts<br></br> into livin breathing websites.
            </p>
          </div>

          <motion.p
            className="label text-[#8A8A8A] text-center mb-4 md:mb-6"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.05, 0.15], [0.5, 1, 1]),
              y: useTransform(smoothProgress, [0, 0.05, 0.15], [8, 0, 0]),
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
                      alt="Website wireframe"
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
                </div>
              )}
            </motion.div>

            {/* Subtle glow/shadow overlay during transition */}
            <motion.div
              className="absolute inset-0 top-8 pointer-events-none z-10"
              style={{
                background: useTransform(
                  smoothProgress,
                  [0.15, 0.45, 0.75],
                  [
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                    "radial-gradient(circle at center, rgba(26,26,26,0.15) 0%, transparent 70%)",
                    "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                  ]
                ),
              }}
            />
          </motion.div>

          {/* Step Text Reveal */}
          <div className="mt-6 md:mt-8 text-center space-y-1.5 md:space-y-2">
            {STEPS.map((step, index) => {
              const stepStart = 0.4 + index * 0.15;
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

          {/* Progress Indicator */}
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
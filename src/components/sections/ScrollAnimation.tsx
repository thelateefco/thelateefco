"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const STEPS = [
  { label: "Messy idea." },
  { label: "Clear direction." },
  { label: "Finished website." },
];

const IMAGES = {
  before: "/images/projects/projectaimagixafter.png",
  after: "/images/projects/projectaimagixbefore.png",
};

export default function ScrollRevealSlider() {
  const containerRef = useRef<HTMLElement>(null);
  const [imageErrors, setImageErrors] = useState({ before: false, after: false });
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  // Manual fallback tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    let rafId: number;

    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = container.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const start = sectionTop;
      const end = sectionTop + sectionHeight - windowHeight;
      const raw = (scrollTop - start) / (end - start);
      setProgress(Math.max(0, Math.min(1, raw)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    setTimeout(updateProgress, 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleImageError = (type: "before" | "after") =>
    setImageErrors((prev) => ({ ...prev, [type]: true }));

  // The wipe: a vertical divider line moves left → right across the frame,
  // and the "after" image is revealed via clip-path as the divider passes.
  const wipePercent = useTransform(smoothProgress, [0.15, 0.7], [0, 100]);
  const dividerX = useTransform(wipePercent, (v) => `${v}%`);
  const clipPath = useTransform(wipePercent, (v) => `inset(0 0 0 ${v}%)`);

  const frameScale = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 1.02]);
  const frameOpacity = useTransform(smoothProgress, [0, 0.08], [0.4, 1]);
  const frameRotate = useTransform(smoothProgress, [0, 0.15], [-1.5, 0]);

  const headingOpacity = useTransform(smoothProgress, [0, 0.08], [0, 1]);
  const headingY = useTransform(smoothProgress, [0, 0.08], [16, 0]);

  const tagOpacity = useTransform(smoothProgress, [0, 0.7, 0.85], [1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[220vh] md:h-[250vh] bg-[#0B0B0C]"
      aria-label="Scroll-triggered before and after reveal"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Heading */}
          <motion.div
            className="text-center mb-6 md:mb-10"
            style={{ opacity: headingOpacity, y: headingY }}
          >
            <p className="text-[0.7rem] md:text-[0.75rem] tracking-[0.3em] text-[#8A8A8A] font-light mb-3">
              BEFORE / AFTER
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.2vw,2.75rem)] font-medium text-white! leading-[1.1] tracking-tight">
              Same site. Different world.
            </h2>
            <p className="text-[1rem] text-[#9A9A9A] font-light mt-3 max-w-[42ch] mx-auto">
              Keep scrolling - the line sweeps across and drags the finished
              site out from underneath the draft.
            </p>
          </motion.div>

          {/* Frame */}
          <motion.div
            className="relative mx-auto w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            style={{
              scale: frameScale,
              opacity: frameOpacity,
              rotate: frameRotate,
            }}
          >
            {/* ✅ Base layer: BEFORE image - NO grayscale */}
            <div className="absolute inset-0">
              {!imageErrors.before && IMAGES.before ? (
                <Image
                  src={IMAGES.before}
                  alt="Before: early draft"
                  fill
                  className="object-cover" // ✅ Removed grayscale and contrast
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  onError={() => handleImageError("before")}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#161616]">
                  <div className="text-[#6A6A6A] text-sm font-light mb-2">✏️</div>
                  <div className="text-[#6A6A6A] text-sm font-light">Before</div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* ✅ Revealed layer: AFTER image - NO grayscale */}
            <motion.div className="absolute inset-0" style={{ clipPath }}>
              {!imageErrors.after && IMAGES.after ? (
                <Image
                  src={IMAGES.after}
                  alt="After: finished design"
                  fill
                  className="object-cover" // ✅ Removed grayscale and contrast
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  onError={() => handleImageError("after")}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7]">
                  <div className="text-[#8A8A8A] text-sm font-light mb-2">✨</div>
                  <div className="text-[#8A8A8A] text-sm font-light">After</div>
                </div>
              )}
            </motion.div>

            {/* Divider line + handle */}
            <motion.div
              className="absolute top-0 bottom-0 w-[2px] bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-20"
              style={{ left: dividerX }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg">
                <span className="text-[10px] tracking-widest text-black">
                  ↔
                </span>
              </div>
            </motion.div>

            {/* Corner tags */}
            <motion.div
              className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[0.65rem] tracking-[0.2em] text-white/80"
              style={{ opacity: tagOpacity }}
            >
              BEFORE
            </motion.div>
            <motion.div
              className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[0.65rem] tracking-[0.2em] text-black/70"
              style={{ opacity: tagOpacity }}
            >
              AFTER
            </motion.div>
          </motion.div>

          {/* Step text + progress dots */}
          <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {STEPS.map((_, i) => {
                const dotStart = 0.15 + i * 0.22;
                const dotOpacity = useTransform(
                  smoothProgress,
                  [dotStart - 0.05, dotStart],
                  [0.25, 1]
                );
                const dotScale = useTransform(
                  smoothProgress,
                  [dotStart - 0.05, dotStart],
                  [1, 1.4]
                );
                return (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ opacity: dotOpacity, scale: dotScale }}
                  />
                );
              })}
            </div>

            <div className="text-center h-8 relative w-full max-w-md">
              {STEPS.map((step, i) => {
                const start = 0.15 + i * 0.22;
                const end = start + 0.18;
                const opacity = useTransform(
                  smoothProgress,
                  [start - 0.05, start, end, end + 0.1],
                  [0, 1, 1, 0]
                );
                const y = useTransform(smoothProgress, [start - 0.05, start], [10, 0]);
                return (
                  <motion.p
                    key={i}
                    className="absolute inset-0 font-serif text-[1.1rem] md:text-[1.4rem] text-white font-medium"
                    style={{ opacity, y }}
                  >
                    {step.label}
                  </motion.p>
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2"
            style={{ opacity: useTransform(smoothProgress, [0.8, 0.95], [0.35, 0]) }}
          >
            <span className="text-[0.45rem] md:text-[0.5rem] tracking-[0.25em] text-[#8A8A8A]">
              scroll
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
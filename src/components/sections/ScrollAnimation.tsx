"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ParallaxBackground from "../shared/ParallaxBackground";

export default function ScrollRevealSlider() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Dynamic scale and opacity on scroll
  const bannerScale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.5, 1], [32, 16, 32]);
  const textY = useTransform(smoothProgress, [0.2, 0.5, 0.8], [40, 0, -30]);
  const textOpacity = useTransform(smoothProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F5F7] py-16 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          style={{
            scale: bannerScale,
            borderRadius: bannerRadius,
          }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#140f0a] shadow-[12px_12px_36px_rgba(163,177,198,0.35),-12px_-12px_36px_rgba(255,255,255,0.8)] border border-black/5"
        >
          {/* Background Visual with Parallax Zoom */}
          <ParallaxBackground speed={22} className="absolute inset-0 z-0">
            <Image
              src="/images/footer/footer1.jpg"
              alt="The Lateef & Co. Design Showcase"
              fill
              className="object-cover brightness-75 scale-110"
              priority
              sizes="100vw"
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a]/80 via-[#140f0a]/30 to-transparent" />
          </ParallaxBackground>

          {/* Minimal Floating Caption */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
            <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-[28ch]">
              <span className="label text-[#ECE6DF]/70 text-[0.6rem] md:text-[0.6875rem] tracking-[0.25em] uppercase block mb-3 font-mono">
                CRAFTED WITH PRECISION
              </span>
              <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-medium text-[#FFFFFF]! leading-[1.08] tracking-tight drop-shadow-md">
                Design that commands attention.
              </h2>
            </motion.div>
          </div>

          {/* Subtle scroll progress cue */}
          <div className="absolute bottom-5 right-6 z-10 hidden sm:flex items-center gap-2">
            <span className="label text-[0.5rem] tracking-[0.2em] uppercase text-white/50">
              SCROLL TO EXPLORE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
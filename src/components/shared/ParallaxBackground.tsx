"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number; // percent range of vertical shift
  className?: string;
}

export default function ParallaxBackground({
  children,
  speed = 8,
  className = "absolute inset-0 z-0 overflow-hidden",
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        style={{ y }}
        className="relative w-full h-[140%] -top-[20%] pointer-events-none"
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";

export default function ScrollAnimationWithFallback() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <section className="bg-[#ECE6DF] py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="label text-[#8A8A8A] mb-6">FROM IDEA TO IMPACT</p>
          <div className="max-w-4xl mx-auto aspect-[16/10] bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-[#ECE6DF] font-serif text-2xl md:text-3xl font-medium px-8 text-center">
              <p className="mb-4">A vague idea.</p>
              <p className="mb-4">Becomes a strategy.</p>
              <p>Becomes a website that works.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <ScrollAnimation />;
}
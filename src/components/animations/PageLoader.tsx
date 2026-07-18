"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll on mobile while loader is visible
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 1.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      // Removed pointer-events-none so the overlay blocks touch/click on mobile
      className="fixed inset-0 z-[9999] bg-[#F5F5F7] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="flex flex-col items-center gap-4"
      >
        <motion.span
          // Added sm: breakpoint for better small-phone sizing
          className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-medium text-[#000000] tracking-tight whitespace-nowrap"
          animate={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          The Lateef &amp; Co.
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-12 h-px bg-[#000000]"
        />
      </motion.div>
    </motion.div>
  );
}
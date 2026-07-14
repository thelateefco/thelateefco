"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#D0C9C1] bg-[#ECE6DF]/80 backdrop-blur-sm flex items-center justify-center transition-colors duration-300 hover:border-[#1A1A1A] hover:bg-[#ECE6DF]"
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-[#1A1A1A]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
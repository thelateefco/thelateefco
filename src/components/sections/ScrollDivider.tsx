"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollDivider() {
  return (
    <div className="relative bg-[#ECE6DF] px-6 md:px-10 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex flex-col items-center justify-center py-3 md:py-4 gap-1.5 md:gap-2"
        >
          {/* Thin line */}
          <div className="w-px h-6 md:h-8 bg-[#D0C9C1]" />

          {/* Scroll indicator */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="label text-[0.45rem] md:text-[0.5rem] tracking-[0.2em] text-[#8A8A8A]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-[#8A8A8A]" />
            </motion.div>
          </div>

          {/* Thin line */}
          <div className="w-px h-6 md:h-8 bg-[#D0C9C1]" />
        </motion.div>
      </div>
    </div>
  );
}
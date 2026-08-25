"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader quickly after 550ms for a minimal, ultra-fast feel
    const timer = setTimeout(() => setIsVisible(false), 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="minimal-page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -15,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#140f0a] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            {/* Minimal Brand Name */}
            <span className="font-serif text-[1.15rem] sm:text-[1.35rem] font-bold text-white tracking-wider uppercase">
              The Lateef & Co.
            </span>

            {/* Minimal Fast Progress Line */}
            <div className="w-24 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
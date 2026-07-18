"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1] 
            }
          }}
          className="fixed inset-0 z-[9999] bg-[#F5F5F7] flex items-center justify-center"
          style={{ height: "100dvh", width: "100dvw" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.1, 0.25, 1] 
              }
            }}
            className="flex flex-col items-center gap-6 px-6 relative"
          >
            {/* Animated letters - each letter fades in separately */}
            <div className="flex items-center gap-1 font-serif text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-medium text-[#000000] tracking-tight">
              {["T", "h", "e", " ", "L", "a", "t", "e", "e", "f", " ", "&", " ", "C", "o", "."].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, rotateX: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: { 
                      duration: 0.4, 
                      delay: index * 0.04,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: 1, 
                opacity: 1,
                transition: { 
                  duration: 0.7, 
                  delay: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }
              }}
              className="w-16 h-px bg-[#000000] origin-center"
            />

            {/* Subtle shimmer effect on text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 pointer-events-none overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2.5,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
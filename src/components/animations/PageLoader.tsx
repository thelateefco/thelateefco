"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  // isMounted gate: prevents any render during SSR/hydration.
  // Without this, the server pre-renders the loader HTML before Framer Motion
  // initializes on the client — causing the text to flash at an unpositioned
  // location for one frame, then jump to center (the "glitch to bottom" bug).
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Hide loader after 2.2s — the AnimatePresence exit animation (0.6s)
    // plays OUT after this, so total visible time ≈ 2.8s.
    const timer = setTimeout(() => setIsVisible(false), 2200);
    return () => clearTimeout(timer);
    // NOTE: No document.body.style.overflow manipulation here.
    // The fixed full-screen overlay already covers everything visually.
    // Touching body overflow caused scroll to stay permanently locked in
    // production builds when the cleanup didn't run at the right time.
  }, []);

  // Nothing at all until client hydration is complete
  if (!isMounted) return null;

  return (
    // AnimatePresence is required so the `exit` animation on the child
    // actually plays when isVisible flips false.
    // Without it, the component just disappears instantly (hard cut).
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          // Inline styles — avoids iOS Safari dynamic-viewport quirk where
          // Tailwind's `fixed inset-0` can resolve to wrong coordinates on
          // first paint before the browser settles on the final viewport height.
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "#F5F5F7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[3rem] font-medium text-[#000000] tracking-tight whitespace-nowrap"
            >
              The Lateef &amp; Co.
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                width: "3rem",
                height: "1px",
                backgroundColor: "#000000",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
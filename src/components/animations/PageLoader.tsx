"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  // isMounted gate: prevents any render during SSR.
  // Without this, the server renders the loader HTML before Framer Motion
  // loads on the client, causing initial={{ opacity: 0, y: 10 }} to be
  // ignored for one frame — the text appears at a wrong position and jumps.
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Lock body scroll on mobile while loader is visible
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  // Don't render anything until client has mounted — kills the SSR flash
  if (!isMounted || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      // Inline styles for the overlay — avoids iOS Safari dynamic-viewport
      // quirks where `inset-0` / `fixed` can resolve to wrong coordinates
      // on first paint before the browser settles on the final vh.
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
      {/* No y-offset entry animation — that was the source of the jump glitch.
          A clean opacity fade-in is smooth and avoids positional artifacts. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="flex flex-col items-center gap-4"
      >
        <motion.span
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
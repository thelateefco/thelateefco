"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { WHATSAPP_URL } from "../../lib/constants";
import { trackWhatsAppClick } from "../../lib/utils/tracking";

// Updated NAV_LINKS with Home at the top
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("mobile-nav");
    onClose();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  // Check for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menu variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Link variants with stagger
  const linkVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 12,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0.05 : 0.08 + i * 0.06,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // Bottom section variants
  const bottomVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0.15 : 0.35,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Glassmorphic overlay - Updated to match new color scheme */}
          <div className="w-full h-full bg-[#F5F5F7]/90 backdrop-blur-xl border-l border-black/5 flex flex-col">
            <div className="flex flex-col h-full px-6 md:px-8 pt-4 pb-6">
              {/* Header Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between h-14 shrink-0"
              >
                {/* Logo/Wordmark */}
                <Link
                  href="/"
                  onClick={onClose}
                  className="font-serif text-[1.2rem] font-medium text-[#000000] tracking-tight hover:opacity-60 transition-opacity"
                >
                  The Lateef & Co.
                </Link>

                {/* Close (X) button */}
                <motion.button
                  onClick={onClose}
                  whileTap={{ rotate: 90, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 -mr-2 text-[#000000] hover:opacity-60 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </motion.button>
              </motion.div>

              {/* Main Nav Links - Centered */}
              <nav className="flex-1 flex flex-col items-center justify-center -mt-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-[280px] text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`font-serif text-[1.75rem] md:text-[2rem] font-medium text-[#000000] leading-[1.1] tracking-tight block py-2 hover:opacity-40 transition-opacity ${
                        isActive(link.href) ? "opacity-60" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                    {/* Hairline divider */}
                    <div className="w-16 h-px bg-black/10 mx-auto my-3" />
                  </motion.div>
                ))}
              </nav>

              {/* Divider between nav and footer */}
              <div className="w-full h-px bg-black/10 my-2" />

              {/* Bottom Section */}
              <motion.div
                variants={bottomVariants}
                initial="hidden"
                animate="visible"
                className="shrink-0 space-y-3 pt-2"
              >
                {/* CTA Button */}
                <Button
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  variant="primary"
                  className="w-full justify-center text-sm rounded-[6px] py-3"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                  iconPosition="left"
                >
                  Start a Conversation
                </Button>

                {/* Footer Info - Centered */}
                <div className="flex flex-col items-center gap-0.5 pt-1">
                  <span className="font-serif text-[0.75rem] text-[#000000]">
                    The Lateef & Co.
                  </span>
                  <span className="label text-[0.45rem] text-[#8A8A8A] tracking-[0.15em]">
                    Mumbai, India · Est. 2024
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
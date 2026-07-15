"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { WHATSAPP_URL } from "../../lib/constants";
import { trackWhatsAppClick } from "../../lib/utils/tracking";

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

export default function MobileNav({
  isOpen,
  onClose,
}: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [onClose]);

  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("mobile-nav");
    onClose();
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 20,
      filter: "blur(16px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 20,
      filter: "blur(16px)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(6px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.18 + i * 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 md:hidden bg-black/10 backdrop-blur-xl p-3"
        >
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              relative
              w-full
              h-full
              rounded-[15px]
              overflow-hidden
              border border-white/40
              bg-white/60
              backdrop-blur-3xl
              backdrop-saturate-150
              shadow-[0_30px_80px_rgba(0,0,0,0.15)]
              flex
              flex-col
            "
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-white/20 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full px-6 pt-5 pb-6">

              {/* Header */}

              <div className="flex items-center justify-between">

                <Link
                  href="/"
                  onClick={onClose}
                  className="font-serif text-[1.35rem] font-medium tracking-tight"
                >
                  The Lateef & Co.
                </Link>

                <motion.button
                  onClick={onClose}
                  whileHover={{
                    
                    scale: 1.09,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    w-11
                    h-11
                    rounded-[10px]
                    flex
                    items-center
                    justify-center
                    bg-white/70
                    backdrop-blur-xl
                    border
                    border-white/10"
                  aria-label="Close Menu"
                >
                  <X
                    strokeWidth={1.6}
                    className="w-5 h-5"
                  />
                </motion.button>

              </div>

              <nav className="flex-1 flex flex-col justify-start pt-10">

                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                  >

                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block py-2.5 font-serif text-[1.5rem] font-medium tracking-tight transition-all duration-300 ${
                        isActive(link.href)
                          ? "opacity-60"
                          : "hover:opacity-60"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {i < NAV_LINKS.length - 1 && (
                      <div className="w-full h-px bg-black/10 my-2.5" />
                    )}

                  </motion.div>
                ))}

              </nav>

              <div className="w-full h-px bg-black/10 mb-6" />
                            <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-5"
              >
                <Button
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  variant="primary"
className="w-full justify-center rounded-[7px] py-3.5 text-sm shadow-lg"                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                  iconPosition="left"
                >
                  Start a Conversation
                </Button>

                <div className="flex flex-col items-center gap-1 pt-1">
                  <span className="font-serif text-sm text-black/90">
                    The Lateef & Co.
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-black/45">
                    Mumbai, India · Est. 2024
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
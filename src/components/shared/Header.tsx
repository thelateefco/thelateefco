"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import MobileNav from "./MobileNav";
import { WHATSAPP_URL, NAV_LINKS } from "../../lib/constants";
import { trackWhatsAppClick } from "../../lib/utils/tracking";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("header");
  };

  // Check if on homepage
  const isHomePage = pathname === "/";

  // Determine text color
  const shouldBeWhite = isHomePage && !scrolled;
  const textColor = shouldBeWhite ? "text-[#FFFFFF]" : "text-[#1A1A1A]";
  const hoverColor = shouldBeWhite ? "hover:text-[#FFFFFF]/80" : "hover:text-[#1A1A1A]/80";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3">
        <div className="max-w-[1280px] mx-auto px-3 md:px-10 lg:px-16">
          <div
            className={`
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                scrolled 
                  ? "bg-white/80 backdrop-blur-xl rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)]" 
                  : "bg-white/10 backdrop-blur-sm rounded-xl shadow-none"
              }
            `}
          >
            <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
              {/* Logo */}
              <Link
                href="/"
                aria-label="The Lateef & Co. - Home"
                className="leading-none"
              >
                <span className={`font-serif text-[1.65rem] md:text-[1.75rem] font-medium tracking-tight transition-colors duration-300 ${textColor}`}>
                  The Lateef & Co.
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      text-sm font-light tracking-wide transition-colors duration-300
                      ${textColor} ${hoverColor}
                      ${isActive(link.href) ? "opacity-100" : "opacity-80"}
                      relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300
                      ${isActive(link.href) ? `after:w-full ${shouldBeWhite ? "after:bg-[#FFFFFF]" : "after:bg-[#1A1A1A]"}` : ""}
                      hover:after:w-full ${shouldBeWhite ? "hover:after:bg-[#FFFFFF]" : "hover:after:bg-[#1A1A1A]"}
                    `}
                  >
                    {link.label}
                  </Link>
                ))}

                <Button
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  variant="primary"
                  className={`text-[0.72rem] rounded-[7px] px-5 py-2.5 ml-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                    shouldBeWhite 
                      ? "bg-[#FFFFFF] text-[#1A1A1A] hover:bg-[#FFFFFF]/90" 
                      : "bg-[#1A1A1A] text-[#FFFFFF] hover:bg-[#1A1A1A]/90"
                  }`}
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                  iconPosition="left"
                >
                  WhatsApp
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden flex flex-col gap-[5px] p-2"
              >
                <span
                  className={`block w-6 h-px transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                  style={{
                    backgroundColor: mobileMenuOpen ? "#1A1A1A" : shouldBeWhite ? "#FFFFFF" : "#1A1A1A",
                  }}
                />
                <span
                  className={`block w-6 h-px transition-opacity duration-200 ease-out ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                  style={{
                    backgroundColor: shouldBeWhite ? "#FFFFFF" : "#1A1A1A",
                  }}
                />
                <span
                  className={`block w-6 h-px transition-transform duration-300 ease-out ${
                    mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                  style={{
                    backgroundColor: mobileMenuOpen ? "#1A1A1A" : shouldBeWhite ? "#FFFFFF" : "#1A1A1A",
                  }}
                />
              </button>
            </div>
          </div>
       </div>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
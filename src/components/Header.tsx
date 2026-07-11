"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/919769212600?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20The%20Lateef%20%26%20Co.";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#ECE6DF]/95 backdrop-blur-sm border-b border-[#D0C9C1]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="flex flex-col leading-none group"
              aria-label="The Lateef & Co. — Home"
            >
              <span
                className="font-serif text-[1.7rem] md:text-[1.6rem] font-medium tracking-tight text-[#1A1A1A]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Lateef & Co.
              </span>
              {/* <span className="label text-[0.55rem] tracking-[0.2em] text-[#8A8A8A] mt-0.5">
                Web Studio · Mumbai
              </span> */}
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-3 px-5 ml-4"
                aria-label="Start a conversation on WhatsApp"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-[#1A1A1A] transition-all duration-300 ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#ECE6DF] flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className="flex flex-col gap-8"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="font-serif text-4xl text-[#1A1A1A] border-b border-[#D0C9C1] pb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="btn-primary self-start mt-4"
          >
            Start a conversation
          </a>
        </nav>
      </div>
    </>
  );
}

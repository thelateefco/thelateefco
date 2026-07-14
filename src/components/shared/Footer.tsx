"use client";

import Link from "next/link";
import { WHATSAPP_URL, EMAIL } from "../../lib/constants";
import { trackWhatsAppClick, trackEmailClick } from "../../lib/utils/tracking";
import BackToTop from "../shared/BackToTop";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("footer");
  };

  const handleEmailClick = async () => {
    await trackEmailClick("footer");
  };

  return (
    <>
      <footer className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 border-t border-[#D0D0D5]">
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="font-serif text-[1.125rem] md:text-[1.25rem] text-[#1A1A1A] font-medium hover:opacity-60 transition-opacity"
              >
                The Lateef & Co.
              </Link>
              <span className="label text-[#8A8A8A] text-[0.55rem]">
                © {year} · Mumbai, India · All rights reserved
              </span>
            </div>

            {/* Center - Social/Contact */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleEmailClick}
                className="nav-link text-xs"
              >
                Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="nav-link text-xs"
              >
                WhatsApp
              </a>
              <span className="text-[#D0C9C1]">|</span>
              <span className="label text-[#8A8A8A] text-[0.5rem]">
                Built with purpose
              </span>
            </div>

            {/* Right - Back to top (desktop) */}
            <div className="hidden md:block">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="label text-[#8A8A8A] text-[0.5rem] hover:text-[#1A1A1A] transition-colors flex items-center gap-2"
              >
                Back to top
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M6 10.5V1.5M1.5 6L6 1.5 10.5 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
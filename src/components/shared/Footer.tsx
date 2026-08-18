"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WHATSAPP_URL, EMAIL } from "../../lib/constants";
import { trackWhatsAppClick, trackEmailClick } from "../../lib/utils/tracking";
import { account } from "../../lib/appwrite/client";
// import BackToTop from "../shared/BackToTop";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    setIsAdmin(isLoggedIn === "true");
  }, []);

  const handleWhatsAppClick = async () => {
    await trackWhatsAppClick("footer");
  };

  const handleEmailClick = async () => {
    await trackEmailClick("footer");
  };

  const handleLogout = async () => {
    try {
      // Clear Appwrite session
      await account.deleteSession("current");
    } catch {
      // Ignore
    }
    // Clear session storage
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminEmail");
    sessionStorage.removeItem("adminName");
    setIsAdmin(false);
    // Redirect to home page
    router.push("/");
  };

  return (
    <>
      <footer className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 border-t border-[#D0D0D5]">
        <div className="max-w-[1280px] mx-auto py-12 md:py-16">
          {/* Main Footer Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
            {/* Brand & Copyright */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="font-serif text-[1.125rem] md:text-[1.25rem] font-medium hover:opacity-60 transition-opacity text-[#000000]"
              >
                The Lateef & Co.
              </Link>
              <span className="label text-[#8A8A8A] text-[0.55rem] sm:text-[0.6rem] tracking-widest">
                © {year} · Mumbai, India · All rights reserved
              </span>
            </div>

            {/* Navigation / Social Links */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-5 sm:gap-6 md:gap-8">
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleEmailClick}
                className="footer-link text-xs tracking-widest uppercase font-light"
              >
                Email
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="footer-link text-xs tracking-widest uppercase font-light"
              >
                WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/the-lateef-and-co-283426423"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-xs tracking-widest uppercase font-light"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/thelateefco/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-xs tracking-widest uppercase font-light"
              >
                Instagram
              </a>
              <a
                href="https://x.com/TheLateefCo"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link text-xs tracking-widest uppercase font-light"
              >
                Twitter
              </a>
              {/* Donate Link */}
              <Link
                href="/donate"
                className="footer-link text-xs tracking-widest uppercase font-light !text-[#B91C1C] after:!bg-[#B91C1C]"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Bottom Meta Bar */}
          <div className="mt-10 pt-6 border-t border-[#E8E8EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#8A8A8A]">
              <span className="label text-[#8A8A8A] text-[0.5rem] tracking-widest uppercase">
                Built with purpose
              </span>
              <span className="text-[#D0D0D5]">|</span>
              {isAdmin ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="label text-[0.55rem] hover:text-[#000000] transition-colors text-[#000000]"
                  >
                    Dashboard
                  </Link>
                  <span className="text-[#D0D0D5]">|</span>
                  <button
                    onClick={handleLogout}
                    className="label text-[0.55rem] hover:opacity-60 transition-colors text-[#B91C1C]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/admin/login"
                  className="label text-[0.55rem] hover:text-[#000000] transition-colors text-[#8A8A8A]"
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="label text-[#8A8A8A] text-[0.5rem] tracking-widest hover:text-[#000000] transition-colors flex items-center gap-2"
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
      </footer>
      
    </>
  );
}
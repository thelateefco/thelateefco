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
        <div className="max-w-[1280px] mx-auto">
          <div className="py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="font-serif text-[1.125rem] md:text-[1.25rem] font-medium hover:opacity-60 transition-opacity"
                style={{ color: "#000000" }}
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
              <a
                href="https://www.linkedin.com/in/the-lateef-and-co-283426423"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/thelateefco/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
              >
                Instagram
              </a>
              <a
                href="https://x.com/TheLateefCo"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-xs"
              >
                Twitter
              </a>
              {/* Donate Link - Added here */}
              <Link
                href="/donate"
                className="nav-link text-xs flex items-center gap-1 text-[#B91C1C] hover:text-[#8A1A1A] transition-colors"
              >

                Donate
              </Link>
              <span className="text-[#D0D0D5]">|</span>
              <span className="label text-[#8A8A8A] text-[0.5rem]">
                Built with purpose
              </span>
            </div>

            {/* Right - Admin Links & Back to Top */}
            <div className="flex items-center gap-4">
              {/* Admin Links */}
              {isAdmin ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="label text-[0.55rem] hover:opacity-60 transition-colors"
                    style={{ color: "#000000" }}
                  >
                    Dashboard
                  </Link>
                  <span className="text-[#D0D0D5]">|</span>
                  <button
                    onClick={handleLogout}
                    className="label text-[0.55rem] hover:opacity-60 transition-colors"
                    style={{ color: "#B91C1C" }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/admin/login"
                    className="label text-[0.55rem] hover:opacity-60 transition-colors"
                    style={{ color: "#000000" }}
                  >
                    Admin
                  </Link>
                </>
              )}

              <span className="text-[#D0D0D5]">|</span>

              {/* Back to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="label text-[#8A8A8A] text-[0.5rem] hover:text-[#000000] transition-colors flex items-center gap-2"
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
      
    </>
  );
}
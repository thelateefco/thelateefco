"use client";

const WHATSAPP_URL =
  "https://wa.me/919769212600?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20The%20Lateef%20%26%20Co.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#ECE6DF] px-6 md:px-10 lg:px-16 pb-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="hairline py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <span
              className="font-serif text-[1rem] text-[#1A1A1A] font-medium"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Lateef & Co.
            </span>
            <span className="label text-[#8A8A8A] text-[0.55rem]">
              © {year} · Mumbai, India · All rights reserved
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <a href={`mailto:hello@thelateefco.com`} className="nav-link">
              Email
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

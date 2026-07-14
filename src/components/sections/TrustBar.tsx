"use client";

import { motion } from "framer-motion";

const locations = [
  { city: "Mumbai", country: "India", emoji: "🇮🇳" },
  { city: "Dubai", country: "UAE", emoji: "🇦🇪" },
  { city: "London", country: "UK", emoji: "🇬🇧" },
  { city: "Singapore", country: "Singapore", emoji: "🇸🇬" },
];

export default function TrustBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
// Change className to:
className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 border-t border-b border-[#D0D0D5]"    >
      <div className="max-w-[1280px] mx-auto">
        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A4A4A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="label text-[0.6rem] tracking-[0.15em] text-[#4A4A4A]">
              Working with businesses across
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {locations.map((loc) => (
              <div key={loc.city} className="flex items-center gap-2">
                <span className="text-sm">{loc.emoji}</span>
                <span className="text-[0.8125rem] font-light text-[#4A4A4A]">
                  {loc.city}
                </span>
                <span className="text-[0.625rem] text-[#8A8A8A]">
                  {loc.country}
                </span>
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </motion.section>
  );
}
"use client";

const locations = [
  "India",
  "Dubai",
  "USA",
  "Australia",
  "India",
  "Dubai",
  "USA",
  "Australia",
];

export default function TrustBar() {
  return (
    <section className="bg-[#F5F5F7] border-t border-b border-[#D0D0D5] overflow-hidden">
      <div className="py-5 md:py-6 flex items-center gap-0">
        {/* Static label */}
        <div className="shrink-0 flex items-center gap-3 pl-6 md:pl-10 lg:pl-16 pr-8 border-r border-[#D0D0D5] mr-8 bg-[#F5F5F7] z-10">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span className="label text-[0.6rem] tracking-[0.15em] text-[#4A4A4A] whitespace-nowrap">
            Working with businesses across
          </span>
        </div>

        {/* Marquee track */}
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee gap-12 pr-12">
            {locations.map((loc, i) => (
              <span
                key={`a-${i}`}
                className="text-[0.8125rem] font-light text-[#4A4A4A] whitespace-nowrap flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-[#C0B9B1] inline-block" />
                {loc}
              </span>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex animate-marquee gap-12 pr-12" aria-hidden="true">
            {locations.map((loc, i) => (
              <span
                key={`b-${i}`}
                className="text-[0.8125rem] font-light text-[#4A4A4A] whitespace-nowrap flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-[#C0B9B1] inline-block" />
                {loc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
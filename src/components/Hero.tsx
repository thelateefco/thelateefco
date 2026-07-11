"use client";

import Reveal from "./Reveal";

const WHATSAPP_URL =
  "https://wa.me/919769212600?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20The%20Lateef%20%26%20Co.";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-[#ECE6DF] pt-24 pb-16 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Eyebrow */}
        <Reveal delay={0}>
          <p className="label mb-10 md:mb-14">
            Mumbai, India · Est. 2024
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h1
            className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-medium text-[#1A1A1A] leading-[1.05] tracking-tight max-w-[14ch]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to make your competitors{" "}
            <em className="italic not-italic" style={{ fontStyle: "italic" }}>
              nervous?
            </em>
          </h1>
        </Reveal>

        {/* Subtext + CTA row */}
        <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
          <Reveal delay={0.2} className="max-w-[38ch]">
            <p className="text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-[#4A4A4A] font-light">
              We build websites that bring in customers — not just ones that sit
              there looking pretty.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <a
              id="hero-cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
              aria-label="Start a conversation on WhatsApp"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Start a conversation
            </a>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="label text-[0.5rem] tracking-[0.25em]">Scroll</span>
          <div className="w-px h-12 bg-[#1A1A1A] relative overflow-hidden">
            <div className="scroll-line-anim" />
          </div>
        </div>
      </div>
    </section>
  );
}

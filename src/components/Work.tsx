"use client";

import Reveal from "./Reveal";

const projects = [
  {
    id: "meridian-law",
    index: "01",
    name: "Meridian Law Chambers",
    category: "Web Design · Development",
    location: "Mumbai, IN",
    result:
      "Rebuilt the firm's online presence from a dated template into a trust-first experience — driving a 3× increase in qualified enquiries within 60 days of launch.",
    tags: ["Law Firm", "Lead Generation", "Mobile-first"],
  },
  {
    id: "saffron-table",
    index: "02",
    name: "Saffron Table",
    category: "Web Design · Development · AI Automation",
    location: "Dubai, UAE",
    result:
      "Designed a reservation-led site for a premium restaurant group. Integrated an AI-powered inquiry assistant that now handles 70% of booking queries without staff involvement.",
    tags: ["Hospitality", "AI Integration", "Conversion"],
  },
  {
    id: "verdant-studio",
    index: "03",
    name: "Verdant Studio",
    category: "Web Design · Development",
    location: "London, UK",
    result:
      "A portfolio-led website for an independent architecture practice. The new site won them two international client commissions in its first quarter live.",
    tags: ["Architecture", "Portfolio", "International"],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="bg-[#ECE6DF] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center justify-between hairline pt-6 mb-16 md:mb-20">
            <span className="label">Selected Work</span>
            <span className="label text-[#8A8A8A]">2024 — Present</span>
          </div>
        </Reveal>

        {/* Projects */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.07}>
              <article
                id={`project-${project.id}`}
                className="group grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 py-12 md:py-16 hairline cursor-default"
              >
                {/* Index */}
                <div>
                  <span className="label text-[#8A8A8A]">{project.index}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                    <h3
                      className="font-serif text-[1.875rem] md:text-[2.25rem] font-medium text-[#1A1A1A] leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {project.name}
                    </h3>
                    <span className="label text-[#8A8A8A] shrink-0">
                      {project.location}
                    </span>
                  </div>

                  <p className="label text-[#8A8A8A] text-[0.6rem]">
                    {project.category}
                  </p>

                  <p className="body-text text-[0.9375rem] leading-[1.8] max-w-[52ch] mt-1">
                    {project.result}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#D0C9C1] px-3 py-1 text-[0.6rem] font-medium tracking-[0.12em] uppercase text-[#4A4A4A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View link */}
                <div className="flex items-start md:items-center mt-2 md:mt-0">
                  <a
                    href="#contact"
                    className="link-arrow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label={`Learn more about ${project.name}`}
                  >
                    View project
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M1 6h10M6 1l5 5-5 5" />
                    </svg>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>
  );
}

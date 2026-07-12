"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../animations/Reveal";

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
    image: "/images/projects/meridian-law.jpg",
    slug: "meridian-law",
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
    image: "/images/projects/saffron-table.jpg",
    slug: "saffron-table",
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
    image: "/images/projects/verdant-studio.jpg",
    slug: "verdant-studio",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Work() {
  return (
    <section
      id="work"
      className="bg-[#ECE6DF] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-between hairline pt-6 mb-16 md:mb-20">
            <span className="label">Selected Work</span>
            <span className="label text-[#8A8A8A]">2024 — Present</span>
          </div>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="group bg-[#ECE6DF] border border-[#D0C9C1] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(26,26,26,0.08)] hover:border-[#1A1A1A]"
            >
              <Link href={`/work/${project.slug}`} className="block">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#D0C9C1]">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNEMEM5QzEiLz48L3N2Zz4="
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label text-[#8A8A8A] text-[0.55rem] mb-2">
                        {project.category}
                      </p>
                      <h3 className="font-serif text-[1.25rem] md:text-[1.375rem] font-medium text-[#1A1A1A] leading-tight">
                        {project.name}
                      </h3>
                      <span className="label text-[#8A8A8A] text-[0.55rem] mt-1 block">
                        {project.location}
                      </span>
                    </div>
                    <span className="label text-[#8A8A8A] text-[0.5rem] shrink-0">
                      {project.index}
                    </span>
                  </div>

                  <p className="body-text text-[0.875rem] leading-[1.7] mt-4 line-clamp-3">
                    {project.result}
                  </p>

                  {/* Tags with delayed animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#D0C9C1] px-3 py-1 text-[0.55rem] font-medium tracking-[0.12em] uppercase text-[#4A4A4A] transition-colors duration-300 group-hover:border-[#1A1A1A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-6"
                  >
                    <span className="link-arrow text-xs">
                      View case study
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
                    </span>
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  {
    value: "99+",
    label: "PageSpeed Score",
    description: "Built on clean Next.js architecture with near-instant page load times.",
  },
  {
    value: "3x",
    label: "Avg. Enquiry Increase",
    description: "Conversion-first layout structured to turn passive readers into buyers.",
  },
  {
    value: "24/7",
    label: "AI Customer Capture",
    description: "Automated chat & workflow agents capturing leads while you sleep.",
  },
  {
    value: "100%",
    label: "Bespoke Codebase",
    description: "Zero slow templates, zero fragile plugins, 100% custom built for longevity.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ImpactBanner() {
  return (
    <section className="bg-[#FFFFFF] py-24 md:py-36 px-6 md:px-10 lg:px-16 text-[#000000] border-t border-[#E0E0E4]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 hairline pt-6">
            <div>
              <span className="label text-[#8A8A8A] block mb-2">
                MEASURABLE OUTCOMES
              </span>
              <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.75rem)] font-medium text-[#000000] leading-[1.08] tracking-tight">
                Websites built for{" "}
                <em className="italic-em text-[#000000]">business growth.</em>
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-7 py-3.5 rounded-[7px] bg-[#140f0a] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] transition-colors shrink-0 cursor-pointer no-underline"
            >
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="
                bg-[#F5F5F7] 
                rounded-[20px] 
                p-7 md:p-8 
                flex flex-col justify-between 
                shadow-[8px_8px_20px_rgba(163,177,198,0.35),-8px_-8px_20px_rgba(255,255,255,0.8)]
                hover:shadow-[12px_12px_28px_rgba(163,177,198,0.45),-12px_-12px_28px_rgba(255,255,255,0.9)]
                transition-all 
                duration-500
              "
            >
              <div>
                <span className="font-serif text-[3rem] md:text-[3.75rem] font-medium text-[#000000] leading-none block mb-3 tabular-nums">
                  {stat.value}
                </span>
                <h3 className="font-serif text-[1.125rem] font-medium text-[#000000] mb-2">
                  {stat.label}
                </h3>
              </div>
              <p className="text-[#4A4A4A] text-[0.875rem] font-light leading-[1.6]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

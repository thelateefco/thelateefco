"use client";

import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import Image from "next/image";

const pillars = [
  {
    id: "precision",
    title: "Built with precision.",
    body: "We don't apply generic templates and call it a day. Every decision - layout, type, structure, copy - is considered in the context of your business and your customers.",
  },
  {
    id: "purpose",
    title: "Built with purpose.",
    body: "Decoration is easy. Function is harder. We prioritise the things that move your business forward: clarity, trust, and conversion - in that order.",
  },
  {
    id: "results",
    title: "Built for results.",
    body: "A beautiful website that doesn't generate enquiries is an expensive art project. Ours are designed from the ground up to work - to attract, to persuade, and to convert.",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function WhyUs() {
  return (
    <section
      id="why"
      className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* ✅ Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer/footer3.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <Reveal>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] font-medium text-[#ECE6DF]! leading-[1.1] tracking-tight mb-6 max-w-[20ch]">
            Not a website.{" "}
            <em className="italic-em text-[#ECE6DF]!">An asset that works for you.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[#A0A0A0] text-[1rem] md:text-[1.0625rem] font-light leading-[1.8] max-w-[48ch] mb-20 md:mb-28">
            Most agencies focus on the deliverable. We focus on the outcome.
            There&apos;s a difference - and your customers will feel it the
            moment they land on your site.
          </p>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-0"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className={`py-10 md:py-0 md:pr-12 ${
                i < pillars.length - 1
                  ? "border-b border-[#2E2E2E] md:border-b-0 md:border-r md:border-[#2E2E2E]"
                  : ""
              } ${i > 0 ? "md:pl-12" : ""}`}
            >
              <h3 className="font-serif text-[1.375rem] md:text-[1.5rem] font-medium text-[#ECE6DF]! mb-4 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-[#A0A0A0] text-[0.9375rem] leading-[1.8] font-light">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
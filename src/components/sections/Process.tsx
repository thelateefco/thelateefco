"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Reveal from "../animations/Reveal";

const steps = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    body: "We start with a focused conversation — your business, your customers, what's working, what isn't. Then we audit your current digital presence and map what the site actually needs to achieve. No briefs for the sake of briefs.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    duration: "Weeks 2–3",
    body: "We design in the browser with real content from day one — not abstract wireframes. You'll see how the site looks and moves before a single line of production code is written. Feedback loops are tight, revisions are structured.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    duration: "Weeks 3–5",
    body: "Development happens in parallel as design is confirmed, so nothing gets rebuilt twice. We build on modern, fast infrastructure — performance and accessibility are baked in, not bolted on at the end.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch",
    duration: "Week 6",
    body: "We handle the technical side of going live — domain, hosting, redirects, analytics — so you don't have to coordinate between multiple vendors. After launch, we stay available for 30 days to catch anything that needs attention.",
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

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="process"
// Change className to:
className="bg-[#E8E8EC] py-28 md:py-36 px-6 md:px-10 lg:px-16 relative"    >
      {/* Vertical line that draws down */}
      <div className="absolute left-6 md:left-10 lg:left-16 top-0 bottom-0 w-px overflow-hidden">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full bg-[#D0C9C1] origin-top"
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative pl-6 md:pl-10">
        <Reveal>
          <div className="hairline pt-6 mb-16 md:mb-20">
            <span className="label">How we work</span>
          </div>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              className="relative pb-16 md:pb-20 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[27px] md:-left-[37px] top-0 w-3 h-3 rounded-full border-2 border-[#1A1A1A] bg-[#ECE6DF]" />

              <div className="grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10">
                <div className="flex items-start gap-4">
                  <span className="label text-[#8A8A8A]">{step.number}</span>
                  <span className="label text-[#8A8A8A] text-[0.55rem]">
                    {step.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-[1.75rem] md:text-[2rem] font-medium text-[#1A1A1A] leading-tight">
                    {step.title}
                  </h3>
                </div>

                <div>
                  <p className="body-text text-[0.9375rem] leading-[1.8]">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
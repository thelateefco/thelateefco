"use client";

import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";

const testimonials = [
  {
    id: "1",
    quote: "The Lateef & Co. completely transformed our online presence. Within 60 days, we saw a 3× increase in qualified enquiries. They understood our firm's voice immediately.",
    name: "Sunil Kabadiya",
    business: "Meridian Law Chambers",
    location: "India",
  },
  {
    id: "2",
    quote: "We came to them with a vague idea and they delivered a polished, conversion-focused website that our customers actually trust. The AI integration for booking was a game-changer.",
    name: "Sheikh Zainab",
    business: "Saffron Table",
    location: "Dubai",
  },
  {
    id: "3",
    quote: "They built us a site that made us more confident in our advertisements. The attention to detail and strategic thinking sets them apart.",
    name: "Shruti Malani",
    business: "Verdant Studio",
    location: "India",
  },
];

const SOOTHING_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: SOOTHING_EASE,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="dark-section py-28 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="hairline pt-6 mb-16 md:mb-20">
            <span className="label">What our clients say</span>
          </div>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: SOOTHING_EASE }}
              className="group flex flex-col rounded-[16px] p-2 -m-2 transition-colors duration-500"
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4, ease: SOOTHING_EASE }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ECE6DF"
                  strokeWidth="1"
                  aria-hidden="true"
                  className="opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <path d="M10 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                  <path d="M19 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                  <path d="M10 19h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                  <path d="M19 19h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                </svg>
              </motion.div>

              <blockquote className="text-[#ECE6DF] text-[0.9375rem] font-light leading-[1.8] mb-6 flex-1">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-5 border-t border-white/10">
                <cite className="font-serif text-[1.125rem] font-medium text-[#ECE6DF] not-italic block">
                  {testimonial.name}
                </cite>
                {/* <span className="text-[#8A8A8A] text-[0.8125rem] font-light block mt-0.5">
                  {testimonial.business}
                </span> */}
                <span className="text-[#6A6A6A] text-[0.6875rem] font-light block mt-0.5">
                  {testimonial.location}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
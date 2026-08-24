"use client";

import { motion } from "framer-motion";
import Reveal from "../animations/Reveal";
import Image from "next/image";
import ParallaxBackground from "../shared/ParallaxBackground";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: "1",
    rating: 5,
    quote: "The Lateef & Co. completely transformed our online presence. Within 60 days, we saw a 3× increase in qualified enquiries. They understood our firm's voice immediately.",
    name: "Sunil Kabadiya",
    business: "Meridian Law Chambers",
    location: "India",
  },
  {
    id: "2",
    rating: 5,
    quote: "I came with a vague idea and he delivered a polished, conversion-focused website that our customers actually trust. The AI integration for booking was a game-changer.",
    name: "Sheikh Zainab",
    business: "Saffron Table",
    location: "Dubai",
  },
  {
    id: "3",
    rating: 5,
    quote: "He built me a site that made me more confident in my advertisements. The attention to detail and strategic thinking sets him apart.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: SOOTHING_EASE,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden">
      {/* ✅ Background Image with Parallax */}
      <ParallaxBackground speed={20}>
        <Image
          src="/images/footer/footer8.jpg"
          alt="Background"
          fill
          className="object-cover object-[72%_center] sm:object-center transform-gpu"
          priority
          quality={75}
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/45" />
      </ParallaxBackground>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-medium text-[#ECE6DF]! leading-[1.1] tracking-tight">
              What my clients say
            </h2>
          </div>
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group flex flex-col rounded-2xl p-6 md:p-8 transform-gpu bg-white/[0.06] backdrop-blur-sm sm:backdrop-blur-md border border-white/15 hover:border-white/35 hover:bg-white/[0.12] transition-all duration-200 ease-out hover:-translate-y-1.5 shadow-xl will-change-transform"
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              <blockquote className="text-[#ECE6DF] text-[0.95rem] font-light leading-[1.8] mb-6 flex-1">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-5 border-t border-white/10">
                <cite className="font-serif text-[1.125rem] font-medium text-[#ECE6DF] not-italic block">
                  {testimonial.name}
                </cite>
                <span className="text-[#8A8A8A] text-[0.75rem] font-light block mt-1">
                  {testimonial.business} &bull; {testimonial.location}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
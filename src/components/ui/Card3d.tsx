"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

export interface Card3DProps {
  title: string;
  subtitle?: string;
  location?: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  link: string;
  index?: number;
  className?: string;
}

export default function Card3D({
  title,
  subtitle,
  location,
  description,
  tags,
  image,
  imageAlt = title,
  link,
  index = 0,
  className,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform values for tilt
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  // Parallax for image
  const imageX = useTransform(x, [-0.5, 0.5], [8, -8]);
  const imageY = useTransform(y, [-0.5, 0.5], [8, -8]);

  // Shadow opacity based on tilt
  const shadowOpacity = useTransform(
    x,
    [-0.5, 0, 0.5],
    [0.04, 0.02, 0.04]
  );

  // Check for mobile and reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReducedMotion) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(Math.max(-0.5, Math.min(0.5, normalizedX)));
    y.set(Math.max(-0.5, Math.min(0.5, normalizedY)));
  };

  const handleMouseLeave = () => {
    if (isMobile || prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Simple hover animation for mobile/reduced motion
  const simpleHover = isMobile || prefersReducedMotion;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={cn(
        "group relative",
        "border border-[#D0C9C1]/60",
        "bg-transparent",
        "transition-all duration-300",
        "hover:border-[#1A1A1A]",
        className
      )}
      style={
        !simpleHover
          ? {
              perspective: 800,
              rotateX,
              rotateY,
              boxShadow: `0 8px 40px rgba(26,26,26, ${shadowOpacity})`,
            }
          : undefined
      }
      onMouseMove={!simpleHover ? handleMouseMove : undefined}
      onMouseLeave={!simpleHover ? handleMouseLeave : undefined}
      whileHover={
        simpleHover
          ? {
              y: -4,
              transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
            }
          : {
              y: -4,
              transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
            }
      }
      whileTap={simpleHover ? { scale: 0.98 } : undefined}
    >
      <Link href={link} className="block h-full">
        {/* Image Container with Parallax */}
        <div className="relative overflow-hidden aspect-[16/10] bg-[#D0C9C1]/30">
          <motion.div
            className="w-full h-full"
            style={
              !simpleHover
                ? {
                    x: imageX,
                    y: imageY,
                  }
                : undefined
            }
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Subtle overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-[#1A1A1A]/0 transition-colors duration-500 group-hover:bg-[#1A1A1A]/5"
            style={
              !simpleHover
                ? {
                    opacity: shadowOpacity,
                  }
                : undefined
            }
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              {subtitle && (
                <p className="label text-[#8A8A8A] text-[0.55rem] mb-1.5">
                  {subtitle}
                </p>
              )}
              <h3 className="font-serif text-[1.125rem] md:text-[1.25rem] font-medium text-[#1A1A1A] leading-tight">
                {title}
              </h3>
              {location && (
                <span className="label text-[#8A8A8A] text-[0.5rem] mt-1 block">
                  {location}
                </span>
              )}
            </div>
            <span className="label text-[#8A8A8A] text-[0.45rem] shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="body-text text-[0.8125rem] leading-[1.7] mt-3 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-1.5 mt-3"
          >
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-[#D0C9C1]/60 px-2.5 py-1 text-[0.5rem] font-medium tracking-[0.1em] uppercase text-[#4A4A4A] transition-colors duration-300 group-hover:border-[#1A1A1A]/30"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* View link */}
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] font-medium tracking-[0.12em] uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-0.5 transition-opacity duration-300 group-hover:opacity-60">
              View case study
              <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
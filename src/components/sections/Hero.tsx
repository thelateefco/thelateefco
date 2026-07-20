"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { WHATSAPP_URL } from "../../lib/constants";
import { trackWhatsAppClick } from "../../lib/utils/tracking";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const handleWhatsAppClick = () => {
    trackWhatsAppClick("hero");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col justify-center bg-[#1A1A1A] pt-12 sm:pt-16 md:pt-24 pb-3 sm:pb-10 md:pb-16 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* ✅ Video Background - No Overlay */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/homepage3.jpg"
            onError={() => setVideoError(true)}
          >
            <source src="/images/homeVideo.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <div className="absolute inset-0 bg-[#1A1A1A]" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[#1A1A1A]">
            <div className="relative w-full h-[calc(100%+50px)] sm:h-full -top-[25px] sm:top-0">
              <Image
                src="/images/homepage3.jpg"
                alt="Background"
                fill
                className="object-cover object-top scale-[1.08] sm:scale-100"
                priority
                sizes="100vw"
              />
            </div>
          </div>
        )}
      </div>

      {/* ✅ No overlay - removed black/40 */}

      {/* Background texture overlay - optional */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/images/grain.png')] bg-repeat" />
      </div>

      <div className="max-w-[1280px] mx-auto w-full relative z-10 mt-[-110px] sm:mt-0">
        {/* Headline with stagger - Centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[clamp(3.2rem,7vw,6.5rem)] font-medium text-[#FFFFFF]! leading-[1.05] tracking-tight max-w-[14ch] mx-auto drop-shadow-lg"
          >
            Ready to make
            <br />
            your competitors{" "}
            <em className="italic-em text-[#FFFFFF]!">nervous?</em>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-3 md:mt-8 flex flex-col items-center gap-3 md:gap-6"
          >
            <p className="text-[1rem] sm:text-[1.3rem] md:text-[1.3rem] leading-[1.75] font-light max-w-[38ch] mx-auto text-[#FFFFFF] drop-shadow-md">
              We build websites that bring in customers - not just ones that sit
              there looking pretty.
            </p>

            <Button
              id="hero-cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              variant="primary"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
              iconPosition="left"
              className="mt-1"
            >
              Chat With Me on WhatsApp
            </Button>

            <p className="text-[0.8rem] md:text-[0.85rem] tracking-wide text-[#FFFFFF]/60 font-light">
              Trusted by 20+ businesses to build sites that convert
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Explore more cue at bottom of Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 md:gap-2 z-10"
      >
        <span className="label text-[0.4rem] md:text-[0.45rem] tracking-[0.2em] text-[#FFFFFF]/60!">
          Explore more
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-[#FFFFFF]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
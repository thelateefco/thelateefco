"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Reveal from "../animations/Reveal";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [selectedIndex, images.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  if (!images || images.length === 0) return null;

  const heroImage = images[0];
  const galleryImages = images.length > 1 ? images.slice(1) : [];

  return (
    <>
      {/* Featured / Hero Main Image */}
      <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <div className="
              bg-[#F5F5F7]
              rounded-[20px]
              overflow-hidden
              shadow-[8px_8px_20px_rgba(163,177,198,0.35),-8px_-8px_20px_rgba(255,255,255,0.8)]
              relative
              group
            ">
              <div 
                onClick={() => openLightbox(0)}
                className="relative aspect-[16/9] m-3 rounded-[16px] overflow-hidden bg-[#E8E8EC] shadow-[inset_2px_2px_6px_rgba(163,177,198,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.6)] cursor-pointer"
              >
                <Image
                  src={heroImage}
                  alt={`${title} main preview`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1400px"
                  priority
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="inline-flex items-center gap-2 bg-[#FFFFFF]/90 text-[#000000] px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Click to enlarge
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Showcase Grid (for multi-image projects) */}
      {galleryImages.length > 0 && (
        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-8">
                <span className="label text-[#8A8A8A]">Project Gallery</span>
              </div>
            </Reveal>

            <div className={`grid gap-6 md:gap-8 ${
              galleryImages.length === 1
                ? "grid-cols-1"
                : galleryImages.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}>
              {galleryImages.map((img, idx) => {
                const actualIndex = idx + 1;
                return (
                  <Reveal key={img + idx} delay={idx * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => openLightbox(actualIndex)}
                      className="
                        group
                        bg-[#F5F5F7]
                        rounded-[20px]
                        overflow-hidden
                        shadow-[8px_8px_20px_rgba(163,177,198,0.35),-8px_-8px_20px_rgba(255,255,255,0.8)]
                        hover:shadow-[12px_12px_28px_rgba(163,177,198,0.45),-12px_-12px_28px_rgba(255,255,255,0.9)]
                        cursor-pointer
                        transition-all
                        duration-300
                      "
                    >
                      <div className="relative aspect-[16/10] m-3 rounded-[16px] overflow-hidden bg-[#E8E8EC] shadow-[inset_2px_2px_6px_rgba(163,177,198,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
                        <Image
                          src={img}
                          alt={`${title} gallery image ${actualIndex}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 bg-[#FFFFFF]/90 text-[#000000] px-3 py-1.5 rounded-full text-[0.7rem] font-medium backdrop-blur-md shadow">
                            <Maximize2 className="w-3 h-3" />
                            View
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-[#FFFFFF]">
              <span className="text-xs uppercase tracking-widest text-[#FFFFFF]/70 font-mono">
                {title} - {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-4 md:left-8 p-3 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF] transition-colors z-20 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-4 md:right-8 p-3 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF] transition-colors z-20 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Lightbox Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-h-[85vh]">
                <Image
                  src={images[selectedIndex]}
                  alt={`${title} enlarged view ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

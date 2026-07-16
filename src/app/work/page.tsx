"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "../../lib/appwrite/server";
import { getImageUrl } from "../../lib/utils/images";
import type { Project } from "../../lib/appwrite/collections";

const SOOTHING_EASE = [0.16, 1, 0.3, 1] as const;

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects(true);
        if (result.success && result.data) {
          setProjects(result.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get image URL - checks images field first, then featuredImage
  const getProjectImage = (project: Project) => {
    if (project.images) {
      return getImageUrl(project.images);
    }
    if (project.featuredImage) {
      return getImageUrl(project.featuredImage);
    }
    return "";
  };

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">Our work</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#000000] leading-[1.05] tracking-tight max-w-[14ch] mb-6">
                Projects that
                <br />
                <em className="italic-em text-[#000000]">speak for themselves.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-[1.75] text-[#4A4A4A] font-light max-w-[42ch]">
                Here's a glimpse of what we've built for our clients.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 pb-28 md:pb-36">
          <div className="max-w-[1280px] mx-auto">
            {loading ? (
              // Loading state with neumorphism
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-[#F5F5F7] rounded-[20px] animate-pulse shadow-[8px_8px_20px_rgba(163,177,198,0.35),-8px_-8px_20px_rgba(255,255,255,0.8)]"
                  >
                    <div className="aspect-[16/10] bg-[#E8E8EC]/40 rounded-[20px] m-3 mb-0" style={{ height: "calc(100% - 3rem)" }} />
                    <div className="p-6 md:p-8 space-y-3">
                      <div className="h-4 bg-[#E8E8EC]/40 rounded w-20" />
                      <div className="h-6 bg-[#E8E8EC]/40 rounded w-3/4" />
                      <div className="h-16 bg-[#E8E8EC]/40 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              // Empty state
              <div className="py-20 text-center">
                <p className="font-serif text-2xl text-[#000000] font-medium mb-4">
                  Coming soon.
                </p>
                <p className="body-text text-[0.9375rem] text-[#4A4A4A] max-w-[38ch] mx-auto">
                  We're working on some exciting projects. Check back soon to see our latest work.
                </p>
              </div>
            ) : (
              // Projects grid with neumorphism cards
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {projects.map((project, index) => {
                  const imageUrl = getProjectImage(project);

                  return (
                    <motion.article
                      key={project.$id}
                      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-40px" }}
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{
                        duration: 0.8,
                        ease: SOOTHING_EASE,
                      }}
                      className="
                        group
                        bg-[#F5F5F7]
                        rounded-[20px]
                        overflow-hidden
                        shadow-[8px_8px_20px_rgba(163,177,198,0.35),-8px_-8px_20px_rgba(255,255,255,0.8)]
                        hover:shadow-[12px_12px_28px_rgba(163,177,198,0.45),-12px_-12px_28px_rgba(255,255,255,0.9)]
                        transition-shadow
                        duration-500
                        ease-out
                      "
                    >
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] m-3 mb-0 rounded-[16px] overflow-hidden shadow-[inset_2px_2px_6px_rgba(163,177,198,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.6)]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8A8A8A] text-sm font-light bg-[#E8E8EC]/40">
                            {project.category}
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="label text-[#8A8A8A] text-[0.55rem] mb-1.5">
                              {project.category}
                            </p>
                            <h2 className="font-serif text-[1.5rem] md:text-[1.75rem] font-medium text-[#000000] leading-tight">
                              {project.title}
                            </h2>
                            <span className="label text-[#8A8A8A] text-[0.55rem] mt-1 block">
                              {project.location}
                            </span>
                          </div>
                          <span className="label text-[#8A8A8A] text-[0.5rem] shrink-0">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="body-text text-[0.9375rem] leading-[1.8] mt-4 text-[#000000]">
                          {project.result}
                        </p>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="border border-[#E8E8EC] px-3 py-1 text-[0.55rem] font-medium tracking-[0.12em] uppercase text-[#4A4A4A] rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-6">
                          <Link
                            href={`/work/${project.slug}`}
                            className="link-arrow text-xs inline-flex items-center gap-1.5"
                          >
                            View case study
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                      
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
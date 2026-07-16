"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "../../components/animations/Reveal";
import { getFeaturedProjects } from "../../lib/appwrite/server";
import { getImageUrl } from "../../lib/utils/images";
import type { Project } from "../../lib/appwrite/collections";

const SOOTHING_EASE = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getFeaturedProjects(3);
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
    <section
      id="work"
      className="bg-[#F5F5F7] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-between hairline pt-6 mb-16 md:mb-20">
            <span className="label">Selected Work</span>
            <Link href="/work" className="label text-[#8A8A8A] hover:text-[#000000] transition-colors">
              View all →
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((i) => (
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
          <div className="text-center py-12">
            <p className="font-serif text-xl text-[#000000] font-medium mb-2">
              Coming soon.
            </p>
            <p className="text-[#4A4A4A] text-sm font-light">
              Check back soon to see our latest work.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => {
              const imageUrl = getProjectImage(project);

              return (
                <motion.article
                  key={project.$id}
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12,
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

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="label text-[#8A8A8A] text-[0.55rem] mb-2">
                          {project.category}
                        </p>
                        <h3 className="font-serif text-[1.25rem] md:text-[1.375rem] font-medium text-[#000000] leading-tight">
                          {project.title}
                        </h3>
                      </div>
                      <span className="label text-[#8A8A8A] text-[0.5rem] shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="body-text text-[0.875rem] leading-[1.7] mt-4 line-clamp-3">
                      {project.result}
                    </p>

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
  );
}
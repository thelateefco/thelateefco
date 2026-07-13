"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../../components/animations/Reveal";
import { getFeaturedProjects } from "../../lib/appwrite/server";
import type { Project } from "../../lib/appwrite/collections";

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch only featured projects
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

  return (
    <section
      id="work"
      className="bg-[#ECE6DF] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="flex items-center justify-between hairline pt-6 mb-16 md:mb-20">
            <span className="label">Selected Work</span>
            <Link href="/work" className="label text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
              View all →
            </Link>
          </div>
        </Reveal>

        {loading ? (
          // Loading state
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#D0C9C1] bg-[#D0C9C1]/20 animate-pulse">
                <div className="aspect-[16/10] bg-[#D0C9C1]/40" />
                <div className="p-6 md:p-8 space-y-3">
                  <div className="h-4 bg-[#D0C9C1]/40 rounded w-20" />
                  <div className="h-6 bg-[#D0C9C1]/40 rounded w-3/4" />
                  <div className="h-4 bg-[#D0C9C1]/40 rounded w-1/2" />
                  <div className="h-16 bg-[#D0C9C1]/40 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="font-serif text-xl text-[#1A1A1A] font-medium mb-2">
              Coming soon.
            </p>
            <p className="text-[#4A4A4A] text-sm font-light">
              Check back soon to see our latest work.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.$id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group border border-[#D0C9C1] hover:border-[#1A1A1A] transition-colors duration-300 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] bg-[#D0C9C1]/30 overflow-hidden">
                  {project.featuredImage ? (
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8A8A8A] text-sm font-light">
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
                      <h3 className="font-serif text-[1.25rem] md:text-[1.375rem] font-medium text-[#1A1A1A] leading-tight">
                        {project.title}
                      </h3>
                      <span className="label text-[#8A8A8A] text-[0.55rem] mt-1 block">
                        {project.location}
                      </span>
                    </div>
                    <span className="label text-[#8A8A8A] text-[0.5rem] shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="body-text text-[0.875rem] leading-[1.7] mt-4 line-clamp-3">
                    {project.result}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#D0C9C1] px-2.5 py-1 text-[0.5rem] font-medium tracking-[0.1em] uppercase text-[#4A4A4A] transition-colors duration-300 group-hover:border-[#1A1A1A]/30"
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
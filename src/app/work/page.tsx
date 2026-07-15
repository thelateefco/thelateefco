"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import Reveal from "../../components/animations/Reveal";
import Image from "next/image";
import { getProjects } from "../../lib/appwrite/server";
import type { Project } from "../../lib/appwrite/collections";

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
              // Loading state
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-[#E8E8EC] bg-[#F5F5F7]/50 animate-pulse rounded-[12px] overflow-hidden">
                    <div className="aspect-[16/10] bg-[#E8E8EC]/50" />
                    <div className="p-6 md:p-8 space-y-3">
                      <div className="h-4 bg-[#E8E8EC]/50 rounded w-20" />
                      <div className="h-6 bg-[#E8E8EC]/50 rounded w-3/4" />
                      <div className="h-4 bg-[#E8E8EC]/50 rounded w-1/2" />
                      <div className="h-16 bg-[#E8E8EC]/50 rounded" />
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
              // Projects grid
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {projects.map((project, index) => (
                  <Reveal key={project.$id} delay={index * 0.1}>
                    <div className="group bg-[#FFFFFF] border border-[#E8E8EC] hover:border-[#D0D0D5] rounded-[12px] overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] bg-[#F0F0F2] overflow-hidden">
                        {project.featuredImage ? (
                          <Image
                            src={project.featuredImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8A8A8A] text-sm font-light">
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
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
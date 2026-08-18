import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";
import Reveal from "../../../components/animations/Reveal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug } from "../../../lib/appwrite/server";
import { getAllProjectImages } from "../../../lib/utils/images";
import ProjectGallery from "../../../components/sections/ProjectGallery";

const SOOTHING_EASE = [0.16, 1, 0.3, 1] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await getProjectBySlug(slug);

  // If project not found, show 404
  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;

  // Get all project images (featured image + gallery images)
  const projectImages = getAllProjectImages(project);

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#FFFFFF]">
        {/* Hero Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 label text-[#8A8A8A] hover:text-[#000000] transition-colors mb-8"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to work
              </Link>
            </Reveal>

            <Reveal>
              <div className="hairline pt-6 mb-12">
                <span className="label">Case study</span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#000000] leading-[1.05] tracking-tight max-w-[16ch] mb-4">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                <span className="label text-[#8A8A8A]">{project.category}</span>
                <span className="label text-[#8A8A8A]">{project.location}</span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags && project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-[#E8E8EC] px-3 py-1 text-[0.55rem] font-medium tracking-[0.12em] uppercase text-[#4A4A4A] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Project Image & Gallery Section */}
        <ProjectGallery images={projectImages} title={project.title} />


        {/* Content Section */}
        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-[1280px] mx-auto">
            <Reveal delay={0.2}>
              <div className="max-w-[48ch]">
                <h2 className="label text-[#8A8A8A] mb-4">Overview</h2>
                <p className="text-[1.0625rem] leading-[1.8] text-[#4A4A4A] font-light">
                  {project.result}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Challenge & Approach */}
        {(project.challenge || project.approach) && (
          <section className="bg-[#F5F5F7] px-6 md:px-10 lg:px-16 py-20 md:py-28">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                {project.challenge && (
                  <Reveal>
                    <div>
                      <h2 className="label text-[#8A8A8A] mb-4">The challenge</h2>
                      <p className="body-text text-[0.9375rem] leading-[1.8] text-[#000000]">
                        {project.challenge}
                      </p>
                    </div>
                  </Reveal>
                )}

                {project.approach && (
                  <Reveal delay={0.1}>
                    <div>
                      <h2 className="label text-[#8A8A8A] mb-4">Our approach</h2>
                      <p className="body-text text-[0.9375rem] leading-[1.8] text-[#000000]">
                        {project.approach}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-[#FFFFFF]">
          <div className="max-w-[1280px] mx-auto">
            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 hairline">
                <div>
                  <span className="text-[#8A8A8A] text-[0.9375rem] font-light block mb-1">
                    Interested in similar results?
                  </span>
                  <p className="font-serif text-[1.25rem] font-medium text-[#000000]">
                    Let's build something great together.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-8 py-4 rounded-[7px] transition-colors duration-300 ease-out bg-[#140f0a] text-[#FFFFFF] hover:bg-[#1A1A1A] active:bg-[#000000] cursor-pointer no-underline shrink-0"
                >
                  Start your project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
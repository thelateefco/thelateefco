import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";
import Reveal from "../../../components/animations/Reveal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "../../../lib/appwrite/server";

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

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32 bg-[#ECE6DF]">
        <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-[1280px] mx-auto">
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 label text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors mb-8"
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
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium text-[#1A1A1A] leading-[1.05] tracking-tight max-w-[16ch] mb-4">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                <span className="label text-[#8A8A8A]">{project.category}</span>
                <span className="label text-[#8A8A8A]">{project.location}</span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-2 mb-12">
                {project.tags && project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-[#D0C9C1] px-3 py-1 text-[0.6rem] font-medium tracking-[0.12em] uppercase text-[#4A4A4A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="max-w-[48ch]">
                <p className="text-[1.0625rem] leading-[1.8] text-[#4A4A4A] font-light mb-8">
                  {project.result}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {(project.challenge || project.approach) && (
          <section className="px-6 md:px-10 lg:px-16 pb-28 md:pb-36">
            <div className="max-w-[1280px] mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                {project.challenge && (
                  <Reveal>
                    <div>
                      <h2 className="label text-[#8A8A8A] mb-4">The challenge</h2>
                      <p className="body-text text-[0.9375rem] leading-[1.8]">
                        {project.challenge}
                      </p>
                    </div>
                  </Reveal>
                )}

                {project.approach && (
                  <Reveal delay={0.1}>
                    <div>
                      <h2 className="label text-[#8A8A8A] mb-4">Our approach</h2>
                      <p className="body-text text-[0.9375rem] leading-[1.8]">
                        {project.approach}
                      </p>
                    </div>
                  </Reveal>
                )}
              </div>

              <Reveal delay={0.2}>
                <div className="mt-16 pt-8 hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[#8A8A8A] text-[0.9375rem] font-light">
                    Interested in similar results?
                  </span>
                  <Link
                    href="/contact"
                    className="btn-primary text-sm"
                  >
                    Start your project
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
"use client";

import Reveal from "./Reveal";

const steps = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    body: "We start with a focused conversation — your business, your customers, what's working, what isn't. Then we audit your current digital presence and map what the site actually needs to achieve. No briefs for the sake of briefs.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    duration: "Weeks 2–3",
    body: "We design in the browser with real content from day one — not abstract wireframes. You'll see how the site looks and moves before a single line of production code is written. Feedback loops are tight, revisions are structured.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    duration: "Weeks 3–5",
    body: "Development happens in parallel as design is confirmed, so nothing gets rebuilt twice. We build on modern, fast infrastructure — performance and accessibility are baked in, not bolted on at the end.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch",
    duration: "Week 6",
    body: "We handle the technical side of going live — domain, hosting, redirects, analytics — so you don't have to coordinate between multiple vendors. After launch, we stay available for 30 days to catch anything that needs attention.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-[#ECE6DF] py-28 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <Reveal>
          <div className="hairline pt-6 mb-16 md:mb-20">
            <span className="label">How we work</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-0">
          {steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.08}>
              <div
                id={`process-${step.id}`}
                className={`py-10 md:py-12 ${
                  i % 2 === 0 ? "md:pr-14 md:border-r border-[#D0C9C1]" : "md:pl-14"
                } ${
                  i < steps.length - 2 ? "border-b border-[#D0C9C1]" : ""
                } ${
                  i === steps.length - 2 || i === steps.length - 1
                    ? ""
                    : ""
                }`}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span className="label text-[#8A8A8A]">{step.number}</span>
                  <span className="label text-[#8A8A8A] text-[0.55rem]">
                    {step.duration}
                  </span>
                </div>
                <h3
                  className="font-serif text-[1.75rem] md:text-[2rem] font-medium text-[#1A1A1A] mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="body-text text-[0.9375rem] leading-[1.8]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
